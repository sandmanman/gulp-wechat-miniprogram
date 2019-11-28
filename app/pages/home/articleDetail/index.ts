import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    videos:
      'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    imgList: [
      {
        photos:
          'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
      },
      {
        photos:
          'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
      }
    ],
    iconList: [
      {
        icomImg: '/assets/img/my/guide.png',
        txtname: '玩法指南',
        path: '/pages/home/guide/index'
      },
      {
        icomImg: '/assets/img/my/pic.png',
        txtname: '宝物图集',
        path: '/pages/home/atlas/index'
      },
      {
        icomImg: '/assets/img/my/diary.png',
        txtname: '玩物日志',
        path: '/pages/home/treasureLog/index'
      }
    ],
    novideoimg: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
  },
  async onLoad(query: Record<string, string | undefined>): void {
    const { id = '' } = query
    await app.userLogin()
    await this.getarticleDetailList()
    this.setData({ userInfo: app.globalData.userInfo, id })
  },
  async getarticleDetailList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      user_code: app.globalData.userInfo.user_code,
      id: this.data.id
    })
    const data = await api.getarticleDetailList(params)
    this.setData({
      wiki_info: data.obj.wiki_info
    })
    console.log(data)
  },
  async getUerInfo(e: { detail: WechatMiniprogram.GetUserInfoSuccessCallbackResult }) {
    const params = getSignature({
      c_p: app.globalData.c_p,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    })
    try {
      const data = await api.userUpdate(params)
      this.setData({ userInfo: data.obj }, () => {
        app.globalData.userInfo = this.data.userInfo
        wx.setStorageSync('userInfo', JSON.stringify(this.data.userInfo))
      })
    } catch (error) {
      console.error(error)
    }
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  },
  sendBtn({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
