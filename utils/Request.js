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
const getLastUrl = 'http://120.27.141.50:18908/data/GetLastGenericRecords'
const fetchUrl = 'http://120.27.141.50:18908/data/fetch'
const commitUrl = 'http://120.27.141.50:18908/data/commit'

function LastRequest(index) {
    let patientId = wx.getStorageSync('patientid_token')
    let header = {
        'content-type': 'application/json'
    }
    let url = getLastUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "recordType": index,
        "num": 1
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
                if (res.data.flag == 200){
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

function DateRequest(type,timeIndex){
    let patientId = wx.getStorageSync('patientid_token')
    let now = new Date();
    let end = util.formatTime(now)
    let today = util.dayStart(now) //获取当天数据
    let lastWeek = util.dayStart(new Date(now - 7 * 24 * 3600 * 1000)); // 获取上周数据
    let lastMonth = util.dayStart(new Date(now - 30 * 24 * 3600 * 1000)); // 获取上个月数据
    let timeList = [today,lastWeek,lastMonth]
    let header = {
        'content-type': 'application/json'
    }
    let url = fetchUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "start" : timeList[timeIndex],
        "end": end,
        "recordType" : type
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
                if (res.data.flag == 200){
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

function CommitRequest(dataString , type){
    let patientId = wx.getStorageSync('patientid_token')
    let header = {
        'content-type': 'application/json'
    }
    let url = commitUrl
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "data" : dataString,
        "recordType" : type
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
                if (res.data.flag == 200){
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

function Loadrequest() {
    let index = 4
    return  Promise.all([DateRequest(1,1),
    DateRequest(2,2),
    DateRequest(3,2),
    LastRequest(index),
    LastRequest(++index),
    LastRequest(++index),
    LastRequest(++index)]).then(req => {
        return req
    })

}

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
    return Promise.all([LastRequest(1),LastRequest(4)]).then((req) =>{
        console.log(req)
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
        return evaluation;
    })
}

function scaleScore(answer){
  let score = 0
  answer.map((data,index)=>{
      if (data !== 0 && !data){
          wx.showToast({
              title:'第'+ (index+1) +'题尚未完成',
              icon:'none'
          })
          return score = -100
      }
      return score += parseInt(data)
  })
  return score
}

function uncomfortString(data){
    let inflammation = parseInt(data.inflammation) 
    let lung = parseInt(data.lung)
    let heart = parseInt(data.heart)
    let breath = parseInt(data.breath)
    let result =''
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
    return result? result:"正常,"  
}

export default {
    evaluationTipList:evaluationTipList,
    evaluationStateList:evaluationStateList,
    CommitRequest:CommitRequest,
    Loadrequest: Loadrequest,
    calculateAge:calculateAge,
    evaluateWithPEF: evaluateWithPEF,
    scaleScore:scaleScore,
    uncomfortString:uncomfortString
}