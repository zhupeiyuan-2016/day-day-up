// pages/person/person.js
var localhost = getApp().globalData.localhost
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:'https://tse3.mm.bing.net/th?id=OIP.M06jqR3YtlHKbcNKM8nYhwAAAA&pid=Api',
    dayadd: '10',
    sumadd: '123',
    daystyle: [{
      month: 'current', day: 1, color: '#b2d235', background: '#f58220'
    },
    {
      month: 'current', day: 12, color: '#b2d235', background: '#f58220'
    },
    {
      month: 'current', day: 23, color: '#b2d235', background: '#f58220'
    },
    {
      month: 'current', day: 14, color: '#b2d235', background: '#f58220'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    //微信获取微信数据
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              _this.setData({
                ['img']: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
    let openid = wx.getStorageSync('openid');
    wx.request({
      url: localhost + '/person',
      method:'post',
      data:{
        openid : openid
      },
      success:function(e){
        console.log(e.data.data.data)
        _this.setData({
          ['dayadd']: e.data.data.data.day,
          ['sumadd']: e.data.data.data.money,
        })
      }
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