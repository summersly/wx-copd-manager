// pages/function/uncomfort/uncomfort.js
import {uncomfortString,CommitRequest} from "../../../utils/Request"
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: {
      name: "今日症状",
      options: ["正常", "不适"],
      defaultIndex: 0
    },
    uncomfData: [{
      name: "炎症表现",
      options: ["发烧", "黄痰", "咳嗽", "血痰"],
      defaultIndex: [0, 0, 0, 0]
    }, {
      name: "肺功能下降",
      // 为便于显示 将顺序调换 实际index 1，2，0
      options: ["喘息", "气短", "活动后气短加重"], // 注意 计算lung值时纠正index
      defaultIndex: [0, 0, 0]
    }, {
      name: "心功能衰竭",
      options: ["反酸水", "腹胀", "腿肿", "消瘦"],
      defaultIndex: [0, 0, 0, 0]
    }, {
      name: "呼吸衰竭",
      options: ["嗜睡", "迷糊"],
      defaultIndex: [0, 0]
    }],
    // 提交值
    inflammation: 0,
    lung: 0,
    heart: 0,
    breath: 0,
    memo: "",
  },
  stateRadioChange: function (e) {
    this.setData({
      'state.defaultIndex': e.detail.value
    })
  },
  selectRecord: function (e) {
    let type = e.target.dataset.type
    let key = 'uncomfData[' + type + '].defaultIndex[' + e.detail + ']'
    let value = this.data.uncomfData[type].defaultIndex[e.detail] ? 0 : 1
    this.setData({
      [key]: value,
    })
  },
  memoInput: function (e) {
    this.setData({
      memo: e.detail.value,
    })
  },
  calculate: function () {
    let inflammation = 0, lung = 0, heart = 0, breath = 0
    this.data.uncomfData[0].defaultIndex.map((x, index) => {
      if (x) return inflammation += Math.pow(2, index)
    })
    // lung 计算时纠正index
    let last = this.data.uncomfData[1].defaultIndex[2]
    let lungIndex = this.data.uncomfData[1].defaultIndex.slice(0, -1)
    lungIndex.unshift(last)
    lungIndex.map((x, index) => {
      if (x) return lung += Math.pow(2, index)
    })
    this.data.uncomfData[2].defaultIndex.map((x, index) => {
      if (x) return heart += Math.pow(2, index)
    })
    this.data.uncomfData[3].defaultIndex.map((x, index) => {
      if (x) return breath += Math.pow(2, index)
    })
    this.setData({
      inflammation: inflammation,
      lung: lung,
      heart: heart,
      breath: breath
    })
  },
  submitRecord: function () {
    this.calculate()
    let that = this
    let measureTime = util.formatTime(new Date())
    let uncomfortData = {
      id: 0,
      inflammation: this.data.inflammation,
      lung: this.data.lung,
      heart: this.data.heart,
      breath: this.data.breath,
      measureTime: measureTime,
      memo: this.data.memo
    }
    if (that.data.state.defaultIndex == '1' && !uncomfortData.inflammation && !uncomfortData.lung && !uncomfortData.heart && !uncomfortData.breath && !uncomfortData.memo) {
      wx.showToast({
        title: '尚未输入任何不适情况',
        icon: 'none',
        duration: 1500
      })
      return
    }
    var dataSring = JSON.stringify(uncomfortData);
    let modalContent = uncomfortString(uncomfortData).slice(0, -1)
    wx.showModal({
      title: '提交后无法修改',
      content: '本次记录：' + modalContent,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          CommitRequest(dataSring, 6).then(res => {
            wx.showToast({
              title: '上传成功',
              duration: 1500
            })
            setTimeout(() => {
              if (that.data.state.defaultIndex) {
                wx.redirectTo({
                  url: "../tips/uncomfort-tip?data=" + dataSring
                })
              } else {
                wx.navigateBack()
              }
            }, 1300)
          })
        } else if (res.cancel) {

        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})