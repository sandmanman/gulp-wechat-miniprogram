import api from '../../../api/index'
import { getSignature } from '../../../utils/index'

const app = getApp<IAppOption>()

Page({
  data: {
    dynamicList: [
      {
        upstairsnum: 192,
        videos: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        imgList: [
          {
            photos: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
          },
          {
            photos: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
          },
          {
            photos: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
          }
        ]
      },
      {
        upstairsnum: 191,
        videos: '',
        imgList: [
          {
            photos: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
          },
          {
            photos: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
          },
          {
            photos: 'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'
          }
        ]
      }
    ]
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.getDynamicLog()
    await this.getDynamicLogList()
    this.setData({ userInfo: app.globalData.userInfo })
  },
  async getDynamicLog() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      Code: 'f65ErrunbU7YUAkswduIeTikRKBzSyVR'
    })
    const data = await api.getDynamicLog(params)
    // this.setData({
    //   avatar_url: data.obj.avatar_url,
    //   code: data.obj.code,
    //   content: data.obj.content,
    //   create_time: data.obj.create_time,
    //   images_list: data.obj.images_list,
    //   nickname: data.obj.nickname,
    //   praise_count: data.obj.praise_count,
    //   status: data.obj.status,
    //   title: data.obj.title,
    //   wiki_code: data.obj.wiki_code,
    //   wiki_user_name: data.obj.wiki_user_name
    // })
    console.log(data)
  },
  async getDynamicLogList() {
    const params = getSignature({
      c_p: app.globalData.c_p,
      UserCode: app.globalData.userInfo.user_code,
      Code: 'f65ErrunbU7YUAkswduIeTikRKBzSyVR',
      UserWikiCode: '5dKGgXZ0tkCsc3alfChfJPJ3cNjcJLsy',
      Page: 1
    })
    const data = await api.getDynamicLogList(params)
    // this.setData({
    //   avatar_url: data.obj.avatar_url,
    //   code: data.obj.code,
    //   content: data.obj.content,
    //   create_time: data.obj.create_time,
    //   images_list: data.obj.images_list,
    //   nickname: data.obj.nickname,
    //   praise_count: data.obj.praise_count,
    //   status: data.obj.status,
    //   title: data.obj.title,
    //   wiki_code: data.obj.wiki_code,
    //   wiki_user_name: data.obj.wiki_user_name
    // })
    console.log(data)
  }
})
