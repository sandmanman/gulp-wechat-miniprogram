Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(list: any[]) {
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
          console.log(leftHeight, rightHeight)
          return acc
        }, [[], []])
        this.setData({
          flowList
        })
      }
    },
    width: {
      type: Number,
      value: 342
    }
  },
  data: {
    flowList: [[], []]
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
