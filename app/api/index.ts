/// /// <reference path="../libs/index.d.ts" />

import httpRequest from './wxRequest'
import config from '../config/index'

class API {
  // 用户登陆
  userLogin = (params: {
    c_p: string
    signature: string
    code: string
  }): Promise<IResponseType<{
    user_code: string
    nickname: string
    avatar_url: string
  }>> => httpRequest('/usercenter/login', 'POST', params)

  //  用户授权信息更新
  userUpdate = (params: {
    c_p: string
    signature: string
    encryptedData: string
    iv: string
  }): Promise<IResponseType<{
    nickname: string
    avatar_url: string
  }>> => httpRequest('/user/update', 'POST', params)

  uploadFile = (filePath: string, formData: {
    c_p: string
    signature: string
    file_info: string
  }): Promise<{
    file: string
    url_oss: string
  }> => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        filePath,
        name: 'file',
        url: `${config.urlPrefix}/file/upload`,
        formData,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res: WechatMiniprogram.UploadFileSuccessCallbackResult) {
          const data: {
            file: string
            url_oss: string
          } = JSON.parse(res.data)
          console.log(data)
          resolve(data)
        },
        fail(error) {
          reject(error.errMsg)
        }
      })
    })
  }

  // 更改或发布宝物
  save = (params: {
    c_p: string
    signature: string
    image: string
    name: string
    wiki_id?: string
    id?: string
  }): Promise<IResponseType<{
    name: string
  }>> => httpRequest('/api/wikiuser/save', 'POST', params)

  // 玩法指南节点
  getGuide = (params: {
    c_p: string
    signature: string
    id: number
  }): Promise<IResponseType<{
    cover: string
    node: any
  }>> => httpRequest('/wiki/guide', 'GET', params)
}

export default new API()
