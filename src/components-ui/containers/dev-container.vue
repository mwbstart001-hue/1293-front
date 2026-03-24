<template>
  <div class="dev-container" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DevContainer',
  props: {
    title: {
      type: String,
      default: '容器'
    },
    padding: {
      type: String,
      default: '16px'
    },
    background: {
      type: String,
      default: '#f5f5f5'
    },
    border: {
      type: String,
      default: '1px dashed #ccc'
    },
    minHeight: {
      type: String,
      default: '100px'
    }
  },
  computed: {
    containerStyle() {
      return {
        padding: this.padding,
        background: this.background,
        border: this.border,
        borderRadius: '4px',
        minHeight: this.minHeight
      }
    }
  }
}
</script>

<style scoped>
.dev-container {
  box-sizing: border-box;
}
</style>
