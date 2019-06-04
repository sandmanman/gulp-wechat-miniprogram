import { IMyApp } from '../../app';

const app = getApp<IMyApp>();
Page({
  data: {
    motto: '点击"编译"以构建',
    userInfo: {} as wx.UserInfo,
    hasUserInfo: false as boolean,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewTap() {
    wx.navigateTo({
      url: '/pages/log/log'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: (res: wx.GetUserInfoSuccessCallbackResult) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(this.data.userInfo);
  },
  getUserInfo(e: any) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})