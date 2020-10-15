// pages/itemDetail/itemDetail.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require('../../utils/token.js')
const saleStrategyUtil = require('../../utils/saleStrategy.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getItemDetail: function(id){
    var that = this
    requestDataUtil.getData.getItemDetail(
      id,
      function(detail){
        var detailHtml = detail.detail.replace(/\/img\//g, app.globalData.imgPrefix)
        console.log(detailHtml)
        detail.detail = detailHtml
        console.log(detail)
        if (detail.saleStrategies != undefined) {
          var tags = []
          tags = saleStrategyUtil.getSaleStrategyTags(detail)
          if (util.objectUtil.isNotUndefined(detail.strategyJson.presell)) {
            that.setData({
              preStrategy: detail.strategyJson.presell
            })
          }
          that.setData({
            tags: tags
          })
        }

        if (detail.skus != undefined && detail.skus.length > 0) {
          var skuTitles = []
          for (var i = 0; i < detail.skus.length; i++) {
            skuTitles.push(util.stringUtil.abbreviatory(detail.skus[i].title) + " | " + util.stringUtil.moneyDesc(detail.skus[i].price) + " | 库存" + detail.skus[i].inventory)
          }
          that.setData({
            choosedSku: detail.skus[0],
            skuTitles: skuTitles
          })
        }

        that.setData({
          detail: detail
        })
      }
    )
  },

  chooseSku: function(event){
    var index = event.detail.value
    var choosedSku = this.data.detail.skus[index]
    if (choosedSku.inventory < 1){
      wx.showToast({
        title: '该款式没有库存了',
      })
      return
    }
    this.setData({
      choosedSku: choosedSku
    })
  },
  goShop: function(){
    goPageUtil.goPage.goShop()
  },
  goCart: function(){
    goPageUtil.goPage.goCart()
  },
  addCart: function(){
    if (this.data.detail.existSku == true && (this.data.choosedSku == undefined || this.data.choosedSku.id == undefined)) {
      wx.showModal({
        title: '提示',
        content: '请选择款式',
      })
      return
    }

    requestDataUtil.postData.addCart({
      itemId: this.data.detail.id,
      skuId: this.data.choosedSku.id,
      count: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    if (options.id == undefined) {
      wx.showModal({
        title: '参数错误',
        content: '参数错误',
      })
      throw new Error()
    }

    this.setData({
      itemId: options.id
    })

    // this.getItemDetail(this.data.itemId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getItemDetail(this.data.itemId)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})