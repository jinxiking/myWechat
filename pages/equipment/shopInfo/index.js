// pages/logins/bind/index.js

const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName: '',
    shopTypeList: [],
    shopTypeArr: [],
    shopIndex: 0,
    region: [],
    regionCode: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopTypeList();
  },
  bindNameInput(val) {
    this.setData({
      shopName: val.detail.value
    })
  },
  bindAdressInput(val) {
    this.setData({
      adress: val.detail.value
    })
  },
  //获取商铺类型
  getShopTypeList() {
    console.log(1)
    util.ajax({
      url: '/v1/shoptype/get-list',
      method: 'GET',
      success: (res) => {
        this.setData({
          shopTypeList: res.data
        })
        let arr = []
        for (var i in res.data) {
          arr.push(res.data[i].name);

        }

        this.setData({
          shopTypeArr: arr
        })

      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log()
    this.setData({
      shopIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })

    this.setData({
      regionCode: e.detail.code
    })
  },
})