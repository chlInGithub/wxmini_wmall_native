// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabledAllCheckBox: false,
    checkAllVal: -1,
    showModal: false,
    preCheckedAll: false,
    checkedAll: false,
    computeResult: {
      total: 80,
      coupon: 20,
      couponDetail: {
        totalNoCoupon: 100,
        coupons: [{
            desc: '优惠A熟练度附近',
            amount: 10
          },
          {
            desc: '优惠B熟练度附近',
            amount: 10
          }
        ],
        coupon: 20,
        total: 80
      },
      itemCount: 10
    }
  },
  /**
   * modal
   */
  triggleModal: function() {
    this.setData({
      showModal: !this.data.showModal
    })
    console.log(this.data.showModal)
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
      if (item.checked) {
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

    if (data == "") {
      return false
    }

    // TODO 计算
    console.log("计算购物车金额")

    return true
  },
  /**
   * 准备计算数据
   */
  get_checked_item_string: function(checkedItems) {
    var temp = []
    var presellItems = 0
    for (var i = 0; i < checkedItems.length; i++) {
      var item = checkedItems[i]
      var v = item.itemId + "_" + item.skuId + "_" + item.count
      temp.push()

      if (item.strategyJson.presell != undefined) {
        presellItems++
      }
    }

    if (presellItems >= 2) {
      app.common.showMsg("预售商品必须单独下单")
      return "";
    }

    return temp.toString
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
        app.common.showMsg(item.title + "|" + item.skuTitle + "|" + item.minimum + "件起售")
        return false
      }
      if (item.inventory != undefined && item.count > item.inventory) {
        app.common.showMsg(item.title + "|" + item.skuTitle + "|" + "库存不足")
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
        item.checked = false
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
          if (temp == this.data.checkAllVal) {
            continue
          }

          var item = items[temp]
          item.checked = true
        }
        // this.updateItems()
      }

      if (!preCheckedAll) {
        // 之前 不是 全选 情况
        if (checkedAll && !currentCheckedAll) {
          for (var i = 0; i < items.length; i++) {
            var item = items[i]
            item.checked = true
          }
          // this.updateItems()
        } else if (!checkedAll && currentCheckedAll) {
          checkedAll = true
          /*this.setData({
            checkedAll: true
          })*/
        }
      } else {
        // 之前 是 全选 情况
        if (!checkedAll) {
          for (var i = 0; i < items.length; i++) {
            var item = items[i]
            item.checked = false
          }
          // this.updateItems()
        } else if (!currentCheckedAll) {
          checkedAll = false
          /*this.setData({
            checkedAll: false
          })*/
        }
      }

    } {
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
        preCheckedVals.push(item.checked)
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
          item.checked = false
        }
      } else {
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          item.checked = preCheckedVals[i]
        }
      }
      this.setData({
        items: items,
        checkedAll: this.data.preCheckedAll
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
    var id = app.common.getIndex(event)
    var item = this.data.items[id]
    app.common.goPage.goItemDetail(item.itemId)
  },
  deleteCount: function(event) {
    var id = app.common.getIndex(event)
    var item = app.common.delEleByIndex(this.data.items, id)
    this.data.preCheckedVals.splice(id, 1)
    app.common.postData.addCart({
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
    if (item.checked) {
      this.compute()
    }
  },
  addCount: function(event) {
    var id = app.common.getIndex(event)
    var item = app.common.getEleByIndex(this.data.items, id)
    item.count += 1
    var items = this.data.items
    this.updateItems()
  },
  deductCount: function(event) {
    var id = app.common.getIndex(event)
    var item = app.common.getEleByIndex(this.data.items, id)
    if (item.count > 0) {
      item.count -= 1
      this.updateItems()
    }
  },

  getCartItems: function() {
    var itemsResult = {
      "d": [{
        "checked": false,
        "count": 0,
        "img": "4e461becb82121c7020893221c3e0bfe",
        "inventory": 100,
        "itemId": "2020191111104944216",
        "minimum": 1,
        "price": "99.90",
        "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2020-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"strategyType\":1}"],
        "skuId": "2120042113355210004",
        "skuTitle": "sku\u6807\u98980",
        "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983"
      }, {
        "checked": false,
        "count": 1,
        "img": "4e461becb82121c7020893221c3e0bfe",
        "inventory": 99,
        "itemId": "2020191111104944216",
        "minimum": 1,
        "price": "99.90",
        "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2020-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"strategyType\":1}"],
        "skuId": "2120042113355210005",
        "skuTitle": "sku\u6807\u98981",
        "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983"
      }, {
        "checked": false,
        "count": 1,
        "img": "4e461becb82121c7020893221c3e0bfe",
        "inventory": 100,
        "itemId": "2020191111104944216",
        "minimum": 1,
        "price": "99.90",
        "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2020-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"strategyType\":1}"],
        "skuId": "2120042113355210006",
        "skuTitle": "sku\u6807\u98982",
        "title": "\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983"
      }, {
        "checked": false,
        "count": 5,
        "img": "d1ee8f3d0eba0040b41cfd518f212728",
        "inventory": 9,
        "itemId": "2020200318204536090",
        "minimum": 1,
        "price": "18.90",
        "saleStrategies": ["{\"attr\":\"{\\\"endTime\\\":\\\"2020-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2020-09-19 18:00:28\\\"}\",\"strategyType\":1}"],
        "skuId": "2120042113380410013",
        "skuTitle": "\u6D4B\u8BD5\u5546\u54C1sku1",
        "title": "chl\u6D4B\u8BD5\u5546\u54C1\u6D4B\u8BD5\u5546\u54C1"
      }],
      "s": true
    }
    var items = itemsResult.d
    var itemIds = []
    var indexs = []
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      item.id = item.itemId + "_" + item.skuId
      itemIds.push(item.id)
      indexs.push(i)
    }
    getApp().common.saleStrategyUtil.parseList(items)
    console.log(items)
    this.setData({
      items: items
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      defaultComputeResult: this.data.computeResult
    })
    this.setData(app.globalData)

    this.getCartItems()
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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