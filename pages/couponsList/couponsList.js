// pages/couponsList/couponsList.js

const util = require("wxmini_common_js").util
const requestDataUtil = require('../../utils/requestData.js')

Page({

  getCanUsedCoupons: function(){
    var that = this
    requestDataUtil.getData.getUserCoupons(function(coupons){
      if(util.jsonUtil.hasData(coupons)){
        for (var i = 0; i < coupons.length; i++) {
          coupons[i]['got'] = 1
        }
      }
      
      that.setData({
        coupons: coupons
      })
    })
    
  },

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
    
    var that = this
    requestDataUtil.getData.getRecommendedItemList(function (items){
      that.setData({
        items: items
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
    this.getCanUsedCoupons()
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
    this.getCanUsedCoupons()
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