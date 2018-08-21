// pages/function/tips/cat-tip.js
const tipList = ['您好，根据评测结果，您目前慢性阻塞性肺疾病病情未得到控制，您需要立刻前往门诊就诊控制病情。',
'您好，根据评测结果，您目前慢性阻塞性肺疾病病情控制不佳，您需要联系医生进一步调整治疗方案。',
'您好，根据评测结果，您目前慢性阻塞性肺疾病病情中等，需要继续努力！',
'您好，根据评测结果，您目前慢性阻塞性肺疾病病情良好，请继续保持！']
const colorList = [['#ff5252','#ffcdd2'],
['#ff9100','#ffd180'],
['#ffea00','#ffff8d'],
['#00e676','#b9f6ca']]
const srcList = ['https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/bad.png',
'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/poor.png',
'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/medium.png',
'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/great.png']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: '80',
    index:'3',
    tip: '您好，根据评测结果，您目前慢性阻塞性肺疾病病情良好，请继续保持！',
    colorout:'#b9f6ca',
    colorin:'#00e676',
    imgsrc:'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/great.png'
  },
  onFinish:function(){
    wx.navigateBack({
      delta: 2
    })
  },
  onNaviToPHQ:function(){
    wx.navigateBack({
      delta: 2
    })
    wx.navigateTo({
      url:'../scale/scale-phq/scale-phq'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = parseInt(options.score) / 20 -1
    this.setData({
      score:options.score,
      index:index,
      tip:tipList[index],
      colorout:colorList[index][1],
      colorin:colorList[index][0],
      imgsrc:srcList[index]
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