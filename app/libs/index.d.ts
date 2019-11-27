/// <reference path="../../node_modules/miniprogram-api-typings/index.d.ts" />
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
    userInfo?: (WechatMiniprogram.UserInfo & {
      user_code: string
    }) | {
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
}

type IWechatRequestMethods = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
