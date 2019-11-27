import httpRequest from './wxRequest'
import HomeApi from './home'
import PublishAPI from './PublishAPI'
import { applyMixins } from '../utils/index'

class API implements HomeApi, PublishAPI {
  // 用户登陆
  userLogin = (params: {
    c_p: string
    signature: string
    code: string
  }): Promise<{
    user_code: string
    nickname: string
    avatar_url: string
  }> => httpRequest('/api/user/login', 'POST', params)

  //  用户授权信息更新
  userUpdate = (params: {
    c_p: string
    signature: string
    encryptedData: string
    iv: string
  }): Promise<{
    nickname: string
    avatar_url: string
  }> => httpRequest('/api/user/update', 'POST', params)
}

applyMixins(API, [HomeApi, PublishAPI])

export default new API()
