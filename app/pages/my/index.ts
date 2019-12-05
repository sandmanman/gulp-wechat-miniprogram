import api from '../../api/index'
import { getSignature } from '../../utils/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    isNetworkError: false,
    swiperHeight: 0,
    navBarList: [
      {
        type: 0,
        name: '动态',
        pageNumber: 0,
        canLoadNextPage: false,
        data: []
      },
      {
        type: 1,
        name: '玩物日志',
        pageNumber: 0,
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
    const currentNav = this.data.navBarList[this.data.activeIndex]
    await this.getList(currentNav.type, currentNav.pageNumber)
  },
  onShow(): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  async onReady() {
    this.getRect(this.data.navBarList[this.data.activeIndex].type === 0 ? '#moment' : '#article')
  },
  async onReachBottom() {
    if (this.data.navBarList[this.data.activeIndex].canLoadNextPage) {
      const navBarList = this.data.navBarList
      navBarList[this.data.activeIndex].pageNumber += 1
      this.setData({ navBarList })
      await this.getList(navBarList[this.data.activeIndex].type, navBarList[this.data.activeIndex].pageNumber)
    }
  },
  async onPullDownRefresh() {
    const navBarList = this.data.navBarList
    const currentNav = Object.assign({}, navBarList[this.data.activeIndex])
    navBarList[this.data.activeIndex].pageNumber = 0
    this.setData({ navBarList })
    await this.getList(currentNav.type, currentNav.pageNumber)
    this.getUserInfo()
    wx.stopPullDownRefresh()
    this.getRect(currentNav.type === 0 ? '#moment' : '#article')
  },
  async updateUserInfo(e: { detail: WechatMiniprogram.GetUserInfoSuccessCallbackResult }) {
    if (e.detail.errMsg !== 'getUserInfo:ok') return
    try {
      const params = getSignature({
        c_p: app.globalData.c_p,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      })
      const data = await api.userUpdate(params)
      this.setData({ userInfo: data.obj }, () => {
        app.globalData.userInfo = this.data.userInfo
        app.globalData.c_p.user_code = this.data.userInfo.user_code
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
        app.globalData.c_p.user_code = this.data.userInfo.user_code
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
      if (this.data.navBarList[current].pageNumber === 0) {
        await this.getList(this.data.navBarList[current].type, 1)
      }
      this.getRect(current === 0 ? '#moment' : '#article')
    })
  },
  getRect(nodeID: '#moment' | '#article') {
    const self = this
    wx.createSelectorQuery().select(nodeID).boundingClientRect((rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
      self.setData({ swiperHeight: rect.height })
    }).exec()
  },
  clickWikiHandle({
    detail = { id: 0, code: 0 }
  }) {
    console.log()
    wx.navigateTo({ url: '/pages/home/dynamicLog/index?code=' + detail.code + '&id=' + detail.id })
  },
  async getList(type: 0 | 1, page = 1) {
    wx.showLoading({ title: '拼命加载中', mask: true })
    const params = getSignature({
      c_p: app.globalData.c_p,
      is_self: 1,
      page
    })
    try {
      let data = null
      if (type === 0) {
        data = await api.getDynamicList(params)
      } else if (type === 1) {
        data = await api.getDailyList(params)
      }
      const { obj } = data
      const navBarList = this.data.navBarList
      const activeIndex = this.data.activeIndex
      navBarList[activeIndex].canLoadNextPage = obj.page.page !== obj.page.last_page
      navBarList[activeIndex].pageNumber = obj.page.page
      navBarList[activeIndex].data = obj.page.page === 1 ? obj.list : navBarList[activeIndex].data.concat(obj.list)
      this.setData({ navBarList }, wx.hideLoading)
      this.getRect(activeIndex === 0 ? '#moment' : '#article')
    } catch (error) {
      console.error(error)
    }
  }
})
