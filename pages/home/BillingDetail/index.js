// pages/home/BillingDetail/index.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [],
    balance_num : '',
    balance_amount: '',
    time : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id,options.time);
    this.setData({
      balance_num: options.balance_num,
      balance_amount: options.balance_amount,
      time: options.time,
    })
  },
  getDetail(id,time){
    util.ajax({
      url: '/v1/task/get-shopTaskBalanceDetail',
      method: 'GET',
      data: {
        id: id,
        report_day : time
      },
      success: (res) => {
        this.setData({
          list : res.data
        })
      }
    })
  }
})