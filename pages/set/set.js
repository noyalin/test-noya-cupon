const { http } = require('../../utils/http')
// const { getToken } = require('../../utils/util')
const access_token = '41_iw7NflV8zHJtBydFX7NqjlHsgyTXXTy61dWGZpmS8HQVfzj46HCqNVZCe-PaoB8Nt-SFHjq_NHsVO_g_pGvkCSuw8rQmkt2K6Gq1bTeH2DZdXSaGLIc4GLHzB-3uti6-IXdRFlbSOi5_4tH8HVTgAEAOCA'
Page({
  data: {
    files: [],
    access_token,
    picFile: undefined,
  },

  onLoad() {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },

  uplaodFile(files) {
    console.log('upload files', files)
    var that = this;
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      const tempFilePaths = files.tempFilePaths;

      that.setData(
        {
          picFile: files,
        }
      )
      var object = {};
      object['urls'] = tempFilePaths;
      resolve(object);
    })
  },

  uploadError(e) {
    console.log('upload error', e.detail)
  },

  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },

  uploadPic() {
    const urls = `https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${this.data.access_token}&type=image`
                  
    const params = {
      access_token: this.data.access_token,
      media: {
        contentType: 'image/jpg',
        value: this.data.picFile.contents[0] // 媒体文件 Buffer
      }
    }
    console.log('params', params)

    http.post(urls, params, { 'Content-Type': 'multipart/form-data' }).then(({ data }) => {
      console.log('uplode', data)
    })
  },
});