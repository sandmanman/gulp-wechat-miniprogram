import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    auctionList: []
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ id: id })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getAtlasDataList(id)
  },
  async getAtlasDataList(id: number) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id
    })
    const data = await api.getAllAtlasList(params)
    this.setData({ auctionList: data.obj })
  },
  nagivateToAuctionClick({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
