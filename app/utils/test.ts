import { getSignature } from './index'

const c_p =
'%257B%2522request_name%2522%253A%2522zzbw_app%2522%252C%2522request_base%2522%253A%2522wx%2522%252C%2522user_code%2522%253A%2522QZIF06yvkoZeMC2dku1bfR3Mkay6VAGz%2522%257D'

const result = getSignature({
  c_p,
  code: '023gtXim0gyC6r1XSQhm0s8Dim0gtXiL'
})

console.log(result)
