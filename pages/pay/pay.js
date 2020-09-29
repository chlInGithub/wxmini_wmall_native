// pages/pay/pay.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    done: false,
    payed: false
  },

  goOrderDetail: function(){
    app.common.goPage.goOrderDetail(this.data.orderId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // TODO
    option.orderId = 1837749573939282
    option.total = 109.10

    this.setData(app.globalData)
    var that = this
    var packageVal = 'prepay_id=' + option.prepay_id

    this.setData({
      total: option.total,
      orderId: option.orderId
    })

    var payResult = function (data) {
      that.setData(data)
      // TODO app.common.goPage.goOrderDetail()
    }

    wx.requestPayment(
      {
        'timeStamp': option.timeStamp,
        'nonceStr': option.nonceStr,
        'package': packageVal,
        'signType': option.signType,
        'paySign': option.paySign,
        'success': function (res) {
          console.log(res)
          payResult({
            done: true,
            payed: true
          })
        },
        'fail': function (res) {
          console.log(res)
          payResult({
            done: true,
            payed: false
          })
        },
        'complete': function (res) {
        }
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