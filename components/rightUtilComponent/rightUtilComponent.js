
const goPageUtil = require('../../utils/goPage.js')


Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goShop: function () {
      goPageUtil.goPage.goShop()
    },
    goCart: function () {
      goPageUtil.goPage.goCart()
    },
    goMe: function () {
      goPageUtil.goPage.goMe()
    }
  }
})

