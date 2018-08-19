export const request = ({ method = 'GET', data = {}, url = '' }) => {
  let header = {
    'content-type': 'application/json'
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: header,
      data: data,
      method: method,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        wx.showLoading({
          title: '网络错误!'
        })
        setTimeout(() => {
          wx.hideLoading()
        }, 3000)
        reject(err)
      }
    })
  })
}



export const login = () =>
  new Promise((resolve, reject) => {
    wx.login({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

/**
 * 微信扫码功能
 * success 返回的参数： {
 *  result
 *  scanType
 *  charSet
 *  path  若所扫的是当前小程序的合法二维码，会返回path
 *  rawData 原始数据base64编码
 * }
 */
export const scanQR = (onlyFromCamera = false) =>
  new Promise((resolve, reject) => {
    wx.scanCode({
      onlyFromCamera: onlyFromCamera,
      scanType: ['qrCode', 'barCode'],
      success: (res) => resolve(res),
      fail: (res) => reject(res)
    })
  })

export const showModal = (setting) =>
  new Promise((resolve, reject) => {
    wx.showModal({
      ...setting,
      success: (res) => resolve(res)
    })
  })

export const showActionSheet = (setting) =>
  new Promise((resolve, reject) => {
    wx.showActionSheet({
      ...setting,
      success: (res) => resolve(res),
      fail: (res) => reject(res)
    })
  })

export const showToast = (setting) => {
  wx.showToast(setting)
}
export const showLoading = (setting) => {
  wx.showLoading(setting)
}
export const hideLoading = () => {
  wx.hideLoading()
}

export const getSetting = () =>
  new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const openSetting = () =>
  new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const hideOptionMenu = () =>
  new Promise((resolve, reject) => {
    wx.hideOptionMenu()
  })

export const hideTabBar = () =>
  new Promise((resolve, reject) => {
    wx.hideTabBar({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const switchTab = (pageUrl) =>
  new Promise((resolve, reject) => {
    wx.switchTab({
      url: pageUrl,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const requestPayment = (params) =>
  new Promise((resolve, reject) => {
    wx.requestPayment({
      ...params,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const navigateTo = (url) =>
  new Promise((resolve, reject) => {
    wx.navigateTo({
      ...url,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
/**
 * 跳转后不带页面return键
 */
export const redirectTo = (url) =>
  new Promise((resolve, reject) => {
    wx.redirectTo({
      ...url,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const reLaunch = (url) =>
  new Promise((resolve, reject) => {
    wx.reLaunch({
      ...url,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const setAsyncTimeout = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const navigateBack = (delta = 1) =>
  wx.navigateBack({ delta })

export const getStorageSync = (data) =>
  wx.getStorageSync(data)

export const setStorageSync = (k, v) =>
  wx.setStorageSync(k, v)

export const setStorage = (key, data) =>
  new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const getStorage = (key) =>
  new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

export const setNavigationBarTitle = (title) =>
  new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title: title,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
