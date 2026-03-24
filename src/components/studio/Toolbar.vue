<template>
  <div class="studio-toolbar">
    <div class="toolbar-left">
      <div class="logo">
        <Icon type="ios-color-wand" size="28" color="#1890ff" />
        <span class="logo-text">LowCode Studio</span>
      </div>
    </div>

    <div class="toolbar-center">
      <Tooltip content="撤销 (Ctrl+Z)" placement="bottom" transfer>
        <Button
          type="text"
          :disabled="!canUndo"
          @click="handleUndo"
        >
          <Icon type="ios-undo" size="18" />
        </Button>
      </Tooltip>
      <Tooltip content="重做 (Ctrl+Y)" placement="bottom" transfer>
        <Button
          type="text"
          :disabled="!canRedo"
          @click="handleRedo"
        >
          <Icon type="ios-redo" size="18" />
        </Button>
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip content="预览" placement="bottom" transfer>
        <Button type="text" @click="handlePreview">
          <Icon type="ios-eye" size="18" />
        </Button>
      </Tooltip>
      <Tooltip content="清空画布" placement="bottom" transfer>
        <Button type="text" @click="handleClear">
          <Icon type="ios-trash" size="18" />
        </Button>
      </Tooltip>
    </div>

    <div class="toolbar-right">
      <Button type="default" @click="handleExport">
        <Icon type="ios-download" />
        导出 JSON
      </Button>
      <Button type="primary" @click="handleSave">
        <Icon type="ios-save" />
        保存
      </Button>
    </div>

    <!-- 预览弹窗 -->
    <Modal
      v-model="previewVisible"
      title="页面预览"
      width="90%"
      :footer-hide="true"
      class="preview-modal"
    >
      <div class="preview-container">
        <div class="preview-content" :class="`device-${previewDevice}`">
          <component
            v-for="component in previewComponents"
            :key="component.componentId"
            :is="component.tag"
            v-bind="component.props"
          >
            <template v-if="component.children && component.children.length">
              <component
                v-for="child in component.children"
                :key="child.componentId"
                :is="child.tag"
                v-bind="child.props"
              />
            </template>
          </component>
        </div>
      </div>
    </Modal>

    <!-- 导出 JSON 弹窗 -->
    <Modal
      v-model="exportVisible"
      title="导出 JSON"
      width="700"
      :footer-hide="true"
    >
      <div class="export-container">
        <Input
          v-model="exportJson"
          type="textarea"
          :rows="20"
          readonly
        />
        <div class="export-actions">
          <Button type="primary" @click="copyExportJson">
            <Icon type="ios-copy" />
            复制到剪贴板
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    canUndo: {
      type: Boolean,
      default: false
    },
    canRedo: {
      type: Boolean,
      default: false
    },
    components: {
      type: Array,
      default: () => []
    },
    deviceType: {
      type: String,
      default: 'pc'
    }
  },
  data() {
    return {
      previewVisible: false,
      exportVisible: false,
      exportJson: '',
      previewDevice: 'pc'
    }
  },
  computed: {
    previewComponents() {
      return JSON.parse(JSON.stringify(this.components))
    }
  },
  methods: {
    handleUndo() {
      this.$emit('undo')
    },
    handleRedo() {
      this.$emit('redo')
    },
    handlePreview() {
      this.previewDevice = this.deviceType
      this.previewVisible = true
    },
    handleClear() {
      this.$Modal.confirm({
        title: '确认清空',
        content: '确定要清空画布吗？此操作不可恢复。',
        onOk: () => {
          this.$emit('clear')
        }
      })
    },
    handleExport() {
      this.exportJson = JSON.stringify(this.components, null, 2)
      this.exportVisible = true
    },
    handleSave() {
      this.$emit('save')
    },
    copyExportJson() {
      navigator.clipboard.writeText(this.exportJson).then(() => {
        this.$Message.success('JSON 已复制到剪贴板')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.studio-toolbar {
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .toolbar-left {
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;

      .logo-text {
        font-size: 20px;
        font-weight: 600;
        color: #333;
        background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .toolbar-center {
    display: flex;
    align-items: center;
    gap: 8px;

    :deep(.ivu-btn-text) {
      color: #666;

      &:hover:not(:disabled) {
        color: #1890ff;
        background: #e6f7ff;
      }

      &:disabled {
        color: #bfbfbf;
      }
    }
  }

  .toolbar-right {
    display: flex;
    gap: 12px;
  }
}

.preview-modal {
  :deep(.ivu-modal-body) {
    padding: 0;
  }

  .preview-container {
    background: #f0f2f5;
    padding: 24px;
    min-height: 600px;
    display: flex;
    justify-content: center;
    overflow: auto;

    .preview-content {
      background: #fff;
      min-height: 800px;
      padding: 20px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

      &.device-pc {
        width: 1200px;
      }

      &.device-h5 {
        width: 375px;
      }
    }
  }
}

.export-container {
  .export-actions {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
