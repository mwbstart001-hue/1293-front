<template>
  <div class="dev-lc-text" :style="textStyle">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'DevLcText',
  props: {
    content: {
      type: String,
      default: '这是一段文本'
    },
    fontSize: {
      type: [String, Number],
      default: 14
    },
    color: {
      type: String,
      default: '#333333'
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    fontWeight: {
      type: [String, Number],
      default: 'normal'
    },
    lineHeight: {
      type: [String, Number],
      default: 1.5
    }
  },
  computed: {
    textStyle() {
      return {
        fontSize: typeof this.fontSize === 'number' ? `${this.fontSize}px` : this.fontSize,
        color: this.color,
        textAlign: this.textAlign,
        fontWeight: this.fontWeight,
        lineHeight: typeof this.lineHeight === 'number' ? this.lineHeight : this.lineHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-lc-text {
  word-break: break-word;
}
</style>
