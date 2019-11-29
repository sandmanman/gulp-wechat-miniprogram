import api from '../../api/index'
import { getSignature } from '../../utils/index'
const app = getApp<IAppOption>()

export default Page({
  data: {
    guideList: [],
    articleList: []
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getGuideList()
    await this.getArticleList()
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
  },
  async getArticleList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      page: 1
    })
    try {
      const data = await api.getArticleList(params)
      this.setData({ articleList: data.obj.list })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
})
