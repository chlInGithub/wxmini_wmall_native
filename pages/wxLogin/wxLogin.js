//获取应用实例

const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require("wxmini_common_js").request

Page({
  data: {
    buttonTextDefault: "微信用户一键登录",
    buttonText: "微信用户一键登录",
    done: true,
    hasPhone: false
  },

  goShop: function(){
    wx.navigateBack()
    //goPageUtil.goPage.rederictShop()
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
            if (util.objectUtil.verifyValidObject(data.mobile)) {
              app.globalData.simple.user['hasPhone'] = true
            }
            if (util.objectUtil.verifyValidObject(data.thirdImg)) {
              app.globalData.userInfo = {
                avatarUrl: res.data.d.thirdImg,
                nickName: res.data.d.thirdNick
              }
              app.globalData.simple.user['img'] = res.data.d.thirdImg
              app.globalData.simple.user['name'] = res.data.d.thirdNick
            }

            currentPage.setData({
              done: true,
              hasPhone: true,
              buttonText: currentPage.data.buttonTextDefault
            })

            // 直接跳转
            goPageUtil.goPage.rederictIndex()

            // 简化授权流程，不强制授权用户信息
            /*if (util.objectUtil.verifyValidObject(app.globalData.userInfo)) {
              goPageUtil.goPage.rederictIndex()
            } else {
              goPageUtil.goPage.rederictUserInfo()
            }*/
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