import api from '../../api/index'
import { getSignature } from '../../utils/index'
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    guideList: []
  },
  async onLoad() {
    await this.getGuideList()
  },
  onShow(): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
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
  async getGuideList() {
    const params = getSignature({
      c_p: app.globalData.c_p
    })
    try {
      const data = await api.getGuideList(params)
      this.setData({
        guideList: data.obj
      })
    } catch (error) {
      console.error(error)
    }
  }
})
