<template>
  <span class="ui-text" :style="mergedStyle">{{ content }}</span>
</template>

<script>
export default {
  name: 'UIText',
  props: {
    content: {
      type: String,
      default: '这是一段文本内容'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    mergedStyle() {
      return {
        fontSize: '14px',
        color: '#515a6e',
        ...this.styleConfig
      }
    }
  }
}
</script>
