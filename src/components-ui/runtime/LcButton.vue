<template>
  <Button 
    :type="type" 
    :size="size" 
    :long="long"
    :style="buttonStyle"
    @click="handleClick"
  >
    {{ text }}
  </Button>
</template>

<script>
export default {
  name: 'LcButton',
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'default'
    },
    long: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 'auto'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    borderRadius: {
      type: [String, Number],
      default: 4
    }
  },
  computed: {
    buttonStyle() {
      const style = {}
      if (this.width !== 'auto') {
        style.width = typeof this.width === 'number' ? `${this.width}px` : this.width
      }
      if (this.height !== 'auto') {
        style.height = typeof this.height === 'number' ? `${this.height}px` : this.height
      }
      style.borderRadius = typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius
      return style
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
