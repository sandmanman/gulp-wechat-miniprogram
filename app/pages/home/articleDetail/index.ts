import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    code: 0,
    pageNumber: 1,
    canLoadNextPage: true,
    articleList: [
      { source_url: '', source_type: 'image', title: '', play_number: '', play_count: '', nickname: '', avatar_url: '/assets/img/icon/default-head.png' },
      { source_url: '', source_type: 'image', title: '', play_number: '', play_count: '', nickname: '', avatar_url: '/assets/img/icon/default-head.png' },
      { source_url: '', source_type: 'image', title: '', play_number: '', play_count: '', nickname: '', avatar_url: '/assets/img/icon/default-head.png' }
    ],
    momentList: [],
    iconList: [
      {
        icomImg: '/assets/img/my/guide.png',
        txtname: '玩法指南',
        path: '/pages/home/guide/index'
      },
      {
        icomImg: '/assets/img/my/pic.png',
        txtname: '宝物图集',
        path: '/pages/home/treasureAtlas/index'
      },
      {
        icomImg: '/assets/img/my/diary.png',
        txtname: '玩物日志',
        path: '/pages/home/treasureLog/index'
      }
    ],
    wikiInfo: {}
  },
  async onLoad(query: Record<string, string | undefined>) {
    const { id = '' } = query
    this.setData({ code: parseInt(id) })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    const iconList = this.data.iconList
    iconList[0].path += `?id=${id}`
    this.setData({ iconList })
    await this.getArticleList(this.data.code)
    await this.getMomentList(this.data.code)
    await this.getarticleDetailList(parseInt(id))
  },
  async onReachBottom() {
    if (this.data.canLoadNextPage) {
      this.setData({ pageNumber: this.data.pageNumber + 1 })
      await this.getMomentList()
    }
  },
  async getarticleDetailList(id: number) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      id
    })
    const data = await api.getarticleDetailList(params)
    this.setData({ wikiInfo: data.obj })
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '', id: 0 }
    }
  }) {
    const { url, id } = dataset
    if (url === '/pages/home/treasureAtlas/index') {
      wx.navigateTo({
        url: '/pages/home/treasureAtlas/index?id=' + id
      })
      return
    } else if (url === '/pages/home/treasureLog/index') {
      wx.navigateTo({
        url: '/pages/home/treasureLog/index?id=' + id
      })
      return
    }
    wx.navigateTo({ url })
  },
  nagivateToAtlas({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    if (url === '/pages/home/atlas/index') {
      wx.showToast({
        title: '功能正在开发中',
        icon: 'none'
      })
    } else {
      wx.navigateTo({ url })
    }
  },
  sendBtn({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  async getList(type: 1 | 2 | 3 | 4, page = 1, code: string) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      type,
      page,
      code
    })
    try {
      return await api.getDynamicList(params)
    } catch (error) {
      console.error(error)
    }
  },
  async getArticleList(wiki_id: number) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      wiki_id,
      page: 1
    })
    const data = await api.getDailyList(params)
    this.setData({ articleList: data.obj.list })
  },
  async getMomentList(wiki_id: number) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      wiki_id,
      page: this.data.pageNumber
    })
    try {
      const data = await api.getDynamicList(params)
      this.setData({
        canLoadNextPage: data.obj.page.page !== data.obj.page.last_page,
        pageNumber: data.obj.page.page,
        momentList: data.obj.page.page === 1 ? data.obj.list : this.data.momentList.concat(data.obj.list)
      })
    } catch (e) {
      console.error(e.message)
    }
  }
})
