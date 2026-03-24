<template>
  <div class="props-editor">
    <Form :label-width="80" label-position="left" size="small">
      <template v-for="(value, key) in componentProps">
        <FormItem :key="key" :label="getLabel(key)">
          <template v-if="isStyleKey(key)">
            <span class="style-hint">请在样式配置中设置</span>
          </template>
          
          <template v-else-if="typeof value === 'string'">
            <Input
              v-model="localProps[key]"
              :placeholder="'请输入' + getLabel(key)"
              @on-change="handleChange(key)"
            />
          </template>
          
          <template v-else-if="typeof value === 'number'">
            <InputNumber
              v-model="localProps[key]"
              style="width: 100%"
              @on-change="handleChange(key)"
            />
          </template>
          
          <template v-else-if="typeof value === 'boolean'">
            <Switch v-model="localProps[key]" @on-change="handleChange(key)" />
          </template>
          
          <template v-else-if="Array.isArray(value)">
            <div class="array-editor">
              <div v-for="(item, index) in localProps[key]" :key="index" class="array-item">
                <Input v-model="localProps[key][index]" size="small" />
                <Button size="small" type="text" @click="removeArrayItem(key, index)">
                  <Icon type="md-close" />
                </Button>
              </div>
              <Button size="small" type="dashed" long @click="addArrayItem(key)">
                <Icon type="md-add" /> 添加
              </Button>
            </div>
          </template>
          
          <template v-else>
            <Input
              v-model="localProps[key]"
              type="textarea"
              :rows="3"
              @on-change="handleChange(key)"
            />
          </template>
        </FormItem>
      </template>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'PropsEditor',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localProps: {}
    }
  },
  computed: {
    componentProps() {
      const props = { ...this.config.props }
      delete props.style
      return props
    }
  },
  watch: {
    config: {
      handler(val) {
        this.localProps = { ...val.props }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getLabel(key) {
      const labelMap = {
        type: '类型',
        size: '尺寸',
        text: '文本',
        placeholder: '占位符',
        clearable: '可清空',
        label: '标签',
        content: '内容',
        src: '图片地址',
        dashed: '虚线',
        title: '标题',
        gutter: '间距',
        columns: '列配置',
        data: '数据'
      }
      return labelMap[key] || key
    },
    isStyleKey(key) {
      return key === 'style' || key === 'styleConfig'
    },
    handleChange(key) {
      this.$emit('update', key, this.localProps[key])
    },
    addArrayItem(key) {
      if (!this.localProps[key]) {
        this.localProps[key] = []
      }
      this.localProps[key].push('')
      this.handleChange(key)
    },
    removeArrayItem(key, index) {
      this.localProps[key].splice(index, 1)
      this.handleChange(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.props-editor {
  padding: 16px;
  
  :deep(.ivu-form-item) {
    margin-bottom: 16px;
  }
  
  .style-hint {
    color: #808695;
    font-size: 12px;
  }
  
  .array-editor {
    .array-item {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
    }
  }
}
</style>
