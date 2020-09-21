// pages/shop/shop.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasGotAll: false,
    imgPrefix: "https://wx66e252cb46abe8e4.5jym.com/img/",
    activies: [
      {
        id: 111,
        name: "中秋活动",
        img: "4d90e412c5297ccdcaae2ac200614794"
      },
      {
        id: 112,
        name: "国庆活动",
        img: "4d90e412c5297ccdcaae2ac200614794"
      }
    ],
    cates: [
      {
        id : 123,
        img: "f1dbe88e164b1f7e3cc9110dd503e311",
        name: "名称"
      },
      {
        id: 123,
        img: "f1dbe88e164b1f7e3cc9110dd503e311",
        name: "名称"
      },
      {
        id: 123,
        img: "f1dbe88e164b1f7e3cc9110dd503e311",
        name: "名称"
      },
      {
        id: 123,
        img: "f1dbe88e164b1f7e3cc9110dd503e311",
        name: "名称"
      },
      {
        id: 123,
        img: "f1dbe88e164b1f7e3cc9110dd503e311",
        name: "名称"
      },
      {
        id: 123,
        img: "f1dbe88e164b1f7e3cc9110dd503e311",
        name: "名称"
      },
      {
        id: 123,
        img: "f1dbe88e164b1f7e3cc9110dd503e311",
        name: "名称"
      }
    ],
    coupons: [
      {
        id: 11,
        meet: 50,
        discount: 5,
        name: "某某优惠券1",
        validTime: "2020-09-11 00:00:00",
        invalidTime: "2020-10-11 00:00:00",
        got: 1
      }
      , {
        id: 21,
        meet: 50,
        discount: 10,
        name: "某某优惠券2",
        validTime: "2020-09-11 00:00:00",
        invalidTime: "2020-10-11 00:00:00",
        got: 1
      }
    ],
    items: [
      {
        id: 1111,
        title: "商品名称xxxxsxx",
        tags: ['预售','限购2件'],
        labelPrice: 199,
        price: 99,
        sale: 10,
        existSku: true,
        inventory: 100,
        img: "6233047154ce38f33a4a50987191250e"
      }
      , {
        id: 1111,
        title: "商品名称xxxxxxx",
        price: 99,
        tags: ['预售', '2件起售', '订单最低99元'],
        sale: 100,
        existSku: true,
        inventory: 0,
        img: "6233047154ce38f33a4a50987191250e"
      }
      , {
        id: 1111,
        title: "商品名称xxxdddddxxxx",
        price: 99,
        sale: 1000,
        existSku: true,
        inventory: 100,
        img: "6233047154ce38f33a4a50987191250e"
      }
      , {
        id: 1111,
        title: "商品名称xxx333333333333xxxx",
        price: 99,
        sale: 1,
        existSku: true,
        inventory: 100,
        img: "6233047154ce38f33a4a50987191250e"
      }
      , {
        id: 1111,
        title: "商品名称xxxd22222222xxxx",
        price: 99,
        sale: 100,
        existSku: true,
        inventory: 100,
        img: "6233047154ce38f33a4a50987191250e"
      }
    ],
    todayItems: [
      {
        id: 1111,
        title: "商品名称xxxxsxx",
        price: 99,
        sale: 100,
        img: "6233047154ce38f33a4a50987191250e"
      }
      , {
        id: 1111,
        title: "商品名称xxxxxxx",
        price: 99,
        sale: 10,
        img: "6233047154ce38f33a4a50987191250e"
      }
      , {
        id: 1111,
        title: "商品名称xxxdddddxxxx",
        price: 99,
        sale: 1000,
        img: "6233047154ce38f33a4a50987191250e"
      }
      , {
        id: 1111,
        title: "商品名称xxx333333333333xxxx",
        price: 99,
        sale: 100,
        img: "6233047154ce38f33a4a50987191250e"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  search_focus: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },

  clickCate: function(){

  },

  bindscrolltolower: function(){
    wx.showToast({
      title: 'bindscrolltolower',
    })
  },

  onReachBottom: function(event){
    if(this.data.items.length > 15){
      wx.showToast({
        title: 'hasGotAll',
      })
      this.setData({
        hasGotAll: true
      })
      return
    }
    var temp = this.data.items.concat([this.data.items[0], this.data.items[1], this.data.items[2]])
    this.setData({
      items: temp
    })
  },
  
  getCoupons: function(event){
    console.log(event)
    var id = app.common.getId(event)
    console.log("ID = " + id)
  },

  goActivity: function(event){
    var id = app.common.getId(event)
    console.log("ID = " + id)
  },

  goCate: function(event){
    var id = app.common.getId(event)
    console.log("ID = " + id)
  },

  goItemDetail: function(event){
    var id = app.common.getId(event)
    console.log("ID = " + id)
  }
})