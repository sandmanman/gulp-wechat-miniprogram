const env: envOption = 'ONLINE'

const baseUrl = {
  TEST: 'https://zzbw.test.z.vip/v1',
  ONLINE: 'https://zzbw.z.vip/v1'
}

export default {
  urlPrefix: baseUrl[env],
  aeskey: '0074b3a8e362264c04879eaadc86fb52',
  cp: {
    request_name: 'zzbw_app',
    request_base: 'wx',
    user_code: ''
  }
}
