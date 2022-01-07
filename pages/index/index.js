
const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require("wxmini_common_js").token
const shareUtil = require('../../utils/share.js')
const app = getApp()
Page({
  data: {
  },
  onLoad: function (option) {
    util.initPage(this)

    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    // option.scene = 'ceDRQ'
    if (util.objectUtil.verifyValidObject(option.scene)) {
      var scene = decodeURIComponent(option.scene)
      console.log(scene)
      app.setScene(scene)
    }

  },
  onShow: function(){
    // 登录系统 存储token
    this.deal()
  },
  onReady: function(){
  },
  deal: function(){
    var that = this

    tokenUtil.newToken(
      function (res) {
        // 店铺 用户 基本信息
        requestDataUtil.getData.getShopSimpleInfo(function(){
          requestDataUtil.getData.getShopDeliveryAreas()

          // 处理分享
          var scene = getApp().getAndClearScene()
          if (util.objectUtil.verifyValidObject(scene)) {
            util.showToast("即将跳转到分享内容")
            shareUtil.getShareInfoAndGo(scene)
            return
          } else {
            goPageUtil.goPage.goShop()
          }
        })
        
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

