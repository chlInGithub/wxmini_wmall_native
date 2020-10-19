// pages/cart/cart.js
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
    disabledAllCheckBox: false,
    checkAllVal: -1,
    preCheckedAll: false,
    checkedAll: false,
    computeResult: {
      total: 0,
      coupon: 0,
      couponDetail: {
        totalNoCoupon: 0,
        coupons: [],
        coupon: 0,
        total: 0
      },
      itemCount: 0
    }
  },

  goShop: function(){
    goPageUtil.goPage.goShop()
  },
  goSettle: function(){
    goPageUtil.goPage.goSettle("?items=" + this.get_settle_data())
  },
  get_settle_data: function () {
    var items = this.data.items
    console.log(items)
    var checkedItems = []
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      if (item['checked']) {
        checkedItems.push(item)
      }
    }

    var temp = []
    for (var i = 0; i < checkedItems.length; i++) {
      var item = checkedItems[i]
      var v = item.itemId + "_" + item.skuId
      temp.push(v)
    }

    return temp.toString()
  },
  /**
   * modal
   */
  triggleModal: function() {
    var t = this.selectComponent(".infoModalComponent")
    t.triggleModal()
  },
  updateItems: function(items) {
    if (undefined == items) {
      items = this.data.items
    }
    this.setData({
      items: items
    })
  },
  cleanComputeResult: function() {
    this.setData({
      computeResult: this.data.defaultComputeResult
    })
  },
  compute: function() {
    console.log("compute")
    var items = this.data.items
    console.log(items)
    var checkedItems = []
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      if (item['checked']) {
        checkedItems.push(item)
      }
    }

    if (checkedItems.length < 1) {
      this.cleanComputeResult()
      return true
    }

    if (!this.check_item_valid(checkedItems)) {
      return false
    }

    var data = this.get_checked_item_string(checkedItems)

    if (!util.objectUtil.verifyValidObject(data)) {
      return false
    }

    // TODO 计算
    //console.log("计算购物车金额")
    var that = this
    requestDataUtil.getData.coumputeCart(
      {
        items: data
      },
      function(data){
        that.setData({
          computeResult: data
        })
      }
    )

    return true
  },
  /**
   * 准备计算数据
   */
  get_checked_item_string: function(checkedItems) {
    var result = ""
    var temp = []
    var presellItems = 0
    for (var i = 0; i < checkedItems.length; i++) {
      var item = checkedItems[i]
      var v = item.itemId + "_" + item.skuId + "_" + item.count
      temp.push(v)

      if (item.strategyJson.presell != undefined) {
        presellItems++
      }
    }

    if (presellItems >= 2) {
      util.showMsg("预售商品必须单独下单")
      return "";
    }

    result = temp.length > 0 ? temp.toString() : ""
    return result
  },
  /**
   * 检查已选购车车商品是否满足限制条件
   */
  check_item_valid: function(itemList) {
    if (itemList == undefined || itemList.length < 1) {
      return false
    }

    for (var i = 0; i < itemList.length; i++) {
      var item = itemList[i]
      if (item.minimum != undefined && item.count < item.minimum) {
        util.showMsg(item.title + "|" + item.skuTitle + "|" + item.minimum + "件起售")
        return false
      }
      if (item.inventory != undefined && item.count > item.inventory) {
        util.showMsg(item.title + "|" + item.skuTitle + "|" + "库存不足")
        return false
      }
    }
    return true
  },

  dealBindChange: function(event) {
    var items = this.data.items
    if (items == undefined) {
      return
    }

    var checkedAll = this.data.checkedAll
    var preCheckedAll = this.data.preCheckedAll

    if (items.length > 0) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        item['checked'] = false
      }

      console.log(event)

      var checkedIndexs = event.detail.value

      // 已选商品数量
      var checkedBoxItemSize = checkedAll ? checkedIndexs.length - 1 : checkedIndexs.length
      var itemSize = items.length

      // 当前情况，已选所有商品？
      var currentCheckedAll = false
      if (checkedBoxItemSize >= items.length) {
        currentCheckedAll = true
      }

      if (checkedBoxItemSize > 0) {
        for (var i = 0; i < checkedIndexs.length; i++) {
          var temp = checkedIndexs[i]
          if (temp === this.data.checkAllVal) {
            continue
          }

          var item = items[temp]
          if(util.objectUtil.isNotUndefined(item)){
            item['checked'] = true
          }
          
        }
      }

      if (!preCheckedAll) {
        // 之前 不是 全选 情况
        if (checkedAll && !currentCheckedAll) {
          for (var i = 0; i < items.length; i++) {
            var item = items[i]
            item['checked'] = true
          }
          // this.updateItems()
        } else if (!checkedAll && currentCheckedAll) {
          checkedAll = true
        }
      } else {
        // 之前 是 全选 情况
        if (!checkedAll) {
          for (var i = 0; i < items.length; i++) {
            var item = items[i]
            item['checked'] = false
          }
        } else if (!currentCheckedAll) {
          checkedAll = false
        }
      }
    }else {
      checkedAll = false
      preCheckedAll = false
    }

    var computeOk = false
    try {
      computeOk = this.compute()
    } catch (e) {
      computeOk = false
    }

    if (computeOk) {
      var preCheckedVals = []
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        preCheckedVals.push(item['checked'])
      }
      this.setData({
        preCheckedVals: preCheckedVals,
        items: items,
        checkedAll: checkedAll,
        preCheckedAll: checkedAll
      })
    } else {
      var preCheckedVals = this.data.preCheckedVals
      if (preCheckedVals == undefined || preCheckedVals.length < 1) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          item['checked'] = false
        }
      } else {
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          item['checked'] = preCheckedVals[i]
        }
      }
      this.setData({
        items: items,
        checkedAll: this.data.preCheckedAll,
        preCheckedVals: preCheckedVals
      })
    }


    console.log(this.data.items)

  },
  bindchange: function(event) {
    this.setData({
      disabledAllCheckBox: true
    })

    this.dealBindChange(event)

    this.setData({
      disabledAllCheckBox: false
    })
  },
  goItemDetail: function(event) {
    // itemId
    var id = util.eventUtil.getIndex(event)
    var item = this.data.items[id]
    goPageUtil.goPage.goItemDetail(item.itemId)
  },
  deleteCount: function(event) {
    var id = util.eventUtil.getIndex(event)
    var item = util.arrayUtil.delEleByIndex(this.data.items, id)
    if (util.objectUtil.verifyValidObject(this.data.preCheckedVals)){
      this.data.preCheckedVals.splice(id, 1)
    }
    
    requestDataUtil.postData.addCart({
      itemId: item.itemId,
      skuId: item.skuId,
      count: 0
    })
    this.updateItems()
    if (this.data.items.length < 1 && this.data.checkedAll) {
      this.setData({
        checkedAll: false
      })
    }
    if (item['checked']) {
      this.compute()
    }
  },
  addCount: function(event) {
    var id = util.eventUtil.getIndex(event)
    var item = util.arrayUtil.getEleByIndex(this.data.items, id)
    item.count += 1
    var items = this.data.items
    var that = this
    requestDataUtil.postData.changeCountCart({
      itemId: item.itemId,
      skuId: item.skuId,
      count: item.count
    },
    function(data){
      that.updateItems()
      that.compute()
    }
    )
  },
  deductCount: function(event) {
    var id = util.eventUtil.getIndex(event)
    var item = util.arrayUtil.getEleByIndex(this.data.items, id)
    if (item.count > 1) {
      item.count -= 1

      var that = this
      requestDataUtil.postData.changeCountCart({
        itemId: item.itemId,
        skuId: item.skuId,
        count: item.count
      },
        function (data) {
          that.updateItems()
          that.compute()
        }
      )
    }
  },

  getCartItems: function() {
    var that = this
    requestDataUtil.getData.getAllCartItems(function(data){
      if(!util.arrayUtil.isArray(data)){
        data = []
      }
      var items = data
      var itemIds = []
      var indexs = []
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        item.id = item.itemId + "_" + item.skuId
        itemIds.push(item.id)
        indexs.push(i)
      }
      saleStrategyUtil.parseList(items)
      console.log(items)
      that.setData({
        items: items
      })
      that.compute()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      defaultComputeResult: this.data.computeResult
    })
    util.initPage(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCartItems()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      items: []
    })
    this.cleanComputeResult()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getCartItems()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})