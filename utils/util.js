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
  wx.showLoading({
    title: '加载中',
  })
  
  wx.request({
    url: app.globalData.url + option.url,
    data: option.data,
    method: option.method,
    header : {
      token: token
    },
    success : (res)=>{
      wx.hideLoading();
      if (res.data.code == 200){
      
        option.success(res.data);
      } else if (res.data.code == 1001){
        //重新登录流程
        app.doLogin(ajax(option));
      }
    }
  })
}

const formatDate = (date = Date.now(), str = "YY-MM-DD") => {
  const newDate = new Date(date);
  str = str.replace("YY", newDate.getFullYear());
  str = str.replace("MM", this.add0(newDate.getMonth() + 1));
  str = str.replace("DD", this.add0(newDate.getDate()));
  str = str.replace("hh", this.add0(newDate.getHours()));
  str = str.replace("mm", this.add0(newDate.getMinutes()));
  str = str.replace("ss", this.add0(newDate.getSeconds()));
  return str
},

module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  formatDate : formatDate
}
