// pages/mine/mine-info/mine-info.js
import indexRequest from "../../../utils/Request"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     mineInfo:{
       name:'',
       sex:'',
       birthDate:'',
       age:'',
       height:'',
       weight:'',
       phoneNumber:''
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let age = indexRequest.calculateAge()
    let birthDate = app.globalData.loginUserInfo.birthDate
    birthDate = birthDate.split(' ')
    this.setData({
      'mineInfo.name':app.globalData.loginUserInfo.patientName,
      'mineInfo.sex':app.globalData.loginUserInfo.sexCode == 'M'?'男':'女',
      'mineInfo.birthDate':birthDate[0],
      'mineInfo.age':age,
      'mineInfo.height':app.globalData.loginUserInfo.newestHeight,
      'mineInfo.weight':app.globalData.loginUserInfo.newestWeight,
      'mineInfo.phoneNumber':app.globalData.loginUserInfo.phoneNumber,
    })
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