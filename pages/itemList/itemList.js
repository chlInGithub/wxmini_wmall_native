// pages/itemList/itemList.js
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

  chooseCate: function(event){
    var id = util.eventUtil.getId(event)
    this.setData({
      selectedCateId: id
    })

    this.data.param["cateId"] = id
    this.setData({
      param: this.data.param,
      items: []
    })
    this.cleanPageParam()
    this.queryItems()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    var param = {
      pageSize: 10,
      pageIndex: -1
    }
    if(options.cate != undefined){
      var cate = JSON.parse(options.cate)
      this.setData({
        selectedCateId: cate.id
      })
      var that = this
      requestDataUtil.getData.getAllCates(function(data){
        that.setData({
          cates: data
        })
      })

      param["cateId"] = cate.id
    }
    if (options.coupons != undefined) {
      var coupons = JSON.parse(options.coupons)
      this.setData({
        coupons: coupons
      })
      param["couponId"] = coupons.id
    }
    if (options.activity != undefined) {
      var activity = JSON.parse(options.activity)
      this.setData({
        activity: activity
      })
      param["activityId"] = activity.id
    }
    if (options.itemName != undefined) {
      this.setData({
        itemName: options.itemName
      })
      param["title"] = itemName
    }

    this.setData({
      param: param,
      hasGotAll: false
    })

    this.queryItems()
  },
  cleanPageParam: function(){
    var param = this.data.param
    if(!util.objectUtil.verifyValidObject(param)){
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
  startQuery : function(){
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
  // 避免同时多次查询，判断已查所有，分页，查询
  queryItems: function(){
    if (this.isQuering()) {
      return
    }

    if (this.data.hasGotAll){
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
    requestDataUtil.getData.getItems(
      param,
      function (data) {
        that.endQuery()
        if(!util.jsonUtil.hasData(data)){
          that.setData(
            {
              hasGotAll : true
            }
          )
          return
        }
        var items = that.data.items
        if (!util.objectUtil.verifyValidObject(items)){
          items = []
        }
        items = items.concat(data)
        that.setData({
          items: items
        })
      },
      function () {
        that.endQuery()
      }
    )
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
    this.queryItems()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})