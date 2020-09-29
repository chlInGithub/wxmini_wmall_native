
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
    this.setData(app.globalData)

    // TODO 登录系统 存储token
  

  },
  successCallback: function(res){
    // TODO 登录系统 存储token


    // 处理分享
    var scene = app.getAndClearScene()
    if (app.verifyValidObject(scene)) {
      // TODO
    }else{
      app.common.goPage.goShop()
    }
  },
  binderror: function (e) {
    console.log(e)
  },
  bindload: function (e) {
    console.log(e)
  }
})

