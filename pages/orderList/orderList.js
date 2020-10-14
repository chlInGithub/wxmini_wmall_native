// pages/orderList/orderList.js
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
  goOrderDetail:function(event){
    var id = util.eventUtil.getId(event)
    goPageUtil.goPage.goOrderDetail(id)
  },
  goShop: function(){
    goPageUtil.goPage.goShop()
  },

  getOrders: function () {
    if (this.isQuering()) {
      return
    }

    if (this.data.hasGotAll) {
      wx.showToast({
        title: '没有更多喽',
      })
      return
    }

    var that = this
    that.startQuery()
    var param = that.data.param
    param.pageIndex++
    this.setData({
      param: param
    })
    requestDataUtil.getData.getOrders(
      param,
      function (data) {
        that.endQuery()
        if (!util.jsonUtil.hasData(data)) {
          that.setData({
            hasGotAll : true
          })
          return
        }
        var orders = that.data.orders
        if (!util.objectUtil.verifyValidObject(orders)) {
          orders = []
        }
        orders = orders.concat(data)
        that.setData({
          orders: orders
        })
      },
      function () {
        that.endQuery()
      }
    )
  },
  cleanPageParam: function () {
    var param = this.data.param
    if (!util.objectUtil.verifyValidObject(param)) {
      param = {}
    }
    param.pageIndex = -1
    param.pageSize = 10
    this.setData({
      param: param,
      hasGotAll: false,
      queringItem: false
    })
  },
  startQuery: function () {
    this.setData({
      queringItem: true
    })
  },
  endQuery: function () {
    this.setData({
      queringItem: false
    })
  },
  isQuering: function () {
    this.data.queringItem
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = {
      pageSize: 10,
      pageIndex: -1
    }
    if (util.objectUtil.verifyValidObject(options.status)){
      param['status'] = options.status
    }
    
    this.setData({
      param: param,
      hasGotAll: false
    })

    this.setData(app.globalData)

    this.getOrders()

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