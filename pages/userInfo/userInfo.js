//获取应用实例
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require('../../utils/token.js')
const saleStrategyUtil = require('../../utils/saleStrategy.js')
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(option) {
    util.initPage(this)

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
    goPageUtil.goPage.goShop()
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfoResult = e
    this.dealUserInfo(e.detail.userInfo)
  },

  dealUserInfo: function(userInfo) {
    app.globalData.userInfo = userInfo
    var currentPage = this

    var data = {
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    }

    var url = '/wmall/wx/userInfoV2'
    requestUtil.request(
      {
        url: url,
        data: data,
        method: 'POST',
        successCallBack: function(data){
          currentPage.setData({
            userInfo: userInfo,
            hasUserInfo: true
          })
          app.globalData.simple.user['img'] = userInfo.avatarUrl
          app.globalData.simple.user['name'] = userInfo.nickName
          goPageUtil.goPage.goIndex()
        },
        failCallBack: function (res) {
          util.showMsg(JSON.stringify(res))
        }
      }
    )
  }
})