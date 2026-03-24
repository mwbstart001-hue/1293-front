<template>
  <div class="dev-ui-checkbox" @click.stop="handleClick">
    <Checkbox :style="styleConfig">{{ label }}</Checkbox>
  </div>
</template>

<script>
export default {
  name: 'DevUICheckbox',
  props: {
    label: {
      type: String,
      default: '多选项'
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
.dev-ui-checkbox {
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
