Component({
  properties: {
    list: {
      type: Array,
      value: [],
      observer(list: any[]) {
        let leftHeight = 0
        let rightHeight = 0
        const flowList = list.reduce((acc, item) => {
          if (leftHeight > rightHeight) {
            rightHeight += item.height + ((item.title.length > 11 || item.content.length > 11) ? 10 : 0)
            acc[1].push(item)
          } else {
            leftHeight += item.height + ((item.title.length > 11 || item.content.length > 11) ? 10 : 0)
            acc[0].push(item)
          }
          return acc
        }, [[], []])
        this.setData({ flowList })
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
    nagivatorToDynamic() {
      wx.navigateTo({
        url: '/pages/home/moments/index'
      })
    }
  }
})
