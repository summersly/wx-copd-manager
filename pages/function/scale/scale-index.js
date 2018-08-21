// pages/function/scale/scale-index.js
const scaleCardWeekMemo = ['本周尚未填写','本周已填写']
const scaleCardMonthMemo = ['本月尚未填写','本月已填写']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scaleCardData:[
      {
        name: 'CAT量表',
        color:['#81d4fa','#03a9f4'],
        route: 'scale-cat/scale-cat',
        memo: ''
      }, {
        name: '抑郁量表',
        color:['#c5e1a5','#8bc34a'],
        route: 'scale-phq/scale-phq',
        memo: ''
      }, {
        name: '焦虑量表',
        color:['#ffe082','#ffc107'],
        route: 'scale-gad/scale-gad',
        memo: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.scale)
    if (options.scale) {
      let scaleFinish = options.scale.split(',').map(data=>{return parseInt(data)})
      this.setData({
        'scaleCardData[0].memo' : scaleCardWeekMemo[scaleFinish[0]],
        'scaleCardData[1].memo' : scaleCardMonthMemo[scaleFinish[1]],
        'scaleCardData[2].memo' : scaleCardMonthMemo[scaleFinish[2]],
      })
    }
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