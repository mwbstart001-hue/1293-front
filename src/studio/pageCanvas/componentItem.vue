<template>
  <div
    class="component-item"
    :class="{
      'is-hover': isHover,
      'is-selected': isSelected,
      'is-container': componentData.componentType === 'container'
    }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click.stop="handleSelect"
  >
    <!-- 左上角：标题 + 拖拽锚点 -->
    <div class="item-header" v-show="isHover || isSelected">
      <div class="item-drag-handle drag-handle">
        <Icon type="ios-move" size="14" />
      </div>
      <span class="item-title">{{ componentData.componentName }}</span>
    </div>

    <!-- 右上角：操作按钮 -->
    <div class="item-actions" v-show="isHover || isSelected">
      <div class="action-btn" title="编辑" @click.stop="handleEdit">
        <Icon type="ios-settings" size="14" />
      </div>
      <div class="action-btn action-delete" title="删除" @click.stop="handleRemove">
        <Icon type="ios-trash" size="14" />
      </div>
    </div>

    <!-- 组件内容区 -->
    <div class="item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentItem',
  props: {
    componentData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isHover: false,
      isSelected: false
    }
  },
  methods: {
    handleSelect() {
      this.isSelected = !this.isSelected
    },
    handleRemove() {
      this.$emit('remove', this.index)
    },
    handleEdit() {
      this.$emit('edit', this.componentData)
    }
  }
}
</script>

<style scoped>
.component-item {
  position: relative;
  padding: 4px;
  margin-bottom: 6px;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  background: #fff;
  min-height: 40px;
}

.component-item:last-child {
  margin-bottom: 0;
}

.component-item.is-hover {
  border-color: rgba(45, 140, 240, 0.4);
  background: rgba(45, 140, 240, 0.02);
}

.component-item.is-selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.12);
}

/* 左上角 header */
.item-header {
  position: absolute;
  top: -1px;
  left: -1px;
  display: flex;
  align-items: center;
  gap: 2px;
  z-index: 10;
  animation: fadeIn 0.15s ease;
}

.item-drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 22px;
  background: var(--primary-color);
  border-radius: var(--radius-sm) 0 var(--radius-sm) 0;
  color: #fff;
  cursor: grab;
  transition: background var(--transition-fast);
}

.item-drag-handle:hover {
  background: var(--primary-active);
}

.item-drag-handle:active {
  cursor: grabbing;
}

.item-title {
  font-size: 11px;
  color: #fff;
  background: var(--primary-color);
  padding: 3px 8px 3px 4px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  line-height: 1;
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 右上角操作按钮 */
.item-actions {
  position: absolute;
  top: -1px;
  right: -1px;
  display: flex;
  align-items: center;
  gap: 0;
  z-index: 10;
  animation: fadeIn 0.15s ease;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 22px;
  background: rgba(100, 100, 100, 0.8);
  color: #fff;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:first-child {
  border-radius: 0 0 0 var(--radius-sm);
}

.action-btn:last-child {
  border-radius: 0 var(--radius-sm) 0 0;
}

.action-btn:hover {
  background: var(--primary-color);
}

.action-btn.action-delete:hover {
  background: #ed4014;
}

/* 内容区 */
.item-content {
  padding: 6px 8px;
  min-height: 32px;
}

.component-item.is-container > .item-content {
  padding: 4px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-2px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
