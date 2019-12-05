import { getSignature } from '../../utils/index'
import api from '../../api/index'

const app = getApp<IAppOption>()

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
    isShowDelete: {
      type: Boolean,
      value: false
    }
  },
  data: {
    willDeleteId: 0,
    willDeleteIndex: 0,
    showConfirmActionSheet: false
  },
  methods: {
    showConfirmActionSheetHander({
      currentTarget: {
        dataset = { id: 0, index: 0 }
      }
    }) {
      const { id, index } = dataset
      this.setData({
        willDeleteId: id,
        willDeleteIndex: index,
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
        const list = this.data.list
        list.splice(this.data.willDeleteIndex, 1)
        this.setData({ list })
      } catch (e) {
        console.error(e.message)
      }
    },
    clickWikiHandle({
      currentTarget: {
        dataset: {
          item = { id: 0, code: 0 }
        }
      }
    }) {
      this.triggerEvent('clickitem', item)
    }
  }
})
