// pages/shop/shop.js
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)
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
    requestDataUtil.getData.getAllActivities(function (data) {
      if (!util.jsonUtil.hasData(data)){
        return
      }
      that.setData({
        activies: data
      })
    })
    requestDataUtil.getData.getAllCates(function (data) {
      if (!util.jsonUtil.hasData(data)) {
        return
      }
      that.setData({
        cates: data
      })
    })
    requestDataUtil.getData.getAllCoupons(function (data) {
      if (!util.jsonUtil.hasData(data)) {
        return
      }
      that.setData({
        coupons: data
      })
    })
    requestDataUtil.getData.getTodayLowPriceItemList(function (data) {
      if (!util.jsonUtil.hasData(data)) {
        return
      }
      that.setData({
        todayItems: data
      })
    })
    requestDataUtil.getData.getRecommendedItemList(function (data) {
      if (!util.jsonUtil.hasData(data)) {
        return
      }
      that.setData({
        items: data
      })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /**if (this.data.items.length > 15) {
      wx.showToast({
        title: 'hasGotAll',
      })
      this.setData({
        hasGotAll: true
      })
      return
    }
    var temp = this.data.items.concat([this.data.items[0], this.data.items[1], this.data.items[2]])
    this.setData({
      items: temp
    })**/
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotCouponsEvent: function(detail){
    var id = detail.detail.id
    var ele = util.arrayUtil.getEleById(this.data.coupons, id)
    ele.got = 1
    this.setData({
      coupons: this.data.coupons
    })
  },
  search_focus: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  
  goActivity: function(event){
    var id = util.eventUtil.getId(event)
    var ele = util.arrayUtil.getEleById(this.data.activies, id)
    var param = ""
    if (ele != undefined) {
      param = '?activity=' + JSON.stringify(ele)
    }
    goPageUtil.goPage.goItemList(param)
  },

  goCate: function(event){
    var id = util.eventUtil.getId(event)
    var ele = util.arrayUtil.getEleById(this.data.cates, id)
    var param = ""
    if(ele != undefined){
      param = '?cate=' + JSON.stringify(ele)
    }
    goPageUtil.goPage.goItemList(param)
  },
  goItemDetail: function(event){
    var id = util.eventUtil.getId(event)
    console.log("ID = " + id)
    goPageUtil.goPage.goItemDetail(id)
  }
})