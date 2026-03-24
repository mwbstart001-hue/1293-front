<template>
  <div 
    class="component-item-wrapper"
    :class="{ 'is-selected': isSelected }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      v-if="showAnchor || isSelected" 
      class="drag-anchor"
      @mousedown="startDrag"
    >
      <Icon type="md-menu" />
    </div>
    
    <div 
      v-if="showToolbar || isSelected" 
      class="component-toolbar"
    >
      <span class="component-title">{{ component.name || component.tag }}</span>
      <div class="toolbar-actions">
        <Button type="text" size="small" @click.stop="handleEdit">
          <Icon type="md-create" />
        </Button>
        <Button type="text" size="small" @click.stop="handleDelete">
          <Icon type="md-trash" />
        </Button>
      </div>
    </div>
    
    <div class="component-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudioComponentItem',
  props: {
    component: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showToolbar: false,
      showAnchor: false,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      startLeft: 0,
      startTop: 0
    }
  },
  methods: {
    handleMouseEnter() {
      this.showToolbar = true
      this.showAnchor = true
    },
    handleMouseLeave() {
      if (!this.isDragging) {
        this.showToolbar = false
        this.showAnchor = false
      }
    },
    startDrag(e) {
      this.isDragging = true
      this.dragStartX = e.clientX
      this.dragStartY = e.clientY
      
      const wrapper = this.$el
      const rect = wrapper.getBoundingClientRect()
      this.startLeft = rect.left
      this.startTop = rect.top
      
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.stopDrag)
    },
    onDrag(e) {
      if (!this.isDragging) return
      
      const deltaX = e.clientX - this.dragStartX
      const deltaY = e.clientY - this.dragStartY
      
      this.$el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      this.$el.style.zIndex = '9999'
      this.$el.style.opacity = '0.8'
    },
    stopDrag(e) {
      this.isDragging = false
      this.showToolbar = false
      this.showAnchor = false
      
      this.$el.style.transform = ''
      this.$el.style.zIndex = ''
      this.$el.style.opacity = ''
      
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)
      
      // 触发重新排序
      this.$emit('update', {
        type: 'reorder',
        component: this.component,
        index: this.index
      })
    },
    handleEdit() {
      this.$emit('select', this.component)
    },
    handleDelete() {
      this.$emit('delete', this.component.componentId)
    }
  }
}
</script>

<style scoped>
.component-item-wrapper {
  position: relative;
  margin-bottom: 8px;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s;
  background: #fff;
}

.component-item-wrapper:hover {
  border-color: #2196f3;
}

.component-item-wrapper.is-selected {
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.drag-anchor {
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: #2196f3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: move;
  z-index: 10;
}

.drag-anchor:hover {
  background: #1976d2;
}

.component-toolbar {
  position: absolute;
  top: -32px;
  left: -2px;
  right: -2px;
  height: 32px;
  background: #2196f3;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  z-index: 5;
}

.component-title {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}

.toolbar-actions {
  display: flex;
  gap: 4px;
}

.toolbar-actions .ivu-btn {
  color: #fff;
  padding: 4px;
}

.toolbar-actions .ivu-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.component-content {
  padding: 4px;
}
</style>
