Page({
  data: {
    url: ''
  },
  onLoad(query: Record<string, string | undefined>): void {
    const { url = '' } = query
    this.setData({ url })
  }
})
