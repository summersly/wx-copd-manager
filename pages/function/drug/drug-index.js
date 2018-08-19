// pages/function/drug/drug-index.js
import drugRequest from "../../../utils/Request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drugHisData:[{
      name:"111",
      time:"11:11"
    }]
  },
  addNew:function(){
    wx.navigateTo({
      url:"drug-add/drug-add"
    })
  },
  reviewHistory:function(){
    let data = JSON.stringify(this.data.drugHisData)
    wx.navigateTo({
      url:"drug-history/drug-history?data=" + data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    drugRequest.DateRequest(5,0).then(res => {
      // console.log(res)
      let drugHisList = []
      for (let item of res){
        drugHisList = drugHisList.concat({
          time: item.measureTime.slice(11,16),
          name: item.medicineName
        })
      }
      // console.log(drugHisList)
      this.setData({
        drugHisData:drugHisList
      })
    }).catch((err) => {

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