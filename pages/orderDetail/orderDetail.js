// pages/orderDetail/orderDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getOrderDetail: function(){
    var result = { "d": "{\"canRefund\":false,\"coupons\":[{\"desc\":\"\u4F18\u60E0\u5238\u6D4B\u8BD51\",\"discount\":\"5.00\"}],\"createTime\":\"2020-09-28 16:35:53\",\"deliverVO\":{\"address\":\"\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50\",\"city\":\"\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A\",\"freight\":0.00,\"mobile\":\"18500425785\",\"name\":\"\u6D4B\u8BD5\",\"typeDesc\":\"\u81EA\u63D0\"},\"id\":\"302009281635531006\",\"payVO\":{\"id\":\"322009281635531009\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":94.90,\"status\":10,\"statusDes\":\"\u5F85\u4ED8\u6B3E\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944216\",\"itemImg\":\"4e461becb82121c7020893221c3e0bfe\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210004\",\"skuTitle\":\"sku\u6807\u98980\",\"totalFee\":99.90}],\"totalFee\":99.90}", "s": true }
    var detail = JSON.parse(result.d)
    var subOrderVOS = detail.subOrderVOS
    for (var i = 0; i < subOrderVOS.length; i++){
      var subOrderVO = subOrderVOS[i]
      if(undefined != subOrderVO.presell){
        subOrderVO.presell = JSON.parse(subOrderVO.presell)
      }
    }
    this.setData({
      detail: detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    // TODO
    options.id = 1

    var id = options.id
    if(id == undefined){
      wx:wx.showModal({
        title: '提示',
        content: '缺少订单ID',
        showCancel: false,
        success: function(res) {
          app.common.goPage.goOrderList()
        }
      })
    }
    this.setData({
      id: id
    })

    this.getOrderDetail()

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