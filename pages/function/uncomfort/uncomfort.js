// pages/function/uncomfort/uncomfort.js
import { CommitRequest } from "../../../utils/Request"
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: {
      name: "今日症状",
      options: ["正常", "不适"],
      defaultIndex: 0
    },
    uncomfData: [{
      name: "主要症状",
      options: ["喘息", "发热", "咳痰"],
      defaultIndex: [0, 0, 0],
      display: 1
    }, {
      name: "痰色",
      options: ["黄色", "白色"],
      defaultIndex: [0, 0],
      display: 0
    }, {
      name: "每日痰量",
      options: ["少于3口", "3～5口", "6～10口", "大于10口"],
      defaultIndex: [0, 0, 0, 0],
      display: 0
    }, {
      name: "次要症状",
      options: ["咳嗽", "腿肿", "腹胀", "食欲不振"],
      defaultIndex: [0, 0, 0, 0],
      display: 1
    }],
    userDefinedText: "其它症状",
    userDefinedContent: "",
    symptom: ""
  },
  stateRadioChange: function (e) {
    this.setData({
      'state.defaultIndex': e.detail.value
    })
  },
  selectRecord: function (e) {
    var type = e.target.dataset.type
    let key = 'uncomfData[' + type + '].defaultIndex[' + e.detail + ']'
    let value = this.data.uncomfData[type].defaultIndex[e.detail] ? 0 : 1
    let defIndex = 'uncomfData[' + type + '].defaultIndex'
    let detail = e.detail
    console.log(type)
    if (type == 1) {
      this.setData({
        [defIndex]: [0, 0]
      })
    }
    else if (type == 2) {
      this.setData({
        [defIndex]: [0, 0, 0, 0]
      })
    }
    this.setData({
      [key]: value,
    })
    if (this.data.uncomfData[type].options[detail] == "咳痰") {
      this.setData({
        "uncomfData[1].display": value,
        "uncomfData[2].display": value
      })
    }
  },
  userDefinedInput: function (e) {
    this.setData({
      userDefinedContent: e.detail.value,
    })
  },

  stats: function(){
    let symptom = ''
    if(this.data.state.defaultIndex == '0'){
      symptom = ''
    }
    else{
      if(this.data.uncomfData[0].defaultIndex[0] == 1)
        symptom = symptom + '喘息,'
      if (this.data.uncomfData[0].defaultIndex[1] == 1)
        symptom = symptom + '发热,'
      if (this.data.uncomfData[0].defaultIndex[2] == 1){
        if (this.data.uncomfData[1].defaultIndex[0] == 1)
          symptom = symptom + '黄痰'
        if (this.data.uncomfData[1].defaultIndex[1] == 1)
          symptom = symptom + '白痰'
        if (this.data.uncomfData[2].defaultIndex[0] == 1)
          symptom = symptom + '少于3口,'
        if (this.data.uncomfData[2].defaultIndex[1] == 1)
          symptom = symptom + '3～5口,'
        if (this.data.uncomfData[2].defaultIndex[2] == 1)
          symptom = symptom + '6～10口,'
        if (this.data.uncomfData[2].defaultIndex[3] == 1)
          symptom = symptom + '大于10口,'
      }
      if (this.data.uncomfData[3].defaultIndex[0] == 1)
        symptom = symptom + '咳嗽,'
      if (this.data.uncomfData[3].defaultIndex[1] == 1)
        symptom = symptom + '腿肿,'
      if (this.data.uncomfData[3].defaultIndex[2] == 1)
        symptom = symptom + '腹胀,'
      if (this.data.uncomfData[3].defaultIndex[3] == 1)
        symptom = symptom + '食欲不振,'
      if (this.data.userDefinedContent!='')
        symptom = symptom + this.data.userDefinedContent + ','
      symptom = symptom.slice(0, -1)
    }
    this.setData({
      symptom: symptom
    })
  },
  
  submitRecord: function () {
    this.stats()
    let that = this
    let measureTime = util.formatTime(new Date())
    let isDiscomfort = this.data.state.defaultIndex
    //console.log(that)
    //console.log(measureTime)
    if (that.data.state.defaultIndex == '1' && that.data.uncomfData[0].defaultIndex.toString() == '0,0,0' && that.data.uncomfData[3].defaultIndex.toString() == '0,0,0,0' && that.data.userDefinedContent == '') {
      wx.showToast({
        title: '尚未输入任何不适情况',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (that.data.uncomfData[0].defaultIndex[2] == 1 && (that.data.uncomfData[1].defaultIndex.toString() == '0,0' || that.data.uncomfData[2].defaultIndex.toString() == '0,0,0,0')){
      wx.showToast({
        title: '尚未输入咳痰具体信息',
        icon: 'none',
        duration: 1500
      })
      return
    }
    let modalContent = this.data.symptom == ''?'正常':this.data.symptom
    let dataString = "{\"measureTime\":\"" + measureTime + "\",\"isDiscomfort\":\"" + isDiscomfort + "\",\"symptom\":\"" + this.data.symptom + "\"}"    
    wx.showModal({
      title: '提交后无法修改',
      content: '本次记录：' + modalContent,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          CommitRequest(dataString, 8).then(res => {
            wx.showToast({
              title: '上传成功',
              duration: 1500
            })
            setTimeout(() => {
                wx.navigateBack()
            }, 1300)
          })
        } else if (res.cancel) {

        }
      }
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