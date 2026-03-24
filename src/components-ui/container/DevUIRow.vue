<template>
  <Row class="dev-ui-row" :gutter="gutter" @click.native.stop="handleClick">
    <slot></slot>
    <div v-if="isEmpty" class="empty-placeholder">
      <Icon type="ios-add-circle-outline" size="20" />
      <span>拖拽组件到此处</span>
    </div>
  </Row>
</template>

<script>
export default {
  name: 'DevUIRow',
  props: {
    gutter: {
      type: Number,
      default: 16
    },
    componentId: {
      type: String,
      default: ''
    }
  },
  computed: {
    isEmpty() {
      return !this.$slots.default || this.$slots.default.length === 0
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
.dev-ui-row {
  min-height: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: -2px;
  }
  
  .empty-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    width: 100%;
    color: #c5c8ce;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    
    span {
      margin-top: 6px;
      font-size: 12px;
    }
  }
}
</style>
