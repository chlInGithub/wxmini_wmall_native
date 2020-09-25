// components/couponsComponent/couponsComponent.js

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
      var id = app.common.getId(event)
      console.log("ID = " + id)
      var got = 1
      if (got == 1) {
        this.goCoupons(id)
      } else {
        this.getCoupons(id)
      }
    },

    getCoupons: function (id) {

    },

    goCoupons: function (id) {
      if(!this.properties.invalidGoCoupons){
        console.log("do not go coupons")
        return
      }
      var ele = app.common.getEleById(this.properties.coupons, id)
      var param = ""
      if (ele != undefined) {
        param = '?coupons=' + JSON.stringify(ele)
      }
      app.common.goPage.goItemList(param)
    },
  }
})
