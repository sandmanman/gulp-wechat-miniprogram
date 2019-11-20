Page({
  data: {
    imgList:[
      {imgs:'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'},
      {imgs:'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/freeBootBg.png'},
      {imgs:'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'},
      {imgs:'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'},
      {imgs:'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'},
      {imgs:'https://lvcui-image.oss-cn-shanghai.aliyuncs.com/background/bg.png'},
    ]
  }
  // 预览图片
  previewImage(e){
    const self = this
    const imgList = []
    for(var i =0;i<self.data.imgList.length;i++){
      imgList.push(self.data.imgList[i].imgs)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  onLoad() {

  },
  onUnload() {

  },
});
