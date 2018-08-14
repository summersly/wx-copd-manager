// pages/function/scale/scale-phq/scale-phq.js
const option = ["完全不会","偶尔几天","一半以上的日子","几乎每天"]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionData:[{
      qName:"1.在过去的两周内，您是否感觉到做事时提不起劲或没有兴趣？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"2.在过去的两周内，您是否感觉到心情低落、沮丧或绝望？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"3.在过去的两周内，您是否感觉到入睡困难、睡不安稳或睡眠过多？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"4.在过去的两周内，您是否感觉到疲倦或没有活力？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"5.在过去的两周内，您是否感觉到食欲不振或吃太多？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"6.在过去的两周内，您是否觉得自己很糟，或觉得自己很失败，或者让自己或家人失望？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"7.在过去的两周内，您是否感觉到对事物专注有困难，例如阅读报纸或看电视时？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"8.在过去的两周内，您是否感觉到动作或说话速度缓慢到别人已经察觉？或正好相反--烦躁或坐立不安、动来动去的情况胜于平常？",
      optionNames:option,
      defaultIndex:0,
    },{
      qName:"9.在过去的两周内，您是否感觉到有不如死掉或用某种方式伤害自己的念头？",
      optionNames:option,
      defaultIndex:0,
    }],
    catAnswerIndex:[0,0,0,0,0,0,0,0,0],
    currentIndex:0  
  },
  qselectChange:function(e){
    let defaultIndex = 'questionData['+ e.target.dataset.index + '].defaultIndex'
    let answer = 'catAnswerIndex[' + e.target.dataset.index + ']'
    let currentindex = this.data.currentIndex != 8? ++this.data.currentIndex:this.data.currentIndex
    this.setData({
      [defaultIndex]: e.detail,
      [answer]: e.detail,
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
    console.log(this.data.catAnswerIndex)
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