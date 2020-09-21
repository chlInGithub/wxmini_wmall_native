Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "fa fa-camera-retro",
      selectedIconPath: "fa fa-camera-retro",
      text: "组件"
    }, {
        pagePath: "/pages/index/index",
        iconPath: "fa fa-camera-retro",
        selectedIconPath: "fa fa-camera-retro",
      text: "接口"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})