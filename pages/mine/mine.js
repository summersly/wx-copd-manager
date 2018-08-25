// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: 'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/arrowgray.png'
  },

  noneUrlToast: function () {
    wx.showToast({
      title:'功能尚未开通',
      icon:'none'
    })
  },
  quit: function () {
    try {
      wx.removeStorageSync('patientid_token')
      wx.removeStorageSync('password_token')
    } catch (e) {
      wx.showToast({
        title: '清除缓存失败',
        icon: 'none'
      })
    }
    wx.reLaunch({
      url: '../login/login'
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