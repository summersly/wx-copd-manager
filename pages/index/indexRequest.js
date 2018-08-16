const evaluationTipList = [
    "请填写CAT量表，并进行峰流速记录",
    "您需要立刻去门诊就诊控制病情",
    "请联系医生进一步调整治疗方案",
    "请继续努力!记得要按时完成任务哦！",
    "请继续保持!记得要按时完成任务哦！"
]
const evaluationStateList = ["未测评", "危险", "不佳", "中等", "良好"]
const getLastUrl = 'http://120.27.141.50:18908/data/GetLastGenericRecords'
function requestLastPEF() {
    let patientId = wx.getStorageSync('patientid_token')
    wx.request({
        url: getLastUrl,
        data: {
            "patientId": patientId,
            "recordType": 4,
            "num": 1
        },
        method: 'POST',
        success: function (res) {
            // 判断服务器返回状态，辅助debug
            const { statusCode } = res
            if (statusCode > 400 && statusCode < 500) {
                wx.showToast({
                    title: '端口请求错啦',
                    image: '../../image/fail.png',
                    duration: 1500
                })
                return 0
            } else if (statusCode > 500) {
                wx.showToast({
                    title: '服务器请求失败',
                    image: '../../image/fail.png',
                    duration: 1500
                })
                return 0
            }
            // 请求成功
            if (res.data.flag == 200) {
                console.log(res.data.recordList[0])
                return res.data.recordList[0].value
            }
        },
        fail: function (res) {
            wx.showToast({
                title: '服务器请求失败',
                image: '../../image/fail.png',
                duration: 1000
            })
        }
    })
}
function requestLastCAT() {
    let patientId = wx.getStorageSync('patientid_token')
    wx.request({
        url: getLastUrl,
        data: {
            "patientId": patientId,
            "recordType": 1,
            "num": 1
        },
        method: 'POST',
        success: function (res) {
            // 判断服务器返回状态，辅助debug
            const { statusCode } = res
            if (statusCode > 400 && statusCode < 500) {
                wx.showToast({
                    title: '端口请求错啦',
                    image: '../../image/fail.png',
                    duration: 1500
                })
                return 0
            } else if (statusCode > 500) {
                wx.showToast({
                    title: '服务器请求失败',
                    image: '../../image/fail.png',
                    duration: 1500
                })
                return 0
            }
            // 请求成功
            if (res.data.flag == 200) {
                console.log(res.data.recordList[0])
                return res.data.recordList[0].score
            }
        },
        fail: function (res) {
            wx.showToast({
                title: '服务器请求失败',
                image: '../../image/fail.png',
                duration: 1000
            })
        }
    })
}

function calculateAge(birthdate) {
    var today = new Date();
    var birthDate = new Date(birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function evaluateWithPEF(age, sex, height, PefScore, CatScore) {
    let standardPEF = 0
    let result = 0
    if (sex == "M") {
        standardPEF = 75.6 + 20.4 * age - 0.41 * age * age + 0.002 * age * age * age + 1.19 * height;
    } else {
        standardPEF = 282.0 + 1.79 * age - 0.046 * age * age + 0.68 * height;
    }
    if (PefScore / standardPEF >= 0.8) {
        if (CatScore <= 10) {
            result = 4;
        } else if (CatScore <= 20 && CatScore > 10) {
            result = 3;
        } else if (CatScore <= 30 && CatScore > 20) {
            result = 2;
        } else {
            result = 1;
        }
    } else if (PefScore / standardPEF >= 0.6 && PefScore / standardPEF < 0.8) {
        if (CatScore <= 20) {
            result = 3;
        } else if (CatScore <= 30 && CatScore > 20) {
            result = 2;
        } else {
            result = 1;
        }
    } else {
        result = 1;
    }
    let evaluation = {
        score: result * 20,
        evaluationTip: evaluationTipList[result],
        evaluationState: evaluationStateList[result]
    }
    return evaluation;
}
export default {
    requestLastPEF: requestLastPEF,
    requestLastCAT: requestLastCAT,
    calculateAge: calculateAge,
    evaluateWithPEF: evaluateWithPEF
}