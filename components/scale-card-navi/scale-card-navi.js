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
      wx.navigateTo({
        url: this.data.model.route,
      })
    }
  }
})
