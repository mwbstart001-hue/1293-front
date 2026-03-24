<template>
  <span class="dev-ui-text" :style="mergedStyle" @click.stop="handleClick">{{ content }}</span>
</template>

<script>
export default {
  name: 'DevUIText',
  props: {
    content: {
      type: String,
      default: '这是一段文本内容'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    },
    componentId: {
      type: String,
      default: ''
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
  },
  methods: {
    handleClick() {
      this.$emit('component-click', this.componentId)
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-ui-text {
  display: inline-block;
  padding: 4px 8px;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
    background: rgba(45, 140, 240, 0.05);
  }
}
</style>
