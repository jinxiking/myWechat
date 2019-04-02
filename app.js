//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var token = wx.getStorageSync('token') || '';
    // 登录
    if (token) {
      this.globalData.token = token;
      wx.redirectTo({
        url: '/pages/home/index/index',
      })
    } else {
      this.doLogin();
    }
  },
  doLogin: function (done) {
    let _this = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: this.globalData.url + '/v1/token/get-token',
          data :{
            code: res.code
          },
          method : 'get',
          success : (res)=>{
            let token = res.data.data.Token;
            wx.setStorageSync('token', token);
            _this.globalData.token = token;
            if (done) done()
          } 
        })
      }
    })
  },
  globalData: {
    url: 'https://taskapi.luckywb.com',
    userInfo: null,
    token: ''
  }
})