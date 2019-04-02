const app = getApp();

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
  wx.request({
    url: app.globalData.url + option.url,
    data: option.data,
    method: option.method,
    header : {
      token: token
    },
    success : (res)=>{
      
      if (res.data.code == 200){
      
        option.success(res);
      } else if (res.data.code == 1001){
        //重新登录流程
        app.doLogin(ajax(option));
      }
    }
  })
}



module.exports = {
  formatTime: formatTime,
  ajax: ajax
}
