// pages/settle/settle.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getItems: function(){
    var result = { "d": [{ "checked": false, "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "inventory": 100, "itemId": "2020191111104944216", "minimum": 1, "price": "99.90", "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"strategyType\":1}"], "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }], "s": true }

    this.setData({
      items: result.d
    })
  },
  compute: function(){
    var result = { "d": { "coupon": "5.00", "couponDetailList": [{ "coupon": "5.00", "name": "\u4F18\u60E0\u5238\u6D4B\u8BD51" }], "deliverDesc": "\u81EA\u63D0", "estimatedDatesBeforeReceive": 0, "itemCount": 1, "itemList": [{ "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "itemId": "2020191111104944216", "price": "99.90", "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }], "total": "94.90", "usedReceiveInfo": { "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50", "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A", "defaultSelected": false, "mobile": "18500425785", "name": "\u6D4B\u8BD5" } }, "s": true }
    this.setData({
      computeResult: result.d
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemsParam = options.items
    if (!app.common.StringUtil.isNotEmpty(itemsParam)){
      app.common.showMsg("缺少商品数据")
      return
    }

    this.getItems()
    var delivers = app.common.getData.getDelivers()
    var payTypes = app.common.getData.getPayTypes()
    this.setData({
      delivers: delivers,
      payTypes: payTypes
    })

    this.compute()
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