const util = require("./util.js")

var goPage = {
  goIndex: function () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  /**
   * param ( ?key=xx&key=xx...)
   */
  goSettle: function (param) {
    if (util.objectUtil.isUndefined(param)) {
      param = ""
    }
    wx.navigateTo({
      url: '/pages/settle/settle' + param
    })
  },
  goWXLogin: function () {
    wx.navigateTo({
      url: '/pages/wxLogin/wxLogin'
    })
  },
  checkLogin: function () {
    if (getApp().globalData.simple.user.hasPhone == true) {
      return true
    } else {
      goPage.goWXLogin()
      return false
    }
  },
  goUserInfo: function () {
    wx.navigateTo({
      url: '/pages/userInfo/userInfo'
    })
  },
  goCouponsList: function () {
    wx.navigateTo({
      url: '/pages/couponsList/couponsList'
    })
  },
  goShop: function () {
    wx.switchTab({
      url: '/pages/shop/shop'
    })
  },
  goMe: function () {
    wx.switchTab({
      url: '/pages/me/me'
    })
  },
  goCart: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  /**
   * orderId
   */
  goPay: function (orderId) {
    wx.navigateTo({
      url: '/pages/pay/pay?orderId=' + orderId
    })
  },
  /**
   * param: '?code=val&key=val&...'
   */
  goOrderList: function (param) {
    if (util.objectUtil.isUndefined(param)) {
      param = ""
    }
    wx.navigateTo({
      url: '/pages/orderList/orderList' + param
    })
  },
  goOrderDetail: function (id) {
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id=' + id,
    })
  },
  /**
   * param: '?key=val&key=val&...'
   */
  goItemList: function (param) {
    if (util.objectUtil.isUndefined(param)) {
      param = ""
    }
    wx.navigateTo({
      url: '/pages/itemList/itemList' + param
    })
  },
  goItemDetail: function (id) {
    wx.navigateTo({
      url: '/pages/itemDetail/itemDetail?id=' + id
    })
  }
}

module.exports = {
  goPage: goPage
}