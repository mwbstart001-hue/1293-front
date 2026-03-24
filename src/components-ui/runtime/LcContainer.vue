<template>
  <div class="lc-container" :style="containerStyle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LcContainer',
  props: {
    padding: {
      type: [String, Number],
      default: 16
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    minHeight: {
      type: [String, Number],
      default: 100
    }
  },
  computed: {
    containerStyle() {
      return {
        padding: typeof this.padding === 'number' ? `${this.padding}px` : this.padding,
        backgroundColor: this.backgroundColor,
        borderRadius: typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius,
        minHeight: typeof this.minHeight === 'number' ? `${this.minHeight}px` : this.minHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lc-container {
  width: 100%;
  box-sizing: border-box;
}
</style>
