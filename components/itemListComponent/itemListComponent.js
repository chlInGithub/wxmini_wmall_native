const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: Array,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function () {
      this.setData(app.globalData)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goItemDetail: function (event) {
      var id = util.eventUtil.getId(event)
      console.log("ID = " + id)
      goPageUtil.goPage.goItemDetail(id)
    }
  }
})
