// pages/home/activity/index.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
  },
  getDetail(id){
    util.ajax({
      url: '/v1/banner/get-banner',
      method: 'GET',
      data: {
        id: id,
      },
      success: (res) => {
        this.setData({
          detail : res.data
        })
      }
    })
  }
})