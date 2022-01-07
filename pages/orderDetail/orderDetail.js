// pages/orderDetail/orderDetail.js

const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')
const requestDataUtil = require('../../utils/requestData.js')
const qrcode = require("wxmini_common_js").qrcode

Page({

  /**
   * 页面的初始数据
   */
  data: {
    refundTypeDescs: ['退货退款', '仅退款','换货'],
    refundTypeCodes: [1,2,3],
    refundTypes: [
      {
        code: 1,
        desc: '退货退款'
      },
      {
        code: 2,
        desc: '仅退款'
      },
      {
        code: 3,
        desc: '换货'
      }
    ],
    choosedRefundType: false,
    refundApplyFee:"",
    refundApplyCause: ""
  },
  refundApply: function(){
    if (!util.objectUtil.verifyValidObject(this.data.choosedRefundType)){
      util.showMsg("请选择退款类型")
      return
    }

    if (!util.objectUtil.verifyValidObject(this.data.refundApplyFee) || this.data.refundApplyFee < 0 || this.data.refundApplyFee > this.data.detail.realFee){
      util.showMsg("申请金额不对哦")
      return
    }

    if (!util.objectUtil.verifyValidObject(this.data.refundApplyCause)) {
      util.showMsg("请选择退款原因")
      return
    }

    var refund = {
      type: this.data.choosedRefundType.code,
      cause: this.data.refundApplyCause,
      applyFee: this.data.refundApplyFee,
      orderId: this.data.detail.id
    }

    var that = this
    requestDataUtil.postData.refundApply(
      refund,
      function(data){
        that.data.detail.canRefund = false
        that.data.detail.status = 60
        that.data.detail.statusDes = "申请退款"
        that.setData({
          detail: that.data.detail
        })
        that.showRefund()
      }
    )
  },
  chooseRefundType: function (event) {
    var index = event.detail.value
    var refundType = this.data.refundTypes[index]
    this.setData({
      choosedRefundType: refundType
    })
  },
  showRefund: function(event){
    this.setData({
      choosedRefundType: false,
      refundApplyFee: "",
      refundApplyCause: ""
    })
    var t = this.selectComponent(".refundApplyModal")
    t.triggleModal()
  },
  successOrder: function (event) {
    var id = util.eventUtil.getId(event)
    var that = this
    requestDataUtil.postData.successOrder(
      id,
      function (data) {
        that.data.detail.status = 40
        that.data.detail.statusDes = "交易成功"
        that.setData({
          detail: that.data.detail
        })
      }
    )
  },
  goPay: function (event) {
    var id = util.eventUtil.getId(event)
    goPageUtil.goPage.goPay(id)
  },
  delOrder: function (event) {
    var id = util.eventUtil.getId(event)
    requestDataUtil.postData.delOrder(id)
    wx.navigateBack()
  },
  getOrderDetail: function(id){
    var that = this
    requestDataUtil.getData.getOrderDetail(
      id, 
      function(detail){
        var subOrderVOS = detail.subOrderVOS
        for (var i = 0; i < subOrderVOS.length; i++) {
          var subOrderVO = subOrderVOS[i]
          if (undefined != subOrderVO.presell) {
            console.log(subOrderVO.presell)
            subOrderVO.presell = util.jsonUtil.toJson(subOrderVO.presell)
          }
        }

        that.setData({
          detail: detail
        })

        new qrcode('itemQrcode',{
          text: detail.id,
          width: 200,
          height: 200,
          padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
          correctLevel: qrcode.CorrectLevel.L, // 二维码可辨识度
          callback: (res) => {
          }
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)

    var id = options.id
    if (!util.objectUtil.verifyValidObject(id)){
      wx:wx.showModal({
        title: '提示',
        content: '缺少订单ID',
        showCancel: false,
        success: function(res) {
          goPageUtil.goPage.goOrderList()
        }
      })
    }
    this.setData({
      id: id
    })

    var that = this
    requestDataUtil.getData.getRecommendedItemList(function (data) {
      that.setData({
        items: data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDetail(this.data.id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})