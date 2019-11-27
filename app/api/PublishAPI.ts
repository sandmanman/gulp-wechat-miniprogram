import httpRequest from './wxRequest'

export default class PublishAPI {
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
}
