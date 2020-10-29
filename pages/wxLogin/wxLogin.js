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
    buttonTextDefault: "微信用户一键登录",
    buttonText: "微信用户一键登录",
    done: true,
    hasPhone: false
  },

  goShop: function(){
    goPageUtil.goPage.goShop()
  },

  onLoad: function (option) {
    util.initPage(this)
    // app.refreshLoginCode()
  },

  getPhoneNumber(e) {
    console.log(e)

    var currentPage = this

    if (!this.data.done) {
      wx.showToast({
        title: '处理中……,不要重复操作哦.',
        icon: 'warn',
        duration: 1000
      })
    }

    var okIndex = Number.parseInt(e.detail.errMsg.indexOf("ok"));
    
    if (okIndex >= 0) {
      var data = {
        encryptedData: util.replace4Spe(e.detail.encryptedData),
        iv: util.replace4Spe(e.detail.iv)
      };

      this.setData({
        done: false,
        buttonText: "正在处理……"
      })

      var url = '/wmall/wx/phoneV2'
      requestUtil.request(
        {
          url: url,
          data: data,
          method: 'POST',
          successCallBack: function(data){
            var app = getApp()
            app.globalData.phone = data.mobile
            // app.globalData.shopImg = app.globalData.domain + "/img/" + res.data.d.shopImg
            // app.globalData.shopName = res.data.d.shopName
            if (util.objectUtil.verifyValidObject(data.thirdImg)) {
              app.globalData.userInfo = {
                avatarUrl: res.data.d.thirdImg,
                nickName: res.data.d.thirdNick
              }
              app.globalData.simple.user['img'] = res.data.d.thirdImg
              app.globalData.simple.user['name'] = res.data.d.thirdNick
              app.globalData.simple.user['hasPhone'] = true
            }

            currentPage.setData({
              done: true,
              hasPhone: true,
              buttonText: currentPage.data.buttonTextDefault
            })

            if (util.objectUtil.verifyValidObject(app.globalData.userInfo)) {
              goPageUtil.goPage.goIndex()
            } else {
              goPageUtil.goPage.goUserInfo()
            }
          },
          failCallBack: function(res){
            util.showMsg(JSON.stringify(res))

            currentPage.setData({
              done: true,
              buttonText: this.data.buttonTextDefault
            })
          }
        }
      )
    }
    // 操作一次后获取新的code
    // app.refreshLoginCode()
  }
})