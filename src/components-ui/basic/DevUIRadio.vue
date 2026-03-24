<template>
  <div class="dev-ui-radio" @click.stop="handleClick">
    <Radio :style="styleConfig">{{ label }}</Radio>
  </div>
</template>

<script>
export default {
  name: 'DevUIRadio',
  props: {
    label: {
      type: String,
      default: '单选项'
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
.dev-ui-radio {
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
