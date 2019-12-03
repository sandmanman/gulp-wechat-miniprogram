import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    code: '',
    articleInfo: {},
    momentList: [],
    showConfirmActionSheet: false,
    canLoadNextPage: false,
    pageNumber: 0,
    totalLength: 0
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '', code = '' } = query
    this.setData({ code, id })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    this.getDynamicLog()
    this.getDynamicLogList()
    app.loadBaseFont()
  },
  async onReachBottom() {
    if (this.data.canLoadNextPage) {
      this.setData({ pageNumber: this.data.pageNumber + 1 })
      await this.getDynamicLogList()
    }
  },
  async onPullDownRefresh() {
    this.setData({
      pageNumber: 0,
      canLoadNextPage: false
    })
    await this.getDynamicLogList()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: this.data.articleInfo.title,
      path: `/pages/home/moments/index?id=${this.data.code}`
    }
  },
  async getDynamicLog() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      code: this.data.code
    })
    const data = await api.getDynamicLog(params)
    this.setData({
      articleInfo: data.obj
    })
  },
  async getDynamicLogList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id: this.data.id,
      page: this.data.pageNumber
    })
    const data = await api.getWikiMomentList(params)
    this.setData({
      totalLength: data.obj.page.total,
      canLoadNextPage: data.obj.page.page !== data.obj.page.last_page,
      pageNumber: data.obj.page.page,
      momentList: data.obj.page.page === 1 ? data.obj.list : this.data.momentList.concat(data.obj.list)
    })
  },
  previewImageHandle({
    currentTarget: {
      dataset: {
        current = '',
        index = 0
      }
    }
  }) {
    const self = this
    wx.previewImage({
      urls: self.data.momentList[index].media_list.map((i: any) => i.url_oss),
      current
    })
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  async deleteConfirmActionSheetHander() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id: this.data.code
    })
    try {
      const data = await api.wikiDelete(params)
      this.hideConfirmActionSheetHander()
      wx.showToast({
        title: data.msg
      })
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
  }
})
