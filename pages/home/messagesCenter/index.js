// pages/home/messagesCenter/index.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page : {
      page : 1,
      pageSize : 20
    },
    finish : false,
    list : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(finish){
      return;
    }
    let num = this.data.page.page;
    this.setData({
      page : {
        page : num + 1
      }
    })
    this.loadList();
  },
  fomatDate(val){
    console.log(util.formatDate(val))
    return util.formatDate(val)
  },

  loadList(){
    
    util.ajax({
      url: '/v1/notice/get-list',
      method: 'GET',
      data : {
        page : this.data.page.page,
        pageSize : this.data.page.pageSize
      },
      success: (res) => {
        this.setData({
          list: res.data.data
        })
        if (res.data.pageData.macPage == 0 || res.data.pageData.macPage == this.data.page.page){
          this.setData({
            finish : true
          })
        }
      }
    })
    
  },
  mesDetail(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/home/mesDetail/index?id=' + id,
    })
  }
})