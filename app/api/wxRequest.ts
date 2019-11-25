import config from '../config/index'

export default (url: string, method: IWechatRequestMethods, data: string | WechatMiniprogram.IAnyObject | ArrayBuffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.urlPrefix + url,
      method,
      header: {
        'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      data,
      success(res: WechatMiniprogram.RequestSuccessCallbackResult) {
        console.warn('[HTTP状态码]: ', res.statusCode)
        resolve(res.data)
      },
      fail(error: WechatMiniprogram.GeneralCallbackResult) {
        reject(error.errMsg)
      }
    })
  })
}
