import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    code: '',
    articleInfo: {},
    momentList: []
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ code: id })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    this.getDynamicLog()
    this.getDynamicLogList()
    app.loadBaseFont()
  },
  async getDynamicLog() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code
    })
    const data = await api.getDynamicLog(params)
    this.setData({
      articleInfo: data.obj
    })
  },
  async getDynamicLogList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code,
      type: 2 as 1 | 2 | 3 | 4,
      page: 1
    })
    const data = await api.getDynamicList(params)
    this.setData({ momentList: data.obj.list })
  },
  previewImageHandle({
    currentTarget: {
      dataset: {
        current = '',
        index = 0
      }
    }
  }) {
    const self = this
    wx.previewImage({
      urls: self.data.momentList[index].source_list.map((i: any) => i.url_oss),
      current
    })
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
