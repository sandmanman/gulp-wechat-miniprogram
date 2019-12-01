Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(list: any[]) {
        let leftHeight = this.data.leftHeight
        let rightHeight = this.data.rightHeight
        const flowList = list.reduce((acc, item) => {
          if (leftHeight > rightHeight) {
            rightHeight += this.data.width / (item.width / item.height)
            acc[1].push(item)
          } else {
            leftHeight += this.data.width / (item.width / item.height)
            acc[0].push(item)
          }
          console.log(leftHeight, rightHeight)
          return acc
        }, [[], []])
        this.setData({
          flowList,
          leftHeight,
          rightHeight
        })
      }
    },
    width: {
      type: Number,
      value: 342
    }
  },
  data: {
    flowList: [[], []],
    leftHeight: 0,
    rightHeight: 0
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
