// components/pickerCity/pickerCity.js
const address = require('../../utils/city.js')
const { getUserLocation } = require('../../utils/util.js')
console.log(address, 'address')

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
    value: [0, 0], // 地址选择器省市区 暂存 currentIndex
    region: '', //所在地区
    regionValue: [0, 0], // 地址选择器省市区 最终 currentIndex
    provinces: [], // 一级地址
    citys: [], // 二级地址
    visible: false,
    isCanConfirm: true //是否禁止在第一列滚动期间点击确定提交数据
  },

  lifetimes: {
    attached: function () {
      getUserLocation((data) => {
        this.setLocation(data)
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setLocation(data) {
      const { province, city } = data.result.addressComponent

      console.log(province, city,)
      const currentProvince = address.provinces.find(d => d.name === province)
      const currentCitys = address.citys[currentProvince.id]
      this.setData({
        provinces: address.provinces, // 34省
        citys: currentCitys,
        region: data.result.addressComponent.city,
        regionValue: [
          address.provinces.findIndex(d => d.name === province), 
          currentCitys.findIndex(d => d.name === city)]
      })
    },

    bindRegionChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        region: e.detail.value
      })
    },

    closePopUp() {
      this.setData({
        visible: false
      })
    },

    pickAddress() {
      this.setData({
        visible: true,
        value: [...this.data.regionValue]
      })
    },

    // 处理省市县联动逻辑 并保存 value
    cityChange(e) {
      const value = e.detail.value
      let {
        provinces,
        citys
      } = this.data
      const provinceNum = value[0]
      const cityNum = value[1]
      // const areaNum = value[2]

      if (this.data.value[0] !== provinceNum) {
        const id = provinces[provinceNum].id
        this.setData({
          value: [provinceNum, 0],
          citys: address.citys[id],
          // areas: address.areas[address.citys[id][0].id]
        })
      } else if (this.data.value[1] !== cityNum) {
        const id = citys[cityNum].id
        this.setData({
          value: [provinceNum, cityNum],
          // areas: address.areas[citys[cityNum].id]
        })
      } else {
        this.setData({
          value: [provinceNum, cityNum]
        })
      }
    },

    preventTouchmove() { },
    // 城市选择器
    // 点击地区选择取消按钮
    cityCancel(e) {
      const id = address.provinces[0].id
      this.setData({
        citys: this.data.lastCitys || address.citys[id], //默认北京市辖区,
        // areas: this.data.lastAreas || address.areas[address.citys[id][0].id],
        value: [...this.data.regionValue],
        visible: false
      })
    },
    // 提交时由序号获取省市区id
    getRegionId(type) {
      let value = this.data.regionValue
      let provinceId = address.provinces[value[0]].id
      let townId = address.citys[provinceId][value[1]].id


      if (type === 'provinceId') {
        return provinceId
      } else if (type === 'townId') {
        return townId
      }
    },
    chooseStart(e) {
      this.setData({
        isCanConfirm: false
      })
    },
    chooseEnd(e) {
      this.setData({
        isCanConfirm: true
      })
    },

    // 点击地区选择确定按钮
    citySure(e) {
      if (this.data.isCanConfirm) {
        const value = this.data.value
        this.setData({
          visible: false
        })
        let region
        // 将选择的城市信息显示到输入框
        try {
          region = this.data.citys[value[1]].name || ''
          // if (this.data.areas.length > 0) {
          //   region = region + this.data.areas[value[2]].name || ''
          // } else {
          //   this.data.value[2] = 0
          // }
        } catch (error) {
          console.log('adress select something error')
        }

        this.setData({
          region: region,
          lastCitys: this.data.citys,
          // lastAreas: this.data.areas,
          regionValue: [...this.data.value]
        }, () => {
          console.log(`省份ID：${this.getRegionId('provinceId')}: 市区ID：${this.getRegionId('townId')}`)
        })
      }
    },
  }
})
