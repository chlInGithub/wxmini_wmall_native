// pages/itemDetail/itemDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getItemDetail: function(id){
    var detailResult = { "d": "{\"detail\":\"<p>\\n    \u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\\n<\/p>\\n<p>\\n    \u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\\n<\/p>\\n<p>\\n    \u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\\n<\/p>\\n<p style=\\\"line-height: 0 !important;\\\">\\n    <img src=\\\"\/img\/d1ee8f3d0eba0040b41cfd518f212728\\\" width=\\\"355\\\" height=\\\"355\\\" title=\\\"\\\" alt=\\\"\\\"\/>\\n    <img src=\\\"\/img\/6233047154ce38f33a4a50987191250e\\\" width=\\\"355\\\" height=\\\"355\\\" title=\\\"\\\" alt=\\\"\\\"\/><br\/>\\n<\/p>\\n<p>\\n    \u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\\n<\/p>\\n<p>\\n    \u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\\n<\/p>\\n<p>\\n    \u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\u56FE\u6587\u4FE1\u606F\\n<\/p>\",\"existSku\":false,\"express\":\"\u81EA\u63D0\",\"id\":\"2020200318204536090\",\"img\":\"d1ee8f3d0eba0040b41cfd518f212728\",\"imgs\":[\"d1ee8f3d0eba0040b41cfd518f212728\",\"6233047154ce38f33a4a50987191250e\"],\"inventory\":9,\"labelPrice\":\"20.00\",\"price\":\"19.90\",\"saleStrategies\":[\"{\\\"attr\\\":\\\"{\\\\\\\"endTime\\\\\\\":\\\\\\\"2020-09-18 19:50:47\\\\\\\",\\\\\\\"minCount\\\\\\\":100,\\\\\\\"sentTime\\\\\\\":\\\\\\\"2020-09-19 18:00:28\\\\\\\"}\\\",\\\"strategyType\\\":1}\"],\"saleUV\":1,\"sales\":0,\"salesTotal\":115,\"skus\":[{\"id\":\"2120042113380410013\",\"inventory\":9,\"price\":\"18.90\",\"title\":\"\u6D4B\u8BD5\u5546\u54C1sku1\u6D4B\u8BD5\u5546\u54C1sku1\u6D4B\u8BD5\u5546\u54C1sku1chl\u6D4B\u8BD5\u5546\u54C1\u6D4B\u8BD5\u5546\u54C1\"}],\"title\":\"chl\u6D4B\u8BD5\u5546\u54C1\u6D4B\u8BD5\u5546\u54C1chl\u6D4B\u8BD5\u5546\u54C1\u6D4B\u8BD5\u5546\u54C1chl\u6D4B\u8BD5\u5546\u54C1\u6D4B\u8BD5\u5546\u54C1\"}", "s": true }
    var detail = JSON.parse(detailResult.d)
    var detailHtml = detail.detail.replace(/\/img\//g, app.globalData.imgPrefix)
    console.log(detailHtml)
    detail.detail = detailHtml
    console.log(detail)
    if (detail.saleStrategies != undefined){
      var tags = []
      for (var i = 0; i < detail.saleStrategies.length; i++){
        var temp = JSON.parse(detail.saleStrategies[i])
        console.log(temp)
        if (temp.strategyType == 1){
          this.setData({
            preStrategy: JSON.parse(temp.attr)
          })
          tags.push("预售")
        }
      }

      tags = app.common.parseDate.getItemTags(detail.saleStrategies)
      this.setData({
        tags: tags
      })
    }

    if(detail.skus != undefined && detail.skus.length > 0){
      var skuTitles = []
      for(var i=0; i<detail.skus.length; i++){
        skuTitles.push(app.common.getShortStr(detail.skus[i].title) + " | ￥" + detail.skus[i].price + " | 库存" + detail.skus[i].inventory)
      }
      this.setData({
        choosedSku: detail.skus[0],
        skuTitles: skuTitles
      })
    }

    this.setData({
      detail: detail
    })
  },

  chooseSku: function(event){
    var index = event.detail.value
    var choosedSku = this.data.detail.skus[index]
    if (choosedSku.inventory < 1){
      wx.showToast({
        title: '该款式没有库存了',
      })
      return
    }
    this.setData({
      choosedSku: choosedSku
    })
  },
  goShop: function(){
    app.common.goPage.goShop()
  },
  goCart: function(){
    app.common.goPage.goCart()
  },
  addCart: function(){
    if (this.data.detail.existSku == true && (this.data.choosedSku == undefined || this.data.choosedSku.id == undefined)) {
      wx.showModal({
        title: '提示',
        content: '请选择款式',
      })
      return
    }

      wx.showToast({
        title: 'add cart ...',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    if (options.id == undefined) {
      wx.showModal({
        title: '参数错误',
        content: '参数错误',
      })
      throw new Error()
    }

    this.getItemDetail(options.id)
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