import { getSignature } from '../../utils/index'
import api from '../../api/index'

const app = getApp<IAppOption>()
let eventChannel: WechatMiniprogram.EventChannel | null

Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    isReachBottom: {
      type: Boolean,
      value: false
    },
    deleteicon: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: ''
    }
  },
  data: {
    mode: 'view', // view-查看详情模式 | select-选择关联宝物模式
    willDeleteId: 0,
    showConfirmActionSheet: false
  },
  methods: {
    navigateToHander({
      currentTarget: {
        dataset = {
          url: '',
          item: {
            id: 0
          }
        }
      }
    }) {
      const { url, item } = dataset
      if (this.data.mode === 'select') {
        wx.navigateBack({
          success() {
            eventChannel.emit('addWikiItem', item)
          }
        })
      }
      wx.navigateTo({ url })
    },
    showConfirmActionSheetHander({
      currentTarget: {
        dataset: {
          id = 0
        }
      }
    }) {
      this.setData({
        willDeleteId: id,
        showConfirmActionSheet: true
      })
    },
    hideConfirmActionSheetHander() {
      this.setData({ showConfirmActionSheet: false })
    },
    async deleteWikiHandle() {
      const params = getSignature({
        c_p: app.globalData.c_p,
        id: this.data.willDeleteId
      })
      try {
        const { msg } = await api.wikiDelete(params)
        this.hideConfirmActionSheetHander()
        wx.showToast({ title: msg })
        await this.getMyWikiList()
      } catch (e) {
        console.error(e.message)
      }
    },
    async getMyWikiList() {
      const params = getSignature({ c_p: app.globalData.c_p })
      try {
        const data = await api.getMyWikiList(params)
        this.setData({ list: data.obj })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
