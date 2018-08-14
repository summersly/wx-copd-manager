//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    functionCardData: [
      {
        name: '不适记录',
        icon: '../../image/uncomfort.png',
        route: '../function/uncomfort/uncomfort',
        memo: '11111'
      }, {
        name: '用药记录',
        icon: '../../image/drug.png',
        route: '../function/drug/drug-index',
        memo: '1111'
      }, {
        name: 'PEF监测',
        icon: '../../image/pef.png',
        route: '../function/pef/pef-index',
        memo: '2222'
      }, {
        name: '步行测试',
        icon: '../../image/walk.png',
        route: '../function/drug/drug',
        memo: '2222'
      }
    ]
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
    this.drawCircle(80)
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
})
