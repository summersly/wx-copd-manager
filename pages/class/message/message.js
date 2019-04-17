// pages/class/message/message.js
const wxParser = require('../../../wxParser/index');
import { request } from '../../../utils/Request'
import { knoGetContentUrl , knoLikeUrl , knoReadUrl , iconBaseUrl } from '../../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    id: 0,
    name: '',
    time: '',
    knoIfRead: false,
    knoIfFavorite: false,
    mark:[],
    dislike: iconBaseUrl + 'like_dis.png',
    like: iconBaseUrl + 'like.png'

  },

  recordLike: function () {
    //当前不收藏false，则like收藏1
    let like = this.data.knoIfFavorite?0:1
    let patientId = wx.getStorageSync('patientid_token')
    request({
      url:knoLikeUrl + 'patientId=' + patientId + '&knoId=' + this.data.id + '&value=' + like
    }).then(res=>{
      if(res.data.result == 'ok'){
        this.setData({
          knoIfFavorite:like
        })
        let Pages = getCurrentPages()
        let prevPage = Pages[Pages.length -2]
        let key1 = this.data.mark[0]?'mesArr':'knoArr'
        let key2 = '['+this.data.mark[1]+'].knoIfFavorite'
        prevPage.setData({
          [key1+key2] : like?true:false,
        })
        wx.showToast({
          title:like?'收藏成功':'已取消收藏'
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading()
    // console.log(options)
    let that = this
    let id = options.id
    let read = JSON.parse(options.read)
    let like = JSON.parse(options.like)
    let mark = JSON.parse(options.mark)
    this.setData({
      id: id,
      knoIfRead: read,
      knoIfFavorite: like,
      mark:mark
    })
    request({
      url: knoGetContentUrl + id
    }).then(res => {
      console.log(res)
      this.setData({
        name: res.data.title,
        time: res.data.createTime
      })
      wxParser.parse({
        bind: 'richText',
        html: res.data.content,
        target: that,
        enablePreviewImage: false, // 禁用图片预览功能
        tapLink: (url) => { // 点击超链接时的回调函数
          // url 就是 HTML 富文本中 a 标签的 href 属性值
          // 这里可以自定义点击事件逻辑，比如页面跳转
          // wx.navigateTo({
          //   url:"messageurl?url=" + url
          // })
          wx.setClipboardData({
            data:url,
            success:function(){
              wx.showToast({
                title:'复制成功！请在浏览器打开链接！',
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
        }
      })
      that.setData({
        showPage: true
      });
      wx.hideLoading();
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
    if (!this.data.knoIfRead) {
    let patientId = wx.getStorageSync('patientid_token')
    request({
      url:knoReadUrl + 'patientId=' + patientId + '&knoId=' + this.data.id + '&value=1'
    }).then(res=>{
      if(res.data.result == 'ok'){
        this.setData({
          knoIfRead:true
        })
        let Pages = getCurrentPages()
        let prevPage = Pages[Pages.length -2]
        let key1 = this.data.mark[0]?'mesArr':'knoArr'
        let key2 = '['+this.data.mark[1]+'].knoIfRead'
        prevPage.setData({
          [key1+key2] : true,
        })
        wx.showToast({
          title:'读完啦~'
        })
      }
    })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})