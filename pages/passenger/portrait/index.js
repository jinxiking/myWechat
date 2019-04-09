import * as echarts from '../../../components/ec-canvas/echarts';
const util = require('../../../utils/util.js');
const app = getApp();

let chart = null;

let option = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  calculable: true,
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        }
      },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  ]
};

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);


  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    type : '1',
    ec: {
      onInit: initChart
    },
    shopList : ['基本信息','教育职业','消费力'],
    current : 0,
    shopListReal : [],
    shopListRealArr : [],
    shopIndex : 0,
    searchDateStart : '',
    searchDateEnd: '',
  },
  onLoad(){
    this.getShopList();
  },
  getShopList(){
    util.ajax({
      url: '/v1/shop/shop-list',
      method: 'GET',
      success: (res) => {
        let arr = [];
        for(var i in res.data){
          arr.push(res.data[i].name)
        }
        this.setData({
          shopListReal: res.data,
          shopListRealArr: arr
        })
      }
    })
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
      option.legend = {};
      chart.setOption(option,true);
    }, 2000);
  },
  changTab(e) {
    let id = e.currentTarget.id;
    this.setData({
      current: id
    })
  },
  bindShopPicker(e){
    this.setData({
      shopIndex: e.detail.value
    })
  },
  bindStartDate(e){
    this.setData({
      searchDateStart : e.detail.value
    })
  },
  bindEndDate(e){
    this.setData({
      searchDateEnd: e.detail.value
    })
  },
  changType(e){
   
    let index = e.currentTarget.dataset.type
    this.setData({
      type : index
    })
  }
});
