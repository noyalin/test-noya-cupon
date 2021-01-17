// components/banner/searchBanner.js
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
    inputShowed: false,
    inputVal: ""
  },

  lifetimes: {
    ready: function() {
      this.init()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
      init() {
        this.setData({
          search: this.search.bind(this)
        })
      },

      search(value) {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
              }, 200)
          })
      },


      selectResult(e) {
        console.log('select result', e.detail)
      }
  
  }
})
