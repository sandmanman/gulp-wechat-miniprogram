Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(list: any[]) {
        if (!list.length) {
          this.setData({ flowList: [] })
          return
        }
        let leftHeight = 0
        let rightHeight = 0
        const flowList = list.reduce((acc, item) => {
          const scale = item.file_info.height / item.file_info.width
          if (leftHeight > rightHeight) {
            rightHeight += scale
            acc[1].push(item)
          } else {
            leftHeight += scale
            acc[0].push(item)
          }
          return acc
        }, [[], []])
        this.setData({ flowList })
      }
    },
    isReachBottom: {
      type: Boolean,
      value: false
    },
    width: {
      type: Number,
      value: 342
    }
  },
  data: {
    flowList: []
  },
  methods: {
    nagivatorHandle({
      currentTarget: {
        dataset = {
          url: ''
        }
      }
    }) {
      const { url } = dataset
      wx.navigateTo({ url })
    }
  }
})
