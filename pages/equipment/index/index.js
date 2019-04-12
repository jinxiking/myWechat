// pages/equipment/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toShop(){
    wx.navigateTo({
      url: '/pages/equipment/shopInfo/index',
    })
  },
  toAll(){
    wx.navigateTo({
      url: '/pages/equipment/problems/index',
    })
  },
  toZhiDetail(){
    wx.navigateTo({
      url: '/pages/equipment/box/index',
    })
  }
})