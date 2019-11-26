Page({
  data: {},
  navigationBackHander() {
    wx.navigateBack()
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    console.log(dataset)
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
