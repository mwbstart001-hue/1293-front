<template>
  <div class="widget-text" :style="textStyle">{{ content }}</div>
</template>

<script>
export default {
  name: 'widget-text',
  props: {
    content: { type: String, default: '文本内容' },
    fontSize: { type: [String, Number], default: 14 },
    color: { type: String, default: '#333' },
    fontWeight: { type: String, default: 'normal' }
  },
  computed: {
    textStyle() {
      return {
        fontSize: typeof this.fontSize === 'number' ? this.fontSize + 'px' : this.fontSize,
        color: this.color,
        fontWeight: this.fontWeight
      }
    }
  }
}
</script>

<style scoped>
.widget-text {
  line-height: 1.6;
  padding: 4px 0;
  word-break: break-word;
}
</style>
