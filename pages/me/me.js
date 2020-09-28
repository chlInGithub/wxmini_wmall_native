// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goWXLogin: function(){
    app.common.goPage.goWXLogin()
  },
  goCouponsList: function(){
    app.common.goPage.goCouponsList()
  },
  goOrderList: function(event){
    var code = app.common.getParaFromEvent(event, "code", false)
    console.log(code)
    app.common.goPage.goOrderList("?code=" + code)
  },
  getOrderStatusCount: function(){
    var result = { "d": "[{\"code\":10,\"count\":10},{\"code\":20,\"count\":10},{\"code\":30,\"count\":5},{\"code\":60,\"count\":1}]", "s": true }
    var val = JSON.parse(result.d)
    this.setData({
      orderStatusCount: val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)
    this.getOrderStatusCount()
    this.setData({
      items: app.common.getData.getItems({type:2})
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
    this.getOrderStatusCount()
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