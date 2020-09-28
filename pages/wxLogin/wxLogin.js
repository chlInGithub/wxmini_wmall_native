//获取应用实例
const app = getApp()

Page({
  data: {
    buttonTextDefault: "微信用户一键登录",
    buttonText: "微信用户一键登录",
    done: true,
    hasPhone: false
  },

  goShop: function(){
    app.common.goPage.goShop()
  },

  onLoad: function (option) {
    this.setData(app.globalData)
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
    /**
    if (okIndex >= 0) {
      var data = {
        shopId: app.globalData.shopId,
        appId: app.globalData.appId,
        tId: app.globalData.tId,
        loginCode: app.globalData.loginCode,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        domain: app.globalData.domain
      };

      this.setData({
        done: false,
        buttonText: "正在处理……"
      })

      var url = app.getRequestDomain() + '/wmall/wx/phone'
      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
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
          if (res.data.s) {
            app.globalData.phone = res.data.d.mobile
            // app.globalData.shopImg = app.globalData.domain + "/img/" + res.data.d.shopImg
            // app.globalData.shopName = res.data.d.shopName
            if (app.verifyValidObject(res.data.d.thirdImg)) {
              app.globalData.userInfo = {
                avatarUrl: res.data.d.thirdImg,
                nickName: res.data.d.thirdNick
              }
            }

            currentPage.setData({
              done: true,
              hasPhone: true
            })

            if (app.verifyValidObject(app.globalData.userInfo)) {
              wx.redirectTo({
                url: '../index/index'
              })
            } else {
              wx.redirectTo({
                url: '../userInfo/userInfo'
              })
            }
          } else {
            wx.showModal({
              title: '登录失败',
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
          }
        }
      })

      this.setData({
        done: true,
        buttonText: this.data.buttonTextDefault
      })
    }
    **/
    // 操作一次后获取新的code
    app.refreshLoginCode()
  }
})