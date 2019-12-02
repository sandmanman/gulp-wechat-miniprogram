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

  initUser = (params: {
    c_p: string
    signature: string
  }): Promise<IResponseType<{
    nickname: string
    avatar_url: string
    is_updated: boolean
    my_wiki_count: number
  }>> => httpRequest('/usercenter/init', 'GET', params)

  uploadFile = (filePath: string, formData: {
    c_p: string
    signature: string
    tag_id?: number
    file_info: string
  }): Promise<{
    file: string
    id: number
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
          const data = JSON.parse(res.data)
          if (data.code === 200) {
            resolve(data.obj)
          } else {
            wx.showToast({
              title: data.msg,
              icon: 'none'
            })
            reject(data.msg)
          }
        },
        fail(error) {
          reject(error.errMsg)
        }
      })
    })
  }

  // 更改或发布宝物
  saveWiki = (params: {
    c_p: string
    signature: string
    image_id: number
    name: string
    wiki_id?: string
  }): Promise<IResponseType<{
    name: string
  }>> => httpRequest('/wikiuser/save', 'POST', params)

  // 动态详情页
  getDynamicDetail = (params: {
    c_p: string
    signature: string
    code: string
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
  getDynamicLog = (params: { c_p: any } & { signature: string, c_p: string }): Promise<IResponseType<{ avatar_url: string, code: string, nick_name: string, play_count: string, play_number: string, tag_name: string, title: string }>> => httpRequest('/dynamic/daily_info', 'GET', params)

  // 宝物详情接口
  getarticleDetailList = (params: {
    c_p: string
    signature: string
    id: number
  }): Promise<IResponseType<{
    media: Array<{
      article_id: number
      url_oss: string
    }>
    wiki: any
  }>> => httpRequest('/wiki/detail', 'GET', params)

  // 玩法指南节点
  getGuide = (params: {
    c_p: string
    signature: string
    id: number
  }): Promise<IResponseType<{
    cover: string
    name: string
    node: any
  }>> => httpRequest('/wiki/guide', 'GET', params)

  // 获取首页宝物词条推荐
  getWikiList = (params: {
    c_p: string
    signature: string
  }): Promise<IResponseType<{
    user_code: string
    nickname: string
    avatar_url: string
  }[]>> => httpRequest('/wiki/recommend', 'GET', params)

  // 发布动态
  saveMoment = (params: {
    c_p: string
    signature: string
    title: string
    content: string
    media_ids: number
    user_wiki_id?: number
  }): Promise<IResponseType<{
    data: any
  }>> => httpRequest('/dynamic/create', 'POST', params)

  // 玩物日志头部选择栏
  selsectArticleList = (params: {
    c_p: string
    signature: string
  }): Promise<IResponseType<{
    data: any
  }>> => httpRequest('/wiki/daily_list', 'GET', params)

  // 创建日志/动态初始化
  initMoment = (params: {
    c_p: string
    signature: string
  }): Promise<IResponseType<{
    my_wiki_list: Array<{
      id: number
      name: string
    }>
    tag_list: Array<{
      id: number
      name: string
    }>
  }>> => httpRequest('/dynamic/init', 'GET', params)

  // 图集
  getAtlasList = (params: {
    c_p: string
    signature: string
    id: number
  }): Promise<IResponseType<{
    data: any
  }>> => httpRequest('/wiki/imglist', 'GET', params)

  // 首页日志列表
  getArticleList = (params: { c_p: any } & { signature: string, c_p: string }): Promise<IResponseType<{ current_page: number, last_page: number, list: any[], per_page: number, total: number }>> => httpRequest('/dynamic/daily_home_list', 'GET', params)

  // 获取我的宝物列表
  getMyWikiList = (params: {
    c_p: string
    signature: string
  }): Promise<IResponseType<unknown>> => httpRequest('/wikiuser/mywiki', 'GET', params)

  // 获取动态列表
  getDynamicList = (params: {
    c_p: string
    signature: string
    wiki_id?: number
    is_self?: boolean
    page: number
  }): Promise<IResponseType<any>> => httpRequest('/dynamic/list', 'GET', params)

  // 获取日志列表
  getDailyList = (params: {
    c_p: string
    signature: string
    wiki_id?: number
    is_self?: boolean
    page: number
  }): Promise<IResponseType<any>> => httpRequest('/dynamic/daily_list', 'GET', params)

  wikiDelete = (params: {
    c_p: string
    signature: string
    id: number
  }): Promise<IResponseType<any>> => httpRequest('/wikiuser/delete', 'POST', params)
}

export default new API()
