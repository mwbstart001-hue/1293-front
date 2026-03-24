<template>
  <div class="studio-page">
    <!-- 顶部工具栏 -->
    <Toolbar
      :can-undo="canUndo"
      :can-redo="canRedo"
      :components="canvasComponents"
      :device-type="deviceType"
      @undo="handleUndo"
      @redo="handleRedo"
      @clear="handleClear"
      @save="handleSave"
    />

    <!-- 主体区域 -->
    <div class="studio-body">
      <!-- 左侧组件菜单 -->
      <div class="studio-sidebar left">
        <ComponentMenu />
      </div>

      <!-- 中间画布区域 -->
      <div class="studio-main">
        <PageCanvas
          ref="pageCanvas"
          v-model="canvasComponents"
          @device-change="handleDeviceChange"
          @select="handleSelect"
          @change="handleCanvasChange"
        />
      </div>

      <!-- 右侧配置面板 -->
      <div class="studio-sidebar right">
        <ConfigPanel
          :selected-component="selectedComponent"
          @update="handleConfigUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/studio/Toolbar.vue'
import ComponentMenu from '@/components/studio/ComponentMenu.vue'
import PageCanvas from '@/components/studio/PageCanvas.vue'
import ConfigPanel from '@/components/studio/ConfigPanel.vue'

export default {
  name: 'Studio',
  components: {
    Toolbar,
    ComponentMenu,
    PageCanvas,
    ConfigPanel
  },
  data() {
  return {
    canvasComponents: [],
    deviceType: 'pc',
    selectedComponent: null,
    selectedPath: null,
    history: [],
    historyIndex: -1,
    maxHistory: 20
  }
},
  computed: {
    canUndo() {
      return this.historyIndex > 0
    },
    canRedo() {
      return this.historyIndex < this.history.length - 1
    }
  },
  watch: {
    canvasComponents: {
      deep: true,
      handler(val) {
        this.saveToHistory()
      }
    }
  },
  mounted() {
    // 初始化历史记录
    this.saveToHistory()
    // 监听键盘事件
    this.bindKeyboard()
  },
  beforeDestroy() {
    this.unbindKeyboard()
  },
  methods: {
    saveToHistory() {
      // 如果当前不在历史末尾，删除后面的历史
      if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1)
      }
      // 添加新状态
      this.history.push(JSON.parse(JSON.stringify(this.canvasComponents)))
      // 限制历史记录数量
      if (this.history.length > this.maxHistory) {
        this.history.shift()
      } else {
        this.historyIndex++
      }
    },
    handleUndo() {
      if (this.canUndo) {
        this.historyIndex--
        this.canvasComponents = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      }
    },
    handleRedo() {
      if (this.canRedo) {
        this.historyIndex++
        this.canvasComponents = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
      }
    },
    handleClear() {
      this.canvasComponents = []
      this.selectedComponent = null
      this.selectedPath = null
    },
    handleSave() {
      const json = this.getCanvasJson()
      console.log('保存的 JSON:', json)
      this.$Message.success('页面保存成功')
      // 这里可以发送到后端
    },
    handleDeviceChange(type) {
      this.deviceType = type
    },
    handleSelect(path, component) {
      this.selectedPath = path
      this.selectedComponent = component
    },
    handleCanvasChange(components) {
      // 画布组件变化
    },
    handleConfigUpdate(component) {
      // 配置更新
    },
    bindKeyboard() {
      this._keyHandler = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
          e.preventDefault()
          if (e.shiftKey) {
            this.handleRedo()
          } else {
            this.handleUndo()
          }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
          e.preventDefault()
          this.handleRedo()
        }
      }
      document.addEventListener('keydown', this._keyHandler)
    },
    unbindKeyboard() {
      document.removeEventListener('keydown', this._keyHandler)
    },
    // 获取画布 JSON 树方法
    getCanvasJson() {
      return JSON.parse(JSON.stringify(this.canvasComponents))
    }
  }
}
</script>

<style lang="scss" scoped>
.studio-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  .studio-body {
    flex: 1;
    display: flex;
    overflow: hidden;

    .studio-sidebar {
      flex-shrink: 0;

      &.left {
        width: 280px;
      }

      &.right {
        width: 320px;
      }
    }

    .studio-main {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
