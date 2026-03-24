<template>
  <div
    class="component-item-wrapper"
    :class="{ active: active }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div v-if="isHovered" class="component-toolbar">
      <span class="component-title">{{ config.name }}</span>
      <Divider type="vertical" />
      <Tooltip content="上移" placement="top">
        <Button size="small" type="text" @click="$emit('move-up')">
          <Icon type="ios-arrow-up" size="14" />
        </Button>
      </Tooltip>
      <Tooltip content="下移" placement="top">
        <Button size="small" type="text" @click="$emit('move-down')">
          <Icon type="ios-arrow-down" size="14" />
        </Button>
      </Tooltip>
      <Tooltip content="复制" placement="top">
        <Button size="small" type="text" @click="handleCopy">
          <Icon type="md-copy" size="14" />
        </Button>
      </Tooltip>
      <Tooltip content="删除" placement="top">
        <Button size="small" type="text" @click="$emit('delete')">
          <Icon type="md-trash" size="14" />
        </Button>
      </Tooltip>
    </div>
    
    <div class="drag-anchor" title="拖动组件"></div>
    
    <div class="component-content">
      <component
        :is="componentName"
        v-bind="componentProps"
        :component-id="config.componentId"
        @component-click="handleClick"
      >
        <slot></slot>
      </component>
    </div>
  </div>
</template>

<script>
import { componentMap } from '@/components-ui'

export default {
  name: 'ComponentItem',
  props: {
    config: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  computed: {
    componentName() {
      const mapping = componentMap[this.config.tag]
      return mapping ? mapping.dev : this.config.tag
    },
    componentProps() {
      const props = { ...this.config.props }
      if (props.style) {
        props.styleConfig = props.style
        delete props.style
      }
      return props
    }
  },
  methods: {
    handleClick(componentId) {
      this.$emit('component-click', this.config)
    },
    handleCopy() {
      const copied = this.$utils.deepClone(this.config)
      copied.componentId = this.$utils.generateId()
      if (copied.children) {
        this.regenerateChildrenIds(copied.children)
      }
      this.$emit('copy', copied)
    },
    regenerateChildrenIds(children) {
      children.forEach(child => {
        child.componentId = this.$utils.generateId()
        if (child.children) {
          this.regenerateChildrenIds(child.children)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.component-item-wrapper {
  position: relative;
  margin-bottom: 8px;
  padding: 8px;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #2d8cf0;
    background: rgba(45, 140, 240, 0.02);
  }
  
  &.active {
    border-color: #2d8cf0;
    background: rgba(45, 140, 240, 0.05);
    box-shadow: 0 0 0 3px rgba(45, 140, 240, 0.15);
  }
  
  .component-toolbar {
    position: absolute;
    top: -36px;
    left: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    z-index: 100;
    
    .component-title {
      font-size: 12px;
      font-weight: 500;
      color: #2d8cf0;
    }
    
    :deep(.ivu-divider-vertical) {
      margin: 0 4px;
    }
    
    :deep(.ivu-btn-text) {
      padding: 2px 4px;
      
      &:hover {
        color: #2d8cf0;
        background: #e8f4ff;
      }
    }
  }
  
  .drag-anchor {
    position: absolute;
    top: -4px;
    left: -4px;
    width: 10px;
    height: 10px;
    background: #2d8cf0;
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: move;
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 101;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
  
  &:hover .drag-anchor {
    opacity: 1;
  }
  
  .component-content {
    min-height: 30px;
  }
}
</style>
