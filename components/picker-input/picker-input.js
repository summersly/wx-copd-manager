// components/picker-input/picker-input.js
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
    changeValue: function (e) {
      let detail = {
        key: 'valueIndex',
        value: e.detail.value
      }
      this.triggerEvent('mychange', detail)

    }
  }
})
