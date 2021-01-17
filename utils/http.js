const http = {
  get: (url, header) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'get',
        data: {},
        header: header || {
          'Content-Type': 'application/json'
        },
        success: resolve,
        fail: reject
      })
    })
  },

  post: (url, data, header) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'post',
        data,
        header: header || {
          'Content-Type': 'application/json'
        },
        success: resolve,
        fail: reject
      })
    })
  }
}

module.exports = {
  http
}