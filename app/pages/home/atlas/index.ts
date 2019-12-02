import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    imgList: []
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ id: parseInt(id) })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getAtlasDataList(parseInt(id))
  },
  async getAtlasDataList(id: number) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id
    })
    const data = await api.getAtlasList(params)
    this.setData({ imgList: data.obj })
  },
  // 预览图片
  previewImage({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const self = this
    const imgList = []
    for (let i = 0; i < self.data.imgList.length; i++) {
      imgList.push(self.data.imgList[i].url_oss)
    }
    wx.previewImage({
      current: dataset.url, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  }
})
