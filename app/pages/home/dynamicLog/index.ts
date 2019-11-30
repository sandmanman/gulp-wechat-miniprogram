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
      type: 1 as 1 | 2 | 3 | 4,
      page: 1
    })
    const data = await api.getDynamicList(params)
    this.setData({ momentList: data.obj.list })
  }
})
