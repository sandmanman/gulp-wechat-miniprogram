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
    is_updated: boolean
    user_code: string
  }>> => httpRequest('/usercenter/update', 'POST', params)

  uploadFile = (filePath: string, formData: {
    c_p: string
    signature: string
    file_info: string
  }): Promise<{
    file: string
    url_oss: string
    uploadProgress: number
  }> => {
    return new Promise((resolve, reject) => {
      const uploadTash = wx.uploadFile({
        filePath,
        name: 'file',
        url: `${config.urlPrefix}/file/upload`,
        formData,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res: WechatMiniprogram.UploadFileSuccessCallbackResult) {
          uploadTash.abort()
          const data: {
            file: string
            url_oss: string
            uploadProgress: number
          } = Object.assign(JSON.parse(res.data), { uploadProgress: 100 })
          resolve(data)
        },
        fail(error) {
          reject(error.errMsg)
        }
      })
      uploadTash.onProgressUpdate((res: WechatMiniprogram.UploadTaskOnProgressUpdateCallbackResult) => {
        resolve({
          file: '',
          url_oss: '',
          uploadProgress: res.progress
        })
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

  // 动态详情页
  getDynamicDetail = (params: {
    c_p: string
    signature: string
    Code: string
  }): Promise<IResponseType<{
    avatar_url: string
    code: string
    content: string
    create_time: string
    images_list: any
    nickname: string
    praise_count: string
    status: string
    title: string
    wiki_code: string
    wiki_user_name: string
    video_url: string
  }>> => httpRequest('/dynamic/info', 'GET', params)

  // 动态玩物日志
  getDynamicLog = (params: {
    c_p: string
    signature: string
    Code: string
  }): Promise<IResponseType<{
    avatar_url: string
    code: string
    nick_name: string
    play_count: string
    play_number: string
    tag_name: string
    title: string
  }>> => httpRequest('/dynamic/daily_info', 'GET', params)

  // 动态玩物日志数组
  getDynamicLogList = (params: {
    c_p: string
    signature: string
    Code: string
    UserWikiCode: string
    Page: string
  }): Promise<IResponseType<{
    avatar_url: string
    code: string
    nick_name: string
    play_count: string
    play_number: string
    tag_name: string
    title: string
  }>> => httpRequest('/dynamic/daily_list', 'GET', params)

  // 宝物详情接口
  getarticleDetailList = (params: {
    c_p: string
    signature: string
    id: number
  }): Promise<IResponseType<{
    cover: string
    node: any
  }>> => httpRequest('/wiki/detail', 'GET', params)

  // 玩法指南节点
  getGuide = (params: {
    c_p: string
    signature: string
    id: number
  }): Promise<IResponseType<{
    cover: string
    node: any
  }>> => httpRequest('/wiki/guide', 'GET', params)

  // 获取首页宝物词条推荐
  getGuideList = (params: {
    c_p: string
    signature: string
  }): Promise<IResponseType<{
    user_code: string
    nickname: string
    avatar_url: string
  }>> => httpRequest('/wiki/recommend', 'GET', params)
}

export default new API()
