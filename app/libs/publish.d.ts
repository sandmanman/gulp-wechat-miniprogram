type ISelectedSourceItem = (
  WechatMiniprogram.GetImageInfoSuccessCallbackResult & WechatMiniprogram.ChooseVideoSuccessCallbackResult) & {
  showActionSheet: boolean
  tag: string
  fileType: 'image' | 'video'
  url?: string
}

type ISelectedSourceList = ISelectedSourceItem[]

interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}
