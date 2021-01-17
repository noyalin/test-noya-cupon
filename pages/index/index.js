//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [{
      "text": "我的优惠券"
    },
    {
        "text": "分享优惠"
    }]
  },
  
  onLoad: function () {
  },

  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select('#tab-container')
    })
  },

  onScroll(e) {
    console.log('onScroll', e)
  }
})
