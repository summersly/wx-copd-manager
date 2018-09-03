// pages/class/class.js
import { request } from '../../utils/Request'
const videoBaseUrl = 'https://zjubiomedit.com/health-knowledge/GetCOPDVideoInfo.jsp?'
const knoUrl = 'https://zjubiomedit.com/copd/message/getKnoListPaging?'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarData: {
      navbarWidth: 25,
      tabs: ['专家讲堂', '用药教程', '健康知识', '推送消息']
    },
    proVideo: [],
    medVideo: [],
    knoArr: [],
    mesArr: [],
    knoPage: 2,
    mesPage: 2,
    dislike:'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/like_dis.png',
    like:'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/like.png'
  },

  getMoreKno: function (e) {
    let patientId = wx.getStorageSync('patientid_token')
    if (e.detail.index == 2) {
      let page = this.data.knoPage
      request({
        url: knoUrl + 'type=1&patientId=' + patientId + '&page_index=' + page + '&items_per_page=10'
      }).then(res => {
        if (res.data.result.current_item_count <= 0) {
          wx.showToast({
            title: '到底啦~',
            icon: 'none'
          })
        } else {
          let arr = res.data.result.items.map(data => {
            return {
              knoId: data.knoId,
              knoIfFavorite: data.knoIfFavorite,
              knoName: data.knoName,
              knoTime: data.knoTime.split(" ")[0],
              knoIfRead: data.knoIfRead,
            }
          })
          this.setData({
            knoArr: this.data.knoArr.concat(arr),
            knoPage: page + 1
          })
        }
      })
    } else if (e.detail.index == 3) {
      let page = this.data.mesPage
      request({
        url: knoUrl + 'type=0&patientId=' + patientId + '&page_index=' + page + '&items_per_page=10'
      }).then(res => {
        if (res.data.result.current_item_count <= 0) {
          wx.showToast({
            title: '到底啦~',
            icon: 'none'
          })
        } else {
          let arr = res.data.result.items.map(data => {
            return {
              knoId: data.knoId,
              knoIfFavorite: data.knoIfFavorite,
              knoName: data.knoName,
              knoTime: data.knoTime.split(" ")[0],
              knoIfRead: data.knoIfRead,
            }
          })
          this.setData({
            mesArr: this.data.mesArr.concat(arr),
            mesPage: page + 1
          })
          // console.log(this.data.mesArr)
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: videoBaseUrl + 'videoType=1'
    }).then(res => {
      // console.log(res.data)
      if (!res.data) {
        wx.showToast({
          title: '专家讲堂视频获取失败',
          icon: 'none'
        })
      } else {
        this.setData({
          proVideo: res.data.result.video
        })
      }
    })
    request({
      url: videoBaseUrl + 'videoType=0'
    }).then(res => {
      // console.log(res.data)
      if (!res.data) {
        wx.showToast({
          title: '用药教程视频获取失败',
          icon: 'none'
        })
      } else {
        this.setData({
          medVideo: res.data.result.video
        })
      }
    })
    let patientId = wx.getStorageSync('patientid_token')
    request({
      url: knoUrl + 'type=0&patientId=' + patientId + '&page_index=1&items_per_page=10'
    }).then(res => {
      // console.log(res.data)
      if (res.data.result.current_item_count <= 0) {
        wx.showToast({
          title: '暂无消息推送',
          icon: 'none'
        })
      } else {
        let arr = res.data.result.items.map(data => {
          return {
            knoId: data.knoId,
            knoIfFavorite: data.knoIfFavorite,
            knoName: data.knoName,
            knoTime: data.knoTime.split(" ")[0],
            knoIfRead: data.knoIfRead,
          }
        })
        this.setData({
          mesArr: arr
        })
        // console.log(this.data.mesArr)
      }
    })
    request({
      url: knoUrl + 'type=1&patientId=' + patientId + '&page_index=1&items_per_page=10'
    }).then(res => {
      // console.log(res.data)
      if (res.data.result.current_item_count <= 0) {
        wx.showToast({
          title: '暂无健康知识推荐',
          icon: 'none'
        })
      } else {
        let arr = res.data.result.items.map(data => {
          return {
            knoId: data.knoId,
            knoIfFavorite: data.knoIfFavorite,
            knoName: data.knoName,
            knoTime: data.knoTime.split(" ")[0],
            knoIfRead: data.knoIfRead,
          }
        })
        this.setData({
          knoArr: arr
        })
        // console.log(this.data.knoArr)
      }
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