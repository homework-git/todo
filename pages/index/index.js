//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    teamItems: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    app.teamItems.bindAsArray(this,'teamItems',function(err){
      if(err != null){
          console.log("bind failed. err:"+err.message)
      } else {
          console.log("bind sucess")
      }
    })
    app.teamItems.on("value", function(snapshot) {
      console.log(snapshot.val());
    })
  },
  checkboxChange: function(e) {
      var key = e.target.dataset.key
      var value = e.target.dataset.value
      var data = {}
      data[key] = !value
      app.teamItems.update(data)
  }
})
