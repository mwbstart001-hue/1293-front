<template>
  <div class="config-panel">
    <div v-if="component" class="config-content">
      <!-- 基础配置 -->
      <Divider orientation="left" size="small">基础属性</Divider>
      <Form :label-width="80" label-position="left">
        <FormItem label="组件名">
          <Input v-model="component.componentName" size="small" />
        </FormItem>
        <FormItem label="组件ID">
          <Input :value="component.componentId" size="small" disabled />
        </FormItem>
        <FormItem label="组件标签">
          <Tag color="primary">{{ component.tag }}</Tag>
        </FormItem>
      </Form>

      <!-- Props 配置 -->
      <Divider orientation="left" size="small">组件参数 (Props)</Divider>
      <Form :label-width="80" label-position="left" v-if="component.props">
        <!-- Input 相关 -->
        <template v-if="component.tag === 'widget-input'">
          <FormItem label="占位提示">
            <Input v-model="component.props.placeholder" size="small" />
          </FormItem>
          <FormItem label="是否禁用">
            <i-switch v-model="component.props.disabled" size="small" />
          </FormItem>
          <FormItem label="尺寸">
            <Select v-model="component.props.size" size="small">
              <Option value="small">Small</Option>
              <Option value="default">Default</Option>
              <Option value="large">Large</Option>
            </Select>
          </FormItem>
        </template>

        <!-- Button 相关 -->
        <template v-else-if="component.tag === 'widget-button'">
          <FormItem label="按钮文字">
            <Input v-model="component.props.text" size="small" />
          </FormItem>
          <FormItem label="按钮类型">
            <Select v-model="component.props.btnType" size="small">
              <Option value="default">Default</Option>
              <Option value="primary">Primary</Option>
              <Option value="dashed">Dashed</Option>
              <Option value="text">Text</Option>
              <Option value="info">Info</Option>
              <Option value="success">Success</Option>
              <Option value="warning">Warning</Option>
              <Option value="error">Error</Option>
            </Select>
          </FormItem>
          <FormItem label="是否通栏">
            <i-switch v-model="component.props.long" size="small" />
          </FormItem>
          <FormItem label="是否禁用">
            <i-switch v-model="component.props.disabled" size="small" />
          </FormItem>
        </template>

        <!-- Text 相关 -->
        <template v-else-if="component.tag === 'widget-text'">
          <FormItem label="文本内容">
            <Input v-model="component.props.content" type="textarea" :rows="3" size="small" />
          </FormItem>
          <FormItem label="字体大小">
            <InputNumber v-model="component.props.fontSize" :min="12" :max="100" size="small" />
          </FormItem>
          <FormItem label="文字颜色">
            <ColorPicker v-model="component.props.color" size="small" />
          </FormItem>
          <FormItem label="字体粗细">
            <Select v-model="component.props.fontWeight" size="small">
              <Option value="normal">Normal</Option>
              <Option value="bold">Bold</Option>
              <Option value="500">500</Option>
              <Option value="600">600</Option>
            </Select>
          </FormItem>
        </template>

        <!-- Select 相关 -->
        <template v-else-if="component.tag === 'widget-select'">
          <FormItem label="占位提示">
            <Input v-model="component.props.placeholder" size="small" />
          </FormItem>
          <FormItem label="是否禁用">
            <i-switch v-model="component.props.disabled" size="small" />
          </FormItem>
        </template>

        <!-- Switch 相关 -->
        <template v-else-if="component.tag === 'widget-switch'">
          <FormItem label="是否禁用">
            <i-switch v-model="component.props.disabled" size="small" />
          </FormItem>
          <FormItem label="尺寸">
            <Select v-model="component.props.size" size="small">
              <Option value="small">Small</Option>
              <Option value="default">Default</Option>
              <Option value="large">Large</Option>
            </Select>
          </FormItem>
        </template>
      </Form>
      <div v-else class="props-empty">
        <Alert show-icon>该组件暂无复杂配置项</Alert>
      </div>
    </div>
    <div v-else class="config-empty">
      <Icon type="ios-hand" size="48" color="rgba(255,255,255,0.2)" />
      <p>点击画布中的组件进行配置</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigPanel',
  props: {
    component: {
      type: Object,
      default: null
    }
  },
  watch: {
    component: {
      handler(newVal) {
        if (newVal && !newVal.props) {
          // 初始化默认 Props
          this.initDefaultProps(newVal)
        }
      },
      immediate: true
    }
  },
  methods: {
    initDefaultProps(item) {
      const defaults = {
        'widget-input': { placeholder: '请输入内容', disabled: false, size: 'default' },
        'widget-button': { text: '按钮', btnType: 'primary', size: 'default', long: false, disabled: false },
        'widget-text': { content: '文本内容', fontSize: 14, color: '#333', fontWeight: 'normal' },
        'widget-select': { placeholder: '请选择', disabled: false, size: 'default', options: [{ label: '选项一', value: '1' }] },
        'widget-switch': { value: false, disabled: false, size: 'default' }
      }
      if (defaults[item.tag]) {
        this.$set(item, 'props', { ...defaults[item.tag] })
      } else {
        this.$set(item, 'props', {})
      }
    }
  }
}
</script>

<style scoped>
.config-panel {
  padding: 0;
  height: 100%;
}

.config-content {
  padding: 12px;
}

.config-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 16px;
  color: var(--text-muted);
}

.props-empty {
  margin-top: 10px;
}

:deep(.ivu-divider-inner-text) {
  font-size: 12px;
  color: var(--text-secondary);
}

:deep(.ivu-form-item-label) {
  color: var(--text-secondary);
  font-size: 12px;
}

:deep(.ivu-input-wrapper-small .ivu-input) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

:deep(.ivu-select-selection) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>
