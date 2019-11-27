import api from '../../api/index'
import { getSignature } from '../../utils/index'
import config from '../../config/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    titleList: [{ txtname: '动态' }, { txtname: '玩物日志' }],
    selsectIndex: 0,
    userInfo: {
      nickname: '',
      avatar_url: '/assets/img/icon/default-head.png'
    }
  },
  async onLoad() {
    await app.userLogin()
    this.setData({ userInfo: app.globalData.userInfo })
  },
  onShow(): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  async getUerInfo(e: {
    detail: WechatMiniprogram.GetUserInfoSuccessCallbackResult
  }) {
    console.log(e)
    const params = getSignature({
      c_p: Object.assign(config.cp, {
        user_code: app.globalData.userInfo.user_code
      }),
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    }, 'POST')
    const userInfo = await api.userUpdate(params)
    this.setData({ userInfo })
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
