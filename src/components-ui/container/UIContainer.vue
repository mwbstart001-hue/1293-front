<template>
  <div class="ui-container" :style="mergedStyle">
    <slot></slot>
    <div v-if="isEmpty" class="empty-placeholder">
      <Icon type="ios-add-circle-outline" size="24" />
      <span>拖拽组件到此处</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UIContainer',
  props: {
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    mergedStyle() {
      return {
        ...this.styleConfig
      }
    },
    isEmpty() {
      return !this.$slots.default || this.$slots.default.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-container {
  position: relative;
  min-height: 100px;
  
  .empty-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    color: #c5c8ce;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    
    span {
      margin-top: 8px;
      font-size: 12px;
    }
  }
}
</style>
