import { getSignature } from '../../../utils/index'
import api from '../../../api/index'

const app = getApp<IAppOption>()

Page({
  data: {
    treasureList: []
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getMyWikiList()
  },
  async getMyWikiList() {
    const params = getSignature({ c_p: app.globalData.c_p })
    try {
      const data = await api.getMyWikiList(params)
      this.setData({ treasureList: data.obj })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const self = this
    const { url } = dataset
    wx.navigateTo({
      url,
      events: {
        async isUpdateList(data: {
          flag: boolean
        }) {
          if (data.flag) await self.getMyWikiList()
        }
      }
    })
  }
})
