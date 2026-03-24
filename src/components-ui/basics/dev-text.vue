<template>
  <div class="dev-text-wrapper" :style="wrapperStyle">
    <p :style="textStyle">{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'DevText',
  props: {
    content: {
      type: String,
      default: '这是一段文本'
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    color: {
      type: String,
      default: '#333'
    },
    textAlign: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    wrapperStyle() {
      return {
        padding: '8px'
      }
    },
    textStyle() {
      return {
        fontSize: this.fontSize,
        color: this.color,
        textAlign: this.textAlign,
        margin: 0
      }
    }
  }
}
</script>

<style scoped>
.dev-text-wrapper {
  min-height: 40px;
  display: flex;
  align-items: center;
}
</style>
