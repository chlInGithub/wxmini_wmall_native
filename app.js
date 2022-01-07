//app.js
//const util = require('utils/util.js')
const util = require('wxmini_common_js').util
//const goPageUtil = require('utils/goPage.js')

App({
  onLaunch: function() {
    this.globalData.shopId = wx.getExtConfigSync().shopId,
    this.globalData.tId = wx.getExtConfigSync().tId,
    this.globalData.appId = wx.getExtConfigSync().appId
    this.globalData.shopName = wx.getExtConfigSync().shopName
    this.globalData.domain = wx.getExtConfigSync().domain
    this.globalData.requestDomain = wx.getExtConfigSync().requestDomain
    this.globalData.requestUrlPrefix = "https://" + this.globalData.requestDomain
    this.globalData.shopImg = "https://" + this.globalData.domain + "/img/" + wx.getExtConfigSync().shopImg
    this.globalData.imgPrefix = "https://" + this.globalData.domain + "/img/"

    this.globalData.bgColor = util.objectUtil.verifyValidObject(wx.getExtConfigSync().bgColor) ? wx.getExtConfigSync().bgColor : '#EEEEEE'
    this.globalData.ngbgColor = util.objectUtil.verifyValidObject(wx.getExtConfigSync().ngbgColor) ? wx.getExtConfigSync().ngbgColor : '#ffffff'
    this.globalData.ngFrontColor = util.objectUtil.verifyValidObject(wx.getExtConfigSync().ngFrontColor) ? wx.getExtConfigSync().ngFrontColor : '#000000'

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    progressText: "正在努力打开页面……"
  },
  refreshLoginCode: function () {
    wx.login({
      success: res => {
        console.log(res)
        var code = res.code
        getApp().globalData.loginCode = loginCode
        console.log("globalData : " + this.globalData)
      }
    })
  },
  setOpenId: function (openId) {
    this.globalData.openId = openId
    console.log("globalData : " + this.globalData)
  },
  setScene: function (scene) {
    this.globalData.scene = scene
  },
  getAndClearScene: function () {
    var scene = this.globalData.scene
    this.globalData.scene = null
    return scene
  },
  /**
   * k: key
   * o: 数据
   * s: 超时相对秒数， 默认3600秒
   * l: use storage
   */
  addCache: function(k, o, s, l){
    if(util.objectUtil.verifyValidObject(l) && l == true){
      wx.setStorageSync(k + "", o)
      return;
    }

    if (util.objectUtil.isUndefined(this.globalData.cache)) {
      this.globalData['cache'] = {}
    }

    if (!util.objectUtil.verifyValidObject(k) || !util.objectUtil.verifyValidObject(o)){
      return
    }

    if (!util.objectUtil.verifyValidObject(s)) {
      s = 3600
    }

    var val = {
      data: o,
      expire: util.getCurrentS() + s
    }

    this.globalData['cache'][k] = val
  },
  delCache: function(k, l){
    if(util.objectUtil.verifyValidObject(l) && l == true){
      wx.removeStorageSync(k + "")
      return;
    }

    if (util.objectUtil.isUndefined(this.globalData.cache) || util.objectUtil.isUndefined(this.globalData.cache[k])) {
      return
    }
    this.globalData.cache[k] = undefined
  },
  getCache: function(k, l){
    if(util.objectUtil.verifyValidObject(l) && l == true){
      return wx.getStorageSync(k + "")
    }

    if (util.objectUtil.isUndefined(this.globalData.cache) || util.objectUtil.isUndefined(this.globalData.cache[k])){
      return undefined
    }
    // 取key对应val
    var val = this.globalData.cache[k]
    // 比对超时
    if (util.getCurrentS() > val.expire){
      return undefined
    }
    // 结果
    return val.data
  }
})