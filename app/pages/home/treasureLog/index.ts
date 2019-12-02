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
    page: 1
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ code: id })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    this.getSelsectLogList()
    this.getTreasureDataList()
  },
  titleClick({
    currentTarget: {
      dataset = {
        index: 0,
        id: 1
      }
    }
  }) {
    const { index, id } = dataset
    this.setData({
      selected: index,
      wiki_id: id
    })
    this.getTreasureDataList()
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
  async getTreasureDataList(type: 1 | 2 | 3 | 4, wiki_id = 1, page = 1) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code,
      wiki_id,
      type: 2,
      page
    })
    const data = await api.getDynamicList(params)
    console.log(data)
    this.setData({ articleList: data.obj.list })
  },
  async getSelsectLogList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code,
      type: 2,
      page: 1
    })
    const data = await api.selsectArticleList(params)
    console.log(data)
    this.setData({ titleList: data.obj })
  }
})
