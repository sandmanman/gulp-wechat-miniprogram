import { getSignature } from '../../../utils/index'
import api from '../../../api/index'

const app = getApp<IAppOption>()
let eventChannel: WechatMiniprogram.EventChannel | null

Page({
  data: {
    treasureList: [],
    mode: 'view', // view-查看详情模式 | select-选择关联宝物模式
    willDeleteId: 0,
    showConfirmActionSheet: false
  },
  async onLoad() {
    eventChannel = this.getOpenerEventChannel()
    eventChannel.on('EventSetMode', (data: {
      mode: 'view' | 'select'
    }) => {
      console.log(data)
      this.setData({ mode: data.mode })
    })
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getMyWikiList()
  },
  async onPullDownRefresh() {
    await this.getMyWikiList()
    wx.stopPullDownRefresh()
  },
  async getMyWikiList() {
    const params = getSignature({ c_p: app.globalData.c_p })
    try {
      const data = await api.getMyWikiList(params)
      this.setData({ treasureList: data.obj })
    } catch (error) {
      console.error(error)
    }
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const self = this
    const { url } = dataset
    wx.navigateTo({
      url,
      events: {
        async isUpdateList(flag: boolean) {
          if (flag) await self.getMyWikiList()
        }
      }
    })
  },
  clickWikiHandle({
    currentTarget: {
      dataset = {
        item: {
          id: 0,
          name: ''
        }
      }
    }
  }) {
    const { item } = dataset
    if (this.data.mode === 'select') {
      wx.navigateBack({
        success() {
          eventChannel.emit('addWikiItem', item)
        }
      })
    }
    wx.navigateTo({ url: '/pages/home/dynamicLog/index?code=' + item.code + '&id=' + item.id })
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
  }
})
