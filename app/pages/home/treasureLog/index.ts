import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    titleList: [],
    articleList: [],
    index: 0,
    selected: 0,
    showlabel: true,
    pageNumber: 0,
    canLoadNextPage: false,
    wiki_id: 0,
    is_self: 0
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ listId: parseInt(id) })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    if (!this.data.listId) {
      await this.getSelsectLogList()
      await this.getTreasureDataList(this.data.titleList[0].id, this.data.pageNumber)
    } else {
      await this.getTreasureDataList(this.data.listId, this.data.pageNumber)
    }
  },
  async onReachBottom() {
    if (this.data.canLoadNextPage) {
      this.setData({ pageNumber: this.data.pageNumber += 1 })
      await this.getTreasureDataList(this.data.wiki_id, this.data.pageNumber)
    }
  },
  titleClick({
    currentTarget: {
      dataset = {
        index: 0,
        id: 0
      }
    }
  }) {
    const { index, id } = dataset
    const articleList = this.data.articleList
    this.setData({
      selected: index,
      articleList: []
    })
    this.getTreasureDataList(id, 1)
  },
  openbtn() {
    this.setData({
      showlabel: false
    })
  },
  closebtn() {
    this.setData({
      showlabel: true
    })
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  async getTreasureDataList(wiki_id: number, page = 1) {
    wx.showLoading({ title: '数据加载中', mask: true })
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code,
      is_self: this.data.is_self,
      wiki_id,
      type: 2 as 1 | 2 | 3 | 4,
      page
    })
    try {
      const { obj } = await api.getDailyList(params)
      const canLoadNextPage = obj.page.page !== obj.page.last_page
      const pageNumber = obj.page.page
      const articleList = this.data.articleList.concat(obj.list)
      this.setData({ articleList, canLoadNextPage, pageNumber }, wx.hideLoading())
    } catch (error) {
      console.error(error)
    }
  },
  async getSelsectLogList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code,
      type: 2,
      page: 1
    })
    const data = await api.selsectArticleList(params)
    this.setData({ titleList: data.obj })
  }
})
