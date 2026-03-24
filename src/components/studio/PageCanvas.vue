<template>
  <div class="page-canvas">
    <div class="canvas-toolbar">
      <RadioGroup v-model="canvasMode" type="button" size="small">
        <Radio label="pc">
          <Icon type="md-desktop" />
          PC端
        </Radio>
        <Radio label="h5">
          <Icon type="md-phone-portrait" />
          H5端
        </Radio>
      </RadioGroup>
      <div class="toolbar-actions">
        <Tooltip content="清空画布" placement="bottom">
          <Button size="small" @click="handleClearCanvas">
            <Icon type="md-trash" />
          </Button>
        </Tooltip>
      </div>
    </div>
    
    <div class="canvas-wrapper" :class="canvasMode + '-mode'">
      <div class="canvas-scroll">
        <draggable
          class="canvas-content"
          :list="componentTree"
          group="components"
          :animation="150"
          ghost-class="ghost-component"
          drag-class="drag-component"
          @add="handleAdd"
          @update="handleUpdate"
        >
          <template v-for="(item, index) in componentTree">
            <ComponentItem
              :key="item.componentId"
              :config="item"
              :active="activeComponentId === item.componentId"
              @click.native.stop="handleComponentClick(item)"
              @delete="handleDeleteComponent(item.componentId)"
              @move-up="handleMoveUp(index)"
              @move-down="handleMoveDown(index)"
            >
              <template v-if="item.componentType === 'container' && item.children">
                <NestedCanvas
                  :components="item.children"
                  :parent-id="item.componentId"
                  :active-component-id="activeComponentId"
                  @component-click="handleComponentClick"
                  @component-delete="handleDeleteComponent"
                />
              </template>
            </ComponentItem>
          </template>
          
          <div v-if="componentTree.length === 0" class="empty-canvas">
            <Icon type="ios-add-circle-outline" size="48" />
            <p>从左侧拖拽组件到此处</p>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ComponentItem from './ComponentItem.vue'
import NestedCanvas from './NestedCanvas.vue'

export default {
  name: 'PageCanvas',
  components: {
    draggable,
    ComponentItem,
    NestedCanvas
  },
  props: {
    componentTree: {
      type: Array,
      default: () => []
    },
    activeComponentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      canvasMode: 'pc'
    }
  },
  methods: {
    handleAdd(evt) {
      this.$emit('canvas-change', this.componentTree)
    },
    handleUpdate(evt) {
      this.$emit('canvas-change', this.componentTree)
    },
    handleComponentClick(item) {
      this.$emit('component-click', item)
    },
    handleDeleteComponent(componentId) {
      this.$emit('component-delete', componentId)
    },
    handleClearCanvas() {
      this.$Modal.confirm({
        title: '确认清空',
        content: '确定要清空画布吗？此操作不可撤销。',
        onOk: () => {
          this.$emit('clear-canvas')
        }
      })
    },
    handleMoveUp(index) {
      if (index > 0) {
        const temp = this.componentTree[index]
        this.$set(this.componentTree, index, this.componentTree[index - 1])
        this.$set(this.componentTree, index - 1, temp)
        this.$emit('canvas-change', this.componentTree)
      }
    },
    handleMoveDown(index) {
      if (index < this.componentTree.length - 1) {
        const temp = this.componentTree[index]
        this.$set(this.componentTree, index, this.componentTree[index + 1])
        this.$set(this.componentTree, index + 1, temp)
        this.$emit('canvas-change', this.componentTree)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-canvas {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  
  .canvas-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    
    .toolbar-actions {
      display: flex;
      gap: 8px;
    }
  }
  
  .canvas-wrapper {
    flex: 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding: 24px;
    
    &.pc-mode {
      .canvas-scroll {
        width: 100%;
        max-width: 1200px;
      }
    }
    
    &.h5-mode {
      .canvas-scroll {
        width: 375px;
        min-height: 667px;
        background: #fff;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        overflow: hidden;
      }
    }
    
    .canvas-scroll {
      height: 100%;
      overflow-y: auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    }
  }
  
  .canvas-content {
    min-height: 100%;
    padding: 16px;
    
    &:empty {
      min-height: 400px;
    }
  }
  
  .empty-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    color: #c5c8ce;
    
    p {
      margin-top: 16px;
      font-size: 14px;
    }
  }
  
  .ghost-component {
    opacity: 0.5;
    background: #e8f4ff;
    border: 2px dashed #2d8cf0;
    border-radius: 4px;
  }
  
  .drag-component {
    opacity: 0.8;
  }
}
</style>
