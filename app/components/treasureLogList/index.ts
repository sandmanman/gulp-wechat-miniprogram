Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    id: {
      type: Number,
      value: 0
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
