// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindcontroltap:function(e){
    switch(e.controlId){
      case 1:
        this.movetoCenter();
        break;
      case 2:
        if(this.timer){
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
        }else{
          wx.scanCode({
            success: () =>{
              wx.showLoading({
                title: '正在获取密码'
              })
              wx.request({
                url: 'https://www.easy-mock.com/mock/5d28957d922a2f462926e893/demo/getPassword',
                success:(res) =>{
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanResult/index?password='+res.data.data.password+'&number='+res.data.data.number,
                    success: (res) => {
                      // success
                      wx.showToast({
                        title: '获取密码成功',
                        icon: '',
                        duration: 1000
                      })
                    },
                    fail: function() {
                      // fail
                    },
                    complete: function() {
                      // complete
                    }
                  })
                }
              })
            },
          })
        }
        break;
      case 3:
        wx.navigateTo({
          url: '../warn/index'
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../my/index'
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timer = options.timer;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: (res) => {
        // success
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.getSystemInfo({
      filePath: 'String',
      success: (res) => {
        // success
        this.setData({
          controls:[{
            id:1,
            iconPath:"/img/location.jpg",
            position:{
              width: 50,
              height: 50,
              left: 20,
              top: res.windowHeight -80
            },
            clickable:true
          },{
            id:2,
            iconPath:"/img/useCar.png",
            position:{
              width:90,
              height:90,
              top:res.windowHeight - 100,
              left: res.windowWidth/2 - 45
            },
            clickable:true
          },{
            id:3,
            iconPath:"/img/warn.jpg",
            position:{
              width:50,
              height:50,
              top:res.windowHeight - 80,
              left: res.windowWidth -70
            },
            clickable: true
          },{
            id:4,
            iconPath:"/img/personal.jpg",
            position:{
              width:50,
              height:50,
              top:res.windowHeight -155,
              left: res.windowWidth -70
            },
            clickable:true
          },{
            id:5,
            iconPath:"/img/marker.jpg",
            position:{
              width:50,
              height:50,
              top:res.windowHeight/2 -50,
              left: res.windowWidth/2 -25
            }
          }]
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  movetoCenter: function(){
    this.mapctx.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.mapctx = wx.createMapContext("ofo-map");
    this.movetoCenter();
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