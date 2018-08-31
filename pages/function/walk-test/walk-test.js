

// pages/function/walk-test/walk-test.js
import { calculateDistance } from '../../../utils/Request'
var util = require('../../../utils/util.js');
/**
 * 步行测试语音播报部分 audioTip测试填写问卷前进行提示 audioTest测试前中后进行提示 并提醒进行测试后问卷填写
 */
//测试时间长度 6 分钟 删除定时间隔
const Time6m = 360000
//audioTip 初始化
var audioTipIndex = 0
const audioTipSrc = ['https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_tip1.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_tip2.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_tip3.mp3']
const audioTip = wx.createInnerAudioContext()
audioTip.src = audioTipSrc[audioTipIndex]
audioTip.volume = 0.8
audioTip.onStop(() => {
  audioTip.destroy()
  console.log('停止播放+销毁')
})
audioTip.onEnded(() => {
  // console.log('播放结束')
  if (audioTipIndex < 2) {
    audioTip.src = audioTipSrc[++audioTipIndex]
    audioTip.play()
  } else {
    audioTip.destroy()
    console.log('销毁')
  }
})
//audioTest 初始化
var audioTestIndex = 0
const audioTestSrc = ['https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_prep.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_prep2.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_1m.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_2m.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_3m.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_4m.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_5m.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_6m.mp3',
  'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/audio_write.mp3']
const audioTest = wx.createInnerAudioContext()
audioTest.src = audioTestSrc[audioTestIndex]
audioTest.volume = 0.8
audioTest.onStop(() => {
  audioTest.destroy()
  console.log('停止播放+销毁')
})
audioTest.onEnded(() => {
  // console.log('播放结束')
  if (audioTestIndex < 1 || audioTestIndex == 7) {
    audioTest.src = audioTestSrc[++audioTestIndex]
    audioTest.play()
  } else if (audioTestIndex < 7) {
    setTimeout(() => {
      audioTest.src = audioTestSrc[++audioTestIndex]
      audioTest.play()
      console.log('audio' + new Date())
    }, 57400)
  } else {
    audioTest.destroy()
    console.log('销毁')
  }
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: [' 测试场所要求：天气适宜，室外平坦、硬质路面，走道长度至少为50米，避免直线往返路线。',
      ' 衣着舒适，试验前避免剧烈运动和暴饮暴食。',
      ' 尽力步行，不可跑跳，坚持不了的时候允许中途休息。',
      ' 无法完成试验可中途终止。',
      ' 胸痛、脸色苍白、呼吸困难、下肢痉挛、走路摇晃、出冷汗情况，不宜进行该测试。'],
    showIndex: 0,
    distance1: 0,
    date1: '',
    // diatance2: 0,
    positonData: [],
    value: 0,
    initLatitude: 0,
    initlongitude: 0
  },

  skipAudio: function () {
    var that = this
    audioTip.stop()
    this.setData({
      showIndex: 1
    })
    setTimeout(() => {
      console.log('audio play start' + new Date())
      audioTest.play()
    }, 500)
    setTimeout(() => {
      wx.getLocation({
        success: function (res) {
          // console.log(res)
          that.setData({
            initLatitude: res.latitude,
            initlongitude: res.longitude
          })
          console.log(new Date())
        },
        fail: function(err) {
          console.log(err)
        }
      })
      this.getLocation_15s()
    }, 9500)
    setTimeout(() => {
      this.drawCirclePro()
    },9500)

  },

  /**
   * 每15s定位一次，并计算与上次定位的距离，更新距离总和
   */
  getLocation_15s: function () {
    var that = this
    var timer = setInterval(function () {
      wx.getLocation({
        success: function (res) {
          let dis1 = calculateDistance(that.data.initLatitude, res.latitude, that.data.initlongitude, res.longitude)
          //判断距离有效性
          if (dis1 < 100) {
            that.setData({
              positonData: that.data.positonData.concat(res),
              distance1: that.data.distance1 + dis1,
              initLatitude: res.latitude,
              initlongitude: res.longitude,
              date1: util.formatTime(new Date()),
              value: dis1
            })
          } else {
            that.setData({
              positonData: that.data.positonData.concat(res),
              date1: util.formatTime(new Date()),
              value: dis1
            })
          }
          console.log(new Date())
        }
      })
    }, 15000)
    setTimeout(() => {
      clearInterval(timer)
    }, Time6m)

  },

  /**
   * 终止测试 停止播报及定位 返回pages/index
   */
  onStopTest:function(){

  },

  /**
   * 圆形进度条相关function 每1s刷新一次进度
   */
  drawCircleArc: function (ctx,time) {
    var startAngle = 1.5 * Math.PI, endAngle = time * 2.0 * Math.PI / 360 + 1.5 * Math.PI;
    var x = 100, y = 100, radius = 95;
    ctx.setStrokeStyle('#33ccff');
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.stroke()
    ctx.draw()   
  },
  drawCircleFull: function () {
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(8);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(100, 100, 95, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  drawCirclePro:function(){
    var ctx = wx.createCanvasContext('canvasArcCir');
    ctx.setFillStyle('white');
    ctx.clearRect(0, 0, 200, 200);
    ctx.draw();
    ctx.setLineWidth(8);
    ctx.setLineCap('round');
    let count = 0
    let draw = setInterval(()=>{
      this.drawCircleArc(ctx,count)
      count++
    },1000)
    setTimeout(() => {
      clearInterval(draw)
    }, Time6m)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.drawCircleFull()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 测试前语音播报开始
    setTimeout(() => {
      audioTip.play()
    }, 500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getLocation_15s()

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