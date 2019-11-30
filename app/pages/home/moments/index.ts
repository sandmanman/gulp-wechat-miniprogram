import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    code: '',
    momentInfo: {},
    swiperCurrent: 1
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ code: id })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getDynamicList()
  },
  async getDynamicList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code
    })
    const data = await api.getDynamicDetail(params)
    this.setData({ momentInfo: data.obj })
  },
  navigationBackHander() {
    wx.navigateBack()
  },
  swiperChange({
    detail: {
      current = 0
    }
  }) {
    this.setData({ swiperCurrent: current + 1 })
  }
})
