// pages/function/message/message.js
var util = require('../../../utils/util.js');
import { request } from '../../../utils/Request'
import { sendMessageUrl, fetchMessageUrl, updateMessageUrl } from '../../../utils/config'
Page({

  /**
   * Page initial data
   */
  data: {
    msgList: [],
    inputMessage: "",
    scrollTop: 0
  },

  display: function () {
    var that = this
    let patientId = wx.getStorageSync('patientid_token')
    request({
      url:fetchMessageUrl,
      method:"POST",
      data:{
        patientId: patientId,
        messageNum: 50
      }
    }).then(res=>{
      that.setData({
        msgList: res.data.recordList,
        scrollTop: res.data.recordList.length * 100
      })
    })
  },

  userMessageInput: function (e) {
    this.setData({
      inputMessage: e.detail.value
    })
  },

  sendMessage: function () {
    var that = this
    var message = ""
    message = this.data.inputMessage
    let patientId = wx.getStorageSync('patientid_token')
    let doctorId = wx.getStorageSync('doctorid_token')
    let time = util.formatTime(new Date())
    if (message == "") {
      wx.showToast({
        title: '输入不能为空',
        image: '../../../image/fail.png',
        duration: 1500
      })
    }
    else {
      request({
        url:sendMessageUrl,
        data:{
          patientId: patientId,
          message: message,
          messageTime: time,
          doctor: doctorId
        },
        method:"POST"
      }).then(res=>{
        if (res.data.flag == 200) {
          that.setData({
            inputMessage: ""
          })
          this.display()
          wx.showToast({
            title: '发送成功',
            duration: 1000
          })
        }
        else if (res.data.flag == 254) {
          wx.showToast({
            title: '发送失败',
            image: '../../../image/fail.png',
            duration: 1500
          })
        }
        else if (res.data.flag == 255) {
          wx.showToast({
            title: '服务器异常',
            image: '../../../image/fail.png',
            duration: 1500
          })
        }
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.display()
    let patientId = wx.getStorageSync('patientid_token')
    let doctor = wx.getStorageSync('doctorid_token')
    request({
      url: updateMessageUrl,
      method: "POST",
      data: {
        patientId: patientId,
        doctor: doctor
      }
    }).then(res => {
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})