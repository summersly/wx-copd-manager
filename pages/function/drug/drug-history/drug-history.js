// pages/function/drug/drug-history/drug-history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayscolor:[],
    drugHisData:[]
  },
  dayClick:function(e){
    // console.log(e.detail);
    this.setData({
      dayscolor:[{
        month:'current',
        day:e.detail.day,
        color:'white',
        background:'#33ccff'
      }]
    })
    let dateString = e.detail.year.toString().concat('-',e.detail.month,'-',e.detail.day)
    // console.log(dateString)
    this.drugDateRequest(dateString).then(res => {
      let drugHisList = []
      for (let item of res){
        drugHisList = drugHisList.concat({
          time: item.measureTime.slice(11,16),
          name: item.medicineName
        })
      }
      this.setData({
        drugHisData:drugHisList
      })
    })
  },
  
  dateChange:function(e){
    this.setData({
      dayscolor:[]
    })
  },

  drugDateRequest: function(dateString){
    let patientId = wx.getStorageSync('patientid_token')
    let start = dateString + ' ' + '00:00:01';
    let end = dateString + ' ' + '23:59:59';
    let header = {
        'content-type': 'application/json'
    }
    let url = 'https://zjubiomedit.com/COPDService.svc/GetGenericRecords'
    let method = 'POST'
    let data = {
        "patientId": patientId,
        "start" : start,
        "end": end,
        "recordType" : 5
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            header: header,
            data: data,
            method: method,
            success: (res) => {
                const { statusCode } = res
                if (statusCode > 400 && statusCode < 500) {
                    wx.showToast({
                        title: '端口请求错啦' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                } else if (statusCode > 500) {
                    wx.showToast({
                        title: '服务器请求失败' + statusCode,
                        icon: 'none',
                        duration: 1500
                    })
                }
                if (res.data.flag == 200){
                    resolve(res.data.recordList)
                } else {
                    resolve('')
                }
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误!'
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
                reject(err)
            }
        })
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let day = new Date().getDate()
    // console.log(day)
    this.setData({
      drugHisData:JSON.parse(options.data),
      dayscolor:[{
        month:'current',
        day:day,
        color:'white',
        background:'#33ccff'
      }]
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