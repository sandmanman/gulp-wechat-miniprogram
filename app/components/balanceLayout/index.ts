Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    isReachBottom: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    navigateToHander({
      currentTarget: {
        dataset = { url: '' }
      }
    }) {
      const { url } = dataset
      wx.navigateTo({ url })
    }
  }
})
