// pages/function/drug/drug-add/drug-add.js
import {CommitRequest} from "../../../../utils/Request"
var util = require('../../../../utils/util.js');
import { iconBaseUrl } from '../../../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drugList: [
      {
        name: '舒利迭',
        memo: '沙美特罗替卡松粉吸入剂',
        route: iconBaseUrl + 'pic_sldie.png'
      }, {
        name: '噻托溴铵粉吸入剂',
        memo: '',
        route: iconBaseUrl + 'pic_stxaf.png'
      }, {
        name: '信必可都保',
        memo: '布地奈德福莫特罗粉吸入剂',
        route: iconBaseUrl + 'pic_xbkdb.png'
      }, {
        name: '舒瑞灵',
        memo: '沙丁胺醇气雾剂',
        route: iconBaseUrl + 'pic_srl.png'
      }, {
        name: '氨茶碱片',
        memo: '',
        route: iconBaseUrl + 'pic_acjp.png'
      }, {
        name: '欧乐欣',
        memo: '乌美溴铵维兰特罗吸入粉雾剂',
        route: iconBaseUrl + 'pic_olx.png'
      }, {
        name: '思合华能倍乐',
        memo: '噻托溴铵奥达特罗吸入喷雾剂',
        route: iconBaseUrl + 'pic_shhnbl.png'
      }, {
        name: '自定义药物',
        memo: '请在这里添加自定义药物',
        route: iconBaseUrl + 'pic_amidi.png'
      }
    ],
    showModal: false,
    nameIndex: 0,
    drugNameList: ['舒利迭', '噻托溴铵粉吸入剂', '信必可都保', '舒瑞灵', '氨茶碱片', '欧乐欣', '思合华能倍乐', ''],
    drugBlueImg: iconBaseUrl + 'drugblue.png'
  },
  showM: function (e) {
    this.setData({
      nameIndex: e.target.dataset.index,
      showModal: true
    })
  },
  hideM: function () {
    this.setData({
      showModal: false
    })
  },
  onDrugAdd: function (e) {
    console.log(e)
    let time = util.formatDay(new Date()) + ' ' + e.detail.time + ':00'
    let name = e.detail.name 
    if (!name){
      wx.showToast({
        title:'请输入药名',
        icon:'none',
        duration:1500
      })
      return
    }
    let drugData = {
      id: 0,
      medicineName: name,
      measureTime: time,
    }
    var dataSring = JSON.stringify(drugData);
    console.log(dataSring)
    CommitRequest(dataSring, 5).then(res => {
      // console.log(res)
      wx.showToast({
        title:'上传成功',
        duration:1500
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1300)

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