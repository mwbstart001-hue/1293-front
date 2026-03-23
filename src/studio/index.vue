<template>
  <div class="studio">
    <!-- 顶部操作栏 -->
    <header class="studio-toolbar">
      <div class="toolbar-left">
        <div class="logo">
          <Icon type="ios-color-palette" size="24" />
          <span class="logo-text">LowCode Studio</span>
        </div>
      </div>
      <div class="toolbar-center">
        <!-- PC/H5 模式切换 -->
        <div class="mode-switcher">
          <div
            class="mode-btn"
            :class="{ active: canvasMode === 'pc' }"
            @click="canvasMode = 'pc'"
            title="PC 模式"
          >
            <Icon type="ios-desktop" size="18" />
            <span>PC</span>
          </div>
          <div
            class="mode-btn"
            :class="{ active: canvasMode === 'h5' }"
            @click="canvasMode = 'h5'"
            title="H5 模式"
          >
            <Icon type="ios-phone-portrait" size="18" />
            <span>H5</span>
          </div>
        </div>
      </div>
      <div class="toolbar-right">
        <!-- 撤回/前进 -->
        <div class="toolbar-actions">
          <div
            class="toolbar-btn"
            :class="{ disabled: historyIndex <= 0 }"
            @click="undo"
            title="撤回 (Ctrl+Z)"
          >
            <Icon type="ios-undo" size="18" />
          </div>
          <div
            class="toolbar-btn"
            :class="{ disabled: historyIndex >= history.length - 1 }"
            @click="redo"
            title="前进 (Ctrl+Y)"
          >
            <Icon type="ios-redo" size="18" />
          </div>
        </div>

        <div class="toolbar-divider"></div>

        <!-- 预览按钮 -->
        <div class="toolbar-btn" @click="handlePreview" title="预览">
          <Icon type="ios-eye" size="18" />
          <span class="btn-text">预览</span>
        </div>

        <!-- 保存按钮 -->
        <div class="toolbar-btn primary" @click="handleSave" title="保存">
          <Icon type="ios-cloud-upload" size="18" />
          <span class="btn-text">保存</span>
        </div>
      </div>
    </header>

    <!-- 下方主内容区 -->
    <div class="studio-body">
      <!-- 左侧：组件菜单 -->
      <aside class="studio-sidebar">
        <component-menu />
      </aside>

      <!-- 中间：页面画布 -->
      <main class="studio-canvas">
        <page-canvas
          ref="pageCanvas"
          :mode="canvasMode"
          @layout-change="onLayoutChange"
          @edit-component="onEditComponent"
        />
      </main>

      <!-- 右侧：组件配置面板 -->
      <aside class="studio-config">
        <div class="config-header">
          <Icon type="ios-settings" size="18" />
          <span>属性配置</span>
        </div>
        <div class="config-body">
          <config-panel :component="selectedComponent" />
        </div>
      </aside>
    </div>

    <!-- 真实预览弹窗 -->
    <preview-modal ref="previewModal" />
  </div>
</template>

<script>
import ComponentMenu from './componentMenu/index.vue'
import PageCanvas from './pageCanvas/index.vue'
import ConfigPanel from './ConfigPanel.vue'
import PreviewModal from './PreviewModal.vue'
import { deepClone } from '@/utils/utils'

export default {
  name: 'Studio',
  components: {
    ComponentMenu,
    PageCanvas,
    ConfigPanel,
    PreviewModal
  },
  data() {
    return {
      canvasMode: 'pc',
      selectedComponent: null,
      // 操作历史
      history: [[]],
      historyIndex: 0,
      maxHistory: 30
    }
  },
  methods: {
    onLayoutChange(layout) {
      // 记录历史
      const snapshot = deepClone(layout)
      // 如果当前不在历史末尾，截断后续历史
      if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1)
      }
      this.history.push(snapshot)
      // 限制历史记录数量
      if (this.history.length > this.maxHistory) {
        this.history.shift()
      } else {
        this.historyIndex++
      }
    },

    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--
        const snapshot = deepClone(this.history[this.historyIndex])
        this.$refs.pageCanvas.setLayout(snapshot)
      }
    },

    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        const snapshot = deepClone(this.history[this.historyIndex])
        this.$refs.pageCanvas.setLayout(snapshot)
      }
    },

    onEditComponent(item) {
      this.selectedComponent = item
    },

    handleSave() {
      const json = this.$refs.pageCanvas.getLayoutJson()
      console.log('保存布局数据：', JSON.stringify(json, null, 2))
      this.$Message.success('布局数据已保存到控制台')
    },

    handlePreview() {
      const json = this.$refs.pageCanvas.getLayoutJson()
      this.$refs.previewModal.show(json.layout, this.canvasMode)
    }
  },

  mounted() {
    // 快捷键支持
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          this.redo()
        } else {
          this.undo()
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault()
        this.redo()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        this.handleSave()
      }
    })
  }
}
</script>

<style scoped>
.studio {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg-dark);
}

/* ======================== 顶部操作栏 ======================== */
.studio-toolbar {
  height: var(--toolbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--bg-toolbar);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  z-index: 100;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.toolbar-center {
  display: flex;
  align-items: center;
}

.mode-switcher {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  transition: all var(--transition-fast);
  user-select: none;
}

.mode-btn:hover {
  color: var(--text-secondary);
}

.mode-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  user-select: none;
  font-size: 13px;
}

.toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

.toolbar-btn.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.toolbar-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}

.toolbar-btn.primary:hover {
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.5);
  transform: translateY(-1px);
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: var(--border-color);
  margin: 0 8px;
}

.btn-text {
  font-weight: 500;
}

/* ======================== 主内容区 ======================== */
.studio-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左侧组件菜单 */
.studio-sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
}

/* 中间画布 */
.studio-canvas {
  flex: 1;
  overflow: hidden;
}

/* 右侧配置面板 */
.studio-config {
  width: var(--config-panel-width);
  flex-shrink: 0;
  border-left: 1px solid var(--border-color);
  background: var(--bg-sidebar);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.config-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.config-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.config-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 12px;
}

.config-empty p {
  font-size: 13px;
  color: var(--text-muted);
}

.config-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.config-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.config-item label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* JSON 预览 */
.json-preview {
  background: #1e1e2e;
  color: #a6e3a1;
  padding: 16px;
  border-radius: 8px;
  font-family: 'Fira Code', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.6;
  max-height: 500px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
