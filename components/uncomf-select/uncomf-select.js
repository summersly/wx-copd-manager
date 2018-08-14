// components/uncomf-select/uncomf-select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    uncomfSelectData:Object
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
    selectChange: function(e){
      let selectIndex = e.target.dataset.index
      this.triggerEvent('selectChange', selectIndex)
    }
  }
})
