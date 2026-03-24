<template>
  <div class="studio-editor">
    <studio-header
      :undo-stack="undoStack"
      :redo-stack="redoStack"
      @undo="handleUndo"
      @redo="handleRedo"
      @save="handleSave"
      @export="handleExport"
      @modeChange="handleModeChange"
    />
    
    <div class="editor-main">
      <div class="sidebar-left" v-if="editMode === 'edit'">
        <studio-componentMenu />
      </div>
      
      <div class="canvas-area">
        <draggable
          v-model="componentList"
          group="components"
          :sort="true"
          item-key="componentId"
          :ghost-class="'ghost-component'"
          :drag-class="'dragging-component'"
          @add="handleAddComponent"
          @sort="handleSortComponent"
        >
          <template #item="{ element, index }">
            <div style="display: none;"></div>
          </template>
          
          <studio-canvas
            :component-list="componentList"
            :selected-id="selectedComponent?.componentId || ''"
            @select="handleSelectComponent"
            @delete="handleDeleteComponent"
            @update="handleUpdateComponent"
          />
        </draggable>
      </div>
      
      <div class="sidebar-right" v-if="editMode === 'edit'">
        <studio-panel
          :selected-component="selectedComponent"
          @update="handleUpdateProp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import studioHeader from '../studio/studio-header.vue'
import studioComponentMenu from '../studio/studio-componentMenu.vue'
import studioCanvas from '../studio/studio-canvas.vue'
import studioPanel from '../studio/studio-panel.vue'
import { 
  createComponentJson, 
  deepClone, 
  removeComponent, 
  updateComponentProp,
  getCanvasJsonTree,
  exportJsonFile
} from '../utils'

export default {
  name: 'StudioEditor',
  components: {
    draggable,
    studioHeader,
    studioComponentMenu,
    studioCanvas,
    studioPanel
  },
  data() {
    return {
      componentList: [],
      selectedComponent: null,
      undoStack: [],
      redoStack: [],
      editMode: 'edit',
      maxStackSize: 50
    }
  },
  methods: {
    // 保存历史记录
    saveHistory() {
      this.undoStack.push(deepClone(this.componentList))
      if (this.undoStack.length > this.maxStackSize) {
        this.undoStack.shift()
      }
      this.redoStack = []
    },
    // 撤回
    handleUndo() {
      if (this.undoStack.length > 0) {
        this.redoStack.push(deepClone(this.componentList))
        this.componentList = this.undoStack.pop()
        this.selectedComponent = null
      }
    },
    // 前进
    handleRedo() {
      if (this.redoStack.length > 0) {
        this.undoStack.push(deepClone(this.componentList))
        this.componentList = this.redoStack.pop()
        this.selectedComponent = null
      }
    },
    // 添加组件
    handleAddComponent(e) {
      this.saveHistory()
      
      const newComponent = createComponentJson(e.item)
      newComponent.props = { ...e.item.defaultProps }
      
      const newIndex = e.newIndex
      this.componentList.splice(newIndex, 1, newComponent)
      
      this.selectedComponent = newComponent
    },
    // 排序组件
    handleSortComponent(e) {
      this.saveHistory()
    },
    // 选择组件
    handleSelectComponent(component) {
      this.selectedComponent = component
    },
    // 删除组件
    handleDeleteComponent(componentId) {
      this.saveHistory()
      this.componentList = removeComponent(this.componentList, componentId)
      if (this.selectedComponent?.componentId === componentId) {
        this.selectedComponent = null
      }
    },
    // 更新组件
    handleUpdateComponent(data) {
      if (data.type === 'reorder') {
        this.saveHistory()
      }
    },
    // 更新属性
    handleUpdateProp(data) {
      this.saveHistory()
      this.componentList = updateComponentProp(
        this.componentList, 
        data.componentId, 
        data.key, 
        data.value
      )
      // 更新选中组件的显示
      if (this.selectedComponent?.componentId === data.componentId) {
        this.selectedComponent.props[data.key] = data.value
      }
    },
    // 模式切换
    handleModeChange(mode) {
      this.editMode = mode
    },
    // 保存
    handleSave() {
      const jsonData = getCanvasJsonTree(this.componentList)
      console.log('保存数据:', jsonData)
      this.$Message.success('保存成功！')
    },
    // 导出
    handleExport() {
      const jsonData = getCanvasJsonTree(this.componentList)
      exportJsonFile(jsonData)
      this.$Message.success('导出成功！')
    },
    // 获取画布JSON树（对外暴露的方法）
    getCanvasJson() {
      return getCanvasJsonTree(this.componentList)
    }
  }
}
</script>

<style scoped>
.studio-editor {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar-left {
  width: 240px;
  height: 100%;
  flex-shrink: 0;
  background: #fff;
}

.canvas-area {
  flex: 1;
  height: 100%;
  position: relative;
}

.sidebar-right {
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  background: #fff;
}

/* 拖拽样式 */
.ghost-component {
  opacity: 0.5;
  background: #e3f2fd !important;
  border: 2px dashed #2196f3 !important;
}

.dragging-component {
  opacity: 0.8;
  transform: rotate(3deg);
}

.canvas-area /deep/ .draggable-container {
  width: 100%;
  height: 100%;
}
</style>
