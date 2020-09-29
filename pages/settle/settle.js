// pages/settle/settle.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentEditDeliver: {}

  },
  regionChange: function(event){
    console.log(event.detail)
    var code = event.detail.code.join(" ")
    var value = event.detail.value.join(" ")
    var postcode = event.detail.postcode
    this.setData({
      currentEditDeliverCity: value,
      currentEditDeliverCode: code,
      currentEditDeliverPostcode: postcode
    })
  },
  chooseReceiver: function(event){
    console.log("chooseReceiver")
    var index = app.common.getIndex(event)
    var deliver = this.data.delivers[index]
    this.setData({
      choosedDeliver: deliver
    })
    this.showChooseReceiveModal()
  },
  showChooseReceiveModal: function(){
    var t = this.selectComponent(".deliverListModal")
    t.triggleModal()
  },
  setCurrentEditDeliver: function(){
    var currentEditDeliver = this.data.currentEditDeliver
    if (undefined == currentEditDeliver) {
      this.setData({
        currentEditDeliverName: "",
        currentEditDeliverMobile: "",
        currentEditDeliverCity: "",
        currentEditDeliverAddress: "",
        currentEditDeliverDefaultSelected: false
      })
    }else{
      this.setData({
        currentEditDeliverName: currentEditDeliver["name"],
        currentEditDeliverMobile: currentEditDeliver["mobile"],
        currentEditDeliverCity: currentEditDeliver["city"],
        currentEditDeliverAddress: currentEditDeliver["address"],
        currentEditDeliverDefaultSelected: currentEditDeliver["currentEditDeliverDefaultSelected"]
      })
    }
  },
  getCurrentEditDeliver: function(){
    var currentEditDeliver = this.data.currentEditDeliver
    if(undefined == currentEditDeliver){
      currentEditDeliver = {}
    }
    currentEditDeliver["name"] = this.data.currentEditDeliverName
    currentEditDeliver["mobile"] = this.data.currentEditDeliverMobile
    currentEditDeliver["city"] = this.data.currentEditDeliverCity
    currentEditDeliver["code"] = this.data.currentEditDeliverCode
    currentEditDeliver["postcode"] = this.data.currentEditDeliverPostcode
    currentEditDeliver["address"] = this.data.currentEditDeliverAddress
    currentEditDeliver["currentEditDeliverDefaultSelected"] = this.data.currentEditDeliverDefaultSelected
    return currentEditDeliver
  }, 
  cleanCurrentEditDeliver: function () {
    this.setData({currentEditDeliver: {}})
  },
  saveDeliver: function(){
    var currentEditDeliver = this.getCurrentEditDeliver()
    if (!app.common.StringUtil.isNotEmpty(currentEditDeliver.name)){
      app.common.showMsg("请填写收货人姓名")
      return
    }
    if (!app.common.StringUtil.isNotEmpty(currentEditDeliver.mobile)) {
      app.common.showMsg("请填写收货人手机号")
      return
    }
    if (!app.common.StringUtil.isNotEmpty(currentEditDeliver.city) || !app.common.StringUtil.isNotEmpty(currentEditDeliver.postcode)) {
      app.common.showMsg("请填写收货人地址")
      return
    }
    if (!app.common.StringUtil.isNotEmpty(currentEditDeliver.address)) {
      app.common.showMsg("请填写收货人详细地址")
      return
    }
    // TODO
    var newId = 1;


    if (currentEditDeliver.id != undefined){
      var ele = app.common.getEleById(this.data.delivers , currentEditDeliver.id)
      ele["name"] = currentEditDeliver.name
      ele["mobile"] = currentEditDeliver.mobile
      ele["city"] = currentEditDeliver.city
      ele["code"] = currentEditDeliver.code
      ele["postcode"] = currentEditDeliver.postcode
      ele["address"] = currentEditDeliver.address
      ele["defaultSelected"] = currentEditDeliver.defaultSelected

      if (currentEditDeliver.id == this.data.choosedDeliver.id){
        this.setData({
          choosedDeliver: ele
        })
      }
    }else{
      currentEditDeliver["id"] = newId
      app.common.addEle(this.data.delivers, currentEditDeliver)
    }

    this.setData({
      delivers: this.data.delivers,
      currentEditDeliver: {}
    })

    this.showEditReceiveModal()
  },
  deleteDeliver: function(event){
    var id = app.common.getId(event)
    var currentEditDeliver = this.data.currentEditDeliver
    if(id != currentEditDeliver.id){
      wx.showModal({
        title: '提示',
        content: 'ID错误',
      })
    }else{
      console.log(currentEditDeliver)
      //TODO



      app.common.delEleById(this.data.delivers, id)
      this.setData({
        delivers: this.data.delivers,
        currentEditDeliver: {}
      })

      if (currentEditDeliver.id == this.data.choosedDeliver.id) {
        this.setData({
          choosedDeliver: false
        })
      }
    }
    this.showEditReceiveModal()
  },
  addReceiver: function (event) {
    this.setCurrentEditDeliver()
    this.showEditReceiveModal()
    console.log(this.data.currentEditDeliver)
  },
  editReceiver: function(event){
    var index = app.common.getIndex(event)
    var deliver = this.data.delivers[index]
    this.setData({
      currentEditDeliver: deliver
    })
    this.setCurrentEditDeliver()
    this.showEditReceiveModal()
    console.log(this.data.currentEditDeliver)
  },
  showEditReceiveModal: function () {
    var t = this.selectComponent(".deliverEditModal")
    t.triggleModal()
  },
  chooseDeliverType: function(event){
    var index = event.detail.value
    var deliverType = this.data.deliverTypes[index]
    if (deliverType == undefined) {
      wx.showToast({
        title: '配送方式错误',
      })
      return
    }
    this.setData({
      choosedDeliverType: deliverType
    })
  },
  choosePayType: function (event) {
    var index = event.detail.value
    var payType = this.data.payTypes[index]
    if (payType == undefined) {
      wx.showToast({
        title: '支付方式错误',
      })
      return
    }
    this.setData({
      choosedPayType: payType
    })
  },
  getItems: function(){
    var result = { "d": [{ "checked": false, "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "inventory": 100, "itemId": "2020191111104944216", "minimum": 1, "price": "99.90", "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"strategyType\":1}"], "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }, { "checked": false, "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "inventory": 100, "itemId": "2020191111104944216", "minimum": 1, "price": "99.90", "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"strategyType\":1}"], "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }, { "checked": false, "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "inventory": 100, "itemId": "2020191111104944216", "minimum": 1, "price": "99.90", "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"strategyType\":1}"], "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }, { "checked": false, "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "inventory": 100, "itemId": "2020191111104944216", "minimum": 1, "price": "99.90", "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"strategyType\":1}"], "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }, { "checked": false, "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "inventory": 100, "itemId": "2020191111104944216", "minimum": 1, "price": "99.90", "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"strategyType\":1}"], "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }, { "checked": false, "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "inventory": 100, "itemId": "2020191111104944216", "minimum": 1, "price": "99.90", "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"strategyType\":1}"], "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }], "s": true }
    var items = result.d
    app.common.saleStrategyUtil.parseList(items)
    this.setData({
      items: items
    })
  },
  compute: function(){
    var result = { "d": { "coupon": "5.00", "couponDetailList": [{ "coupon": "5.00", "name": "\u4F18\u60E0\u5238\u6D4B\u8BD51" }], "deliverDesc": "\u81EA\u63D0", "estimatedDatesBeforeReceive": 0, "itemCount": 1, "itemList": [{ "count": 1, "img": "4e461becb82121c7020893221c3e0bfe", "itemId": "2020191111104944216", "price": "99.90", "skuId": "2120042113355210004", "skuTitle": "sku\u6807\u98980", "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983" }], "total": "94.90", "usedReceiveInfo": { "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50", "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A", "defaultSelected": false, "mobile": "18500425785", "name": "\u6D4B\u8BD5" } }, "s": true }
    this.setData({
      computeResult: result.d,
      choosedDeliver: result.d.usedReceiveInfo
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(app.globalData)

    var itemsParam = options.items
    // TODO
    itemsParam = " t "

    if (!app.common.StringUtil.isNotEmpty(itemsParam)){
      app.common.showMsg("缺少商品数据")
      return
    }

    this.getItems()
    var delivers = app.common.getData.getDelivers()
    var payTypes = app.common.getData.getPayTypes()
    var deliverTypes = app.common.getData.getDeliverTypes()
    var deliverDescs = []
    for(var i=0; i<deliverTypes.length; i++){
      var temp = deliverTypes[i]
      deliverDescs.push(temp.desc)
    }
    var payDescs = []
    for (var i = 0; i < payTypes.length; i++) {
      var temp = payTypes[i]
      payDescs.push(temp.desc)
    }
    console.log(payDescs)
    this.setData({
      delivers: delivers,
      payTypes: payTypes,
      deliverTypes: deliverTypes,
      deliverDescs: deliverDescs,
      payDescs: payDescs
    })

    this.compute()
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