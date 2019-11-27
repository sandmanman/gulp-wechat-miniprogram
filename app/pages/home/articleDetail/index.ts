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
