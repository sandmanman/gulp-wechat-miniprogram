Component({
  properties: {},
  methods: {
    jumpGoodsDetail() {
      wx.navigateTo({
        url: '/pages/home/dynamicLog/index'
      })
    }
  },
  data: {
    auctionList: [
      { username: '小东' },
      { username: '小东' },
      { username: '小东' },
      { username: '小东' },
      { username: '小东' }
    ]
  }
})
