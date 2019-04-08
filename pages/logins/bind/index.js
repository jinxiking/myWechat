// pages/logins/bind/index.js
const TIME_COUNT = 60;
let interval = null;
let timeFlag = false;
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '00:01:6C:06:A6:99',
    macDetail:{},
    tel : '',
    number : 0,
    vcode : '',
    shopName : '',
    shopTypeList : [],
    shopTypeArr : [],
    shopIndex : 0,
    region : [],
    regionCode : [],
    adress : '',
    Gradius : '',
    Jradius : '',
    time : '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.code){
      this.setData({
        code: options.code
      })
    }
    this.getShopTypeList();
    this.getMacId()
  },
  getMacId(){
    util.ajax({
      url: '/v1/device/get-device',
      method: 'GET',
      data: {
        mac: this.code,
      },
      success: (res) => {
        this.setData({
          macDetail : res.data
        })
      }
    })
  },  
  doInterval() {
    timeFlag = true;
    this.setData({
      number: TIME_COUNT
    });

    interval = setInterval(() => {
      this.setData({
        number: this.data.number - 1
      })
      if (this.data.number == 0) {
        clearInterval(interval);
        timeFlag = false;
      }
    }, 1000)
  },
  bindTelInput(val){
    this.setData({
      tel: val.detail.value
    })
  },
  vetifyTel(tel) {
    let reg = /^\d{11}$/;
    if (reg.test(tel)) {
      return true;
    } else {
      return false;
    }
  },
  sendCode(){
    if (this.data.tel.length == 0 || timeFlag) {
      return;
    }
    if (!this.vetifyTel(this.data.tel)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none'
      })
      return;
    }
    util.ajax({
      url: '/v1/user/send-code',
      method: 'POST',
      data: {
        phone: this.data.tel,
        type: 1
      },
      success: () => {

        this.doInterval();
      }
    })
  },
  //验证码逻辑
  bindCodeInput(val){
    this.setData({
      vcode: val.detail.value
    })
  },
  bindNameInput(val){
    this.setData({
      shopName: val.detail.value
    })
  },
  bindAdressInput(val){
    this.setData({
      adress: val.detail.value
    })
  },
  bindGradiusInput(val){
    this.setData({
      Gradius: val.detail.value
    })
  },
  bindJradiusInput(val) {
    this.setData({
      Jradius: val.detail.value
    })
  },
  timeInput(val){
    this.setData({
      time: val.detail.value
    })
  },
  //获取商铺类型
  getShopTypeList(){
    console.log(1)
    util.ajax({
      url: '/v1/shoptype/get-list',
      method: 'GET',
      success: (res) => {
        this.setData({
          shopTypeList: res.data
        })
        let arr = []
        for(var i in res.data){
          arr.push(res.data[i].name);

        }

        this.setData({
          shopTypeArr: arr
        })

      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log()
    this.setData({
      shopIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })

    this.setData({
      regionCode: e.detail.code
    })
  },
  submit(){
    //验证参数
    if(!this.data.tel){
      wx.showToast({
        title: '请填写电话',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.vcode) {
      wx.showToast({
        title: '请填写验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.adress) {
      wx.showToast({
        title: '请填写地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.Gradius) {
      wx.showToast({
        title: '请填写过客半径',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.Jradius) {
      wx.showToast({
        title: '请填写进店半径',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!this.data.time) {
      wx.showToast({
        title: '请填写驻店时长',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.regionCode.length == 0) {
      wx.showToast({
        title: '请选择地区',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    //验证通过整理参数
    let params = {
      mobile : this.data.tel,
      shop_name : this.data.shopName,
      shop_type_id: this.data.shopIndex,
      shop_province_id : this.data.regionCode[0],
      shop_city_id: this.data.regionCode[1],
      shop_district_id: this.data.regionCode[2],
      shop_province: this.data.region[0],
      shop_city: this.data.region[1],
      shop_district: this.data.region[2],
      shop_address : this.data.adress,
      shop_visitor_radius : this.data.Gradius,
      shop_in_shop_radius: this.data.Jradius,
      shop_resident_duration : this.data.time,
      shop_on_time_hour : 0,
      shop_on_time_minute : 0,
      shop_off_time_hour : 0,
      shop_off_time_minute : 0,
      mac : this.data.code,
      mac_id: this.data.macDetail.ID,
      code : this.data.vcode
    } 

    util.ajax({
      url: '/v1/device/add-device',
      method: 'POST',
      data : params ,
      success: (res) => {
       if(res.code == 200){
         wx.redirectTo({
           url: '/pages/home/index/index',
         })
        } 
      }
    })


  }
})