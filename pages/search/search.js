// pages/search/search.js
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
    val: "",
    historyCacheKey: "historyCacheKey"
  },

  goShop: function(){
    goPageUtil.goPage.goShop()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryCache()

  },
  getHistoryCache: function(){
    var historyArray = wx.getStorageSync(this.data.historyCacheKey)
    if( undefined == historyArray || "" == historyArray){
      historyArray = []
    }
    this.setData({
      history: historyArray
    })
  },
  addHistoryCache: function(history){
    this.data.history.push(history)
    var key = this.data.historyCacheKey
    var data = this.data.history
    wx.setStorageSync(key, data)
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

  },

  bindconfirm: function(){
    var val = this.data.val

    if (!util.objectUtil.verifyValidObject(val)){
      wx.showToast({
        title: "输入关键字",
      })
      return
    }

    this.addHistoryCache(val)

    this.do_search()
  },
  do_search: function(){
    var val = this.data.val
    if (!util.objectUtil.verifyValidObject(val)) {
      wx.showToast({
        title: "输入关键字",
      })
      return
    }
    var param = '?itemName='+val
    goPageUtil.goItemList(param)
  },

  historyChosed: function(event){
    this.setData({ val: event.currentTarget.dataset.val})
    this.do_search()
  }
})