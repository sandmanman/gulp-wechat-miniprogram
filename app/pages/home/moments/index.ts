import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    code: '',
    momentInfo: {},
    maxScale: 1,
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
    const { images_list = [] } = data.obj
    let maxScale = 0
    images_list.forEach((item: any, index: number) => {
      const itemScale = item.file_info_obj.width / item.file_info_obj.height
      if (index === 0) {
        maxScale = itemScale
      }
      maxScale = maxScale > itemScale ? maxScale : itemScale
    })
    this.setData({
      momentInfo: data.obj,
      maxScale
    })
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
