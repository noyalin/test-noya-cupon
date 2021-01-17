// components/tabBox/tabBox.js

const { getToken } = require('../../utils/util')
const { http } = require('../../utils/http')

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs: [],
    list: [],
    activeTab: 0,
  },

  lifetimes: {
    ready: function () {
      this.setTabs()
      this.getList()
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    setTabs() {
      const titles = ['首页', '外卖', '商超生鲜', '购物', '美食饮品', '生活服务', '休闲娱乐', '出行']
      const tabs = titles.map((item, i) => ({ title: item, active: i === 0 }))
      this.setData({ tabs })
    },

    getList() {
      const list = [{ company: 'dior jkljkljlklkjkl', title: '标题', image: '', amount: 10, count: 10 }]
      for (let a = 0; a < 10; a++) {
        list.push(list[0])
      }

      this.setData({ list })
    },

    onTabCLick({ target }) {
      const index = target.dataset.index
      this.setData({ activeTab: index })
    }
  }
})
