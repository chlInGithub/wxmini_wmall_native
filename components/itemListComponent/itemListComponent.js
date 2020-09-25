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
      var id = app.common.getId(event)
      console.log("ID = " + id)
      app.common.goPage.goItemDetail(id)
    }
  }
})
