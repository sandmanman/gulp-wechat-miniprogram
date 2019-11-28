import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    cover: '',
    nodeList: []
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '1' } = query
    await app.userLogin()
    await this.getGuide(parseInt(id))
  },
  navigationBackHander() {
    wx.navigateBack()
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  async getGuide(id: number) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id
    })
    const data = await api.getGuide(params)
    this.setData({
      cover: data.obj.cover,
      nodeList: data.obj.node
    })
    console.log(data.obj)
  }
})
