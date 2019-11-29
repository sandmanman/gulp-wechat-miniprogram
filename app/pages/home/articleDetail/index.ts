import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    iconList: [
      {
        icomImg: '/assets/img/my/guide.png',
        txtname: '玩法指南',
        path: '/pages/home/guide/index'
      },
      {
        icomImg: '/assets/img/my/pic.png',
        txtname: '宝物图集',
        path: '/pages/home/atlas/index'
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
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    const iconList = this.data.iconList
    iconList[0].path += `?id=${id}`
    this.setData({ iconList })
    await this.getarticleDetailList(parseInt(id))
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
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  sendBtn({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
