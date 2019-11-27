type ISelectedSourceItem = (
  WechatMiniprogram.GetImageInfoSuccessCallbackResult & WechatMiniprogram.ChooseVideoSuccessCallbackResult) & {
  showActionSheet: boolean
  tag: string
  fileType: 'image' | 'video'
  url?: string
  uploadProgess: number
}

type ISelectedSourceList = ISelectedSourceItem[]

interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}
