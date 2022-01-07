//const util = require("./util.js")
const util = require("wxmini_common_js").util

/**
 * itemListJson
 */
var parseList = function(itemListJson) {
  for (var i = 0; i < itemListJson.length; i++) {
    itemListJson[i]["tags"] = getSaleStrategyTags(itemListJson[i])
  }
}
/**
 * 结果为 { presell : attrJson, minFee : attrJson, minCount : attrJson, maxCount : attrJson, ...}
 * @param itemJson
 */
var parse = function(itemJson) {
  if (util.objectUtil.isNotUndefined(itemJson.strategyJson)) {
    return itemJson.strategyJson
  }
  var result = {}
  if (util.objectUtil.isNotUndefined(itemJson.saleStrategies)) {
    var strategyList = itemJson.saleStrategies;
    for (var i = 0; i < strategyList.length; i++) {
      var item = util.jsonUtil.toJson(strategyList[i]);
      if (item.strategyType == 1) {
        result.presell = util.jsonUtil.toJson(item.attr)
        continue
      }
      if (item.strategyType == 2) {
        result.minFee = util.jsonUtil.toJson(item.attr)
        continue
      }
      if (item.strategyType == 3) {
        result.minCount = util.jsonUtil.toJson(item.attr)
        continue
      }
      if (item.strategyType == 4) {
        result.maxCount = util.jsonUtil.toJson(item.attr)
        continue
      }
    }
  }
  itemJson["strategyJson"] = result
  console.log(itemJson)
}

/**
 * @param itemJson
 */
var getSaleStrategyTags = function(itemJson) {
  var ObjectCommonUtil = util.objectUtil
  var JsonUtil = util.jsonUtil

  var row = itemJson
  parse(row)
  var tags = []
  if (ObjectCommonUtil.isNotUndefined(row.strategyJson.presell)) {
    tags.push('预售')
  }
  if (ObjectCommonUtil.isNotUndefined(row.strategyJson.minFee)) {
    tags.push('满购:订单最少' + row.strategyJson.minFee.minFee + '元')
  }
  if (ObjectCommonUtil.isNotUndefined(row.strategyJson.minCount)) {
    tags.push(row.strategyJson.minCount.minCount + '件起售')
  }
  if (ObjectCommonUtil.isNotUndefined(row.strategyJson.maxCount)) {
    tags.push('限购' + row.strategyJson.maxCount.maxCount + '件')
  }
  return tags
}

module.exports = {
  parseList: parseList,
  parse: parse,
  getSaleStrategyTags: getSaleStrategyTags
}