// pages/pay/pay.js
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
    done: false,
    payed: false
  },

  goOrderDetail: function(){
    goPageUtil.goPage.goOrderDetail(this.data.orderId)
  },
  payResult : function (data) {
    this.setData(data)
    // TODO goPageUtil.goPage.goOrderDetail()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    if (!util.objectUtil.verifyValidObject(option.orderId)){
      return util.showMsg("缺少订单ID")
    }

    this.setData(app.globalData)
    this.setData({
      orderId: option.orderId
    })

    // 
    var orderId = option.orderId
    // 获取统一支付结果
    var that = this
    requestDataUtil.getData.getPrePay(orderId,
      function(data){

        var packageVal = 'prepay_id=' + data.prepayId

        that.setData({
          total: data.total
        })

        wx.requestPayment(
          {
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': packageVal,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (res) {
              console.log(res)
              that.payResult({
                done: true,
                payed: true
              })
            },
            'fail': function (res) {
              console.log(res)
              that.payResult({
                done: true,
                payed: false
              })
            },
            'complete': function (res) {
            }
          })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})