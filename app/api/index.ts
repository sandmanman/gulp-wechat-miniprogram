import httpRequest from './wxRequest'

class API {
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
    user_code: string
    encryptedData: string
    iv: string
  }): Promise<{
    nickname: string
    avatar_url: string
  }> => httpRequest('/api/user/update', 'POST', params)
}

export default new API()
