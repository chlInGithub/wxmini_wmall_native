
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require('../../utils/token.js')
const shareUtil = require('../../utils/share.js')
const saleStrategyUtil = require('../../utils/saleStrategy.js')
const app = getApp()
Page({
  data: {
  },
  onLoad: function (option) {
    this.setData(app.globalData)

    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (util.objectUtil.verifyValidObject(option.scene)) {
      var scene = decodeURIComponent(option.scene)
      console.log(scene)
      app.setScene(scene)
    }

  },
  onShow: function(){

    // 登录系统 存储token

    var that = this

    tokenUtil.newToken(
      function (res) {
        // 店铺 用户 基本信息
        requestDataUtil.getData.getShopSimpleInfo()
        //getApp().globalData.simple = simple

        // 处理分享
        var scene = getApp().getAndClearScene()
        if (util.objectUtil.verifyValidObject(scene)) {
          shareUtil.getShareInfoAndGo(scene)
          return
        } else {
          goPageUtil.goPage.goShop()
        }
      }, function () {
        util.showMsg("获取token失败", function () {
          goPageUtil.goPage.goIndex()
        })
      }
    )

  },

  binderror: function (e) {
    console.log(e)
  },
  bindload: function (e) {
    console.log(e)
  }
})

