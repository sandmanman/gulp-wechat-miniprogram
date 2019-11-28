// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    treasureList: [
      { categoryName: '翡翠' },
      { categoryName: '和田玉' },
      { categoryName: '玛瑙' },
      { categoryName: '南红' },
      { categoryName: '宝典' },
      { categoryName: '钻石' },
      { categoryName: '黄金' },
      { categoryName: '书画' }
    ]
  },
  onShow(): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  navigatorToDynamicDetail({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
