//app.js
App({
  onLaunch: function() {
    this.globalData.shopId = wx.getExtConfigSync().shopId,
    this.globalData.tId = wx.getExtConfigSync().tId,
    this.globalData.appId = wx.getExtConfigSync().appId
    this.globalData.shopName = wx.getExtConfigSync().shopName
    this.globalData.domain = wx.getExtConfigSync().domain
    this.globalData.requestDomain = wx.getExtConfigSync().requestDomain
    this.globalData.requestUrlPrefix = "https://" + this.globalData.requestDomain + "/"
    this.globalData.shopImg = this.globalData.requestUrlPrefix + "/img/" + wx.getExtConfigSync().shopImg
    this.globalData.imgPrefix = this.globalData.requestUrlPrefix + "/img/"


    // 登录
    this.refreshLoginCode()
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

    var simple = this.common.getData.getShopSimpleInfo()
    this.globalData.simple = simple
  },
  globalData: {
    userInfo: null,
    progressText: "正在努力打开页面……"
  },
  refreshLoginCode: function () {
    wx.login({
      success: res => {
        console.log(res)
        var code = res.code
        getApp().globalData.loginCode = loginCode
        console.log("globalData : " + this.globalData)
      }
    })
  },
  setOpenId: function (openId) {
    this.globalData.openId = openId
    console.log("globalData : " + this.globalData)
  },
  setScene: function (scene) {
    this.globalData.scene = scene
  },
  getAndClearScene: function () {
    var scene = this.globalData.scene
    this.globalData.scene = null
    return scene
  },

  common: {
    request: function(context) {
      var url = context.url
      if(common.ObjectCommonUtil.isEmpty(url)){
        common.showMsg("缺少URL")
        return
      }
      var data = context.data
      var method = context.method
      if (common.ObjectCommonUtil.isEmpty(method)){
        method = "GET"
      }
      var successCallBack = context.successCallBack
      if(typeof successCallBack !== 'function'){
        successCallBack= function(){}
      }
      var failCallBack = context.failCallBack
      if (typeof failCallBack !== 'function') {
        failCallBack = function () { }
      }

      wx.showLoading({
        title: '努力处理中',
      })

      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: method,
        complete(res) {
          wx.hideLoading()
        },
        fail(res) {
          var resultStr = JSON.stringify(res)
          if (resultStr.indexOf("登录") || resultStr.indexOf("no Login")) {
            wx.showToast({
              title: '登录失效',
            })
            app.goPage.goShop()
            return
          }

          wx.showModal({
            title: '错误提示',
            content: resultStr,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }


              failCallBack(res)
            }
          })
        },
        success(res) {
          var resultStr = JSON.stringify(res)

          console.log(res.data)
          if (res.data.s) {
            successCallBack(res)
          } else {
            if (resultStr.indexOf("登录") || resultStr.indexOf("no Login")) {
              wx.showToast({
                title: '登录失效',
              })
              app.goPage.goShop()
              return
            }

            wx.showModal({
              title: '提示',
              content: JSON.stringify(res),
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }

                failCallBack(res)
              }
            })
          }
        }
      })
    },
    postData: {
      /**
       * param : {itemId: xx, skuId: xx, count: xx}
       */
      addCart: function(param) {
        console.log("addCart")
        console.log(param)
      }
    },
    getData: {
      getShopSimpleInfo: function() {
        var result = {
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
        return result.d
      },
      getDelivers: function() {
        var result = {
          "d": [{
            "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50",
            "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A",
            "code": "120000 120100 120102",
            "defaultSelected": true,
            "id": "4620071015041510001",
            "mobile": "18500425781",
            "name": "\u6D4B\u8BD5"
          }, {
            "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50",
            "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A",
            "code": "120000 120100 120102",
            "defaultSelected": false,
            "id": "4620071015041510002",
            "mobile": "18500425782",
            "name": "\u6D4B\u8BD5"
          }, {
            "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50",
            "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A",
            "code": "120000 120100 120102",
            "defaultSelected": false,
            "id": "4620071015041510003",
            "mobile": "18500425783",
            "name": "\u6D4B\u8BD5"
          }, {
            "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50",
            "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A",
            "code": "120000 120100 120102",
            "defaultSelected": false,
            "id": "4620071015041510004",
            "mobile": "18500425784",
            "name": "\u6D4B\u8BD5"
          }, {
            "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50",
            "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A",
            "code": "120000 120100 120102",
            "defaultSelected": false,
            "id": "4620071015041510005",
            "mobile": "18500425785",
            "name": "\u6D4B\u8BD5"
          }, {
            "address": "\u5065\u5065\u5EB7\u5EB7\u5FEB\u5FEB\u4E50\u4E50",
            "city": "\u5929\u6D25\u5E02 \u5E02\u8F96\u533A \u6CB3\u4E1C\u533A",
            "code": "120000 120100 120102",
            "defaultSelected": false,
            "id": "4620071015041510006",
            "mobile": "18500425786",
            "name": "\u6D4B\u8BD5"
          }],
          "s": true
        }
        return result.d
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
      getPayTypes: function() {
        var result = {
          "d": [{
            "code": 2,
            "desc": "\u7EBF\u4E0B\u652F\u4ED8"
          }, {
            "code": 0,
            "desc": "\u5FAE\u4FE1\u652F\u4ED8"
          }],
          "s": true
        }
        return result.d
      },
      getAllCates: function() {
        var cates = [{
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
      getAllCoupons: function() {
        var coupons = [{
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
        return coupons
      },
      getAllActivities: function() {
        var activies = [{
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
       * param : {type:热卖 1、推荐 2,title:xxx,couponId:xx,activityId:xx,cateId:xx}
       */
      getItems: function(param) {
        var items = [{
          id: 1111,
          title: "商品名称xxxxsxx",
          tags: ['预售', '限购2件'],
          labelPrice: 199,
          price: 99,
          sale: 10,
          existSku: true,
          inventory: 100,
          img: "6233047154ce38f33a4a50987191250e"
        }, {
          id: 1111,
          title: "商品名称xxxxxxx",
          price: 99,
          tags: ['预售', '2件起售', '订单最低99元'],
          sale: 100,
          existSku: true,
          inventory: 0,
          img: "6233047154ce38f33a4a50987191250e"
        }, {
          id: 1111,
          title: "商品名称xxxdddddxxxx",
          price: 99,
          sale: 1000,
          existSku: true,
          inventory: 100,
          img: "6233047154ce38f33a4a50987191250e"
        }, {
          id: 1111,
          title: "商品名称xxx333333333333xxxx",
          price: 99,
          sale: 1,
          existSku: true,
          inventory: 100,
          img: "6233047154ce38f33a4a50987191250e"
        }, {
          id: 1111,
          title: "商品名称xxxd22222222xxxx",
          price: 99,
          sale: 100,
          existSku: true,
          inventory: 100,
          img: "6233047154ce38f33a4a50987191250e"
        }]
        return items
      }
    },
    parseDate: {
      getItemTags: function(strategyArray) {
        var tags = []
        // test
        tags.push("限购10件")
        tags.push("2件起售")
        tags.push("订单满100元")

        return tags
      }
    },
    goPage: {
      /**
       * param ( ?key=xx&key=xx...)
       */
      goSettle: function(param) {
        if (undefined == param) {
          param = ""
        }
        wx.navigateTo({
          url: '../settle/settle' + param
        })
      },
      goWXLogin: function() {
        wx.navigateTo({
          url: '../wxLogin/wxLogin'
        })
      },
      goCouponsList: function() {
        wx.navigateTo({
          url: '../couponsList/couponsList'
        })
      },
      goShop: function() {
        wx.switchTab({
          url: '../shop/shop'
        })
      },
      goMe: function() {
        wx.switchTab({
          url: '../me/me'
        })
      },
      goCart: function() {
        wx.switchTab({
          url: '../cart/cart'
        })
      },
      /**
       * param: '?code=val&key=val&...'
       */
      goOrderList: function(param) {
        if (undefined == param) {
          param = ""
        }
        wx.navigateTo({
          url: '../orderList/orderList' + param
        })
      },
      goOrderDetail: function(id) {
        wx.navigateTo({
          url: '../orderDetail/orderDetail?id=' + id,
        })
      },
      /**
       * param: '?key=val&key=val&...'
       */
      goItemList: function(param) {
        if (undefined == param) {
          param = ""
        }
        wx.navigateTo({
          url: '../itemList/itemList' + param
        })
      },
      goItemDetail: function(id) {
        wx.navigateTo({
          url: '../itemDetail/itemDetail?id=' + id
        })
      }
    },
    getParaFromEvent: function(event, name, must) {
      var id = event.currentTarget.dataset[name]
      if (getApp().common.StringUtil.isNotEmpty(id)) {
        return id
      }
      if (must) {
        wx.showToast({
          title: '缺少' + name,
        })
        throw new Error()
      }
    },
    getShortStr: function(v, l) {
      if (v == undefined) {
        return ""
      }
      if (l == undefined) {
        l = 8
      }
      if (v.length > l) {
        return v.substring(0, l)
      }
      return v
    },
    getEleByIndex: function(arrays, index) {
      var ele = arrays[index]
      return ele
    },
    getIndex: function(event) {
      var id = event.currentTarget.dataset.index
      if (getApp().common.StringUtil.isNotEmpty(id)) {
        return id
      }
      wx.showToast({
        title: '缺少Index',
      })
      throw new Error()
    },
    delEleByIndex: function(arrays, index) {
      var ele = arrays[index]
      arrays.splice(index, 1)
      return ele
    },
    getEleById: function(arrays, id) {
      var ele = arrays.find((ele, index, arrays) => ele.id == id)
      return ele
    },
    addEle: function(arrays, ele) {
      arrays.push(ele)
    },
    delEleById: function(arrays, id) {
      var eleIndex = -1
      var ele
      for (var i = 0; i < arrays.length; i++) {
        ele = arrays[i]
        if (ele.id == id) {
          eleIndex = i
          break
        }
      }

      if (eleIndex != -1) {
        arrays.splice(eleIndex, 1)
      }

      return ele
    },
    getId: function(event) {
      var id = event.currentTarget.dataset.id
      if (getApp().common.StringUtil.isNotEmpty(id)) {
        return id
      }
      wx.showToast({
        title: '缺少ID',
      })
      throw new Error()
    },
    showMsg: function(msg) {
      wx.showModal({
        title: '提示',
        content: msg,
      })
    },
    StringUtil: {
      isNotEmpty: function(str) {
        var r = undefined !== str && "" !== str
        return r
      },
      abbreviatory: function(str, maxL) {
        if (!ObjectCommonUtil.isEmpty(str) && str.length > (undefined == maxL ? 10 : maxL)) {
          return str.substring(0, 10) + '…'
        }
        return str
      },
      moneyDesc: function(money) {
        return "￥" + money + "元"
      },
      simplePrint: function(str) {
        if (StringUtil.isNotEmpty(str)) {
          return str
        }
        return '-'
      }
    },
    ObjectCommonUtil: {
      isNotUndefined: function(v) {
        return undefined != v
      },
      verifyValidObject: function (o) {
        return o != null && o != undefined && o != "" && o != "null"
      }
    },
    JsonUtil: {
      toJson: function(v) {
        return JSON.parse(v)
      }
    },
    saleStrategyUtil: {
      parseList: function(itemListJson) {
        for (var i = 0; i < itemListJson.length; i++) {
          itemListJson[i]["tags"] = getApp().common.saleStrategyUtil.getSaleStrategyTags(itemListJson[i])
        }
      },
      /**
       * 结果为 { presell : attrJson, minFee : attrJson, minCount : attrJson, maxCount : attrJson, ...}
       * @param strategyList
       */
      parse: function(itemJson) {
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
      getSaleStrategyTags: function(itemJson) {
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