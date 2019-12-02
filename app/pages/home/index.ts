import api from '../../api/index'
import { getSignature } from '../../utils/index'
const app = getApp<IAppOption>()

export default Page({
  data: {
    guideList: [
      { cover: '', name: '' },
      { cover: '', name: '' },
      { cover: '', name: '' },
      { cover: '', name: '' },
      { cover: '', name: '' },
      { cover: '', name: '' },
      { cover: '', name: '' },
      { cover: '', name: '' }
    ],
    articleList: [
      { source_url: '', source_type: 'image', title: '', play_number: '', play_count: '', nickname: '', avatar_url: '/assets/img/icon/default-head.png' },
      { source_url: '', source_type: 'image', title: '', play_number: '', play_count: '', nickname: '', avatar_url: '/assets/img/icon/default-head.png' },
      { source_url: '', source_type: 'image', title: '', play_number: '', play_count: '', nickname: '', avatar_url: '/assets/img/icon/default-head.png' }
    ],
    momentList: [],
    pageNumber: 0,
    canLoadNextPage: true
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    this.getWikiList()
    this.getArticleList()
    this.getMomentList()
  },
  async onReachBottom() {
    if (this.data.canLoadNextPage) {
      this.setData({ pageNumber: this.data.pageNumber + 1 })
      await this.getMomentList()
    }
  },
  async onPullDownRefresh() {
    this.setData({ pageNumber: 0 })
    await this.getArticleList()
    await this.getMomentList()
    wx.stopPullDownRefresh()
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  async getWikiList() {
    const params = getSignature({
      c_p: app.globalData.c_p
    })
    try {
      const data = await api.getWikiList(params)
      this.setData({
        guideList: data.obj
      })
    } catch (error) {
      console.error(error)
    }
  },
  async getArticleList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      page: 1
    })
    const data = await api.getDailyList(params)
    this.setData({ articleList: data.obj.list })
  },
  async getMomentList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      page: this.data.pageNumber
    })
    try {
      const data = await api.getDynamicList(params)
      this.setData({
        canLoadNextPage: data.obj.page.page !== data.obj.page.last_page,
        pageNumber: data.obj.page.page,
        momentList: data.obj.page.page === 1 ? data.obj.list : this.data.momentList.concat(data.obj.list)
      })
    } catch (e) {
      console.error(e.message)
    }
  }
})
