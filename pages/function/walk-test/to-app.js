// pages/function/walk-test/to-app.js
import { iconBaseUrl } from '../../../utils/config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: "https://nx.zjubiomedit.com/app/copd/copd.apk",
    icImg:iconBaseUrl + 'ic_launcher.png'
  },

  copyToBlipb: function() {
    wx.setClipboardData({
      data:this.data.url,
      success:function(){
        wx.showToast({
          title:'复制成功！立即下载吧！',
          icon:'none'
        })
      },
      fail:function(){
        wx.showToast({
          title:'复制失败，请重试',
          icon:'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
