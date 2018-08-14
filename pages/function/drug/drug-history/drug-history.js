// pages/function/drug/drug-history/drug-history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayscolor:[],
    drugHisData:[{
      time:'14:30',
      name:'信必可都宝'
    },{
      time:'14:56',
      name:'噻托溴铵分吸入剂'
    }]
  },
  dayClick:function(e){
    console.log(e.detail);
    this.setData({
      dayscolor:[{
        month:'current',
        day:e.detail.day,
        color:'white',
        background:'#33ccff'
      }]
    })
  },
  dateChange:function(e){
    this.setData({
      dayscolor:[]
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