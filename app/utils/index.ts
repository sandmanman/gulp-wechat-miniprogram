/// <reference path="../libs/index.d.ts" />

import config from '../config/index'

import * as MD5JS from './MD5'

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
          fileType: 'image',
          tempFilePath: '',
          size: 0,
          duration: 0,
          uploadProgess: 0
        })
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

export const getSignature = <T extends { c_p: any }, K extends keyof T>(target: T): T & { signature: string; c_p: string } => {
  let param = ''
  const c_p = JSON.stringify(target.c_p)
  try {
    const tmpObj: T & { c_p: string } = { ...target, c_p }
    // 排序进行签名
    const objAsArray = Object.keys(tmpObj).sort() as K[]
    for (const key of objAsArray) {
      if (tmpObj[key]) {
        const value = tmpObj[key]
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        param += `${key}=${encodeURIComponent(value)}&`
      }
    }
  } catch (error) {
    console.error('签名过程出错: ', error)
  }
  return {
    ...target,
    signature: MD5JS(`${param}${config.aeskey}`),
    c_p
  }
}
