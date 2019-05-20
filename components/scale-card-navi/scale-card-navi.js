// component/scale-card-navi/scale-card-navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    model:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: '../../image/arrowwhite.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoRoute:function(){
      let that = this
      if (this.data.model.finished){
        wx.showModal({
          content:'您'+this.data.model.memo+'过'+this.data.model.name+',是否继续填写？',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: that.data.model.route,
              })
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })

      } else {
        wx.navigateTo({
          url: that.data.model.route,
        })
      }
    }
  }
})
