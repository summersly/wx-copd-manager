// pages/function/scale/scale-phq/scale-phq.js
const option = ["完全不会", "偶尔几天", "一半以上的日子", "几乎每天"]
import scaleRequest from "../../../../utils/Request"
var util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionData: [{
      qName: "1.在过去的两周内，您是否感觉到做事时提不起劲或没有兴趣？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "2.在过去的两周内，您是否感觉到心情低落、沮丧或绝望？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "3.在过去的两周内，您是否感觉到入睡困难、睡不安稳或睡眠过多？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "4.在过去的两周内，您是否感觉到疲倦或没有活力？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "5.在过去的两周内，您是否感觉到食欲不振或吃太多？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "6.在过去的两周内，您是否觉得自己很糟，或觉得自己很失败，或者让自己或家人失望？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "7.在过去的两周内，您是否感觉到对事物专注有困难，例如阅读报纸或看电视时？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "8.在过去的两周内，您是否感觉到动作或说话速度缓慢到别人已经察觉？或正好相反--烦躁或坐立不安、动来动去的情况胜于平常？",
      optionNames: option,
      defaultIndex: '',
    }, {
      qName: "9.在过去的两周内，您是否感觉到有不如死掉或用某种方式伤害自己的念头？",
      optionNames: option,
      defaultIndex: '',
    }],
    phqAnswerIndex: ['', '', '', '', '', '', '', '', ''],
    currentIndex: 0
  },
  qselectChange: function (e) {
    let defaultIndex = 'questionData[' + e.target.dataset.index + '].defaultIndex'
    let answer = 'phqAnswerIndex[' + e.target.dataset.index + ']'
    let currentindex = this.data.currentIndex != 8 ? ++this.data.currentIndex : this.data.currentIndex
    this.setData({
      [defaultIndex]: parseInt(e.detail),
      [answer]: parseInt(e.detail),
      currentIndex: currentindex
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  toLastQue: function () {
    this.setData({
      currentIndex: --this.data.currentIndex
    })
  },
  toNextQue: function () {
    this.setData({
      currentIndex: ++this.data.currentIndex
    })
  },
  submitAnswer: function () {
    let score = scaleRequest.scaleScore(this.data.phqAnswerIndex)
    if (score < 0) {
      return false
    }
    let measureTime = util.formatTime(new Date())
    let phqData = {
      id: 0,
      score: score,
      duration: 0,
      answer: this.data.phqAnswerIndex.toString(),
      measureTime: measureTime,
    }
    var dataSring = JSON.stringify(phqData);
    // console.log(dataSring)
    wx.showModal({
      title:'注意',
      content: '提交后无法修改',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          // console.log('111')
          scaleRequest.CommitRequest(dataSring, 3).then(res => {
            let Pages = getCurrentPages()
            let prevPage = Pages[Pages.length -2]
            prevPage.setData({
              'scaleCardData[1].memo' : '本月已填写',
            })
            wx.showToast({
              title:'上传成功',
              duration:1500
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          })

        } else if (res.cancel) {
          console.log('取消')
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