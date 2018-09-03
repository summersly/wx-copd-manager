// pages/login/login.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userSrc: "https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/user.png",
    passwordSrc: "https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/password.png",
    eyeCloseSrc: "https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/eye_close.png",
    eyeOpenSrc: "https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/eye_open.png",
    account: '',
    password: '',
    showPsw: false,
    WapLoginUrl: 'https://zjubiomedit.com/COPDService.svc/WapLogin'
  },

  userNameInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  switchShowPassword: function () {
    this.setData({
      showPsw: !this.data.showPsw
    })
  },

  logIn: function () {
    var that = this;
    let account = this.data.account;
    let password = this.data.password;
    if (account.length <= 0) {
      wx.showToast({
        title: '请输入用户名',
        image: '../../image/fail.png',
        duration: 1500
      })
    } else {
      wx.request({
        url: this.data.WapLoginUrl,
        data: {
          account: account,
          password: password,
        },
        method: 'POST',
        success: function (res) {
          // 判断服务器返回状态，辅助debug
          const { statusCode } = res
          if (statusCode > 400 && statusCode < 500) {
            wx.showToast({
              title: '端口请求' + statusCode,
              image: '../../image/fail.png',
              duration: 1500
            })
            return
          } else if (statusCode > 500) {
            wx.showToast({
              title: '服务器请求' + statusCode,
              image: '../../image/fail.png',
              duration: 1500
            })
            return
          }
          // 请求成功，检验登录信息
          if (res.data.flag == 200) {
            app.globalData.loginUserInfo = res.data.loginUserInfo;
            wx.setStorageSync('patientid_token', res.data.loginUserInfo.patientID);
            wx.setStorageSync('password_token', that.data.password);
            wx.switchTab({
              url: '../index/index'
            })
            wx.showLoading({
              title: '登陆成功',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1500)
          } else if (res.data.flag == 240) {
            wx.showToast({
              title: '用户已禁用',
              image: '../../image/fail.png',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '登陆失败' + res.data.flag,
              image: '../../image/fail.png',
              duration: 1500
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '服务器请求失败',
            image: '../../image/fail.png',
            duration: 1000
          })
        }
      })
    }

  },

  register: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 获取系统信息*/
    var that = this;
    var patientId = wx.getStorageSync('patientid_token');
    var password = wx.getStorageSync('password_token');
    if (patientId.length > 0) {
      that.setData({
        account: patientId,
        password: password
      })
      that.logIn();
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