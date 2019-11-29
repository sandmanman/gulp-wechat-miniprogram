type ISelectedSourceItem = (
  WechatMiniprogram.GetImageInfoSuccessCallbackResult & WechatMiniprogram.ChooseVideoSuccessCallbackResult) & {
  showActionSheet: boolean
  tag: string
  tag_id: number
  fileType: 'image' | 'video'
  url?: string
  uploadProgess: number
  id?: number
}

type ISelectedSourceList = ISelectedSourceItem[]

interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}
