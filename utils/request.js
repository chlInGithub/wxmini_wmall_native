const util = require("./util.js")
const goPageUtil = require("./goPage.js")
const aesUtil = require("./aes.js")

/**
 * url: 请求url
 * data: 请求data json
 * return: k=v&k=v..&sign=signv
 * steps: 
 *  data key 正序，k=v并使用&拼接；拼接其他数据并使用&拼接；生成sign并拼接
 */
var dealParams = function(url, data) {
  if (util.objectUtil.isUndefined(data)) {
    data = {}
  }

  var dataStrWithSortedKey = util.jsonUtil.toParamWithSortedKey(data)

  var newToken = url.indexOf('newToken') !== -1
  // 检查token
  if(!newToken){

  }

  // 追加数据
  var appendData = {}
  if (!newToken) {
    appendData['appId'] = getApp().globalData.appId
    appendData['token'] = getApp().globalData.token
    appendData['sessionId'] = getApp().globalData.sessionId
  }
  // 时间戳
  appendData['t'] = Math.floor(new Date().getTime() / 1000)
  // 请求处理版本
  appendData['v'] = 2
  var appendDataStrWithSortedKey = util.jsonUtil.toParam(appendData)

  var lastData = ""
  if (util.stringUtil.isEmpty(dataStrWithSortedKey)) {
    lastData = appendDataStrWithSortedKey
  } else {
    lastData = dataStrWithSortedKey + "&" + appendDataStrWithSortedKey
  }

  // 生成sign
  var sign = aesUtil.encrypt(lastData)
  // 这些字符作为参数会变为空格，所以提前替换
  //sign = sign.replace(/[\\&\\=\\+\\$\\,\\#]+/g, "")
  sign = util.replace4Spe(sign)

  // 最终的data数据
  var finalData = lastData + "&sign=" + sign

  //finalData = encodeURI(finalData)
  return finalData
}

var checkApp = function(){
  if (!util.objectUtil.verifyValidObject(getApp().globalData.appId) || !util.objectUtil.verifyValidObject(getApp().globalData.shopId)){
    util.showMsg("小程序缺少初始化数据")
    throw new Error("小程序缺少初始化数据")
  }
}

/**
 * context = {
 *  url: url,
 *  data: data,
 *  method: method,
 *  successCallBack: successCallBack,
 *  failCallBack: failCallBack
 * }
 */
var request = function(context) {
  var url = context.url
  if (util.stringUtil.isEmpty(url)) {
    util.showMsg("缺少URL")
    return
  }

  var data = context.data
  data = dealParams(url, data)

  url = getApp().globalData.requestUrlPrefix + url

  var method = context.method
  if (util.stringUtil.isEmpty(method)) {
    method = "GET"
  }
  method = method.toUpperCase()

  var contentType = 'text/plain'
  if (method === 'POST') {
    contentType = 'application/x-www-form-urlencoded'
  }else {
    url = url + "?" + data
  }
  /*if (!util.stringUtil.isEmpty(context.contentType)) {
    contentType = context.contentType
  }*/

  var successCallBack = context.successCallBack
  if (typeof successCallBack !== 'function') {
    successCallBack = function() {}
  }
  var failCallBack = context.failCallBack
  if (typeof failCallBack !== 'function') {
    failCallBack = function() {}
  }

  wx.showLoading({
    title: '努力处理中',
  })

  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': contentType
    },
    method: method,
    complete(res) {
      wx.hideLoading()
    },
    fail(res) {
      var resultStr = JSON.stringify(res)
      if (resultStr.indexOf("未登录") !== -1) {
        wx.showModal({
          title: '提示',
          content: '登录失效',
          success(res) {
            if (res.confirm) {
              goPageUtil.goPage.goIndex()
            }
          }
        })

        return
      }

      failCallBack(resultStr)
    },
    success(res) {
      var resultStr = JSON.stringify(res)

      console.log(res.data)
      if (res.data.s) {
        if (util.objectUtil.isString(res.data.d)){
          res.data.d = util.jsonUtil.toJson(res.data.d)
        }
        successCallBack(res.data.d)
      } else {
        if (resultStr.indexOf("未登录") !== -1) {
          wx.showModal({
            title: '提示',
            content: '登录失效',
            success(res) {
              if (res.confirm) {
                goPageUtil.goPage.goIndex()
              }
            }
          })

          return
        }

        var msg = res.data
        if (util.objectUtil.isNotUndefined(res.data.m)) {
          msg = res.data.m
        } else if (util.objectUtil.isNotUndefined(res.data.message)){
          msg = res.data.message
        }
        failCallBack(msg)
      }
    }
  })
}

var requestProxy = function (context){
  checkApp()

  // TODO 是否需要刷新token

  request(context)
}


module.exports = {
  request: requestProxy
}