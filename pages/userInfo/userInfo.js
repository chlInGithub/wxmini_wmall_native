//获取应用实例

const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require("wxmini_common_js").request
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true
  },
  onLoad: function(option) {
    util.initPage(this)
  },

  goShop() {
    wx.navigateBack()
    //goPageUtil.goPage.rederictShop()
  },

  getUserProfile: function(e){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        this.dealUserInfo(res.userInfo)
      }
    })
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
          goPageUtil.goPage.rederictIndex()
        },
        failCallBack: function (res) {
          util.showMsg(JSON.stringify(res))
        }
      }
    )
  }
})