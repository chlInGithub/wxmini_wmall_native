const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const EventUtil = {
  getParaFromEvent: function(event, name, must) {
    var id = event.currentTarget.dataset[name]
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    if (must) {
      wx.showToast({
        title: '缺少' + name,
      })
      throw new Error()
    }
  },
  getIndex: function(event) {
    var id = event.currentTarget.dataset.index
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    wx.showToast({
      title: '缺少Index',
    })
    throw new Error()
  },
  getId: function(event) {
    var id = event.currentTarget.dataset.id
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    wx.showToast({
      title: '缺少ID',
    })
    throw new Error()
  }
}

const ArrayUtil = {
  getEleByIndex: function(arrays, index) {
    var ele = arrays[index]
    return ele
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
  }
}

const StringUtil = {

  isEmpty: function(str) {
    var r = undefined === str || "" === str || null === str
    return r
  },
  isNotEmpty: function(str) {
    var r = undefined !== str && "" !== str
    return r
  },
  abbreviatory: function(str, maxL) {
    if (!StringUtil.isEmpty(str) && str.length > (undefined == maxL ? 10 : maxL)) {
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
}


const ObjectUtil = {
  isNotUndefined: function(v) {
    return undefined !== v
  },
  isString: function (v) {
    return typeof v === 'string'
  },
  isUndefined: function(v) {
    return undefined === v
  },
  isFunction: function (v) {
    return typeof v === 'function'
  },
  verifyValidObject: function(o) {
    return o !== null && o !== undefined && o !== "" && o !== "null"
  }
}

const JsonUtil = {
  hasData: function(v){
    for (var key in v) {
      if(ObjectUtil.isNotUndefined){
        return true
      }
    }
    return false
  },
  toJson: function(v) {
    return JSON.parse(v)
  },
  /**
   * json key 的 数组，已安正序排序
   */
  getKeys: function (paramJson){
    var keys = []
    for (var k in paramJson) {
      keys.push(k)
    }

    keys.sort()

    return keys
  },
  /**
   * key 排序，然后组织成用&间隔的参数串
   */
  toParamWithSortedKey: function (paramJson){
    var keys = JsonUtil.getKeys(paramJson)
    var paraStr = ''
    var temp = []
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var val = paramJson[key]
      var ele = key + '=' + val
      temp.push(ele)
    }

    if (temp.length > 0) {
      paraStr = temp.join("&")
    }

    return paraStr

  },
  /**
   * 组织成用&间隔的参数串
   */
  toParam: function(paramJson) {
    var paraStr = ''
    var temp = []
    for (var k in paramJson) {
      var v = paramJson[k]
      if (!StringUtil.isEmpty(v)) {
        var ele = k + "=" + v
        temp.push(ele)
      }
    }

    if(temp.length > 0){
      paraStr = temp.join("&")
    }

    return paraStr
  }
}

var showMsg = function(msg, callback) {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: function (res) {
      if(ObjectUtil.isFunction(callback)){
        callback()
      }
    },
  })
}

var getCurrentS = function () {
  return Math.floor(new Date().getTime() / 1000)
}

var replace4Spe = function(v){
  return v.replace(/[\\+]+/g, "==plus==")
}

module.exports = {
  formatTime: formatTime,
  eventUtil: EventUtil,
  arrayUtil: ArrayUtil,
  stringUtil: StringUtil,
  objectUtil: ObjectUtil,
  jsonUtil: JsonUtil,
  showMsg: showMsg,
  getCurrentS: getCurrentS,
  replace4Spe: replace4Spe
}