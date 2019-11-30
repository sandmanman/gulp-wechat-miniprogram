Component({
  properties: {
    disabled: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    submit() {
      this.triggerEvent('submit')
    }
  }
})
