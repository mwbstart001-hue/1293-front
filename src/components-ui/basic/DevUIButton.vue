<template>
  <div class="dev-ui-button" @click.stop="handleClick">
    <Button :type="type" :size="size" :style="styleConfig">{{ text }}</Button>
  </div>
</template>

<script>
export default {
  name: 'DevUIButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: '按钮'
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
  methods: {
    handleClick() {
      this.$emit('component-click', this.componentId)
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-ui-button {
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
