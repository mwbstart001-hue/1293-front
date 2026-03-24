<template>
  <div class="dev-ui-switch" @click.stop="handleClick">
    <Switch :size="size" :style="styleConfig" />
  </div>
</template>

<script>
export default {
  name: 'DevUISwitch',
  props: {
    size: {
      type: String,
      default: 'default'
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
.dev-ui-switch {
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
