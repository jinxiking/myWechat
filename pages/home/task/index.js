// pages/home/task/index.js
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showToast : false,
    shopList : [],
    task : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取门店
    this.getShopList(options.id);
    //获取任务详情
    this.getTaskDetail(options.id);
  },
  getTaskDetail(id){
    util.ajax({
      url: '/v1/task/get-info',
      method: 'GET',
      data : {
        task_id: id
      },
      success: (res) => {
        this.setData({
          task: res.data
        })
      }
    })
  },
  getShopList(id){
    util.ajax({
      url: '/v1/task/get-ShopTaskInfo',
      method: 'GET',
      data : {
        task_id : id
      },
      success: (res) => {
     
        this.setData({
          shopList : res.data
        })
     
      }
    })
  },
  apply(e){
    let shopId = e.currentTarget.id;
    util.ajax({
      url: '/v1/task/task-apply',
      method: 'POST',
      data : {
        task_id : this.data.task.ID,
        shop_id: shopId,
      },
      success: (res) => {
        this.setData({
          showToast : true
        })
      }
    })
  },
  closeDialog(){
    this.setData({
      showToast : false
    })
    this.onLoad();
  }
})