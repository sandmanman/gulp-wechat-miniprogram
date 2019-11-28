import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    imageList: [
      {
        photo: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/static/temp/supremacy_buy/1911/06/2e043e8b0b3eee13ba184e550ab81801.jpg!750'
      }
    ],
    videos: '',
    swiperCurrent: 1
  },
  async onLoad() {
    await app.userLogin()
    await this.getDynamicList()
    this.setData({ userInfo: app.globalData.userInfo })
  },
  async getDynamicList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      UserCode: app.globalData.userInfo.user_code,
      Code: 'f65ErrunbU7YUAkswduIeTikRKBzSyVR'
    })
    const data = await api.getDynamicDetail(params)
    this.setData({
      avatar_url: data.obj.avatar_url,
      code: data.obj.code,
      content: data.obj.content,
      create_time: data.obj.create_time,
      images_list: data.obj.images_list,
      nickname: data.obj.nickname,
      praise_count: data.obj.praise_count,
      status: data.obj.status,
      title: data.obj.title,
      wiki_code: data.obj.wiki_code,
      video_url: data.obj.video_url,
      wiki_user_name: data.obj.wiki_user_name
    })
    console.log(data)
  },
  navigationBackHander() {
    wx.navigateBack()
  },
  swiperChange({
    detail: {
      current = 0
    }
  }) {
    this.setData({ swiperCurrent: current + 1 })
  }
})
