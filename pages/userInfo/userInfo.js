//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(option) {
    this.setData(app.globalData)

    var that = this

    if (app.globalData.userInfo) {
      this.goShop()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("userInfoReady " + res)
        that.dealUserInfo(res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          that.dealUserInfo(res.userInfo)
        }
      })
    }
  },

  goShop() {
    app.common.goPage.goShop()
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfoResult = e
    this.dealUserInfo(e.detail.userInfo)
  },

  dealUserInfo: function(userInfo) {
    /**

    app.globalData.userInfo = userInfo
    var currentPage = this

    var data = {
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      loginCode: app.globalData.loginCode,
      shopId: app.globalData.shopId,
      appId: app.globalData.appId,
      tId: app.globalData.tId,
      domain: app.globalData.domain
    }

    var url = app.getRequestDomain() + '/wmall/wx/userInfo'
    wx.request({
      url: url,
      data: data,
      method: 'post',
      fail(res) {
        wx.showModal({
          title: '错误提示',
          content: JSON.stringify(res),
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      success(res) {
        console.log(res.data)
        currentPage.setData({
          userInfo: userInfo,
          hasUserInfo: true
        })
        wx.redirectTo({
          url: '../index/index'
        })
      }
    })
    **/
  }
})