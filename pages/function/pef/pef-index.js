// pages/function/pef/pef-index.js
var util = require('../../../utils/util.js');
import * as echarts from '../../../components/ec-canvas/echarts.min';
import {CommitRequest , evaluateWithPEF , LastRequest , DateRequest} from "../../../utils/Request"
import { iconBaseUrl } from '../../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    dataList: [],
    time: '',
    time1:'',
    pef: "",
    timeImg: iconBaseUrl + 'time.png',
    pefImg: iconBaseUrl + 'PEFinput.png'
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value,
      time1: e.detail.value + ':00'
    })
  },
  bindPEFInput: function (e) {
    this.setData({
      pef: e.detail.value
    })
  },
  pefAdd: function () {
    let time = util.formatDay(new Date()) + ' ' + this.data.time1
    let pef = this.data.pef
    if (!pef) {
      wx.showToast({
        title: ' 请输入PEF数据',
        icon: 'none',
        duration: 1500
      })
      return
    }
    let pefData = {
      id: 0,
      measureTime: time,
      value: pef
    }
    var dataSring = JSON.stringify(pefData);
    // console.log(dataSring)
    var that = this 
    wx.showModal({
      title: '注意',
      content: '提交后无法修改',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          CommitRequest(dataSring, 4).then(res => {
            // console.log(res)
            evaluateWithPEF().then(res => {
              if (res) {
                let evaluation = res
                let ds = JSON.stringify({
                  id: 0,
                  measureTime: time,
                  value: evaluation.score
                })
                // console.log(ds)
                CommitRequest(ds, 7).then(res => {
                  console.log('evaluation update')
                })
              }
            })
            wx.showToast({
              title: '上传成功',
              duration: 1500
            })
            setTimeout(() => {
              that.onLoad()
              that.onShow()
              that.setData({
                pef: ''
              })
            }, 1000)

          })
        } else if (res.cancel) {
          // console.log('取消')
        }
      }
    })

  },

  pefChart: function () {
    wx.navigateTo({
      url: 'pef-charts/pef-charts'
    })
  },
  // 绘图相关
  setOption: function (chart) {
    let standardPEF = wx.getStorageSync('pef_token')
    var dataAxis = [];
    var data = this.data.dataList
    var yMax = Math.max(...data)
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    var option = {
      title: {
        text: 'PEF趋势图',
        padding: [20, 20, 0, 20],
        textStyle: {
          color: '#188df0',
          fontWeight: 'bold',
          fontSize: 20
        },
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {

        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        },
        max: yMax
      },
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: { color: 'rgba(0,0,0,0.05)' }
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            color: '#83bff6'
          },
          markLine: {
            data: [{
              yAxis: standardPEF
            }],
            lineStyle: {
              normal: {
                color: '#ff6600'
              }
            },
            label: {
              position: 'middle'
            }
          },
          data: data
        }
      ]
    };
    chart.setOption(option);
  },
  init: function () {
    this.ecComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(chart);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      this.setData({
        isLoaded: true,
        isDisposed: false
      });
      return chart;
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      time:util.formatTime1(new Date()),
      time1:util.formatTime2(new Date())
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
    var that = this;
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    // 请求最近15次记录,若不足15次请求上个月的数据
    LastRequest(4, 15).then(res => {
      if (!res) {
        DateRequest(4, 2).then(res2 => {
          let dataList = res2.map((item) => {
            return item.value
          })
          that.setData({
            dataList: dataList
          })
          that.init()
        })
      } else {
        let dataList = res.map((item) => {
          return item.value
        })
        that.setData({
          dataList: dataList.reverse()
        })
        that.init()
      }
    }).catch(err => {

    })
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