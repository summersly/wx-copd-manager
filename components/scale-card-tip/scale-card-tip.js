// components/scale-card-tip/scale-card-tip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    qnum: Number,
    currentIndex: Number
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
    toLastQ:function(){
      this.triggerEvent('lastque')
    },
    toNextQ:function(){
      this.triggerEvent('nextque')
    },
    submitAnswer:function(){
      this.triggerEvent('submitanswer')      
    }
  }
})
