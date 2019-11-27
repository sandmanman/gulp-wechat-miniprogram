Page({
  data: {
    maxtxt: 10,
    titletxt: '',
    coverimg: '',
    tagList: ['翡翠', '玛瑙', '宝石', '么么哒'],
    showActionSheet: false,
    tagname: ''
  },
  uploadimagebtn () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const { tempFilePaths } = res
        self.setData({
          coverimg: tempFilePaths[0]
        })
      }
    })
  },
  deleteImg () {
    this.setData({
      coverimg: ''
    })
  },
  showActionSheetHander () {
    this.setData({ showActionSheet: true })
  },
  hideActionSheetHander () {
    this.setData({ showActionSheet: false })
  },
  selectTagHander ({
    currentTarget: {
      dataset = { tag: '' }
    }
  }) {
    const { tag } = dataset
    this.setData({
      tagname: tag,
      showActionSheet: false
    })
  }
})
