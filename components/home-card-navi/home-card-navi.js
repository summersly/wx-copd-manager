// component/home-card-navi/home-card-navi.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoRoute:function(){
      if(this.data.model.route){
        wx.navigateTo({
          url: this.data.model.route,
        })
      }
    }
  }
})
