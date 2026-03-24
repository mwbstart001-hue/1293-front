<template>
  <Card class="dev-ui-card" :style="cardStyle" @click.native.stop="handleClick">
    <template #title>
      <span>{{ title }}</span>
    </template>
    <slot></slot>
    <div v-if="isEmpty" class="empty-placeholder">
      <Icon type="ios-add-circle-outline" size="20" />
      <span>拖拽组件到此处</span>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'DevUICard',
  props: {
    title: {
      type: String,
      default: '卡片标题'
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
    cardStyle() {
      return this.styleConfig
    },
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
.dev-ui-card {
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
    min-height: 80px;
    color: #c5c8ce;
    
    span {
      margin-top: 6px;
      font-size: 12px;
    }
  }
}
</style>
