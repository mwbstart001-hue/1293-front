<template>
  <div class="studio-header">
    <div class="header-left">
      <div class="logo">
        <Icon type="md-code-working" size="28" />
        <span>低代码编辑器</span>
      </div>
    </div>
    
    <div class="header-center">
      <ButtonGroup size="small">
        <Button @click="handleUndo" :disabled="undoStack.length === 0">
          <Icon type="md-undo" />
          撤回
        </Button>
        <Button @click="handleRedo" :disabled="redoStack.length === 0">
          <Icon type="md-redo" />
          前进
        </Button>
      </ButtonGroup>
      
      <Divider type="vertical" />
      
      <RadioGroup v-model="editMode" type="button" size="small">
        <Radio label="edit">
          <Icon type="md-create" />
          编辑模式
        </Radio>
        <Radio label="preview">
          <Icon type="md-eye" />
          预览模式
        </Radio>
      </RadioGroup>
    </div>
    
    <div class="header-right">
      <Button size="small" @click="handleExport">
        <Icon type="md-code" />
        导出JSON
      </Button>
      <Button type="primary" size="small" @click="handleSave">
        <Icon type="md-save" />
        保存
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudioHeader',
  props: {
    undoStack: {
      type: Array,
      default: () => []
    },
    redoStack: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editMode: 'edit'
    }
  },
  methods: {
    handleUndo() {
      this.$emit('undo')
    },
    handleRedo() {
      this.$emit('redo')
    },
    handleSave() {
      this.$emit('save')
    },
    handleExport() {
      this.$emit('export')
    }
  },
  watch: {
    editMode(val) {
      this.$emit('modeChange', val)
    }
  }
}
</script>

<style scoped>
.studio-header {
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ivu-radio-group-button .ivu-radio-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.ivu-radio-group-button .ivu-radio-wrapper.ivu-radio-group-item {
  color: #fff;
}

.ivu-radio-group-button .ivu-radio-wrapper.ivu-radio-item-selected {
  background: #fff;
  color: #667eea;
}

.ivu-btn {
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}

.ivu-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}

.ivu-btn-primary {
  background: #fff;
  border-color: #fff;
  color: #667eea;
}

.ivu-btn-primary:hover {
  background: #f0f0f0;
  border-color: #f0f0f0;
  color: #667eea;
}

.ivu-divider-vertical {
  height: 24px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
