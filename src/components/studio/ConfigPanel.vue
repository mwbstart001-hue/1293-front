<template>
  <div class="config-panel">
    <div class="panel-header">
      <Icon type="ios-settings" size="18" />
      <span>属性配置</span>
    </div>

    <div v-if="!selectedComponent" class="empty-config">
      <Icon type="ios-hand" size="48" />
      <p>请选择一个组件进行配置</p>
    </div>

    <div v-else class="panel-content">
      <div class="component-info">
        <Icon :type="componentIcon" size="24" />
        <span class="component-name">{{ componentName }}</span>
        <Tag size="small">{{ componentType }}</Tag>
      </div>

      <Divider />

      <Form :model="formData" label-position="top" class="config-form">
        <FormItem
          v-for="(attr, key) in componentAttrs"
          :key="key"
          :label="attr.label"
        >
          <!-- 字符串输入 -->
          <Input
            v-if="attr.type === 'string'"
            v-model="formData[key]"
            @on-change="handleChange(key, $event.target.value)"
          />

          <!-- 文本域 -->
          <Input
            v-else-if="attr.type === 'textarea'"
            v-model="formData[key]"
            type="textarea"
            :rows="3"
            @on-change="handleChange(key, $event.target.value)"
          />

          <!-- 数字输入 -->
          <InputNumber
            v-else-if="attr.type === 'number'"
            v-model="formData[key]"
            :min="attr.min"
            :max="attr.max"
            :step="attr.step || 1"
            style="width: 100%"
            @on-change="handleChange(key, $event)"
          />

          <!-- 布尔值 -->
          <i-switch
            v-else-if="attr.type === 'boolean'"
            v-model="formData[key]"
            @on-change="handleChange(key, $event)"
          />

          <!-- 颜色选择 -->
          <ColorPicker
            v-else-if="attr.type === 'color'"
            v-model="formData[key]"
            @on-change="handleChange(key, $event)"
          />

          <!-- 下拉选择 -->
          <Select
            v-else-if="attr.type === 'select'"
            v-model="formData[key]"
            @on-change="handleChange(key, $event)"
          >
            <Option
              v-for="opt in attr.options"
              :key="opt"
              :value="opt"
            >
              {{ opt }}
            </Option>
          </Select>
        </FormItem>
      </Form>

      <Divider />

      <div class="json-preview">
        <div class="preview-header">
          <span>组件 JSON</span>
          <Button
            type="text"
            size="small"
            @click="copyJson"
          >
            <Icon type="ios-copy" />
            复制
          </Button>
        </div>
        <pre class="json-code">{{ jsonPreview }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { getComponentConfig } from '@/config/componentConfig'

export default {
  name: 'ConfigPanel',
  props: {
    selectedComponent: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    componentConfig() {
      if (!this.selectedComponent) return null
      return getComponentConfig(this.selectedComponent.tag)
    },
    componentName() {
      return this.componentConfig ? this.componentConfig.name : ''
    },
    componentIcon() {
      return this.componentConfig ? this.componentConfig.icon : 'ios-cube'
    },
    componentType() {
      return this.selectedComponent ? this.selectedComponent.componentType : ''
    },
    componentAttrs() {
      return this.componentConfig ? this.componentConfig.attrs : {}
    },
    jsonPreview() {
      if (!this.selectedComponent) return ''
      return JSON.stringify(this.selectedComponent, null, 2)
    }
  },
  watch: {
    selectedComponent: {
      immediate: true,
      handler(val) {
        if (val && val.props) {
          this.formData = { ...val.props }
        } else {
          this.formData = {}
        }
      }
    }
  },
  methods: {
    handleChange(key, value) {
      if (this.selectedComponent) {
        this.$set(this.selectedComponent.props, key, value)
        this.$emit('update', this.selectedComponent)
      }
    },
    copyJson() {
      if (this.selectedComponent) {
        const json = JSON.stringify(this.selectedComponent, null, 2)
        navigator.clipboard.writeText(json).then(() => {
          this.$Message.success('JSON 已复制到剪贴板')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.config-panel {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e8e8e8;

  .panel-header {
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid #e8e8e8;
    font-weight: 600;
    font-size: 14px;
    color: #333;
    gap: 8px;
  }

  .empty-config {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #bfbfbf;

    p {
      margin-top: 16px;
      font-size: 14px;
    }
  }

  .panel-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;

    .component-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f5f7fa;
      border-radius: 6px;

      .component-name {
        flex: 1;
        font-weight: 500;
        color: #333;
      }
    }

    .config-form {
      margin-top: 8px;

      :deep(.ivu-form-item) {
        margin-bottom: 16px;
      }
    }

    .json-preview {
      margin-top: 16px;

      .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        font-size: 12px;
        color: #666;
      }

      .json-code {
        background: #f5f7fa;
        padding: 12px;
        border-radius: 4px;
        font-size: 11px;
        line-height: 1.5;
        overflow-x: auto;
        max-height: 200px;
        overflow-y: auto;
      }
    }
  }
}
</style>
