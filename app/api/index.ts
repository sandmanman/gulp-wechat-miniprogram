import httpRequest from './wxRequest'

class API {
  userLogin = (params: any): Promise<any> => httpRequest('/api/user/login', 'POST', params)
}

export default new API()
