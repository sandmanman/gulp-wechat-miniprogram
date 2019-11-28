Component({
  properties: {
    width: {
      type: Number,
      value: 342
    }
  },
  methods: {
    nagivatorToDynamic() {
      wx.navigateTo({
        url: '/pages/home/moments/index'
      })
    }
  }
})
