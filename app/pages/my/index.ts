import api from '../../api/index'
import { getSignature } from '../../utils/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    titleList: [{ txtname: '动态' }, { txtname: '玩物日志' }],
    selsectIndex: 0,
    userInfo: {
      nickname: '',
      avatar_url: '/assets/img/icon/default-head.png',
      is_updated: false
    }
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    this.setData({ userInfo: app.globalData.userInfo })
  },
  onShow(): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  async getUerInfo(e: { detail: WechatMiniprogram.GetUserInfoSuccessCallbackResult }) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
    try {
      const data = await api.userUpdate(params)
      this.setData({ userInfo: data.obj }, () => {
        app.globalData.userInfo = this.data.userInfo
        wx.setStorageSync('userInfo', JSON.stringify(this.data.userInfo))
      })
    } catch (error) {
      console.error(error)
    }
  },
  selectBtn({
    currentTarget: {
      dataset = { index: 0 }
    }
  }) {
    const { index } = dataset
    this.setData({
      selsectIndex: index
    })
  }
})
