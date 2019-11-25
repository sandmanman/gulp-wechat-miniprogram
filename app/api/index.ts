import httpRequest from './wxRequest'

class API {
  userLogin = (params: any): Promise<any> => httpRequest('/api/user/login', 'GET', params)
}

export default new API()
