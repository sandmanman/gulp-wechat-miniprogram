Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    confrimHandle() {
      this.triggerEvent('confirm')
    },
    cancelHandle() {
      this.triggerEvent('cancel')
    }
  }
})
