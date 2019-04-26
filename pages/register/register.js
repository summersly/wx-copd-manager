// pages/register/register.js
const educationArr = ["小学", "初中", "中专", "高中", "大专", "本科", "硕士", "博士"]
const professionArr = ["工人", "农民", "科技", "行政", "教师", "金融", "商业", "医疗", "学生", "军人", "家务", "个体", "其他"]
const sexArr = ["男", "女"]
const smokeArr = ['否', '是']
import {validateRequest,personInfoVali,registWithInfo,request} from '../../utils/Request'
import { knoNewUserUrl , provinceUrl , hospitalUrl , doctorUrl } from '../../utils/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 核验信息
    patientId: {
      name: '病历号',
      value: '',
      type: 'text',
      unit: '',
      placeholder: '请输入病历号'
    },
    patientName: {
      name: '姓名',
      value: '',
      type: 'text',
      unit: '',
      placeholder: '请输入姓名'
    },
    // 个人信息
    sex: {
      label: '性别',
      radioList: ['男', '女'],
      index: 0
    },
    identityCardNumber: {
      name: '身份证号',
      value: '',
      type: 'idcard',
      unit: '',
      placeholder: '请输入身份证号码'
    },
    phoneNumber: {
      name: '手机号',
      value: '',
      type: 'number',
      unit: '',
      placeholder: '请输入手机号'
    },

    password: {
      name: '密码',
      value: '',
      type: 'text',
      unit: '',
      placeholder: '密码可为空'
    },
    passwordCheck: {
      name: '确认密码',
      value: '',
      type: 'text',
      unit: '',
      placeholder: '若有密码请输入'
    },
    // 辅助信息
    height: {
      name: '身高',
      value: '',
      type: 'digit',
      unit: 'cm',
      placeholder: '注意身高单位'
    },
    weight: {
      name: '体重',
      value: '',
      type: 'digit',
      unit: 'Kg',
      placeholder: '注意体重单位'
    },
    smoke: {
      label: '是否吸烟',
      radioList: ['否', '是'],
      index: 0
    },    
    birthDate: {
      name: '出生日期',
      value: '',
      mode:'date'
    },
    education: {
      name: '学历',
      mode: 'selector',
      value: '',
      range: educationArr
    },
    profession: {
      name: '职业',
      mode: 'selector',
      value: '',
      range: professionArr
    },
    address: {
      name: '家庭住址',
      mode: 'region',
      value: '',
      valueArr:['宁夏回族自治区','银川市','兴庆区']
    },
    province: {
      name: '省份',
      mode: 'selector',
      value: '',
      range: []
    },
    hospital: {
      name: '医院',
      mode: 'selector',
      value: '',
      range: []
    },
    doctor: {
      name: '管理师',
      mode: 'selector',
      value: '',
      range: []
    },
    // 页面
    currentIndex: 0,
    provinceArr : [],
    hospitalArr : [],
    doctorArr : []
  },

  // 数据绑定函数
  changePatientID: function (e) {
    this.setData({
      'patientId.value': e.detail.value
    })
  },
  changePatientName: function (e) {
    this.setData({
      'patientName.value': e.detail.value
    })
  },
  changeSexSelect: function (e) {
    this.setData({
      'sex.index': e.detail
    })
  },
  changeIdentityCardNumber: function (e) {
    this.setData({
      'identityCardNumber.value': e.detail.value
    })
  },
  changePhoneNumber: function (e) {
    this.setData({
      'phoneNumber.value': e.detail.value
    })
  },
  changePassword: function (e) {
    this.setData({
      'password.value': e.detail.value
    })
  },
  changePasswordCheck: function (e) {
    this.setData({
      'passwordCheck.value': e.detail.value
    })
  },
  changeHeight: function (e) {
    this.setData({
      'height.value': e.detail.value
    })
  },
  changeWeight: function (e) {
    this.setData({
      'weight.value': e.detail.value
    })
  },
  changebirthDate: function (e) {
    this.setData({
      'birthDate.value': e.detail.value
    })
  },
  changeSmokeSelect: function (e) {
    this.setData({
      'smoke.index': e.detail
    })
  },
  changeEducation: function (e) {
    this.setData({
      'education.value': educationArr[e.detail.value]
    })
  },
  changeProfession: function (e) {
    this.setData({
      'profession.value': professionArr[e.detail.value]
    })
  },
  changeAddressPicker: function (e) {
    this.setData({
      'address.value': e.detail.value.join(','),
      'address.valueArr':e.detail.value
    })
  },
  changeAddressInput: function (e) {
    this.setData({
      'address.value': e.detail.value
    })
  },
  changeProvince: function (e) {
    this.setData({
      'province.value': this.data.provinceArr[e.detail.value],
      'hospital.value':'',
      'doctor.value':''
    })
    request({
      url:hospitalUrl,
      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },
      method:'POST',
      data:{
        province:this.data.province.value.provinceCode
      }
    }).then(res=>{
      this.setData({
        'hospital.range':res.data,
        hospitalArr:res.data
      })
    })
  },
  changeHospital: function (e) {
    this.setData({
      'hospital.value': this.data.hospitalArr[e.detail.value],
      'doctor.value':''
    })
    request({
      url:doctorUrl,
      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },
      method:'POST',
      data:{
        hospitalCode:this.data.hospital.value.hospitalCode
      }
    }).then(res=>{
      this.setData({
        'doctor.range':res.data,
        doctorArr:res.data
      })
    })
  },
  changeDoctor: function (e) {
    this.setData({
      'doctor.value': this.data.doctorArr[e.detail.value]
    })
  },
  /**
   * 数据处理函数
   */
  validate: function () {
    let patientId = this.data.patientId.value
    let patientName = this.data.patientName.value
    let toast = ''
    if (!patientId) {
      toast = toast.concat('病历号，')
    }
    if (!patientName) {
      toast = toast.concat('姓名，')
    }
    if (toast) {
      wx.showToast({
        title: '请输入' + toast.slice(0,-1),
        icon: 'none',
        duration: 1500
      })
      return
    }
    validateRequest(patientId, patientName).then((res) => {
      console.log(res)
      this.setData({
        currentIndex: 1
      })
    })
  },
  personInfoValidate:function(){
    // console.log()
    let id = this.data.identityCardNumber.value
    let phone = this.data.phoneNumber.value
    let toast = ''
    //各项数据 除了密码 是否填写
    if (!id){
      toast = toast.concat('身份证号，')
    }
    if (!phone){
      toast = toast.concat('手机号，')
    }
    if (toast){
      wx.showToast({
        title: '请输入' + toast.slice(0,-1),
        icon: 'none',
        duration: 1500
      })
      return
    }
    //身份证检验 自动生成生日
    //手机号检验 
    personInfoVali(id,phone).then(res => {
      console.log(res)
      this.setData({
        'birthDate.value':res
      })
      //若有密码，检查两次是否一致
      let pw = this.data.password.value
      if(pw){
        if (pw !== this.data.passwordCheck.value){
          wx.showToast({
            title:'两次密码输入不一致',
            icon:'none'
          })
          return 
        }
      }
      this.setData({
        currentIndex:2
      })
    }).catch(err => {})
  },
  managerInfoValidate:function(){
    let height = this.data.height.value
    let weight = this.data.weight.value
    let birthDate = this.data.birthDate.value
    let edu = this.data.education.value
    let pro = this.data.profession.value
    let add = this.data.address.value
    let doctor = this.data.doctor.value
    let toast = ''
    //各项数据 除了密码 是否填写
    if (!height){
      toast = toast.concat('身高，')
    }
    if (!weight){
      toast = toast.concat('体重，')
    }
    if (!birthDate){
      toast = toast.concat('出生日期，')
    }
    if (!edu){
      toast = toast.concat('学历，')
    }
    if (!pro){
      toast = toast.concat('职业，')
    }
    if (!add){
      toast = toast.concat('家庭住址，')
    }
    if (!doctor){
      toast = toast.concat('管理')
    }
    if (toast){
      wx.showToast({
        title: '请输入' + toast.slice(0,-1),
        icon: 'none',
        duration: 1500
      })
      return
    }
    //全部填写 注册
    let patientId = this.data.patientId.value
    let info = {
      patientId:patientId,
      patientName:this.data.patientName.value,
      identityCardNumber:this.data.identityCardNumber.value,
      birthDate:birthDate,
      sex:sexArr[this.data.sex.index],
      height:height,
      weight:weight,
      education:edu,
      profession:pro,
      phoneNumber:this.data.phoneNumber.value,
      address:add,
      smoke:this.data.smoke.index?true:false,
      password:this.data.password.value,
      doctor:doctor.userId
    }
    var dataSring = JSON.stringify(info);
    console.log(dataSring)
    registWithInfo(patientId,dataSring).then(res => {
      this.setData({
        currentIndex:3
      })
      request({
        url: knoNewUserUrl + patientId
      }).then(res=>{
        // if(res.data.result != "ok"){
        //   wx.showToast({
        //     title: '暂无新知识推荐',
        //     icon: 'none'
        //   })
        // }
      })
      wx.showLoading({
        title:'立刻登陆吧'
      })
      setTimeout(() => {
        wx.navigateBack()
    }, 2000)
    })
  },
  returnBack:function(){
    this.setData({
      currentIndex: this.data.currentIndex-1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    request({
      url:provinceUrl,
      header:{
        'content-type': 'application/x-www-form-urlencoded',
      },
      method:'POST'
    }).then(res=>{
      console.log(res)
      that.setData({
        'province.range':res.data,
        provinceArr:res.data
      })
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