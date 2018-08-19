// pages/function/tips/uncomfort-tip.js
const inflammationTips = ['若前驱有受凉史，可加用金莲清热颗粒、莲花清瘟胶囊、四季抗病毒口服液等抗病毒药物，若合并咳嗽、咳痰，可口服抗生素（患者不过敏的抗生素）。',
'若咳嗽合并咳黄痰，考虑感染，可口服抗⽣生素（患者不过敏的抗生素），若3天后症状⽆改善，可根据症状就诊门/急诊。',
'若出现单纯咳嗽，咽咽部有痒感、异物感，考虑气道高反应，可吸入布地奈德福莫特罗，或口服茶碱类药物、扑尔敏等，若前驱有受凉史，可加用金莲清热颗粒、莲花清瘟胶囊、四季抗病毒口服液等抗病毒药物。',
'请确认是否口服能引起出血的相关药物：如阿司匹林、丹参⽚、硫酸氢氯吡格雷⽚、华法林、低分子肝素等，若有，可暂停药并就诊慢病门诊调整药物治疗；若⽆⼝服上述药物，单纯痰中带血丝，量较少，可暂观察；若痰血较多，且色鲜红，可暂口服云南白药，并就诊门/急诊。']
const lungTip = '建议您吸入短效β-2受体激动剂（特布他林，沙丁胺醇）或联合短效抗胆碱能药物（异丙托溴铵），若症状缓解不明显或持续加重，建议您预约慢病门诊，进一步指导诊治。'
const heartTip = ['最近才开始出现这种症状吗？有没有胃溃疡病、胃食管反流的病史，去消化科看过吗？如果没有我们可以先口服点药，如奥美拉唑，雷贝拉唑，如果能好就可以，好不了我们需要做胃镜检查一下，而且出现返酸症状，建议您吃饭后半小时不要睡觉，少食多餐，少喝咖啡和糖类。',
'腹胀多久了，腹胀与吃饭有没有关系，最近有没有胃病：如胃疼等症状，吃没吃什么药物，最近吃饭好不好，若吃饭不好可以先吃点开胃的药，如果还没有好，我们需要检查一下什么原因，如果其他胃肠道没有问题，那我们这个病也会出现因循环不好胃肠道瘀血腹胀，就需要积极治疗肺上疾病啦。',
'腿肿多⻓时间？以前有无腿肿的病史，除了腿肿其他部位有无水肿，最近有没有病情加重，有没有⾼血压，糖尿病，甲亢，肾脏疾病，若没有那您需要做一下⽣化检查，看蛋白低不低。',
'最近多长时间出现的呢，多久瘦了有多少斤？最近吃饭有没有减少？有没有胃病，最近肺上的病有没有加重，觉得最近除了瘦还有其他症状吗？如果短期内瘦的很明显，还是建议您早点去医院看病。']
const breathTip = '请确认是否口服促进睡眠药物，如扑尔敏、艾司唑仑、安定等，若有可停服，并确认是否存在睡眠颠倒，若无上述情况仍感嗜睡，建议就诊门急诊。'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameList:[],
    tipList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let data = JSON.parse(options.data)
    let nameList = [] ,tipList = []
    let inflammation = parseInt(data.inflammation) 
    let lung = parseInt(data.lung)
    let heart = parseInt(data.heart)
    let breath = parseInt(data.breath)
    if (inflammation & 1) {
      nameList = nameList.concat('发烧')
      tipList = tipList.concat(inflammationTips[0])
    }
    if (inflammation & 2) {
      nameList = nameList.concat('黄痰')
      tipList = tipList.concat(inflammationTips[1])
    }
    if (inflammation & 4) {
      nameList = nameList.concat('咳嗽')
      tipList = tipList.concat(inflammationTips[2])
    }
    if (inflammation & 8) {
      nameList = nameList.concat('血痰')
      tipList = tipList.concat(inflammationTips[3])
    }
    if (lung & 1) {
      nameList = nameList.concat('活动后气短加重')
      tipList = tipList.concat(lungTip)
    }
    if (lung & 2) {
      nameList = nameList.concat('喘息')
      tipList = tipList.concat(lungTip)
    }
    if (lung & 4) {
      nameList = nameList.concat('气短')
      tipList = tipList.concat(lungTip)
    }
    if (heart & 1) {
      nameList = nameList.concat('反酸水')
      tipList = tipList.concat(heartTip[0])
    }
    if (heart & 2) {
      nameList = nameList.concat('腹胀')
      tipList = tipList.concat(heartTip[1])
    }
    if (heart & 4) {
      nameList = nameList.concat('腿肿')
      tipList = tipList.concat(heartTip[2])
    }
    if (heart & 8) {
      nameList = nameList.concat('消瘦')
      tipList = tipList.concat(heartTip[3])
    }
    if (breath & 1) {
      nameList = nameList.concat('嗜睡')
      tipList = tipList.concat(breathTip)
    }
    if (breath & 2) {
      nameList = nameList.concat('迷糊')
      tipList = tipList.concat(breathTip)
    }
    this.setData({
      nameList:nameList,
      tipList:tipList
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