// pages/home/activeLink/index.js
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
    this.getDetail();
  },
  copy(){
    let that = this;
    wx.setClipboardData({
      data: that.data.detail.path_code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  getDetail(id){
    util.ajax({
      url: '/v1/task/get-shopTaskBalance',
      method: 'GET',
      data: {
        id: id || 1,
      },
      success: (res) => {
        this.setData({
          detail: res.data
        })
      }
    })
  }

})