const util = require('../../../utils/util.js');
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    indicatorDotss : true,
    vertical: true,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    current : 0,
    bannerList : [],
    cementList : [],
    hotList : [],
    newList : []
  },
  onLoad: function (options) {
    this.getBanner();
    this.getAnnouncement();
    this.hotList();
    this.newList();
  },
  newList(){
    util.ajax({
      url: '/v1/task/get-list',
      method: 'GET',
      data: {
        page: 1,
        pageSize: 2,
        type: 1
      },
      success: (res) => {
        this.setData({
          newList: res.data.data
        })
      }
    })
  },
  hotList(){
    util.ajax({
      url: '/v1/task/get-list',
      method: 'GET',
      data: {
        page: 1,
        pageSize: 6,
        type : 2
      },
      success: (res) => {
        this.setData({
          hotList : res.data.data
        })
      }
    })
  },
  bindchange(index){
    this.setData({
      current: index.detail.current
    })
  },
  getAnnouncement(){
    util.ajax({
      url: '/v1/notice/get-list',
      method: 'GET',
      data : {
        page : 1,
        pageSize : 6
      },
      success: (res) => {
        let arr = [];
        for (let i in res.data.data){
          if(i == 0){
            arr.push([res.data.data[i]]);
          }else if(i == 1){
            arr[0].push(res.data.data[i]);
          }else if(i == 2){
            arr[1] = [];
            arr[1].push(res.data.data[i])
          }else if(i == 3){
            arr[1].push(res.data.data[i])
          }else if(i == 4){
            arr[2] = [];
            arr[2].push(res.data.data[i])
          } else if (i == 5){
            arr[2].push(res.data.data[i])
          }
        }
        this.setData({
          cementList: arr
        });
      }
    })
  },
  getBanner(){
    util.ajax({
      url: '/v1/banner/get-banner',
      method: 'GET',
      success: (res) => {
        this.setData({
          bannerList : res.data
        })
      }
    })
  },
  toCementList(){
    wx.navigateTo({
      url: '/pages/home/messagesCenter/index',
    })
  },
  toActive(e){
    console.log(e)
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/home/activity/index?id=' + id,
    })
  }
})
