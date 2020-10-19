const util = require("./util.js")
const goPageUtil = require("./goPage.js")
const requestUtil = require("./request.js")
const requestDataUtil = require("./requestData.js")

var getShareInfoAndGo = function(scene) {
  // TODO 获取分享信息
  requestDataUtil.getData.getShareInfo(
    {
      scene: scene
    },
    function (data) {
      // 根据分享信息处理跳转
      if(util.jsonUtil.hasData(data)){
        if(1 == data.type){
          if (util.objectUtil.verifyValidObject(data.itemId)){
            goPageUtil.goPage.goItemDetail(data.itemId)
          }
        }else{
          goPageUtil.goPage.goShop()
        }
      } else {
        goPageUtil.goPage.goShop()
      }
    },
    function(){
      goPageUtil.goPage.goShop()
    }
  )
}

module.exports = {
  getShareInfoAndGo: getShareInfoAndGo
}