const util = require('./util.js')
const requestUtil = require('./request.js')

var postData = {
  delDeliver: function (receiveId, sucCallback) {
    requestUtil.request({
      url: "/wmall/deliver/del",
      data: {
        id: receiveId
      },
      method: 'POST',
      successCallBack: function (data) {
        util.showMsg("删除收货地址成功")
        getApp().delCache('delivers')
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(receiveId)
        }
      },
      failCallBack: function () {
        util.showMsg("删除收货地址失败")
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })

  },
  saveDeliver: function (param, sucCallback) {
    requestUtil.request({
      url: "/wmall/deliver/save",
      data: param,
      method: 'POST',
      successCallBack: function (data) {
        util.showMsg("保存收货地址成功")

        getApp().delCache('delivers')
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function () {
        util.showMsg("保存收货地址失败")
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })

  },
  /**
   * param : {itemId: xx, skuId: xx, count: xx}
   */
  addCart: function(param, sucCallback) {
    console.log("addCart")
    console.log(param)

    requestUtil.request({
      url: "/wmall/cart/addItem",
      data: param,
      method: 'POST',
      successCallBack: function (data) {
        util.showMsg("已加入购物车")
        getApp().delCache('cartItems')
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function () {
        util.showMsg("加入购物车失败")
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
        util.showMsg("领取优惠券成功")
      },
      failCallBack: function () {
        util.showMsg("领取优惠券失败")
      }
    })
  }
}
var getData = {
  getPrePay: function (orderId, sucCallback){
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
        failCallBack: function () {
          util.showMsg("生成预支付订单失败")
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
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
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
      failCallBack: function () {
        util.showMsg("获取订单信息失败")
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
      failCallBack: function () {
        util.showMsg("获取商品信息失败")
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
      failCallBack: function () {
        // util.showMsg("获取订单信息失败")
      }
    })
  },
  computeSettle: function(data, sucCallback){
    requestUtil.request({
      url: "/wmall/settle/compute",
      data: data,
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function () {
        util.showMsg("计算订单金额失败")
      }
    })
  },
  coumputeCart: function (data,callback) {

    requestUtil.request({
      url: "/wmall/cart/compute",
      data: data,
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function () {
        util.showMsg("计算购物车金额失败")
      }
    })
  },
  getAllCartItems: function (callback) {
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
      failCallBack: function () {
        util.showMsg("获取购物车信息失败")
      }
    })
  },
  getSettleItems: function(data, callback){
    requestUtil.request({
      url: "/wmall/cart/items",
      data: {},
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function () {
        util.showMsg("获取下单商品失败")
      }
    })
  },
  getItemDetail: function(id, sucCallback, failCallback){
    // cache
    var cacheKey = 'cacheItemDetail' + id
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(callback)) {
        callback(cache)
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
      failCallBack: function () {
        util.showMsg("获取商品信息失败")
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
      return
    }

    requestUtil.request({
      url: "/wmall/shop/simple",
      data: {
        needMoreShopInfo: 1
      },
      method: 'POST',
      successCallBack: function(data){
        console.log(data)
        getApp().globalData.simple = data
      },
      failCallBack: function(){
        util.showMsg("获取店铺信息失败")
      }
    })

    /**var result = {
      "d": {
        "shop": {
          "id": "1",
          "img": "39059c4feb06ee3ed00b1e859f4c3264",
          "name": "\u5E97\u94FA\u540D\u79F02"
        },
        "user": {
          "hasPhone": true,
          "id": "4520070814340810001",
          "img": "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83eoHhjCfjpicq5Aynkhqcsr84GVtMSxB5AePA5JBnWqSyRUzZ6T5BMEVxJx68WqAtfN1HHFbKnibLD0A\/132",
          "name": "Henry"
        }
      },
      "s": true
    }
    return result.d**/
  },
  getDelivers: function(sucCallback) {
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
      failCallBack: function () {
        util.showMsg("获取收货地址信息失败")
      }
    })
  },
  getDeliverTypes: function() {
    var result = [{
      desc: '自提',
      code: 0
    },
    {
      desc: '快递/配送',
      code: 2
    }
    ]
    return result
  },
  getPayTypes: function(sucCallback) {
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
      failCallBack: function () {
        util.showMsg("获取支付方式失败")
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
      failCallBack: function () {
        util.showMsg("获取类目信息失败")
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
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(callback)) {
          callback(data)
        }
      },
      failCallBack: function () {
        util.showMsg("获取优惠券信息失败")
      }
    })

    /**var coupons = [{
      id: 11,
      meet: 50,
      discount: 5,
      name: "某某优惠券1",
      validTime: "2020-09-11 00:00:00",
      invalidTime: "2020-10-11 00:00:00",
      got: 1
    }, {
      id: 21,
      meet: 50,
      discount: 10,
      name: "某某优惠券2",
      validTime: "2020-09-11 00:00:00",
      invalidTime: "2020-10-11 00:00:00",
      got: 1
    }]
    return coupons**/
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
      failCallBack: function () {
        util.showMsg("获取活动信息失败")
      }
    })


    /**var activies = [{
      id: 111,
      name: "中秋活动",
      img: "4d90e412c5297ccdcaae2ac200614794",
      validTime: "2020-09-11 00:00:00",
      invalidTime: "2020-10-11 00:00:00",
      desc: "你好好 塑料袋分离式的傅雷家书了地方了水电费螺丝刀傅雷家书两地分居数量决定父类数据辅导老师解放东路手机登录飞机上两地分居酸辣粉塑料袋发牢骚发牢骚杰弗里斯雷锋精神两地分居数量积分乐山大佛老司机地漏房"
    },
    {
      id: 112,
      name: "国庆活动",
      img: "4d90e412c5297ccdcaae2ac200614794",
      validTime: "2020-09-11 00:00:00",
      invalidTime: "2020-10-11 00:00:00",
      desc: "你好好 塑料袋分离式的傅雷家书了地方了水电费螺丝刀傅雷家书两地分居数量决定父类数据辅导老师解放东路手机登录飞机上两地分居酸辣粉塑料袋发牢骚发牢骚杰弗里斯雷锋精神两地分居数量积分乐山大佛老司机地漏房"
    }
    ]
    return activies**/
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
      function () {
        util.showMsg("获取推荐商品信息失败")
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
      function () {
        util.showMsg("获取今日低价商品信息失败")
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
      failCallBack: function () {
        util.showMsg("获取商品信息失败")
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  }
}

module.exports = {
  postData: postData,
  getData: getData
}