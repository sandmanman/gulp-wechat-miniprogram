import api from '../../api/index'
import { getSignature } from '../../utils/index'
const app = getApp<IAppOption>()

export default Page({
  data: {
    guideList: [],
    articleList: [],
    momentList: [],
    pageNumber: 1,
    canLoadNextPage: true
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getWikiList()
    await this.getArticleList()
    await this.getMomentList()
  },
  async onReachBottom() {
    if (this.data.canLoadNextPage) {
      this.setData({ pageNumber: this.data.pageNumber + 1 })
      await this.getMomentList()
    }
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
  async getList(type: 1 | 2 | 3 | 4, page = 1) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      type,
      page
    })
    try {
      return await api.getDynamicList(params)
    } catch (error) {
      console.error(error)
    }
  },
  async getArticleList() {
    const data = await this.getList(2)
    this.setData({ articleList: data.obj.list })
  },
  async getMomentList() {
    const data = await this.getList(1, this.data.pageNumber)
    this.setData({
      canLoadNextPage: this.data.pageNumber !== data.obj.last_page,
      momentList: data.obj.list
    })
  }
})
