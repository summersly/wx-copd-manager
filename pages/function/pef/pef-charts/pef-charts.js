// pages/function/pef/pef-charts/pef-charts.js
import * as echarts from '../../../../components/ec-canvas/echarts.min';
import chartRequest from "../../../../utils/Request"
// const ctx = wx.createCanvasContext('mychart-bar')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    dataList: [],
    time: []
  },


  // 绘图相关
  setOption: function (chart) {
    let standardPEF = wx.getStorageSync('pef_token')
    var dataAxis = this.data.time
    var data = this.data.dataList
    // var yMax = 600;
    var yMax = Math.max(...data)
    var option = {
      title: {
        text: '近6个月PEF历史记录',
        padding: [0, 20, 0, 20],
        textStyle: {
          color: '#188df0',
          fontWeight: 'bold',
          fontSize: 22
        },
      },
      xAxis: {
        type: 'value',
        position: 'top',
        axisLabel: {
          textStyle: {
            color: '#999'
          },
          rotate: 90
        },
        max: yMax,
        z: 10
      },
      yAxis: {
        type: 'category',
        data: dataAxis,
        axisLabel: {
          rotate: -45,
          textStyle: {
            color: '#999'
          }
        },
        axisTick: {
          show: true
        },

      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: '#83bff6'
          },
          markLine: {
            data: [{
              xAxis: standardPEF //STANDARD PEF VALUES
            }],
            lineStyle: {
              normal: {
                color: '#ff6600',
                width: 2
              },
            },
            label: {
              position: 'start'
            },
            symbol: ['arrow', 'circle']
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
        height: height,
        renderer: 'svg'
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
    this.ecComponent = this.selectComponent('#pefchart-bar');
    // 请求最近3个月记录
    chartRequest.DateRequest(4, 3).then(res => {
      let dataList = [], axis = []
      let resrev = res.reverse()
      resrev.map((item) => {
        dataList = dataList.concat(item.value)
        axis = axis.concat(item.measureTime.slice(5,10))
      })
      that.setData({
        dataList: dataList,
        time: axis
      })
      that.init()
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