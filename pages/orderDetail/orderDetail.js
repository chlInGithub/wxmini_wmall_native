// pages/orderDetail/orderDetail.js
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

  getOrderDetail: function(id){
    var that = this
    requestDataUtil.getData.getOrderDetail(
      id, 
      function(detail){
        var subOrderVOS = detail.subOrderVOS
        for (var i = 0; i < subOrderVOS.length; i++) {
          var subOrderVO = subOrderVOS[i]
          if (undefined != subOrderVO.presell) {
            subOrderVO.presell = JSON.parse(subOrderVO.presell)
          }
        }
        that.setData({
          detail: detail
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    var id = options.id
    if (!util.objectUtil.verifyValidObject(id)){
      wx:wx.showModal({
        title: '提示',
        content: '缺少订单ID',
        showCancel: false,
        success: function(res) {
          goPageUtil.goPage.goOrderList()
        }
      })
    }
    this.setData({
      id: id
    })

    this.getOrderDetail(id)

    var that = this
    requestDataUtil.getData.getRecommendedItemList(function (data) {
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