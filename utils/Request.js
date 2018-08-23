var util = require('util.js');
const app = getApp()

const evaluationTipList = [
    "请填写CAT量表，并进行峰流速记录",
    "您需要立刻去门诊就诊控制病情",
    "请联系医生进一步调整治疗方案",
    "请继续努力!记得要按时完成任务哦！",
    "请继续保持!记得要按时完成任务哦！"
]
const evaluationStateList = ["未测评", "危险", "不佳", "中等", "良好"]
const BASEURL = 'http://120.27.141.50:18908/'
const getLastUrl = 'http://120.27.141.50:18908/data/GetLastGenericRecords'
const fetchUrl = 'http://120.27.141.50:18908/data/fetch'
const commitUrl = 'http://120.27.141.50:18908/data/commit'
const validateUrl = BASEURL + 'ValidateRegister'
const registUrl = BASEURL + 'WapRegistWithPatientInfo'

export const request = ({ data = {}, url = '' , method = 'GET' }) => {
    let header = {
      'content-type': 'application/json'
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header: header,
        data: data,
        method: method,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          wx.showLoading({
            title: '网络错误!'
          })
          setTimeout(() => {
            wx.hideLoading()
          }, 3000)
          reject(err)
        }
      })
    })
  } 
/**
 * 获取最新数据，index指定type, 默认数量为1
 */
function LastRequest(index, num = 1) {
    let patientId = wx.getStorageSync('patientid_token')
    let header = {
        'content-type': 'application/json'
    }
    let url = getLastUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "recordType": index,
        "num": num
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                }
                if (res.data.flag == 200) {
                    resolve(res.data.recordList)
                } else {
                    resolve('')
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}
/**
 * 获取某段时间的数据，timeindex：0 ：当天 1：一周 2：一个月 
 */
function DateRequest(type, timeIndex) {
    let patientId = wx.getStorageSync('patientid_token')
    let now = new Date();
    let end = util.formatTime(now)
    let today = util.dayStart(now) //获取当天数据
    let lastWeek = util.dayStart(new Date(now - 7 * 24 * 3600 * 1000)); // 获取上周数据
    let lastMonth = util.dayStart(new Date(now - 30 * 24 * 3600 * 1000)); // 获取上个月数据
    let timeList = [today, lastWeek, lastMonth]
    let header = {
        'content-type': 'application/json'
    }
    let url = fetchUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "start": timeList[timeIndex],
        "end": end,
        "recordType": type
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                }
                if (res.data.flag == 200) {
                    resolve(res.data.recordList)
                } else {
                    resolve('')
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}
/**
 * 提交数据
 */
function CommitRequest(dataString, type) {
    let patientId = wx.getStorageSync('patientid_token')
    let header = {
        'content-type': 'application/json'
    }
    let url = commitUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "data": dataString,
        "recordType": type
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                }
                if (res.data.flag == 200) {
                    resolve(res.data)
                } else {
                    wx.showToast({
                        title: '数据上传失败' + res.data.flag,
                        icon: 'none',
                        duration: 1500
                    })
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}

/** 
 * 身份核验请求
*/
function validateRequest(patientId, patientName) {
    let header = {
        'content-type': 'application/json'
    }
    let url = validateUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "patientName": patientName
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                }
                if (res.data.flag == 200) {
                    wx.showToast({
                        title: '核验成功',
                        icon: 'none',
                        duration: 1500
                    })
                    resolve({ flag: 200 })
                } else if (res.data.flag == 254) {
                    wx.showToast({
                        title: '该账号已存在' + res.data.flag,
                        icon: 'none',
                        duration: 1500
                    })
                } else {
                    wx.showToast({
                        title: '异常' + res.data.flag,
                        icon: 'none',
                        duration: 1500
                    })
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}
/**
 * 注册请求
 */
function registWithInfo(patientId,dataString){
    let header = {
        'content-type': 'application/json'
    }
    let url = registUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "info": dataString
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none'
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none'
                    })
                }
                if (res.data.flag == 200) {
                    wx.showToast({
                        title: '注册成功',
                        icon: 'none'
                    })
                    resolve({ flag: 200 })
                } else if (res.data.flag == 254) {
                    wx.showToast({
                        title: '注册失败' + res.data.flag,
                        icon: 'none'
                    })
                } else {
                    wx.showToast({
                        title: '异常' + res.data.flag,
                        icon: 'none'
                    })
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
}
/** 
 * pages/index初始化或刷新，获取量表填写情况，上一次各项记录
 */
function Loadrequest() {
    let index = 4
    return Promise.all([DateRequest(1, 1),
    DateRequest(2, 2),
    DateRequest(3, 2),
    LastRequest(index),
    LastRequest(++index),
    LastRequest(++index),
    LastRequest(++index)]).then(req => {
        return req
    })

}
/** 
 * 计算整体评估情况：先计算年龄，获取CAT和PEF数据进行评估
 */
function calculateAge() {
    let birthdate = app.globalData.loginUserInfo.birthDate
    var today = new Date();
    var birthDate = new Date(birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function evaluateWithPEF() {
    let standardPEF = 0
    let sex = app.globalData.loginUserInfo.sexCode
    let height = app.globalData.loginUserInfo.newestHeight
    let age = calculateAge()
    let result = 0
    return Promise.all([LastRequest(1), LastRequest(4)]).then((req) => {
        if (!req[0][0]){
            wx.showToast({
                title:'填写CAT量表后进行整体评估',
                icon:'none'
            })
            return false
        }
        if(!req[1][0]){
            wx.showToast({
                title:'提交PEF记录后进行整体评估',
                icon:'none'
            })
            return false
        }
        let CatScore = req[0][0].score
        let PefScore = req[1][0].value
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
        // console.log(evaluation)
        return evaluation;
    })
}
/** 
 * 检查量表填写情况，是否全部填写完毕并提示
 */
function scaleScore(answer) {
    let score = 0
    answer.map((data, index) => {
        if (data !== 0 && !data) {
            wx.showToast({
                title: '第' + (index + 1) + '题尚未完成',
                icon: 'none'
            })
            return score = -100
        }
        return score += parseInt(data)
    })
    return score
}
/** 
 * 转义不适记录的二进制数值为字符串
*/
function uncomfortString(data) {
    if (!data) return ''
    let inflammation = parseInt(data.inflammation)
    let lung = parseInt(data.lung)
    let heart = parseInt(data.heart)
    let breath = parseInt(data.breath)
    let result = ''
    if (inflammation & 1) result = result.concat('发烧,')
    if (inflammation & 2) result = result.concat('黄痰,')
    if (inflammation & 4) result = result.concat('咳嗽,')
    if (inflammation & 8) result = result.concat('血痰,')
    if (lung & 1) result = result.concat('活动后气短加重,')
    if (lung & 2) result = result.concat('喘息,')
    if (lung & 4) result = result.concat('气短,')
    if (heart & 1) result = result.concat('反酸水,')
    if (heart & 2) result = result.concat('腹胀,')
    if (heart & 4) result = result.concat('腿肿,')
    if (heart & 8) result = result.concat('消瘦,')
    if (breath & 1) result = result.concat('嗜睡,')
    if (breath & 2) result = result.concat('迷糊,')
    return result ? result : "正常,"
}
/**
 * 检查身份证号码 && 手机号码
 */
function validateID(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;
    var birthDate = ""
    if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    }
    //18位身份证
    if (code.length == 18) {
        var birthday = code.substr(6, 4) + '/' + Number(code.substr(10, 2)) + '/' + Number(code.substr(12, 2));
        birthDate = code.substr(6, 4) + '-' + code.substr(10, 2) + '-' + code.substr(12, 2);
        var d = new Date(birthday);
        var currentTime = new Date().getTime();
        var time = d.getTime();
        if (!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dxX]$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (time >= currentTime) {
            tip = "身份证号非法生日";
            pass = false;
        } else {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17].toUpperCase()) {
                tip = "身份证号校验位错误";
                pass = false;
            }
        }
    } else if (code.length == 15) {
        if (!code || !/^[1-9]\d{5}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }
        birthDate = '19' + code.substr(6, 2) + '-' + code.substr(8, 2) + '-' + code.substr(10, 2);
    } else {
        tip = "身份证号长度有误"
        pass = false;
    }
    if (!pass) console.log(tip);

    return {
        birthDate:birthDate,
        tip:tip,
        pass:pass
    }

}
function validatePhone(phone) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    return (reg.test(phone))
}

function personInfoVali(code,phone){
    return new Promise((resolve, reject) => {
        let id = validateID(code)
        let p = validatePhone(phone)
        if (!id.pass || !p){
            wx.showToast({
                title: id.tip || '手机号输入有误',
                icon:'none',
                duration:1500
            })
            reject(id.tip)
        } else {
            resolve(id.birthDate)
        }
    })
}

export default {
    evaluationTipList: evaluationTipList,
    evaluationStateList: evaluationStateList,
    CommitRequest: CommitRequest,
    LastRequest: LastRequest,
    DateRequest: DateRequest,
    Loadrequest: Loadrequest,
    calculateAge: calculateAge,
    evaluateWithPEF: evaluateWithPEF,
    scaleScore: scaleScore,
    uncomfortString: uncomfortString,
    validateRequest: validateRequest,
    personInfoVali:personInfoVali,
    registWithInfo:registWithInfo
}