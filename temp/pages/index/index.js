//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    popup: {
      flag: true,
      title: '你好',
      money: ['10', '20', '30', '50'],
      address: '茶室'
    },
    map: {
      latitude: 23,
      longitude: 113,
      radius: 30,
      address: '',
    },
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    daynumber: '12423',
    prizenumber: '34545',
    first: {
      name: 'jiumi',
      img: 'person/1.jpg',
      date: '2018年07月14日10:44:08'
    },
    personlist: [{
        name: 'jiumi01',
        img: 'person/1.jpg',
        date: '07:20',
        add: '111'
      },
      {
        name: 'jiumi01',
        img: 'person/1.jpg',
        date: '07:20',
        add: '111'
      },
      {
        name: 'jiumi01',
        img: 'person/1.jpg',
        date: '07:20',
        add: '111'
      },
      {
        name: 'jiumi01',
        img: 'person/1.jpg',
        date: '07:20',
        add: '111'
      }
    ],
  },
  //事件处理函数
  post: function() {
    let that = this;
    var latitude;
    var longitude;
    let flag = 'popup.flag';
    let datalatitude = 'markers[0].latitude';
    let datalongitude = 'markers[0].longitude';
    let dataaddress = 'map.address';
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        latitude = res.latitude;
        longitude = res.longitude;
        let map = that.data.map;
        console.log(latitude);
        console.log(map.latitude + map.radius)
        console.log(map.latitude - map.radius)
        if ((latitude < map.latitude + map.radius && latitude > map.latitude - map.radius) && (longitude < map.longitude + map.radius && longitude > map.longitude - map.radius)) {
          that.setData({
            [flag]: !that.data.popup.flag,
            [datalatitude]: latitude,
            [datalongitude]: longitude,
            [dataaddress]: that.data.popup.address,
          })
        } else {
          that.setData({
            [flag]: !that.data.popup.flag,
            [datalatitude]: latitude,
            [datalongitude]: longitude,
            [dataaddress]: `地址不正确(请到` + that.data.popup.address + `签到)`,
          })
        }

      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  _error: function() {
    let str = 'popup.flag'
    this.setData({
      [str]: !this.data.popup.flag
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})