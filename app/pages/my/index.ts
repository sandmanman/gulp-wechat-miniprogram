const app = getApp<IAppOption>()

export default Page({
  data: {
    titleList: [{ txtname: '动态' }, { txtname: '玩物日志' }],
    selsectIndex: 0,
    userInfo: {
      nickname: '- -',
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
