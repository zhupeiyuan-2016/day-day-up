//index.js
//获取应用实例
var localhost = getApp().globalData.localhost
const app = getApp()
Page({
  data: {
    disabled:false,
    popup: {
      flag: true,
      title: '签到',
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
    baseshow:{
      daynumber: '12423',
      prizenumber: '34545',
      name: 'jiumi',
      img: 'person/1.jpg',
      date: '2018年07月14日10:44:08'
    },
    personlist: [{
        name: 'jiumi01',
        img: 'person/1.jpg',
        date: '07:20',
        add: '111'
      }
    ],
  },
  //事件处理函数
  post: function() {
    console.log(this.data.personlist)
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
        console.log(map);
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
  switchChange:function(){
    this.setData({
      disabled: !this.data.disabled
    })
  },
  _error: function() {
    let str = 'popup.flag'
    this.setData({
      [str]: !this.data.popup.flag
    })
  },
  onLoad: function() {
  let _this = this
    // wx.request({
    //   url: localhost+`/map`,
    //   success:function(e){
    //     let mapradius = 'map.radius';
    //     let maplatitude = 'map.latitude';
    //     let maplongtiude = 'map.longitude';
    //     let data = e.data.data
    //     console.log(data)
    //     _this.setData({
    //       [mapradius] : data.radius,
    //       [maplatitude] : data.latitude,
    //       [maplongtiude]: data.longitude,
    //     })
    //   }
    // })
   wx.request({
     url: localhost+'/baseshow',
     success:function(e){
       let data = e.data.data;
       let daynumber = 'baseshow.daynumber';
       let prizenumber = 'baseshow.prizenumber';
       let name = 'baseshow.name';
       let img = 'baseshow.img';
       let date = 'baseshow.date';
       console.log(data)
       _this.setData({
         [daynumber]: data.daynumber,
         [prizenumber]: data.prizenumber,
         [name]:data.name,
         [img]:data.img,
         [date]:data.date,
       })
     }
   })
   wx.request({
     url: localhost+'/showlist',
     success:function(e){
      let data = e.data.data;
      let temp = [];
      for(let i = 0;i< data.length;i++){
        temp.push({
          'name':data[i].name,
          'img':data[i].img,
          'date':data[i].date,
          'add':data[i].add
        })
      };
      console.log(temp)
      _this.setData({
        personlist:temp
      })
     }
   })
  }
})
