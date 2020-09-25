// pages/shop/shop.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //selectedCateId: 1236,
    hasGotAll: false,
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
    this.setData(app.globalData)
    this.setData({
      activies: app.common.getData.getAllActivities(),
      cates: app.common.getData.getAllCates(),
      coupons: app.common.getData.getAllCoupons(),
      items: app.common.getData.getItems({}),
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
    if (this.data.items.length > 15) {
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
  
  dealCoupons: function(event){
    console.log(event)
    var id = app.common.getId(event)
    console.log("ID = " + id)
    var got = 1
    if(got == 1){
      this.goCoupons(id)
    }else{
      this.getCoupons(id)
    }
  },

  getCoupons: function(id){

  },

  goCoupons: function (id) {
    var ele = app.common.getEleById(this.data.coupons, id)
    var param = ""
    if (ele != undefined) {
      param = '?coupons=' + JSON.stringify(ele)
    }
    app.common.goPage.goItemList(param)
  },
  
  goActivity: function(event){
    var id = app.common.getId(event)
    var ele = app.common.getEleById(this.data.activies, id)
    var param = ""
    if (ele != undefined) {
      param = '?activity=' + JSON.stringify(ele)
    }
    app.common.goPage.goItemList(param)
  },

  goCate: function(event){
    var id = app.common.getId(event)
    var ele = app.common.getEleById(this.data.cates, id)
    var param = ""
    if(ele != undefined){
      param = '?cate=' + JSON.stringify(ele)
    }
    app.common.goPage.goItemList(param)
  },
  goItemDetail: function(event){
    var id = app.common.getId(event)
    console.log("ID = " + id)
    app.common.goPage.goItemDetail(id)
  }
})