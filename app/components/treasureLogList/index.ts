Component({
  properties: {
    list: {
      type: Array,
      value: []
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
