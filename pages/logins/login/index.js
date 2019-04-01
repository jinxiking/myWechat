// pages/logins/login/index.js
const TIME_COUNT = 60;
let  interval = null;
let  timeFlag = false;
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel : '',
    number : 0,
    choseRadio : 0,
    vcode :'',
    radio: '../../../public/imgs/chose.png',
    radio1:'../../../public/imgs/nochose.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  doInterval(){
    timeFlag = true;
    this.setData({
      number: TIME_COUNT
    });

    interval = setInterval(()=>{
      this.setData({
        number: this.data.number - 1
      })
      if (this.data.number == 0) {
        clearInterval(interval);
        timeFlag = false;
      }
    },1000)
  },
  vetifyTel(tel){
    let reg = /^\d{11}$/;
    if(reg.test(tel)){
      return true;
    }else{
      return false;
    }
  },
  bindTelInput(val){
    this.setData({
      tel: val.detail.value
    })
  },
  bindcodeInput(val){
    this.setData({
      vcode: val.detail.value
    })
  },
  sendCode(){
  
    if (this.data.tel.length == 0 || timeFlag){
      return;
    }
    if (!this.vetifyTel(this.data.tel)){
      wx.showToast({
        title: '手机号码格式不正确',
        icon : 'none'
      })
      return;
    }
    console.log(util)
    util.ajax({
      url: '/v1/user/send-code',
      method: 'POST',
      data : {
        phone : this.data.tel,
        type : 1
      },
      success : ()=>{
        
        this.doInterval();
        console.log(12)
      }
    })
  },
  choseRadio(type){
    if (type.currentTarget.id == 'radio0'){
      this.setData({
        radio: '../../../public/imgs/chose.png',
        radio1: '../../../public/imgs/nochose.png',
        choseRadio : 0
      })
    }else{
      this.setData({
        radio1: '../../../public/imgs/chose.png',
        radio: '../../../public/imgs/nochose.png',
        choseRadio: 1
      })
    }
  }
})