//index.js
import { evaluateWithPEF, Loadrequest, evaluationStateList, uncomfortString, evaluationTipList, request} from "../../utils/Request"
import { iconBaseUrl, fetchMessageUrl } from '../../utils/config'
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    functionCardData: [
      {
        name: '不适记录',
        icon: iconBaseUrl + 'uncomfort.png',
        route: '../function/uncomfort/uncomfort',
        memo: ''
      }, {
        name: '用药记录',
        icon: iconBaseUrl +'drugblue.png',
        route: '../function/drug/drug-index',
        memo: ''
      }, {
        name: 'PEF监测',
        icon: iconBaseUrl +'pef.png',
        route: '../function/pef/pef-index',
        memo: ''
      }, {
        name: '步行测试',
        icon: iconBaseUrl +'walk.png',
        route: '../function/walk-test/to-app',
        memo: ''
      }
    ],
    messageCardData: {
      name: '留言',
      route: '../function/message/message',
    },
    evaluationScore: 0,
    evaluationState: '未测评',
    evaluationTip: '请填写CAT量表，并进行峰流速记录',
    scaleFinish: [0, 0, 0],
    scaleImg:iconBaseUrl + 'scale.png',
    messageUnreadNum:0,
  },
  //事件处理函数
  drawCircle: function (score) {
    var startAngle = 1.5 * Math.PI, endAngle = score * 2.0 * Math.PI / 100 + 1.5 * Math.PI;
    var ctx = wx.createCanvasContext('canvasArcCir');
    ctx.setFillStyle('white');
    ctx.clearRect(0, 0, 100, 100);
    ctx.draw();
    var x = 50, y = 50, radius = 45;
    ctx.setLineWidth(6);
    ctx.setStrokeStyle('#33ccff');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.stroke()
    ctx.draw()

  },
  onLoad: function () {
    let patientId = wx.getStorageSync('patientid_token')
    request({
      url: fetchMessageUrl,
      method: "POST",
      data: {
        patientId: patientId,
        messageNum: 50
      }
    }).then(res => {
      let messageList=res.data.recordList
      let unreadCount=0
      for(let messageItem of messageList){
        if(messageItem.messageFrom==1 && messageItem.mark==0){
          unreadCount++
        }
      }
      this.setData({
        messageUnreadNum:unreadCount
      })
    })
    
    evaluateWithPEF().then(res => {
      if(res){
        wx.setStorageSync('pef_token', res.standardPEF.toFixed(0))
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //  创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(50, 50, 45, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  onShow: function () {
    var that = this
    Loadrequest().then((res) => {
      console.log(res)
      let count = [(res[0].length > 0 ? 1 : 0), (res[1].length > 0 ? 1 : 0), (res[2].length > 0 ? 1 : 0)]
      that.setData({
        scaleFinish: count,
      })
      if (res[5][0]){
        let memo = uncomfortString(res[5][0]).slice(0, -1)
        that.setData({
          'functionCardData[0].memo': '上次记录:' + memo
        })
      }
      if (res[6][0]) {
        this.drawCircle(res[6][0].value)
        that.setData({
          evaluationScore: res[6][0].value,
          evaluationState: evaluationStateList[res[6][0].value / 20],
          evaluationTip: evaluationTipList[[res[6][0].value / 20]]
        })
      }
      if (res[4][0]) {
        that.setData({
          'functionCardData[1].memo': '上次记录:' + res[4][0].medicineName
        })
      }
      if (res[3][0]) {
        that.setData({
          'functionCardData[2].memo': '上次记录:' + res[3][0].value + ' L/Min',
        })
      }
    })
  },
  gotoMessage: function () {
    wx.navigateTo({
      url: this.data.messageCardData.route,
    })
    this.setData({
      messageUnreadNum:0
    })
  },
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
