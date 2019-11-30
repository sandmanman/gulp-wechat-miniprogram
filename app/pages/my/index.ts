import api from '../../api/index'
import { getSignature } from '../../utils/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    swiperHeight: 0,
    navBarList: [
      {
        type: 0,
        name: '动态'
      },
      {
        type: 1,
        name: '玩物日志'
      }
    ],
    activeIndex: 0,
    userInfo: {
      nickname: '',
      avatar_url: '/assets/img/icon/default-head.png',
      is_updated: false,
      my_wiki_count: 0
    }
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getUserInfo()
  },
  onReady(): void {
    this.getRect('#moment')
  },
  async updateUserInfo(e: { detail: WechatMiniprogram.GetUserInfoSuccessCallbackResult }) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
    try {
      const data = await api.userUpdate(params)
      this.setData({ userInfo: data.obj }, () => {
        app.globalData.userInfo = this.data.userInfo
        wx.setStorageSync('userInfo', JSON.stringify(this.data.userInfo))
      })
    } catch (error) {
      console.error(error)
    }
  },
  async getUserInfo() {
    const params = getSignature({
      c_p: app.globalData.c_p
    })
    try {
      const data = await api.initUser(params)
      this.setData({ userInfo: data.obj }, () => {
        app.globalData.userInfo = this.data.userInfo
        wx.setStorageSync('userInfo', JSON.stringify(this.data.userInfo))
      })
    } catch (error) {
      console.error(error)
    }
  },
  selectNavbar({
    currentTarget: {
      dataset = { index: 0 }
    }
  }) {
    const { index } = dataset
    this.setData({ activeIndex: index })
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  navChangeHandle({
    detail = {
      current: 0
    }
  }) {
    const { current } = detail
    this.setData({ activeIndex: current }, this.getRect(current === 0 ? '#moment' : '#article'))
  },
  getRect(nodeID: '#moment' | '#article') {
    const self = this
    wx.createSelectorQuery().select(nodeID).boundingClientRect((rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
      self.setData({ swiperHeight: rect.height })
    }).exec()
  }
})
