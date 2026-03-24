<template>
  <header class="editor-header">
    <div class="header-left">
      <div class="logo">
        <Icon type="ios-color-wand-outline" size="24" />
        <span>低代码编辑器</span>
      </div>
    </div>
    
    <div class="header-center">
      <ButtonGroup>
        <Button :disabled="!canUndo" @click="$emit('undo')">
          <Icon type="ios-undo" />
          撤回
        </Button>
        <Button :disabled="!canRedo" @click="$emit('redo')">
          <Icon type="ios-redo" />
          前进
        </Button>
      </ButtonGroup>
      
      <Divider type="vertical" />
      
      <RadioGroup v-model="localMode" type="button" @on-change="handleModeChange">
        <Radio label="edit">
          <Icon type="ios-create-outline" />
          编辑模式
        </Radio>
        <Radio label="preview">
          <Icon type="ios-eye-outline" />
          预览模式
        </Radio>
      </RadioGroup>
    </div>
    
    <div class="header-right">
      <Button @click="handlePreview">
        <Icon type="ios-play-outline" />
        预览
      </Button>
      <Button type="primary" @click="handleSave">
        <Icon type="ios-save" />
        保存
      </Button>
      <Button @click="handleExport">
        <Icon type="ios-download-outline" />
        导出JSON
      </Button>
    </div>
    
    <Modal v-model="previewVisible" title="预览" fullscreen footer-hide>
      <PreviewCanvas :component-tree="componentTree" />
    </Modal>
    
    <Modal v-model="exportVisible" title="导出JSON" width="600">
      <Input
        v-model="exportJson"
        type="textarea"
        :rows="20"
        readonly
      />
      <template #footer>
        <Button @click="exportVisible = false">关闭</Button>
        <Button type="primary" @click="copyExportJson">复制JSON</Button>
      </template>
    </Modal>
  </header>
</template>

<script>
import PreviewCanvas from './PreviewCanvas.vue'

export default {
  name: 'EditorHeader',
  components: {
    PreviewCanvas
  },
  props: {
    mode: {
      type: String,
      default: 'edit'
    },
    canUndo: {
      type: Boolean,
      default: false
    },
    canRedo: {
      type: Boolean,
      default: false
    },
    componentTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localMode: this.mode,
      previewVisible: false,
      exportVisible: false,
      exportJson: ''
    }
  },
  watch: {
    mode(val) {
      this.localMode = val
    }
  },
  methods: {
    handleModeChange(val) {
      this.$emit('mode-change', val)
    },
    handlePreview() {
      this.previewVisible = true
    },
    handleSave() {
      this.$emit('save')
    },
    handleExport() {
      this.exportJson = JSON.stringify(this.componentTree, null, 2)
      this.exportVisible = true
    },
    copyExportJson() {
      navigator.clipboard.writeText(this.exportJson).then(() => {
        this.$Message.success('已复制到剪贴板')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
  .header-left {
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      
      span {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }
  }
  
  .header-center {
    display: flex;
    align-items: center;
    gap: 16px;
    
    :deep(.ivu-btn-group) {
      .ivu-btn {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        color: #fff;
        
        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.25);
        }
        
        &:disabled {
          opacity: 0.5;
        }
      }
    }
    
    :deep(.ivu-radio-group-button) {
      .ivu-radio-wrapper {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        color: #fff;
        
        &:hover {
          background: rgba(255, 255, 255, 0.25);
        }
        
        &.ivu-radio-wrapper-checked {
          background: #fff;
          color: #667eea;
        }
      }
    }
    
    :deep(.ivu-divider-vertical) {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  
  .header-right {
    display: flex;
    gap: 12px;
    
    :deep(.ivu-btn) {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      color: #fff;
      
      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
      
      &.ivu-btn-primary {
        background: #fff;
        color: #667eea;
        border-color: #fff;
        
        &:hover {
          background: #f0f0f0;
        }
      }
    }
  }
}
</style>
