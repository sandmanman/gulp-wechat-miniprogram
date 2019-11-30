import api from '../../api/index'
import { getSignature } from '../../utils/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    swiperHeight: 0,
    navBarList: [
      {
        type: 3,
        name: '动态',
        pageNumber: 1,
        canLoadNextPage: false,
        data: []
      },
      {
        type: 4,
        name: '玩物日志',
        pageNumber: 1,
        canLoadNextPage: false,
        data: []
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
    this.getUserInfo()
  },
  async onReady() {
    const currentNav = this.data.navBarList[this.data.activeIndex]
    await this.getList(currentNav.type, currentNav.pageNumber)
    this.getRect('#moment')
  },
  async onReachBottom() {
    if (this.data.navBarList[this.data.activeIndex].canLoadNextPage) {
      const navBarList = this.data.navBarList
      navBarList[this.data.activeIndex].pageNumber += 1
      this.setData({ navBarList })
      await this.getMomentList()
    }
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
    this.setData({ activeIndex: current }, async () => {
      await this.getList(this.data.navBarList[current].type, this.data.navBarList[current].pageNumber)
      this.getRect(current === 0 ? '#moment' : '#article')
    })
  },
  getRect(nodeID: '#moment' | '#article') {
    const self = this
    wx.createSelectorQuery().select(nodeID).boundingClientRect((rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
      self.setData({ swiperHeight: rect.height })
    }).exec()
  },
  async getList(type: 1 | 2 | 3 | 4, page = 1) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      type,
      page
    })
    try {
      const { obj } = await api.getDynamicList(params)
      const navBarList = this.data.navBarList
      const activeIndex = this.data.activeIndex
      navBarList[activeIndex].canLoadNextPage = obj.current_page !== obj.last_page
      navBarList[activeIndex].pageNumber = obj.current_page
      navBarList[activeIndex].data = obj.current_page === 1 ? obj.list : navBarList[activeIndex].data.concat(obj.list)
      this.setData({ navBarList })
    } catch (error) {
      console.error(error)
    }
  }
})
