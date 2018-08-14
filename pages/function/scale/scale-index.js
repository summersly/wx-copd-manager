// pages/function/scale/scale-index.js
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
        memo: '本周已填写??'
      }, {
        name: '抑郁量表',
        color:['#c5e1a5','#8bc34a'],
        route: 'scale-phq/scale-phq',
        memo: '本周已填写'
      }, {
        name: '焦虑量表',
        color:['#ffe082','#ffc107'],
        route: 'scale-gad/scale-gad',
        memo: '本周已填写'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   'scaleCardData[0].memo' : ''
    // })
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