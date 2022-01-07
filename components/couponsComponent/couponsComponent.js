// components/couponsComponent/couponsComponent.js

const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')
const requestDataUtil = require('../../utils/requestData.js')

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupons: Array,
    invalidGoCoupons: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function () {
      this.setData(app.globalData)
      console.log(this.properties.coupons)
      console.log(this.properties.invalidGoCoupons)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dealCoupons: function (event) {
      console.log(event)
      var id = util.eventUtil.getId(event)
      console.log("ID = " + id)
      var ele = util.arrayUtil.getEleById(this.properties.coupons, id)
      var got = ele.got
      if (got == 1) {
        this.goCoupons(id)
      } else {
        this.getCoupons(id)
      }
    },

    getCoupons: function (id) {
      var that = this
      requestDataUtil.postData.getCoupons(id, function (id) {
        var ele = util.arrayUtil.getEleById(that.properties.coupons, id)
        ele.got = 1
        that.triggerEvent('gotevent', {
          id: id
        }, {})
      })
    },

    goCoupons: function (id) {
      if(!this.properties.invalidGoCoupons){
        console.log("do not go coupons")
        return
      }
      var ele = util.arrayUtil.getEleById(this.properties.coupons, id)
      var param = ""
      if (ele != undefined) {
        param = '?coupons=' + JSON.stringify(ele)
      }
      goPageUtil.goPage.goItemList(param)
    },
  }
})
