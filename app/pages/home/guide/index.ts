import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    image: '',
    name: '',
    nodeList: []
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '1' } = query
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    app.loadBaseFont()
    this.getGuide(id)
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
      image: data.obj.image,
      name: data.obj.name,
      nodeList: data.obj.node
    })
  }
})
