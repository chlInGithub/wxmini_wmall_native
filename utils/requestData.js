const util = require('./util.js')
const requestUtil = require('./request.js')
const goPageUtil = require('./goPage.js')

var postData = {
  successOrder: function (orderId, sucCallback, failCallBack) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/order/success",
      data: {
        orderId: orderId
      },
      method: 'POST',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("确认收货失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  refundApply: function (data, sucCallback, failCallBack) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    if (data.type == undefined) {
      util.showMsg("请选择退款类型");
      return false;
    }
    if (data.cause == undefined || data.cause.length < 1) {
      util.showMsg("请填写退款原因")
      return false
    }
    if (data.applyFee == undefined) {
      util.showMsg("请填写退款金额")
      return false
    }
    if (data.orderId == undefined) {
      util.showMsg("缺少订单ID")
      return false
    }

    requestUtil.request({
      url: "/wmall/order/refundApply",
      data: data,
      method: 'POST',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("申请退款失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  createOrder: function(data, sucCallback, failCallback){
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/order/new",
      data: data,
      method: 'POST',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("创建订单失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  delOrder: function (orderId, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/order/del",
      data: {
        orderId: orderId
      },
      method: 'POST',
      successCallBack: function (data) {
        util.showToast("删除订单成功")
        getApp().delCache('orderDetail' + orderId)
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("删除订单失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })

  },
  delDeliver: function (receiveId, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/deliver/del",
      data: {
        id: receiveId
      },
      method: 'POST',
      successCallBack: function (data) {
        util.showToast("删除收货地址成功")
        getApp().delCache('delivers')
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("删除收货地址失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })

  },
  saveDeliver: function (param, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/deliver/save",
      data: param,
      method: 'POST',
      successCallBack: function (data) {
        util.showToast("保存收货地址成功")

        getApp().delCache('delivers')
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("保存收货地址失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })

  },
  /**
   * param : {itemId: xx, skuId: xx, count: xx}
   */
  addCart: function (param, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if(!checkResult){
      return
    }
    requestUtil.request({
      url: "/wmall/cart/addItem",
      data: param,
      method: 'POST',
      successCallBack: function (data) {
        var msg = "已加入购物车"
        if(param.count < 1){
          msg = "商品已移出购物车"
        }
        util.showToast(msg)
        getApp().delCache('cartItems')
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        var msg = "加入购物车失败!"
        if (param.count < 1) {
          msg = "商品移出购物车失败!"
        }
        util.showMsg(msg + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })

  },
  changeCountCart: function (param, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/cart/addItem",
      data: param,
      method: 'POST',
      successCallBack: function (data) {
        getApp().delCache('cartItems')
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        var msg = "变更购物车商品失败!"
        util.showMsg(msg + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })

  },
  getCoupons: function(id, sucCallback){
    requestUtil.request({
      url: "/wmall/user/gainCoupon",
      data: {
        couId: id
      },
      method: 'GET',
      successCallBack: function (data) {
        sucCallback(id)
        var couponsEle = util.arrayUtil.getEleById(getApp().globalData.cacheAllCoupons, id)
        if(util.objectUtil.verifyValidObject(couponsEle)){
          couponsEle.got = 1
        }
        util.showToast("领取优惠券成功")
      },
      failCallBack: function (m) {
        util.showMsg("领取优惠券失败!" + m)
      }
    })
  }
}
var getData = {
  getShareInfo: function (data, sucCallback, failCallback){
    requestUtil.request(
      {
        url: '/wmall/share/info',
        data: data,
        method: 'GET',
        successCallBack: function (data) {
          console.log(data)

          if (util.objectUtil.isFunction(sucCallback)) {
            sucCallback(data)
          }
        },
        failCallBack: function (m) {
          util.showMsg("获取分享数据失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(data)
          }
        }
      }
    )
  },
  getPrePay: function (orderId, sucCallback, failCallback){
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request(
      {
        url: '/wmall/wxpay/prePay',
        data: {
          orderId: orderId
        },
        method: 'POST',
        successCallBack: function (data) {
          console.log(data)

          if (util.objectUtil.isFunction(sucCallback)) {
            sucCallback(data)
          }
        },
        failCallBack: function (m) {
          util.showMsg("生成预支付订单失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(data)
          }
        }
      }
    )
  },
  getOrderDetail: function (id, sucCallback, failCallback) {
    // cache
    var cacheKey = 'orderDetail' + id
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(sucCallback)) {
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/order/detail",
      data: {
        orderId: id
      },
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data, 10)
        }

        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取订单信息失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  getOrders: function (param, sucCallback, failCallback) {

    requestUtil.request({
      url: "/wmall/order/list",
      data: param,
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取商品信息失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  getOrderStatusCount: function (callback) {
    // cache
    var cacheKey = 'orderStatusCount'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/order/status",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey,data,10)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取订单状态数量失败!" + m)
      }
    })
  },
  computeSettle: function(data, callback,failCallback){
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/settle/compute",
      data: data,
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("计算订单金额失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  coumputeCart: function (data,callback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/cart/compute",
      data: data,
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("计算购物车金额失败!" + m)
      }
    })
  },
  getAllCartItems: function (callback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    // cache
    var cacheKey = 'cartItems'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/cart/items",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data, 60 * 10)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取购物车信息失败!" + m)
      }
    })
  },
  getSettleItems: function(data, callback){
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    requestUtil.request({
      url: "/wmall/cart/items",
      data: data,
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取下单商品失败!" + m)
      }
    })
  },
  getItemDetail: function(id, sucCallback, failCallback){
    // cache
    var cacheKey = 'cacheItemDetail' + id
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(sucCallback)) {
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/item/detail",
      data: {
        id: id
      },
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if(util.jsonUtil.hasData(data)){
          getApp().addCache(cacheKey, data)
        }

        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取商品信息失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  getShopSimpleInfo: function(sucCallback) {
    // cache
    var cache = getApp().globalData.simple
    if (util.objectUtil.verifyValidObject(cache)) {
      if(util.objectUtil.isFunction(sucCallback)){
        sucCallback()
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/simple",
      data: {
        needMoreShopInfo: 1
      },
      method: 'POST',
      successCallBack: function(data){
        getApp().globalData.simple = data
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback()
        }
      },
      failCallBack: function(m){
        util.showMsg("获取店铺信息失败!" + m)
      }
    })
  },
  getShopDeliveryAreas: function(callback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    // cache
    var cacheKey = 'shopDeliveryAreas'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/deliveryAreas",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        if (util.jsonUtil.hasData(data)) {
          getApp().globalData.shopDeliveryAreas = data
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取配送地址范围失败!" + m)
      }
    })
  },
  getDelivers: function(callback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }
    // cache
    var cacheKey = 'delivers'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/deliver/list",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取收货地址信息失败!" + m)
      }
    })
  },
  getDeliverTypes: function(callback) {
    // cache
    var cacheKey = 'deliveryTypes'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/deliveryType",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取交付方式失败!" + m)
      }
    })
  },
  getPayTypes: function(callback) {
    // cache
    var cacheKey = 'payTypes'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/payType",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取支付方式失败!" + m)
      }
    })
  },
  getAllCates: function(callback) {
    // cache
    var cacheKey = 'cates'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)){
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/cates",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取类目信息失败!" + m)
      }
    })
  },
  getAllCoupons: function(callback) {
    // cache
    var cacheKey = 'coupons'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/coupons",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data, 60)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取优惠券信息失败!" + m)
      }
    })
  },

  getUserCoupons: function (callback) {
    // cache
    var cacheKey = 'userCoupons'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/user/coupons",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data, 20)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取优惠券信息失败!" + m)
      }
    })
  },
  getAllActivities: function(callback) {
    // cache
    var cacheKey = 'activities'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }
    requestUtil.request({
      url: "/wmall/shop/acts",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if(util.objectUtil.isFunction(callback)){
          callback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取活动信息失败!" + m)
      }
    })
  },
  getRecommendedItemList: function(callback){
    // cache
    var cacheKey = 'recommendedItemList'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    getData.getItems(
      {
      type: 2,
      pageSize: 10
      }, 
      function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey,data)
        }

        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      function (m) {
        util.showMsg("获取推荐商品信息失败!" + m)
      }
      )
  },
  getTodayLowPriceItemList: function(callback){
    // cache
    var cacheKey = 'todayLowPriceItemList'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
      }
      return
    }

    getData.getItems(
      {
        type: 3,
        pageSize: 4
      },
      function (data) {
        console.log(data)
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey,data)
        }

        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      function (m) {
        util.showMsg("获取今日低价商品信息失败!" + m)
      }
    )
  },
  /**
   * param : {type:热卖 1、推荐 2、今日低价 3,title:xxx,couponId:xx,activityId:xx,cateId:xx，pageSize:10, pageIndex:1}
   */
  getItems: function(param, sucCallback, failCallback) {

    requestUtil.request({
      url: "/wmall/item/list",
      data: param,
      method: 'GET',
      successCallBack: function (data) {
        console.log(data)
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        //util.showMsg("获取商品信息失败")
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(m)
        }
      }
    })
  },
  getBYImg: function(sucCallback) {
    // cache
    var cacheKey = 'bySiteImg'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if(util.objectUtil.isFunction(sucCallback)){
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/by",
      data: {},
      method: 'GET',
      successCallBack: function(data){
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function(m){
        util.showMsg("获取博予科技二维码失败!")
      }
    })
  },
  getMyShare: function(sucCallback){
    // cache
    var cacheKey = 'myShares'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(sucCallback)) {
        sucCallback(cache)
      }
      return
    }
    requestUtil.request({
      url: "/wmall/user/myShares",
      data: {},
      method: 'GET',
      successCallBack: function(data){
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data, 30)
        }
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function(m){
        util.showMsg("获取我的分享失败!")
      }
    })
  }
}

module.exports = {
  postData: postData,
  getData: getData
}