// pages/function/scale/scale-gad/scale-gad.js
const option = ["完全不会","偶尔几天","一半以上的日子","几乎每天"]
import scaleRequest from "../../../../utils/Request"
var util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionData:[{
      qName:"1.在过去的两周内，您是否感觉到紧张、焦虑或急切？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"2.在过去的两周内，您是否感觉到不能够停止或控制担忧？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"3.在过去的两周内，您是否感觉到对各种各样的事情担忧过多？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"4.在过去的两周内，您是否感觉到很难放松下来？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"5.在过去的两周内，您是否感觉到由于不安而无法静坐？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"6.在过去的两周内，您是否感觉到变得容易烦躁或急躁？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"7.在过去的两周内，您是否感觉到似乎将有可怕的事情发生而害怕？",
      optionNames:option,
      defaultIndex:0,
    }],
    gadAnswerIndex:['','','','','','',''],
    currentIndex:0  
  },
  qselectChange:function(e){
    let defaultIndex = 'questionData['+ e.target.dataset.index + '].defaultIndex'
    let answer = 'gadAnswerIndex[' + e.target.dataset.index + ']'
    let currentindex = this.data.currentIndex != 6? ++this.data.currentIndex:this.data.currentIndex
    this.setData({
      [defaultIndex]: parseInt(e.detail),
      [answer]: parseInt(e.detail),
      currentIndex: currentindex
    })
  },
  swiperChange: function(e){
    this.setData({
      currentIndex: e.detail.current
    })     
  },
  toLastQue: function(){
    this.setData({
      currentIndex: --this.data.currentIndex
    })   
  },
  toNextQue: function(){
    this.setData({
      currentIndex: ++this.data.currentIndex
    })   
  },
  submitAnswer: function(){
    let score = scaleRequest.scaleScore(this.data.gadAnswerIndex)
    if (score < 0) {
      return false
    }
    let measureTime = util.formatTime(new Date())
    let gadData = {
      id: 0,
      score: score,
      duration:0,
      answer: this.data.gadAnswerIndex.toString(),
      measureTime: measureTime,
    }
    var dataSring = JSON.stringify(gadData);
    console.log(dataSring)
    scaleRequest.CommitRequest(dataSring, 2).then(res => {
      console.log(res)
      wx.showToast({
        title:'上传成功',
        duration:1500
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

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