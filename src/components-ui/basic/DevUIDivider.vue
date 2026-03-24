<template>
  <div class="dev-ui-divider" @click.stop="handleClick">
    <Divider :dashed="dashed" :style="styleConfig" />
  </div>
</template>

<script>
export default {
  name: 'DevUIDivider',
  props: {
    dashed: {
      type: Boolean,
      default: false
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
.dev-ui-divider {
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
