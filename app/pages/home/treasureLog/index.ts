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
    wiki_id: 0
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getSelsectLogList()
    await this.getTreasureDataList(this.data.titleList[0].id, this.data.pageNumber)
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
    this.setData({
      selected: index
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
  async getTreasureDataList(wiki_id: number, page = 1) {
    wx.showLoading({ title: '数据加载中', mask: true })
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code,
      wiki_id,
      type: 2 as 1 | 2 | 3 | 4,
      page
    })
    // try {
    //   const { obj } = await api.getDynamicList(params)
    // } catch (error) {
    //   console.error(error)
    // }
    const data = await api.getDynamicList(params)
    console.log(data)
    this.setData({ articleList: data.obj.list }, wx.hideLoading())
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
