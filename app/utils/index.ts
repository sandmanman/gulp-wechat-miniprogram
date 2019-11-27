import config from '../config/index'

import * as CryptoJS from './crypto'

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const formatTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${[year, month, day].map(formatNumber).join('/')} ${[[hour, minute, second].map(formatNumber).join(':')]}`
}

export const WXLogin = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res: WechatMiniprogram.LoginSuccessCallbackResult) {
        console.log(res.code)
        resolve(res.code)
      },
      fail(error) {
        reject(error.errMsg)
      }
    })
  })
}

export const WXGetImageInfoAsync = (
  src: string
): Promise<ISelectedSourceItem> => {
  return new Promise<ISelectedSourceItem>((resolve, reject) => {
    wx.getImageInfo({
      src,
      success(res: WechatMiniprogram.GetImageInfoSuccessCallbackResult) {
        resolve({
          ...res,
          showActionSheet: false,
          tag: '',
          type: 'image'
        })
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

export const getSignature = <T, K extends keyof T>(target: T & {
  c_p: object
}, reqMethod: 'GET' | 'POST'): T & {
  signature: string
  c_p: string
} => {
  let param = ''
  try {
    const c_p = JSON.stringify(target.c_p)
      .split('')
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
      .join('')
    const tmpObj: T & { c_p: string } = { ...target, c_p }
    // 排序进行签名
    const objAsArray = Object.keys(tmpObj).sort() as K[]
    for (const key of objAsArray) {
      if (tmpObj[key]) {
        param += `${key}=${tmpObj[key]}&`
      }
    }
    param = param.slice(0, -1)
  } catch (e) {
    console.error(e.message)
  }
  return {
    ...target,
    signature: CryptoJS.HmacSHA1(`${reqMethod}&${param}`, `${config.appKey}&`).toString(CryptoJS.enc.Base64),
    c_p: JSON.stringify(target.c_p)
  }
}

export const applyMixins = (derivedCtor: any, baseCtors: any[]) => {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      // eslint-disable-next-line no-param-reassign
      derivedCtor.prototype[name] = baseCtor.prototype[name]
    })
  })
}
