<template>
  <div class="dev-ui-input" @click.stop="handleClick">
    <Input :placeholder="placeholder" :size="size" :clearable="clearable" :style="styleConfig" />
  </div>
</template>

<script>
export default {
  name: 'DevUIInput',
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    size: {
      type: String,
      default: 'default'
    },
    clearable: {
      type: Boolean,
      default: true
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
.dev-ui-input {
  display: inline-block;
  width: 200px;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
