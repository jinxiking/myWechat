const app = getApp();
console.log(app)
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const ajax = (option) =>{
  var token = app.globalData.token;
  if(!token){
    app.doLogin();
    return;
  }
  wx.showLoading({
    title: '加载中',
  })
  let header = {
    token: token
  }
  if (option.method == 'POST'){
    header = {
      token: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  wx.request({
    url: app.globalData.url + option.url,
    data: option.data,
    method: option.method,
    header: header,
    success : (res)=>{

      if (option.url == '/v1/user/info-add'){
        option.success(res.data);
        return;
      }
      if (res.data.code == 200){
        
        option.success(res.data);
      } else if (res.data.code == 1001){
        //重新登录流程
        app.doLogin(ajax,option);
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    complete:(res)=>{
      wx.hideLoading();
    },
    fail : ()=>{
    
    }

  })
}


module.exports = {
  formatTime: formatTime,
  ajax: ajax,
}
