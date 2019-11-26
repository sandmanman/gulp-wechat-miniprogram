import api from '../../api/index'
import { WXLogin, getSignature } from '../../utils'
import config from '../../config/index'

Page({
  data: {
    titleList: [{ txtname: '动态' }, { txtname: '玩物日志' }],
    selsectIndex: 0
  },
  onLoad(query: Record<string, string | undefined>): void {
    this.userLogin()
  },
  onShow(): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  async userLogin() {
    const params = getSignature({
      c_p: config.cp,
      code: await WXLogin()
    }, 'POST')
    const data = await api.userLogin(params)
    console.log(data)
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
