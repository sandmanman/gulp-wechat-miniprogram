import { getSignature, WXGetImageInfoAsync } from '../../../utils/index'
import api from '../../../api/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    maxiumNameLength: 10,
    name: '',
    coverimg: {},
    tagList: ['翡翠', '玛瑙', '宝石', '么么哒'],
    showActionSheet: false,
    tagname: ''
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
  },
  uploadimagebtn () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      async success (res) {
        const result: ISelectedSourceItem = await WXGetImageInfoAsync(
          res.tempFilePaths[0]
        )
        self.setData({ coverimg: result })
      }
    })
  },
  deleteImg () {
    this.setData({
      coverimg: {}
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
  },
  async saveWiki() {
    try {
      const self = this
      const uploadResult = await api.uploadFile(this.data.coverimg.path, getSignature({
        c_p: app.globalData.c_p,
        file_info: JSON.stringify({
          width: this.data.coverimg.width,
          height: this.data.coverimg.height,
          orientation: this.data.coverimg.orientation
        })
      }))
      const params = getSignature({
        c_p: app.globalData.c_p,
        image_id: uploadResult.id,
        name: this.data.name
      })
      wx.showLoading({
        title: '请稍候...',
        mask: true
      })
      const data = await api.saveWiki(params)
      wx.hideLoading()
      console.log(data)
      wx.showToast({ title: data.msg })
      setTimeout(function() {
        wx.navigateBack({
          success() {
            const eventChannel = self.getOpenerEventChannel()
            eventChannel.emit('isUpdateList', { flag: true })
          }
        })
      }, 2500)
    } catch (error) {
      console.error(error)
    }
  },
  inputChangeHandle({ detail = {
    value: ''
  }}) {
    console.log(detail)
    this.setData({ name: detail.value })
  }
})
