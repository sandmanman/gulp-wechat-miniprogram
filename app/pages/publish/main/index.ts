import { getSignature, WXGetImageInfoAsync } from '../../../utils/index'
import config from '../../../config/index'
import api from '../../../api/index'

const app = getApp<IAppOption>()
let uploadTask: WechatMiniprogram.UploadTask | null = null

export default Page({
  data: {
    maximumImageCount: 9, // 可选择最多图片数量
    maximumVideoCount: 1, // 可选择最多视频数量
    uploadedSourceCount: 0,
    selectedSourceList: [],
    selectedVideo: '',
    actionSheetItemList: [
      '拍摄照片',
      '拍摄视频',
      '从手机相册选择照片',
      '从手机相册选择视频'
    ],
    maxTitleLength: 20,
    maxContentLength: 1000,
    title: '',
    content: '',
    initData: {}
  },
  async onLoad() {
    if (!app.globalData.userInfo.user_code) {
      await app.userLogin()
    }
    await this.initMoment()
  },
  onUnload() {
    this.offUploadTaskListener()
  },
  selectLocalPhotoHander(actionOption: IChooseSourceOption) {
    const self = this
    wx.chooseImage({
      count: self.data.maximumImageCount - self.data.selectedSourceList.length,
      sizeType: ['original', 'compressed'],
      sourceType: actionOption.sourceType,
      async success(res: WechatMiniprogram.ChooseImageSuccessCallbackResult) {
        wx.showLoading({ title: '处理中' })
        let count = 0
        const swiperCurrentIndex = self.data.selectedSourceList.length
        let selectedSourceList: ISelectedSourceList = [].concat(
          self.data.selectedSourceList
        )

        async function Iterator() {
          if (count < res.tempFilePaths.length) {
            const result: ISelectedSourceItem = await WXGetImageInfoAsync(
              res.tempFilePaths[count]
            )
            count++
            selectedSourceList = selectedSourceList.concat([result])
            await Iterator()
          }
        }

        await Iterator()
        self.preEditHander(selectedSourceList, self.data.initData.tag_list, swiperCurrentIndex)
      }
    })
  },
  selectLocalViseoHander(chooseVideoOption: IChooseSourceOption) {
    const self = this
    wx.chooseVideo({
      maxDuration: 60,
      compressed: false,
      sourceType: chooseVideoOption.sourceType,
      success(res: WechatMiniprogram.ChooseVideoSuccessCallbackResult) {
        const selectedSourceList: ISelectedSourceList = [
          {
            ...res,
            showActionSheet: false,
            tag: '',
            type: '',
            fileType: 'video',
            path: '',
            orientation: 'up',
            uploadProgess: 0,
            tag_id: 0
          }
        ]
        self.preEditHander(selectedSourceList, 0)
      }
    })
  },
  showActionSheet() {
    const selectedImageSourceLength = this.data.selectedSourceList.filter(
      (i: ISelectedSourceItem) => i.fileType === 'image'
    ).length
    if (selectedImageSourceLength === this.data.maximumImageCount) {
      wx.showModal({
        title: '提示',
        content: `最多可发布${this.data.maximumImageCount}张照片`,
        showCancel: false
      })
      return
    }
    const selectedVideoSourceLength = this.data.selectedSourceList.filter(
      (i: ISelectedSourceItem) => i.fileType === 'video'
    ).length
    if (selectedVideoSourceLength === this.data.maximumVideoCount) {
      wx.showModal({
        title: '提示',
        content: `最多可发布${this.data.maximumVideoCount}个视频`,
        showCancel: false
      })
      return
    }
    const actionSheetItemList = !this.data.selectedSourceList.length
      ? ['拍摄照片', '拍摄视频', '从手机相册选择照片', '从手机相册选择视频']
      : selectedImageSourceLength
        ? ['拍摄照片', '从手机相册选择照片']
        : ['拍摄视频', '从手机相册选择视频']
    this.setData({ actionSheetItemList })
    const actionOption: IChooseSourceOption = {
      sourceType: ['camera']
    }
    const { selectLocalPhotoHander, selectLocalViseoHander } = this
    wx.showActionSheet({
      itemList: this.data.actionSheetItemList,
      itemColor: '#333333',
      success({ tapIndex = 0 }) {
        if (actionSheetItemList[tapIndex] === '拍摄照片') {
          actionOption.sourceType = ['camera']
          selectLocalPhotoHander(actionOption)
        } else if (actionSheetItemList[tapIndex] === '从手机相册选择照片') {
          actionOption.sourceType = ['album']
          selectLocalPhotoHander(actionOption)
        } else if (actionSheetItemList[tapIndex] === '拍摄视频') {
          actionOption.sourceType = ['camera']
          selectLocalViseoHander(actionOption)
        } else if (actionSheetItemList[tapIndex] === '从手机相册选择视频') {
          actionOption.sourceType = ['album']
          selectLocalViseoHander(actionOption)
        }
      }
    })
  },
  preEditHander(
    selectedSourceList: ISelectedSourceList,
    tagList: [],
    swiperCurrentIndex = 0
  ) {
    const self = this
    wx.navigateTo({
      url: '/pages/publish/edit/index',
      events: {
        getSelectedSourceListFromEdit(selectedSourceList: ISelectedSourceList) {
          console.log('getSelectedSourceListFromEdit: ', selectedSourceList)
          self.setData({ selectedSourceList })
        }
      },
      success(res) {
        res.eventChannel.emit('getSelectedSourceListFromMain', {
          selectedSourceList,
          tagList,
          swiperCurrentIndex
        })
        wx.hideLoading()
      }
    })
  },
  gotoEditPage({
    currentTarget: {
      dataset = { swipercurrentindex: 0 }
    }
  }) {
    const { swipercurrentindex } = dataset
    this.preEditHander(this.data.selectedSourceList, this.data.initData.tag_list, swipercurrentindex)
  },
  titleInputHander({
    detail: {
      value = ''
    }
  }) {
    this.setData({
      title: value
    })
  },
  textInputHander({
    detail: { value = '' }
  }) {
    this.setData({ content: value })
  },
  async upLoadFile(filePath: string, formData: {
    c_p: string
    signature: string
    tag_id: number
    file_info: string
  }): Promise<{
    file: string
    url_oss: string
    id: number
  }> {
    const self = this
    return new Promise((resolve, reject) => {
      uploadTask = wx.uploadFile({
        filePath,
        name: 'file',
        url: `${config.urlPrefix}/file/upload`,
        formData,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res: WechatMiniprogram.UploadFileSuccessCallbackResult) {
          self.offUploadTaskListener()
          const data = JSON.parse(res.data)
          if (data.code === 200) {
            resolve(data.obj)
          } else {
            wx.showToast({
              title: data.msg,
              icon: 'none'
            })
            reject(data.msg)
          }
        },
        fail(error) {
          reject(error.errMsg)
        }
      })
      uploadTask.onProgressUpdate((res: WechatMiniprogram.UploadTaskOnProgressUpdateCallbackResult) => {
        console.log('监听上传进度：', res.progress)
        const { selectedSourceList } = this.data as { selectedSourceList: ISelectedSourceList }
        selectedSourceList[self.data.uploadedSourceCount].uploadProgess = res.progress
        self.setData({ selectedSourceList })
      })
    })
  },
  async save() {
    const c_p = Object.assign(config.cp, {
      user_code: app.globalData.userInfo.user_code
    })
    const { selectedSourceList } = this.data as { selectedSourceList: ISelectedSourceList }
    if (selectedSourceList.every(i => i.uploadProgess === 100)) {
      await this.submit()
      return
    }
    const currentSource = selectedSourceList[this.data.uploadedSourceCount]
    const sourceLangth = this.data.selectedSourceList.length
    const filePath = currentSource.fileType === 'video' ? currentSource.tempFilePath : currentSource.path
    const fileBaseInfo = {
      width: currentSource.width,
      height: currentSource.height
    }
    const imageFileInfo = Object.assign(fileBaseInfo, {
      orientation: currentSource.orientation
    })
    const videoFileInfo = Object.assign(fileBaseInfo, {
      duration: currentSource.duration,
      size: currentSource.size
    })
    const params = getSignature({
      c_p,
      tag_id: currentSource.tag_id,
      file_info: JSON.stringify(currentSource.fileType === 'image' ? imageFileInfo : videoFileInfo)
    })
    const uploadResult = await this.upLoadFile(filePath, params)
    selectedSourceList[this.data.uploadedSourceCount].url = uploadResult.url_oss
    selectedSourceList[this.data.uploadedSourceCount].id = uploadResult.id
    this.setData({ selectedSourceList })
    this.setData({ uploadedSourceCount: this.data.uploadedSourceCount + 1 })
    if (this.data.uploadedSourceCount < sourceLangth) {
      await this.save()
    }
    wx.showToast({ title: '上传完成' })
    await this.submit()
  },
  offUploadTaskListener() {
    if (uploadTask instanceof Object) {
      uploadTask.abort()
      uploadTask.offProgressUpdate(() => void 0)
    }
  },
  async submit() {
    const { title = '', content = '', selectedSourceList = [] } = this.data
    if (!title || !content || !selectedSourceList.length) {
      wx.showModal({
        title: '温馨提示',
        content: '请填写完成内容'
      })
      return
    }
    const media_ids = selectedSourceList.reduce((acc: number[], item: ISelectedSourceItem) => {
      acc.push(item.id)
      return acc
    }, [])
    const params = getSignature({
      c_p: app.globalData.c_p,
      title,
      content,
      media_ids: media_ids.toString()
    })
    try {
      const data = await api.saveMoment(params)
      wx.showToast({ title: data.msg })
      setTimeout(() => wx.switchTab({ url: '/pages/my/index' }), 2500)
    } catch (error) {
      wx.showToast({
        title: error,
        icon: 'none'
      })
    }
  },
  async initMoment() {
    const params = getSignature({
      c_p: app.globalData.c_p
    })
    try {
      const data = await api.initMoment(params)
      this.setData({
        initData: data.obj
      })
    } catch (error) {
      console.error(error)
    }
  },
  navigateToHander({
    currentTarget: {
      dataset = { url: '' }
    }
  }) {
    const { url } = dataset
    wx.navigateTo({ url })
  }
})
