import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    cover: '',
    nodeList: []
  },
  async onLoad() {
    await app.userLogin()
    await this.getGuide()
  },
  navigationBackHander() {
    wx.navigateBack()
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    console.log(dataset)
    const { url } = dataset
    wx.navigateTo({ url })
  },
  async getGuide() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id: 1
    })
    const data = await api.getGuide(params)
    this.setData({
      cover: data.obj.cover,
      nodeList: data.obj.node
    })
    console.log(data.obj)
  }
})
