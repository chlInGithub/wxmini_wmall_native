// pages/orderList/orderList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goOrderDetail:function(event){
    var id = app.common.getId(event)
    app.common.goPage.goOrderDetail(id)
  },
  goShop: function(){
    app.common.goPage.goShop()
  },

  getOrders: function () {
    // TODO
    var result = { "d": "[{\"canRefund\":false,\"createTime\":\"2020-09-17 10:02:48\",\"id\":\"302009171002471005\",\"payVO\":{\"id\":\"322009171002471008\",\"status\":1,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":0.01,\"status\":62,\"statusDes\":\"\u9000\u6B3E\u5B8C\u6210\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104943880\",\"itemImg\":\"6233047154ce38f33a4a50987191250e\",\"itemTitle\":\"\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\",\"presell\":\"{\\\"endTime\\\":\\\"2020-09-17 17:25:31\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"price\":0.01,\"skuId\":\"2120042113550310021\",\"skuTitle\":\"sku2\",\"totalFee\":0.01}],\"totalFee\":0.01},{\"canRefund\":false,\"createTime\":\"2020-09-16 17:19:08\",\"id\":\"302009161719081001\",\"payVO\":{\"id\":\"322009161719081004\",\"status\":1,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":0.01,\"status\":62,\"statusDes\":\"\u9000\u6B3E\u5B8C\u6210\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104943880\",\"itemImg\":\"6233047154ce38f33a4a50987191250e\",\"itemTitle\":\"\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\",\"presell\":\"{\\\"endTime\\\":\\\"2020-09-17 17:25:31\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"price\":0.01,\"skuId\":\"2120042113550310022\",\"skuTitle\":\"sku3\",\"totalFee\":0.01}],\"totalFee\":0.01},{\"canRefund\":false,\"createTime\":\"2020-09-16 14:04:30\",\"id\":\"302009161404291005\",\"payVO\":{\"id\":\"322009161404301008\",\"status\":1,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":0.01,\"status\":62,\"statusDes\":\"\u9000\u6B3E\u5B8C\u6210\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104943880\",\"itemImg\":\"6233047154ce38f33a4a50987191250e\",\"itemTitle\":\"\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\",\"presell\":\"{\\\"endTime\\\":\\\"2020-09-16 22:00:15\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"price\":0.01,\"skuId\":\"2120042113550310021\",\"skuTitle\":\"sku2\",\"totalFee\":0.01}],\"totalFee\":0.01},{\"canRefund\":false,\"createTime\":\"2020-09-16 13:46:16\",\"id\":\"302009161346161001\",\"payVO\":{\"id\":\"322009161346171004\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":199.80,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":2,\"itemId\":\"2020191111104944216\",\"itemImg\":\"4e461becb82121c7020893221c3e0bfe\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2020-09-18 18:00:28\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210005\",\"skuTitle\":\"sku\u6807\u98981\",\"totalFee\":199.80}],\"totalFee\":199.80},{\"canRefund\":false,\"createTime\":\"2020-09-15 19:04:28\",\"id\":\"302009151904281001\",\"payVO\":{\"id\":\"322009151904281004\",\"status\":0,\"type\":2,\"typeDesc\":\"\u7EBF\u4E0B\u652F\u4ED8\"},\"realFee\":194.80,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":2,\"itemId\":\"2020191111104944216\",\"itemImg\":\"4e461becb82121c7020893221c3e0bfe\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2020-09-18 18:00:28\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210005\",\"skuTitle\":\"sku\u6807\u98981\",\"totalFee\":199.80}],\"totalFee\":199.80},{\"canRefund\":false,\"createTime\":\"2020-09-15 18:06:36\",\"id\":\"302009151806361001\",\"payVO\":{\"id\":\"322009151806361004\",\"status\":0,\"type\":2,\"typeDesc\":\"\u7EBF\u4E0B\u652F\u4ED8\"},\"realFee\":0.05,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":5,\"itemId\":\"2020191111104943880\",\"itemImg\":\"6233047154ce38f33a4a50987191250e\",\"itemTitle\":\"\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\",\"price\":0.01,\"skuId\":\"2120042113550310021\",\"skuTitle\":\"sku2\",\"totalFee\":0.05}],\"totalFee\":0.05},{\"canRefund\":false,\"createTime\":\"2020-09-08 16:31:28\",\"id\":\"3020090816312810001\",\"payVO\":{\"id\":\"3220090816312910005\",\"status\":0,\"type\":2,\"typeDesc\":\"\u7EBF\u4E0B\u652F\u4ED8\"},\"realFee\":199.80,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944436\",\"itemImg\":\"d1ee8f3d0eba0040b41cfd518f212728\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98984\",\"price\":99.90,\"skuId\":\"2120042113365610008\",\"skuTitle\":\"sku\u6807\u98981\",\"totalFee\":99.90},{\"count\":1,\"itemId\":\"2020191111104944436\",\"itemImg\":\"d1ee8f3d0eba0040b41cfd518f212728\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98984\",\"price\":99.90,\"skuId\":\"2120042113365610009\",\"skuTitle\":\"sku\u6807\u98982\",\"totalFee\":99.90}],\"totalFee\":199.80},{\"canRefund\":false,\"createTime\":\"2020-08-20 17:30:36\",\"id\":\"3020082017303510001\",\"payVO\":{\"id\":\"3220082017303510004\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":0.01,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104943880\",\"itemImg\":\"6233047154ce38f33a4a50987191250e\",\"itemTitle\":\"\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\",\"price\":0.01,\"skuId\":\"2120042113550310020\",\"skuTitle\":\"sku1\",\"totalFee\":0.01}],\"totalFee\":0.01},{\"canRefund\":false,\"createTime\":\"2020-07-15 06:08:58\",\"id\":\"3020071506085810009\",\"payVO\":{\"id\":\"3220071506085810012\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":249.70,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":3,\"itemId\":\"2020191111104944216\",\"itemImg\":\"4e461becb82121c7020893221c3e0bfe\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"price\":99.90,\"skuId\":\"2120042113355210005\",\"skuTitle\":\"sku\u6807\u98981\",\"totalFee\":299.70}],\"totalFee\":299.70},{\"canRefund\":false,\"createTime\":\"2020-07-14 20:32:06\",\"id\":\"3020071420320610001\",\"payVO\":{\"id\":\"3220071420320610004\",\"status\":1,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":0.01,\"status\":61,\"statusDes\":\"\u9000\u6B3E\u5904\u7406\u4E2D\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104943880\",\"itemImg\":\"6233047154ce38f33a4a50987191250e\",\"itemTitle\":\"\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\u6D4B\u8BD5\u5546\u54C11\",\"price\":0.01,\"skuId\":\"2120042113550310021\",\"skuTitle\":\"sku2\",\"totalFee\":0.01}],\"totalFee\":0.01}]", "draw": 0, "pageIndex": 0, "s": true }
    var orders = this.data.orders
    if (orders == undefined) {
      orders = []
    }
    orders = orders.concat(JSON.parse(result.d))
    this.setData({
      orders: orders
    })
    if(orders.length > 15){
      this.setData({
        hasGotAll: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    this.getOrders()
    this.setData({
      items: app.common.getData.getItems({ type: 2 })
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