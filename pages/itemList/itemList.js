// pages/itemList/itemList.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getItems: function(){
    this.setData({
      items: app.common.getData.getItems(this.data.param)
    })
  },

  chooseCate: function(event){
    var id = app.common.getId(event)
    this.setData({
      selectedCateId: id
    })

    this.getItems()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    var param = {}
    if(options.cate != undefined){
      var cate = JSON.parse(options.cate)
      this.setData({
        selectedCateId: cate.id,
        cates: app.common.getData.getAllCates(),
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
      items: app.common.getData.getItems(param)
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

  }
})