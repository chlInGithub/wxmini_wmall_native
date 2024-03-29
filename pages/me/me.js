// pages/me/me.js

const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')
const requestDataUtil = require('../../utils/requestData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goMyShare: function(){
    goPageUtil.goPage.goMyShare()
  },
  goAboutShop: function(){
    goPageUtil.goPage.goAboutShop()
  },
  goWXLogin: function(){
    goPageUtil.goPage.goWXLogin()
  },
  goUserInfo: function(){
    goPageUtil.goPage.goUserInfo()
  },
  goCouponsList: function(){
    goPageUtil.goPage.goCouponsList()
  },
  goOrderList: function(event){
    var code = util.eventUtil.getParaFromEvent(event, "code", false)
    console.log(code)
    goPageUtil.goPage.goOrderList("?code=" + code)
  },
  getOrderStatusCount: function(){
    var that = this
    requestDataUtil.getData.getOrderStatusCount(function(data){
      that.setData({
        orderStatusCount: data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)

    var that = this
    requestDataUtil.getData.getRecommendedItemList(function(data){
      that.setData({
        items: data
      })
    })
    
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
    var that = this
    this.getOrderStatusCount()
    requestDataUtil.getData.getShopSimpleInfo(function(){
      var globalData = getApp().globalData
      that.setData(globalData)
    })
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
    // this.getOrderStatusCount()
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