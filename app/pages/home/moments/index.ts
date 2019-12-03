import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    code: '',
    momentInfo: {},
    maxScale: 1,
    swiperCurrent: 1,
    showConfirmActionSheet: false
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ code: id })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getDynamicList()
  },
  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    console.log(this.data.momentInfo)
    return {
      title: this.data.momentInfo.title || this.data.momentInfo.content || '我在至尊宝物上发了一篇动态，快来看看吧',
      path: `/pages/home/moments/index?id=${this.data.code}`
    }
  },
  async onPullDownRefresh() {
    await this.getDynamicList()
    wx.stopPullDownRefresh()
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
  },
  previewImageHandle({
    currentTarget: {
      dataset: {
        current = ''
      }
    }
  }) {
    const self = this
    wx.previewImage({
      urls: self.data.momentInfo.images_list.map((i: any) => i.url_oss),
      current
    })
  },
  async deleteConfirmActionSheetHander() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id: this.data.momentInfo.wiki_user_id
    })
    try {
      const { msg } = await api.deleteMoment(params)
      this.hideConfirmActionSheetHander()
      wx.showToast({ title: msg })
      setTimeout(() => wx.navigateBack, 1500)
    } catch (e) {
      console.error(e.message)
    }
  },
  showConfirmActionSheetHander() {
    this.setData({ showConfirmActionSheet: true })
  },
  hideConfirmActionSheetHander() {
    this.setData({ showConfirmActionSheet: false })
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
