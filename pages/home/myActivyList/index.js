// pages/home/myActivyList/index.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList : [],
    current : 0,
    showDialog : false,
    activeList : [],
    codePath : '',
    page : {
      page : 1,
      pageSize : 10
    },
    finish : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getShopList(){
    util.ajax({
      url: '/v1/shop/shop-list',
      method: 'GET',
      success: (res) => {
        this.setData({
          shopList: res.data
        })
        if (res.data.length != 0){
          this.getActiveList(res.data[0].ID)
        }else{
          this.getActiveList();
        }
      }
    })
  },
  changTab(e){
    let id = e.currentTarget.id;
    this.setData({
      current: id
    })
    this.getActiveList(this.data.shopList[id].ID);
  },
  getActiveList(shopId){
    util.ajax({
      url: '/v1/task/get-mylist',
      method: 'GET',
      data : {
        shop_id: shopId?shopId:'',
        page : 1,
        pageSize : 10
      },
      success: (res) => {
        this.setData({
          activeList: res.data
        })
        if (res.data.pageData.macPage == 0 || res.data.pageData.macPage == this.data.page.page) {
          this.setData({
            finish: true
          })
        }
      }
    })
    
  },
  toBilling(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/home/billing/index?id=' + id + '&shopId=' + this.data.shopList[this.data.current].ID,
    })
  },
  showCode(e){
    let id = e.currentTarget.id;
    this.setData({
      codePath: this.data.activeList[id].path_code,
      showDialog : true
    })
  },
  closeDialog(){
    this.setData({
      showDialog: false
    })
  }
})