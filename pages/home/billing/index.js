// pages/home/billing/index.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {},
    lsit : [],
    // 关系ID
    id : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getDetail(options.id);
    this.getList(options.id);
    this.setData({
      id: options.id
    })
  },

  getDetail(id,shopId){
    util.ajax({
      url: '/v1/task/get-shopTaskBalance',
      method: 'GET',
      data : {
        id : id || 1,
      },
      success: (res) => {
        this.setData({
          detail : res.data
        })
      }
    })
  },
  getList(id){
    util.ajax({
      url: '/v1/task/get-shopTaskBalanceDay',
      method: 'GET',
      data: {
        id : id || 1,
      },
      success: (res) => {
        this.setData({
          list: res.data
        })
      }
    })
  },
  toDayDetail(e){
    let time = e.currentTarget.dataset.time;
    let balance_amount = e.currentTarget.dataset.balance_amount;
    let balance_num = e.currentTarget.dataset.balance_num;
    wx.navigateTo({
      url: '/pages/home/BillingDetail/index?time=' + time + '&id=' + this.data.id + '&balance_amount=' + balance_amount + '&balance_num=' + balance_num,
    })
  },
  topreviewPath(){
    wx.navigateTo({
      url: '/pages/home/activeLink/index?id=' + this.data.id,
    })
  }
})