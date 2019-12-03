/// <reference path="./publish.d.ts" />
interface IResponseType<T> {
  code: number
  msg: string
  obj: T
}

interface IAppOption {
  globalData: {
    c_p: {
      request_name: string
      request_base: string
      user_code: string
    }
    userInfo?: {
      nickname: string
      avatar_url: string
      is_updated: boolean
      user_code: string
    }
    globalSystemInfo?: {
      navBarHeight: number
      capsulePosition: WechatMiniprogram.Rect
      isIOS: boolean
      navBarExtendHeight: number
    } & WechatMiniprogram.GetSystemInfoSyncResult
  }
  userLogin(): void
  WXCheckSession(): void
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
  WXGetSettingHander(): void
  getSystemInfoHander(): void
  loadBaseFont(): void
}

type IWechatRequestMethods = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
