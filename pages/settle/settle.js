// pages/settle/settle.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestUtil = require('../../utils/request.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require('../../utils/token.js')
const saleStrategyUtil = require('../../utils/saleStrategy.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentEditDeliver: {}

  },
  regionChange: function(event) {
    console.log(event.detail)
    var code = event.detail.code.join(" ")
    var value = event.detail.value.join(" ")
    var postcode = event.detail.postcode
    this.setData({
      currentEditDeliverCity: value,
      currentEditDeliverCode: code,
      currentEditDeliverPostcode: postcode
    })
  },
  chooseReceiver: function(event) {
    console.log("chooseReceiver")
    var index = util.eventUtil.getIndex(event)
    var deliver = this.data.delivers[index]
    this.setData({
      choosedDeliver: deliver
    })
    this.showChooseReceiveModal()
    this.compute()
  },
  showChooseReceiveModal: function() {
    var t = this.selectComponent(".deliverListModal")
    t.triggleModal()
  },
  setCurrentEditDeliver: function() {
    var currentEditDeliver = this.data.currentEditDeliver
    if (undefined == currentEditDeliver) {
      this.setData({
        currentEditDeliverName: "",
        currentEditDeliverMobile: "",
        currentEditDeliverCity: "",
        currentEditDeliverAddress: "",
        currentEditDeliverDefaultSelected: false
      })
    } else {
      this.setData({
        currentEditDeliverName: currentEditDeliver["name"],
        currentEditDeliverMobile: currentEditDeliver["mobile"],
        currentEditDeliverCity: currentEditDeliver["city"],
        currentEditDeliverCode: currentEditDeliver["code"],
        currentEditDeliverAddress: currentEditDeliver["address"],
        currentEditDeliverDefaultSelected: currentEditDeliver["currentEditDeliverDefaultSelected"]
      })
    }
  },
  getCurrentEditDeliver: function() {
    var currentEditDeliver = this.data.currentEditDeliver
    if (undefined == currentEditDeliver) {
      currentEditDeliver = {}
    }
    currentEditDeliver["name"] = this.data.currentEditDeliverName
    currentEditDeliver["mobile"] = this.data.currentEditDeliverMobile
    currentEditDeliver["city"] = this.data.currentEditDeliverCity
    currentEditDeliver["code"] = this.data.currentEditDeliverCode
    currentEditDeliver["postcode"] = this.data.currentEditDeliverPostcode
    currentEditDeliver["address"] = this.data.currentEditDeliverAddress
    currentEditDeliver["currentEditDeliverDefaultSelected"] = this.data.currentEditDeliverDefaultSelected
    return currentEditDeliver
  },
  cleanCurrentEditDeliver: function() {
    this.setData({
      currentEditDeliver: {}
    })
  },
  saveDeliver: function() {
    var currentEditDeliver = this.getCurrentEditDeliver()
    if (!util.stringUtil.isNotEmpty(currentEditDeliver.name)) {
      util.showMsg("请填写收货人姓名")
      return
    }
    if (!util.stringUtil.isNotEmpty(currentEditDeliver.mobile) || currentEditDeliver.mobile.length != 11) {
      util.showMsg("收货人手机号未填写或错误")
      return
    }
    if (!util.stringUtil.isNotEmpty(currentEditDeliver.city) || !util.stringUtil.isNotEmpty(currentEditDeliver.code)) {
      util.showMsg("请填写收货人地址")
      return
    }
    if (!util.stringUtil.isNotEmpty(currentEditDeliver.address)) {
      util.showMsg("请填写收货人详细地址")
      return
    }

    var that = this
    requestDataUtil.postData.saveDeliver(
      currentEditDeliver,
      function(data) {
        var newId = data;

        if (currentEditDeliver.id != undefined) {
          var ele = util.arrayUtil.getEleById(that.data.delivers, currentEditDeliver.id)
          ele["name"] = currentEditDeliver.name
          ele["mobile"] = currentEditDeliver.mobile
          ele["city"] = currentEditDeliver.city
          ele["code"] = currentEditDeliver.code
          ele["postcode"] = currentEditDeliver.postcode
          ele["address"] = currentEditDeliver.address
          ele["defaultSelected"] = currentEditDeliver.defaultSelected

          if (util.objectUtil.isNotUndefined(that.data.choosedDeliver) && currentEditDeliver.id == that.data.choosedDeliver.id) {
            that.setData({
              choosedDeliver: ele
            })
          }
        } else {
          currentEditDeliver["id"] = newId
          util.arrayUtil.addEle(that.data.delivers, currentEditDeliver)
        }

        if (currentEditDeliver.defaultSelected) {
          var delivers = that.data.delivers
          for (var i = 0; i < delivers.length; i++) {
            delivers[i]['defaultSelected'] = false
          }
          currentEditDeliver.defaultSelected = true
        }

        that.setData({
          delivers: that.data.delivers,
          currentEditDeliver: {}
        })

        that.showEditReceiveModal()
      }
    )
  },
  deleteDeliver: function(event) {
    var id = util.eventUtil.getId(event)
    var currentEditDeliver = this.data.currentEditDeliver
    if (id != currentEditDeliver.id) {
      wx.showModal({
        title: '提示',
        content: 'ID错误',
      })
    } else {
      console.log(currentEditDeliver)
      //TODO
      var that = this
      requestDataUtil.postData.delDeliver(
        id,
        function(id) {
          util.arrayUtil.delEleById(that.data.delivers, id)
          that.setData({
            delivers: that.data.delivers,
            currentEditDeliver: {}
          })

          if (util.objectUtil.isNotUndefined(that.data.choosedDeliver) && currentEditDeliver.id == that.data.choosedDeliver.id) {
            that.setData({
              choosedDeliver: false
            })
          }
        }
      )
    }
    this.showEditReceiveModal()
  },
  addReceiver: function(event) {
    this.setCurrentEditDeliver()
    this.showEditReceiveModal()
    console.log(this.data.currentEditDeliver)
  },
  editReceiver: function(event) {
    var index = util.eventUtil.getIndex(event)
    var deliver = this.data.delivers[index]
    this.setData({
      currentEditDeliver: deliver
    })
    this.setCurrentEditDeliver()
    this.showEditReceiveModal()
    console.log(this.data.currentEditDeliver)
  },
  showEditReceiveModal: function() {
    var t = this.selectComponent(".deliverEditModal")
    t.triggleModal()
  },
  chooseDeliverType: function(event) {
    var index = event.detail.value
    var deliverType = this.data.deliverTypes[index]
    if (deliverType == undefined) {
      wx.showToast({
        title: '配送方式错误',
      })
      return
    }
    this.setData({
      choosedDeliverType: deliverType
    })
    this.compute()
  },
  choosePayType: function(event) {
    var index = event.detail.value
    var payType = this.data.payTypes[index]
    if (payType == undefined) {
      wx.showToast({
        title: '支付方式错误',
      })
      return
    }
    this.setData({
      choosedPayType: payType
    })
    this.compute()
  },
  compute: function() {
    var items = this.data.items
    if (items.length < 1) {
      util.showToast("缺少商品")
      return false
    }
    var usedReceiveInfo = this.data.choosedDeliver
    if (usedReceiveInfo == undefined || usedReceiveInfo.id == undefined) {
      util.showToast("请选择收货地址")
      return false
    }

    var usedPaytype = this.data.choosedPayType
    if (usedPaytype == undefined || usedPaytype.code == undefined) {
      util.showToast("请选择支付类型")
      return false
    }

    var usedDeliverType = this.data.choosedDeliverType
    if (usedDeliverType == undefined || usedDeliverType.code == undefined) {
      util.showToast("请选择配送方式")
      return false
    }

    var temp = [];

    items.forEach(function(item) {
      temp.push(item.itemId + "_" + item.skuId + "_" + item.count);
    })

    var data = {
      items: temp.toString(),
      deliverId: usedReceiveInfo.id,
      deliverType: usedDeliverType.code,
      payType: usedPaytype.code
    }


    var that = this
    requestDataUtil.getData.computeSettle(
      data,
      function(result) {
        saleStrategyUtil.parseList(items)
        that.setData({
          computeResult: result/**,
          choosedDeliver: result.usedReceiveInfo**/
        })
      },
      function(m){
        that.setData({
          computeResult: {}
        })
      }
    )
  },
  createOrder: function() {
    var items = this.data.items
    if (items.length < 1) {
      util.showMsg("缺少商品")
      return false
    }
    var usedReceiveInfo = this.data.choosedDeliver
    if (usedReceiveInfo == undefined || usedReceiveInfo.id == undefined) {
      util.showMsg("请选择收货地址")
      return false
    }

    var usedPaytype = this.data.choosedPayType
    if (usedPaytype == undefined || usedPaytype.code == undefined) {
      util.showMsg("请选择支付类型")
      return false
    }

    var usedDeliverType = this.data.choosedDeliverType
    if (usedDeliverType == undefined || usedDeliverType.code == undefined) {
      util.showMsg("请选择配送方式")
      return false
    }

    var computeResult = this.data.computeResult
    if (!util.objectUtil.verifyValidObject(computeResult) ||
      !util.objectUtil.verifyValidObject(computeResult.itemCount) ||
      computeResult.itemCount < 1 ||
      !util.objectUtil.verifyValidObject(computeResult.total) ||
      computeResult.total < 0) {
      util.showMsg("缺少订单金额")
      return false
    }

    var temp = [];

    items.forEach(function (item) {
      temp.push(item.itemId + "_" + item.skuId + "_" + item.count);
    })

    var data = {
      items: temp.toString(),
      deliverId: usedReceiveInfo.id,
      deliverType: usedDeliverType.code,
      referTotal: computeResult.total,
      payType: usedPaytype.code
    }

    var that = this

    // TODO 创建订单
    requestDataUtil.postData.createOrder(
      data,
      function(orderId){
        goPageUtil.goPage.goPay(orderId)
      },
      function(m){
        
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    util.initPage(this)

    var itemsParam = options.items

    if (!util.stringUtil.isNotEmpty(itemsParam)) {
      util.showMsg("缺少商品数据")
      return
    }

    this.setData({
      itemsParam: itemsParam
    })

    //this.getItems(itemsParam)


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    requestDataUtil.getData.getSettleItems({
      items: this.data.itemsParam
    },
      function (items) {
        if(!util.arrayUtil.isArray(items)){
          items = []
        }
      
        saleStrategyUtil.parseList(items)
        that.setData({
          items: items
        })

        requestDataUtil.getData.getDelivers(
          function (delivers) {
            if (!util.arrayUtil.isArray(delivers)) {
              delivers = []
            }
            that.setData({
              delivers: delivers
            })

            if (delivers.length > 0) {
              var defaultDeliver = delivers[0]
              for (var i = 0; i < delivers.length; i++) {
                if (delivers[i]['defaultSelected']) {
                  defaultDeliver = delivers[i]
                  break
                }
              }
              that.setData({
                choosedDeliver: defaultDeliver
              })
            }

            requestDataUtil.getData.getPayTypes(
              function (payTypes) {
                if (!util.arrayUtil.isArray(payTypes)) {
                  payTypes = []
                }
                var payDescs = []
                for (var i = 0; i < payTypes.length; i++) {
                  var temp = payTypes[i]
                  payDescs.push(temp.desc)
                }
                that.setData({
                  payTypes: payTypes,
                  payDescs: payDescs
                })

                requestDataUtil.getData.getDeliverTypes(
                  function (deliverTypes) {
                    if (!util.arrayUtil.isArray(deliverTypes)) {
                      deliverTypes = []
                    }
                    var deliverDescs = []
                    for (var i = 0; i < deliverTypes.length; i++) {
                      var temp = deliverTypes[i]
                      deliverDescs.push(temp.desc)
                    }

                    console.log(payDescs)
                    that.setData({
                      deliverTypes: deliverTypes,
                      deliverDescs: deliverDescs
                    })

                    //that.compute()
                  }
                )
              }
            )
          }
        )

      }
    )

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})