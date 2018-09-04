// pages/mine/mine-collection/collection.js
import { request } from '../../../utils/Request'
const knoUrl = 'https://zjubiomedit.com/copd/message/getKnoListPaging?'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knoArr: [],
    // knoPage: 2,
  },

  // getMoreKno: function (e) {
  //   let patientId = wx.getStorageSync('patientid_token')
  //   let page = this.data.knoPage
  //   request({
  //     url: knoUrl + 'type=1&patientId=' + patientId + '&page_index=' + page + '&items_per_page=10'
  //   }).then(res => {
  //     if (res.data.result.current_item_count <= 0) {
  //       wx.showToast({
  //         title: '到底啦~',
  //         icon: 'none'
  //       })
  //     } else {
  //       let arr = res.data.result.items.map(data => {
  //         return {
  //           knoId: data.knoId,
  //           knoIfFavorite: data.knoIfFavorite,
  //           knoName: data.knoName,
  //           knoTime: data.knoTime.split(" ")[0],
  //           knoIfRead: data.knoIfRead,
  //         }
  //       })
  //       this.setData({
  //         knoArr: this.data.knoArr.concat(arr),
  //         knoPage: page - 1
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载收藏中~'
    })
    setTimeout(()=>{
      wx.hideLoading()
    },3000)
    let patientId = wx.getStorageSync('patientid_token')
    request({
      url: knoUrl + 'type=1&patientId=' + patientId + '&page_index=1&items_per_page=10'
    }).then(res => {
      if (res.data.result.current_item_count <= 0) {
        wx.showToast({
          title: '暂无健康知识收藏',
          icon: 'none'
        })
      } else {
        request({
          url: knoUrl + 'type=1&patientId=' + patientId + '&page_index=1&items_per_page=' + res.data.result.total_items
        }).then(res2 => {
          if (res2.data.result.current_item_count <= 0) {
            wx.showToast({
              title: '暂无健康知识收藏',
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
          }
        })
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