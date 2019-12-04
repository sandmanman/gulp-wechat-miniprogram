import { getSignature, WXGetImageInfoAsync } from '../../../utils/index'
import api from '../../../api/index'

const app = getApp<IAppOption>()

export default Page({
  data: {
    isDisabledClick: false,
    maxiumNameLength: 10,
    name: '',
    coverimg: {},
    wikiList: [],
    wikiInfo: {
      id: 0,
      name: ''
    },
    showActionSheet: false
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getWikiList()
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
  setWikiInfoHander ({
    currentTarget: {
      dataset = {
        wikiinfo: {
          id: 0,
          name: ''
        }
      }
    }
  }) {
    const { wikiinfo } = dataset
    this.setData({
      wikiInfo: wikiinfo,
      showActionSheet: false
    })
  },
  async saveWiki() {
    if (!this.data.name) {
      wx.showModal({
        title: '温馨提示',
        content: '宝物名称未填写哦',
        showCancel: false
      })
      return
    }
    try {
      const self = this
      this.setData({ isDisabledClick: true })
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
        wiki_id: this.data.wikiInfo.id,
        name: this.data.name
      })
      const { obj, msg } = await api.saveWiki(params)
      console.log(obj)
      this.setData({ isDisabledClick: false })
      wx.showToast({ title: msg })
      setTimeout(function() {
        wx.navigateBack({
          success() {
            const eventChannel = self.getOpenerEventChannel()
            eventChannel.emit('isUpdateList', true)
          }
        })
      }, 1500)
    } catch (error) {
      console.error(error)
    }
  },
  inputChangeHandle({ detail = {
    value: ''
  }}) {
    this.setData({ name: detail.value })
  },
  // 获取宝物
  async getWikiList() {
    const params = getSignature({
      c_p: app.globalData.c_p
    })
    try {
      const data = await api.getWikiList(params)
      this.setData({
        wikiList: data.obj
      })
    } catch (error) {
      console.error(error)
    }
  }
})
