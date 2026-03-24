<template>
  <div class="advanced-editor">
    <Form :label-width="80" label-position="left" size="small">
      <FormItem label="组件ID">
        <Input v-model="localConfig.componentId" disabled>
          <template #append>
            <Button size="small" @click="copyId">复制</Button>
          </template>
        </Input>
      </FormItem>
      
      <FormItem label="组件名称">
        <Input v-model="localConfig.name" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="组件类型">
        <Tag color="primary">{{ localConfig.componentType }}</Tag>
      </FormItem>
      
      <FormItem label="组件标签">
        <Tag>{{ localConfig.tag }}</Tag>
      </FormItem>
    </Form>
    
    <Divider>组件数据</Divider>
    
    <div class="json-editor">
      <div class="json-toolbar">
        <span>JSON 配置</span>
        <ButtonGroup size="small">
          <Button @click="formatJson">格式化</Button>
          <Button @click="copyJson">复制</Button>
        </ButtonGroup>
      </div>
      <Input
        v-model="jsonStr"
        type="textarea"
        :rows="10"
        placeholder="组件 JSON 配置"
        @on-blur="handleJsonUpdate"
      />
    </div>
    
    <Divider>操作</Divider>
    
    <div class="action-buttons">
      <Button type="error" long @click="handleDelete">
        <Icon type="md-trash" />
        删除组件
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvancedEditor',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localConfig: {},
      jsonStr: ''
    }
  },
  watch: {
    config: {
      handler(val) {
        this.localConfig = { ...val }
        this.jsonStr = JSON.stringify(val, null, 2)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleChange() {
      this.$emit('update', { ...this.localConfig })
    },
    handleJsonUpdate() {
      try {
        const parsed = JSON.parse(this.jsonStr)
        this.$emit('update', parsed)
      } catch (e) {
        this.$Message.error('JSON 格式错误')
      }
    },
    formatJson() {
      try {
        const parsed = JSON.parse(this.jsonStr)
        this.jsonStr = JSON.stringify(parsed, null, 2)
      } catch (e) {
        this.$Message.error('JSON 格式错误')
      }
    },
    copyJson() {
      navigator.clipboard.writeText(this.jsonStr).then(() => {
        this.$Message.success('已复制到剪贴板')
      })
    },
    copyId() {
      navigator.clipboard.writeText(this.localConfig.componentId).then(() => {
        this.$Message.success('已复制组件ID')
      })
    },
    handleDelete() {
      this.$Modal.confirm({
        title: '确认删除',
        content: '确定要删除此组件吗？',
        onOk: () => {
          this.$emit('delete', this.localConfig.componentId)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.advanced-editor {
  padding: 16px;
  
  :deep(.ivu-form-item) {
    margin-bottom: 12px;
  }
  
  .json-editor {
    .json-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      
      span {
        font-weight: 500;
        color: #17233d;
      }
    }
  }
  
  .action-buttons {
    :deep(.ivu-btn-error) {
      margin-top: 8px;
    }
  }
}
</style>
