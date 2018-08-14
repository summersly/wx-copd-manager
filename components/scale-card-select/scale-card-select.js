// components/scale-card-select/scale-card-select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectOptionData: Object
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
    radioCheckedChange:function(e){
      let index = e.detail.value
      this.triggerEvent('selectChange', index)
    }
  }
})
