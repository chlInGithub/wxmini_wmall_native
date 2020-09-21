//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
    userInfo: null
  },
  common: {
    getId: function (event) {
      var id = event.currentTarget.dataset.id
      if(getApp().common.StringUtil.isNotEmpty(id)){
        return id
      }
      wx.showToast({
        title: '缺少ID',
      })
      throw new Error()
    },
    StringUtil : {
      isNotEmpty: function (str) {
        return undefined != str && "" != str
      },
      abbreviatory: function (str, maxL) {
        if (!ObjectCommonUtil.isEmpty(str) && str.length > (undefined == maxL ? 10 : maxL)) {
          return str.substring(0, 10) + '…'
        }
        return str
      },
      moneyDesc: function (money) {
        return "￥" + money + "元"
      },
      simplePrint: function (str) {
        if (StringUtil.isNotEmpty(str)) {
          return str
        }
        return '-'
      }
    }
  }
})