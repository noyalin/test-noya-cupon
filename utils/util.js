
const { baiduAk, appId, appSecret } = require('./constant.js')
const { http } = require('./http.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 通过百度api获取经纬度对应的城市
const curCity = (longitude, latitude, callback) => {
  wx.request({
    url: `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${baiduAk}&location=${latitude},${longitude}&output=json&pois=1`,
    data: {},
    header: {
      'Content-Type': 'application/json'
    },
    success: ({ data }) => {
      if (callback) callback(data)
    }
  })
}

// 获取经纬度
const getLocation = (callback) => {
  wx.getLocation({
    success: (res) => {
      console.log(res)
      const longitude = res.longitude
      const latitude = res.latitude
      curCity(longitude, latitude, callback)
    }
  })
}

// 获取位置权限
const getUserLocation = (callback) => {
  wx.getSetting({
    success: (res) => {
      console.log(JSON.stringify(res))
      console.log(res.authSetting['scope.userLocation']);
      // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
      // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
      // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
      if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
        wx.showModal({
          title: '请求授权当前位置',
          content: '喜欢房需要获取您的地理位置，请确认授权',
          success: function (res) {
            if (res.cancel) {
              wx.showToast({
                title: '拒绝授权',
                icon: 'none',
                duration: 1000
              })
            } else if (res.confirm) {
              wx.openSetting({
                success: function (dataAu) {
                  if (dataAu.authSetting["scope.userLocation"] == true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //再次授权，调用wx.getLocation的API
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              })
            }
          }
        })
      } else if (res.authSetting['scope.userLocation'] == undefined) {
        //调用wx.getLocation的API
        getLocation(callback);
      } else {
        //调用wx.getLocation的API
        getLocation(callback);
      }
    }
  })
}

const getToken = (callback) => {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

  http.get(url).then(({ data }) => {
    if (callback) callback(data)
  })
}

module.exports = {
  formatTime: formatTime,
  getUserLocation,
  getToken
}
