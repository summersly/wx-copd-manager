// components/drug-add-modal/drug-add-modal.js
var util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal:Boolean,
    defaultName:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:util.formatTime1(new Date()),
    name:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal:function(){
      this.triggerEvent('hideShowModal')
    },
    bindTimeChange:function(e){
      this.setData({
        time:e.detail.value
      })
    },
    bindNameInput:function(e){
      this.setData({
        name:e.detail.value
      })
    },
    onConfirm:function(){
      let drug={
        name: this.data.name || this.data.defaultName,
        time:this.data.time
      }
      console.log(drug)
      this.triggerEvent('drugAdd',drug)
      this.triggerEvent('hideShowModal')
    }
  }
})
