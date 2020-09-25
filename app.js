//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    imgPrefix: "https://wx66e252cb46abe8e4.5jym.com/img/"
  },
  common: {
    postData:{
      /**
       * param : {itemId: xx, skuId: xx, count: xx}
       */
      addCart: function(param){
        console.log("addCart")
        console.log(param)
      }
    },
    getData: {
      getAllCates: function(){
        var cates = [
          {
            id: 1236,
            img: "f1dbe88e164b1f7e3cc9110dd503e311",
            name: "名称"
          },
          {
            id: 1234,
            img: "f1dbe88e164b1f7e3cc9110dd503e311",
            name: "名称"
          },
          {
            id: 1235,
            img: "f1dbe88e164b1f7e3cc9110dd503e311",
            name: "名称"
          },
          {
            id: 1237,
            img: "f1dbe88e164b1f7e3cc9110dd503e311",
            name: "名称"
          },
          {
            id: 1238,
            img: "f1dbe88e164b1f7e3cc9110dd503e311",
            name: "名称"
          },
          {
            id: 1239,
            img: "f1dbe88e164b1f7e3cc9110dd503e311",
            name: "名称"
          },
          {
            id: 1240,
            img: "f1dbe88e164b1f7e3cc9110dd503e311",
            name: "名称"
          }
        ]
        return cates
      },
      getAllCoupons: function(){
        var coupons = [
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
        ]
        return coupons
      },
      getAllActivities: function(){
        var activies = [
          {
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
        return activies
      },
      /**
       * param : {}
       */
      getItems: function(param){
        var items = [
          {
            id: 1111,
            title: "商品名称xxxxsxx",
            tags: ['预售', '限购2件'],
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
        ]
        return items
      }
    },
    parseDate: {
      getItemTags: function(strategyArray){
        var tags = []
        // test
        tags.push("限购10件")
        tags.push("2件起售")
        tags.push("订单满100元")

        return tags
      }
    },
    goPage: {
      goShop: function () {
        wx.switchTab({
          url: '../shop/shop'
        })
      },
      goMe: function () {
        wx.switchTab({
          url: '../me/me'
        })
      },
      goCart: function(){
        wx.switchTab({
          url: '../cart/cart'
        })
      },
      /**
       * param: '?key=val&key=val&...'
       */
      goItemList: function (param) {
        wx.navigateTo({
          url: '../itemList/itemList' + param
        })
      },
      goItemDetail: function (id) {
        wx.navigateTo({
          url: '../itemDetail/itemDetail?id=' + id
        })
      }
    },
    getShortStr: function(v, l){
      if(v == undefined){
        return ""
      }
      if(l == undefined){
        l = 8
      }
      if(v.length > l){
        return v.substring(0, l)
      }
      return v
    },
    getEleByIndex: function (arrays, index) {
      var ele = arrays[index]
      return ele
    },
    getIndex: function (event) {
      var id = event.currentTarget.dataset.index
      if (getApp().common.StringUtil.isNotEmpty(id)) {
        return id
      }
      wx.showToast({
        title: '缺少Index',
      })
      throw new Error()
    },
    delEleByIndex: function (arrays, index) {
      var ele = arrays[index]
      arrays.splice(index, 1)
      return ele
    },
    getEleById: function (arrays, id) {
      var ele = arrays.find((ele, index, arrays) => ele.id == id)
      return ele
    },
    delEleById: function (arrays, id) {
      var eleIndex = -1
      var ele
      for(var i=0; i<arrays.length; i++){
        ele = arrays[i]
        if(ele.id == id){
          eleIndex = i
          break
        }
      }
      
      if(eleIndex != -1){
        arrays.splice(eleIndex, 1)
      }

      return ele
    },
    getId: function (event) {
      var id = event.currentTarget.dataset.id
      if(getApp().common.StringUtil.isNotEmpty(id)){
        return id
      }
      wx.showToast({
        title: '缺少ID',
      })
      throw new Error()
    },
    showMsg: function(msg){
      wx.showModal({
        title: '提示',
        content: msg,
      })
    },
    StringUtil : {
      isNotEmpty: function (str) {
        var r = undefined !== str && "" !== str
        return r
      },
      abbreviatory: function (str, maxL) {
        if (!ObjectCommonUtil.isEmpty(str) && str.length > (undefined == maxL ? 10 : maxL)) {
          return str.substring(0, 10) + '…'
        }
        return str
      },
      moneyDesc: function (money) {
        return "￥" + money + "元"
      },
      simplePrint: function (str) {
        if (StringUtil.isNotEmpty(str)) {
          return str
        }
        return '-'
      }
    },
    ObjectCommonUtil: {
      isNotUndefined: function(v){
        return undefined != v
      }
    },
    JsonUtil: {
      toJson: function(v){
        return JSON.parse(v)
      }
    },
    saleStrategyUtil: {
      parseList: function (itemListJson) {
        for (var i = 0; i < itemListJson.length; i++) {
          itemListJson[i]["tags"] = getApp().common.saleStrategyUtil.getSaleStrategyTags(itemListJson[i])
        }
      },
      /**
       * 结果为 { presell : attrJson, minFee : attrJson, minCount : attrJson, maxCount : attrJson, ...}
       * @param strategyList
       */
      parse: function (itemJson) {
        var ObjectCommonUtil = getApp().common.ObjectCommonUtil
        var JsonUtil = getApp().common.JsonUtil
        if (ObjectCommonUtil.isNotUndefined(itemJson.strategyJson)) {
          return itemJson.strategyJson
        }
        var result = {}
        if (ObjectCommonUtil.isNotUndefined(itemJson.saleStrategies)) {
          var strategyList = itemJson.saleStrategies;
          for (var i = 0; i < strategyList.length; i++) {
            var item = JsonUtil.toJson(strategyList[i]);
            if (item.strategyType == 1) {
              result.presell = JsonUtil.toJson(item.attr)
              continue
            }
            if (item.strategyType == 2) {
              result.minFee = JsonUtil.toJson(item.attr)
              continue
            }
            if (item.strategyType == 3) {
              result.minCount = JsonUtil.toJson(item.attr)
              continue
            }
            if (item.strategyType == 4) {
              result.maxCount = JsonUtil.toJson(item.attr)
              continue
            }
          }
        }
        itemJson["strategyJson"] = result
        console.log(itemJson)
      },
      getSaleStrategyTags: function (itemJson) {
        var ObjectCommonUtil = getApp().common.ObjectCommonUtil
        var JsonUtil = getApp().common.JsonUtil

        var row = itemJson
        getApp().common.saleStrategyUtil.parse(row)
        var tags = []
        if (ObjectCommonUtil.isNotUndefined(row.strategyJson.presell)) {
          tags.push('预售')
        }
        if (ObjectCommonUtil.isNotUndefined(row.strategyJson.minFee)) {
          tags.push('订单最少' + row.strategyJson.minFee.minFee + '元')
        }
        if (ObjectCommonUtil.isNotUndefined(row.strategyJson.minCount)) {
          tags.push(row.strategyJson.minCount.minCount + '件起售')
        }
        if (ObjectCommonUtil.isNotUndefined(row.strategyJson.maxCount)) {
          tags.push('限购' + row.strategyJson.maxCount.maxCount + '件')
        }
        return tags
      }
    }
  }
})