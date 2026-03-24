<template>
  <div class="low-code-editor">
    <EditorHeader
      :mode="editorMode"
      :can-undo="canUndo"
      :can-redo="canRedo"
      :component-tree="componentTree"
      @mode-change="handleModeChange"
      @undo="handleUndo"
      @redo="handleRedo"
      @save="handleSave"
    />
    
    <div class="editor-body">
      <aside class="left-panel">
        <StudioComponentMenu />
      </aside>
      
      <main class="center-panel">
        <PageCanvas
          :component-tree="componentTree"
          :active-component-id="activeComponentId"
          @component-click="handleComponentClick"
          @component-delete="handleComponentDelete"
          @canvas-change="handleCanvasChange"
          @clear-canvas="handleClearCanvas"
        />
      </main>
      
      <aside class="right-panel">
        <ConfigPanel
          :active-component="activeComponent"
          @update="handleComponentUpdate"
        />
      </aside>
    </div>
  </div>
</template>

<script>
import EditorHeader from './studio/EditorHeader.vue'
import StudioComponentMenu from './studio/StudioComponentMenu.vue'
import PageCanvas from './studio/PageCanvas.vue'
import ConfigPanel from './studio/ConfigPanel.vue'

export default {
  name: 'LowCodeEditor',
  components: {
    EditorHeader,
    StudioComponentMenu,
    PageCanvas,
    ConfigPanel
  },
  data() {
    return {
      editorMode: 'edit',
      componentTree: [],
      activeComponentId: '',
      historyStack: [],
      historyIndex: -1,
      maxHistory: 50
    }
  },
  computed: {
    activeComponent() {
      if (!this.activeComponentId) return null
      return this.$utils.findComponentById(this.componentTree, this.activeComponentId)
    },
    canUndo() {
      return this.historyIndex > 0
    },
    canRedo() {
      return this.historyIndex < this.historyStack.length - 1
    }
  },
  created() {
    this.pushHistory()
  },
  methods: {
    handleModeChange(mode) {
      this.editorMode = mode
    },
    handleComponentClick(item) {
      this.activeComponentId = item.componentId
    },
    handleComponentDelete(componentId) {
      this.$utils.removeComponentById(this.componentTree, componentId)
      if (this.activeComponentId === componentId) {
        this.activeComponentId = ''
      }
      this.pushHistory()
    },
    handleComponentUpdate(updated) {
      this.$utils.updateComponentById(
        this.componentTree,
        updated.componentId,
        updated
      )
      this.pushHistory()
    },
    handleCanvasChange(tree) {
      this.componentTree = [...tree]
      this.pushHistory()
    },
    handleClearCanvas() {
      this.componentTree = []
      this.activeComponentId = ''
      this.pushHistory()
    },
    handleUndo() {
      if (this.canUndo) {
        this.historyIndex--
        this.componentTree = this.$utils.deepClone(this.historyStack[this.historyIndex])
      }
    },
    handleRedo() {
      if (this.canRedo) {
        this.historyIndex++
        this.componentTree = this.$utils.deepClone(this.historyStack[this.historyIndex])
      }
    },
    pushHistory() {
      const snapshot = this.$utils.deepClone(this.componentTree)
      
      if (this.historyIndex < this.historyStack.length - 1) {
        this.historyStack = this.historyStack.slice(0, this.historyIndex + 1)
      }
      
      this.historyStack.push(snapshot)
      
      if (this.historyStack.length > this.maxHistory) {
        this.historyStack.shift()
      } else {
        this.historyIndex++
      }
    },
    handleSave() {
      const json = JSON.stringify(this.componentTree, null, 2)
      console.log('保存的JSON:', json)
      
      localStorage.setItem('low-code-cache', json)
      
      this.$Message.success({
        content: '保存成功！JSON 已输出到控制台',
        duration: 3
      })
    },
    getCanvasJson() {
      return this.$utils.deepClone(this.componentTree)
    }
  }
}
</script>

<style lang="scss" scoped>
.low-code-editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  .editor-body {
    flex: 1;
    display: flex;
    overflow: hidden;
    
    .left-panel {
      width: 280px;
      border-right: 1px solid #e8e8e8;
      overflow: hidden;
    }
    
    .center-panel {
      flex: 1;
      overflow: hidden;
    }
    
    .right-panel {
      width: 320px;
      border-left: 1px solid #e8e8e8;
      overflow: hidden;
    }
  }
}
</style>
