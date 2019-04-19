// pages/function/scale/scale-cat/scale-cat.js
import {scaleScore,CommitRequest,evaluateWithPEF} from "../../../../utils/Request"
var util = require('../../../../utils/util.js');

Page({

  /**
   * 
   * 页面的初始数据
   */
  data: {
    questionData: [{
      qName: "1.您经常咳嗽吗？",
      optionNames: ["从不咳嗽", "基本不咳嗽", "很少咳嗽", "偶尔咳嗽", "经常咳嗽", "总是咳嗽"],
      defaultIndex: '',
    }, {
      qName: "2.您平时有痰吗？",
      optionNames: ["一点痰也没有", "基本无痰", "很少有痰", "偶尔有痰", "痰量多", "有很多很多痰"],
      defaultIndex: '',
    }, {
      qName: "3.您平时有胸闷的感觉吗？",
      optionNames: ["没有任何胸闷的感觉", "轻微的胸闷", "偶有胸闷", "常有胸闷", "胸闷症状重", "有严重胸闷感觉"],
      defaultIndex: '',
    }, {
      qName: "4.爬坡或上1层楼梯时有气喘吗？",
      optionNames: ["没有气喘的感觉", "轻微气喘", "稍感气喘", "感气喘", "明显气喘", "严重喘不过气"],
      defaultIndex: '',
    }, {
      qName: "5.在家里能做事情吗？",
      optionNames: ["能做任何事情", "能做绝大部分事情", "能做大部分事情", "能做轻体力事情", "只能做个别事情", "任何事情都受影响"],
      defaultIndex: '',
    }, {
      qName: "6.有肺部疾病对外出有信心吗？",
      optionNames: ["对外出很有信心", "对外出有信心", "对外出有部分信心", "对外出信心小", "对外出不太有信心", "对外出没有信心"],
      defaultIndex: '',
    }, {
      qName: "7.您的睡眠如何？",
      optionNames: ["非常好", "睡眠好", "大部分时间睡眠好", "睡眠欠佳", "睡眠差", "睡眠相当差"],
      defaultIndex: '',
    }, {
      qName: "8.您的精力如何？",
      optionNames: ["精力很旺盛", "精力好", "精力尚可", "精力欠佳", "精力差", "一点精力都没有"],
      defaultIndex: '',
    }],
    catAnswerIndex: ['', '', '', '', '', '', '', ''],
    currentIndex: 0
  },
  qselectChange: function (e) {
    let defaultIndex = 'questionData[' + e.target.dataset.index + '].defaultIndex'
    let answer = 'catAnswerIndex[' + e.target.dataset.index + ']'
    let currentindex = this.data.currentIndex != 7 ? ++this.data.currentIndex : this.data.currentIndex
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
    let score = scaleScore(this.data.catAnswerIndex)
    if (score < 0) {
      return false
    }
    let measureTime = util.formatTime(new Date())
    let catData = {
      id: 0,
      score: score,
      duration: 0,
      answer: this.data.catAnswerIndex.toString(),
      measureTime: measureTime,
    }
    var dataSring = JSON.stringify(catData);
    // console.log(dataSring)

    wx.showModal({
      title:'注意',
      content: '提交后无法修改',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          // console.log('111')
          CommitRequest(dataSring, 1).then(res => {
            let Pages = getCurrentPages()
            let prevPage = Pages[Pages.length - 2]
            prevPage.setData({
              'scaleCardData[0].memo': '本周已填写',
            })
            wx.showToast({
              title: '上传成功',
              duration: 1500
            })
            evaluateWithPEF().then(res => {
              if (res) {
                let evaluation = res
                let ds = JSON.stringify({
                  id: 0,
                  measureTime: measureTime,
                  value: evaluation.score
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../../tips/cat-tip?score=' + evaluation.score
                  })
                  CommitRequest(ds, 7).then(() => {
                    console.log('evaluation update')
                  })
                }, 1000)
              }
            })
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