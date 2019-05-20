// components/drug-add-modal/drug-add-modal.js
var util = require('../../utils/util.js');
import { iconBaseUrl } from '../../utils/config'
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
    name:'',
    timeImg:iconBaseUrl + 'time.png',
    drugBlueImg: iconBaseUrl + 'drugblue.png',
    angleState: [iconBaseUrl + 'angle-up.png',iconBaseUrl + 'angle-down.png'],
    select: false
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
        name:e.detail.value,
      })
    },
    bindNameFocus:function(e){
      this.setData({
        select: true
      })
    },
    bindNameBlur:function(e){
      this.setData({
        select: false
      })
    },
    mySelect:function(e) {
      let drugName = e.currentTarget.dataset.drugname
      this.setData({
        name: drugName,
        select: false
      })
    },

    onConfirm:function(){
      let drug={
        name: this.data.name || this.data.defaultName,
        time:this.data.time
      }
      // console.log(drug)
      this.triggerEvent('drugAdd',drug)
      this.triggerEvent('hideShowModal')
    }
  }
})
