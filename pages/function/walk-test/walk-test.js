

// pages/function/walk-test/walk-test.js
import { calculateDistance } from '../../../utils/Request'
var util = require('../../../utils/util.js');
import { audioBaseUrl , iconBaseUrl } from '../../../utils/config'
/**
 * 步行测试语音播报部分 audioTip测试填写问卷前进行提示 audioTest测试前中后进行提示 并提醒进行测试后问卷填写
 */
//测试时间长度 6 分钟 删除定时间隔
const Time6m = 360000
//audioTip 初始化
var audioTipIndex = 0
const audioTipSrc = [audioBaseUrl + 'audio_tip1.mp3',
audioBaseUrl + 'audio_tip2.mp3',
audioBaseUrl + 'audio_tip3.mp3']
const audioTip = wx.createInnerAudioContext()
audioTip.src = audioTipSrc[audioTipIndex]
audioTip.volume = 0.8
audioTip.onStop(() => {
  // audioTip.destroy()
  console.log('停止播放')
  audioTipIndex = 0
  audioTip.src = audioTipSrc[audioTipIndex]
})
audioTip.onEnded(() => {
  // console.log('播放结束')
  if (audioTipIndex < 2) {
    audioTip.src = audioTipSrc[++audioTipIndex]
    audioTip.play()
  } else {
    // audioTip.destroy()
    console.log('结束播放')
    audioTipIndex = 0
    audioTip.src = audioTipSrc[audioTipIndex]
  }
})
//audioTest 初始化
var set
var audioTestIndex = 0
const audioTestSrc = [audioBaseUrl + 'audio_prep.mp3',
audioBaseUrl + 'audio_prep2.mp3',
audioBaseUrl + 'audio_1m.mp3',
audioBaseUrl + 'audio_2m.mp3',
audioBaseUrl + 'audio_3m.mp3',
audioBaseUrl + 'audio_4m.mp3',
audioBaseUrl + 'audio_5m.mp3',
audioBaseUrl + 'audio_6m.mp3',
audioBaseUrl + 'audio_write.mp3']
const audioTest = wx.createInnerAudioContext()
audioTest.src = audioTestSrc[audioTestIndex]
audioTest.volume = 0.8
audioTest.onStop(() => {
  // audioTest.destroy()
  console.log('停止播放')
  audioTestIndex = 0
  audioTest.src = audioTestSrc[audioTestIndex]
})
audioTest.onEnded(() => {
  // console.log('播放结束')
  if (audioTestIndex < 1 || audioTestIndex == 7) {
    audioTest.src = audioTestSrc[++audioTestIndex]
    audioTest.play()
  } else if (audioTestIndex < 7) {
      set = setTimeout(() => {
      audioTest.src = audioTestSrc[++audioTestIndex]
      audioTest.play()
      console.log('audio' + new Date())
    }, 57400)
  } else {
    // audioTest.destroy()
    console.log('结束' + new Date())
    audioTestIndex = 0
    audioTest.src = audioTestSrc[audioTestIndex]
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
    diatance2: 0,
    positonData: [],
    value: 0,
    initLatitude: 0,
    initlongitude: 0,
    //scale data
    questionData: [{
      qName: "1.请选择您的呼吸困难级别。",
      optionNames: ["正常", "非常非常轻微", "非常轻微", "轻微(轻度)", "中度", "有些严重", "严重1级(重度)", "严重2级", "非常严重1级", "非常严重2级", "非常严重3级", "非常非常严重"],
      defaultIndex: '',
    }, {
      qName: "2.请选择您的疲劳困难级别。",
      optionNames: ["正常", "非常非常轻微", "非常轻微", "轻微(轻度)", "中度", "有些严重", "严重1级(重度)", "严重2级", "非常严重1级", "非常严重2级", "非常严重3级", "非常非常严重"],
      defaultIndex: '',
    }],
    brogAnswerIndexBefore: ['', ''],
    brogAnswerIndexAfter: ['', ''],
    currentIndex: 0,
    walkImg:iconBaseUrl + 'walk-circle.png'
  },

  /**
   * brog问卷相关 测试前 后填写
   */
  qselectChangeBefore: function (e) {
    let defaultIndex = 'questionData[' + e.target.dataset.index + '].defaultIndex'
    let answer = 'brogAnswerIndexBefore[' + e.target.dataset.index + ']'
    if (this.data.currentIndex == 0) {
      this.setData({
        [defaultIndex]: parseInt(e.detail),
        [answer]: parseInt(e.detail),
        currentIndex: 1
      })

    } else {
      this.setData({
        [defaultIndex]: parseInt(e.detail),
        showIndex: 1,
        [answer]: parseInt(e.detail),
        currentIndex: 0
      })
      this.TestControl()
    }
  },
  qselectChangeAfter: function (e) {
    var that = this
    let defaultIndex = 'questionData[' + e.target.dataset.index + '].defaultIndex'
    let answer = 'brogAnswerIndexAfter[' + e.target.dataset.index + ']'
    if (this.data.currentIndex == 0) {
      this.setData({
        [defaultIndex]: parseInt(e.detail),
        [answer]: parseInt(e.detail),
        currentIndex: 1
      })

    } else {
      this.setData({
        [defaultIndex]: parseInt(e.detail),
        [answer]: parseInt(e.detail),
      })
      // 问卷结束后 上传数据
      wx.showModal({
        title: '测试结果',
        content: '步行距离：' + this.data.distance1 + '米',
        showCancel: true,
        confirmText: '确认上传',
        cancelText: '重新测试',
        success: function (res) {
          if (res.confirm) {
            console.log('检查问卷填写情况，上传数据')
            that.onStopTest()
          } else if (res.cancel) {
            that.onStopTest()
            wx.navigateTo({
              url:'walk-test'
            })
          }
        }
      })
    }
  },
  swiperChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  /**
   * 跳过语音提示，直接进入测试阶段，开始测试前量表填写
   */
  skipAudio: function () {
    // 进入brog量表
    var that = this
    audioTip.stop()
    this.setData({
      showIndex: 2
    })
  },
  /**
   * 步行测试控制方法 语音提示 同时获取定位 刷新时间进度条
   */
  TestControl: function () {
    //语音控制
    var that = this
    this.audioset = setTimeout(() => {
      console.log('audio play start' + new Date())
      audioTest.play()
    }, 500)
    //定位控制
    this.locationset = setTimeout(() => {
      wx.getLocation({
        success: function (res) {
          // console.log(res)
          that.setData({
            initLatitude: res.latitude,
            initlongitude: res.longitude
          })
          console.log(util.formatTime(new Date()))
        },
        fail: function (err) {
          console.log(err)
        }
      })
      this.getLocation_15s()
    }, 9500)
    //时间进度条控制
    this.timeset = setTimeout(() => {
      this.drawCirclePro()
    }, 9500)
    //结束控制
    this.endset = setTimeout(() => {
      // 进入测试后问卷前清除记录
      this.setData({
        'questionData[0].defaultIndex': '',
        'questionData[1].defaultIndex': '',
        showIndex: 3
      })
    }, 380500)
  },
  /**
   * 每15s定位一次，并计算与上次定位的距离，更新距离总和
   */
  getLocation_15s: function () {
    var that = this
    this.timer = setInterval(function () {
      wx.getLocation({
        success: function (res) {
          let dis1 = calculateDistance(that.data.initLatitude, res.latitude, that.data.initlongitude, res.longitude)
          //判断距离有效性
          console.log(res)
          let distance1 = dis1 < 100 ? that.data.distance1 + dis1 : that.data.distance1
          that.setData({
            positonData: that.data.positonData.concat(res),
            distance1: distance1,
            distance2: distance1.toFixed(0),
            initLatitude: res.latitude,
            initlongitude: res.longitude,
            date1: util.formatTime(new Date()),
            value: dis1
          })
          console.log(dis1 + util.formatTime(new Date()))
        }
      })
    }, 15000)
    setTimeout(() => {
      clearInterval(this.timer)
    }, Time6m)

  },

  /**
   * 终止测试 停止播报及定位 返回pages/index
   */
  onStopTest: function () {
    audioTest.stop()
    clearInterval(this.timer)
    clearInterval(this.draw)
    clearTimeout(set)
    clearTimeout(this.audioset)
    clearTimeout(this.locationset)
    clearTimeout(this.timeset)
    clearTimeout(this.endset)
    wx.navigateBack()
  },

  /**
   * 圆形进度条相关function 每1s刷新一次进度
   */
  drawCircleArc: function (ctx, time) {
    var startAngle = 1.5 * Math.PI, endAngle = time * 2.0 * Math.PI / 360 + 1.5 * Math.PI;
    var x = 100, y = 100, radius = 95;
    ctx.setStrokeStyle('#33ccff');
    ctx.setLineWidth(4);
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
  drawCirclePro: function () {
    var ctx = wx.createCanvasContext('canvasArcCir');
    ctx.setFillStyle('white');
    ctx.clearRect(0, 0, 200, 200);
    ctx.draw();
    ctx.setLineCap('round');
    let count = 0
    this.draw = setInterval(() => {
      this.drawCircleArc(ctx, count)
      count = count + 2
    }, 2000)
    setTimeout(() => {
      clearInterval(this.draw)
    }, Time6m)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // let param = {
    //   src:'',
    //   prod:'miniprogram',
    //   ver:'',
    //   ak: 'FI81wHPlkGUAzITLMZPFNGDzEX1ElAin',
    //   trace:false
    // };
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 测试前语音播报开始
    setTimeout(() => {
      this.drawCircleFull()
      audioTip.play()
    }, 500)
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
    //退出页面 强制停止定位 语音 等
    audioTip.stop()
    audioTest.stop()
    clearInterval(this.timer)
    clearInterval(this.draw)
    clearTimeout(set)
    clearTimeout(this.audioset)
    clearTimeout(this.locationset)
    clearTimeout(this.timeset)
    clearTimeout(this.endset)
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