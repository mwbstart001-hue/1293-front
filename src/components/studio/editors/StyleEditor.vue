<template>
  <div class="style-editor">
    <Form :label-width="80" label-position="left" size="small">
      <FormItem label="宽度">
        <Input v-model="localStyle.width" placeholder="如: 100% 或 200px" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="高度">
        <Input v-model="localStyle.height" placeholder="如: auto 或 100px" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="最小高度">
        <Input v-model="localStyle.minHeight" placeholder="如: 100px" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="内边距">
        <Input v-model="localStyle.padding" placeholder="如: 16px" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="外边距">
        <Input v-model="localStyle.margin" placeholder="如: 8px 0" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="背景色">
        <div class="color-picker-wrapper">
          <Input v-model="localStyle.backgroundColor" @on-change="handleChange">
            <template #prepend>
              <colorPicker
                :value="localStyle.backgroundColor"
                @change="handleColorChange('backgroundColor', $event)"
              />
            </template>
          </Input>
        </div>
      </FormItem>
      
      <FormItem label="字体大小">
        <Input v-model="localStyle.fontSize" placeholder="如: 14px" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="字体颜色">
        <div class="color-picker-wrapper">
          <Input v-model="localStyle.color" @on-change="handleChange">
            <template #prepend>
              <colorPicker
                :value="localStyle.color"
                @change="handleColorChange('color', $event)"
              />
            </template>
          </Input>
        </div>
      </FormItem>
      
      <FormItem label="边框">
        <Input v-model="localStyle.border" placeholder="如: 1px solid #e8e8e8" @on-change="handleChange" />
      </FormItem>
      
      <FormItem label="圆角">
        <Input v-model="localStyle.borderRadius" placeholder="如: 4px" @on-change="handleChange" />
      </FormItem>
    </Form>
    
    <Divider>自定义样式</Divider>
    
    <Input
      v-model="customStyle"
      type="textarea"
      :rows="4"
      placeholder="输入自定义 CSS 样式，每行一个属性"
      @on-change="handleCustomStyle"
    />
  </div>
</template>

<script>
export default {
  name: 'StyleEditor',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localStyle: {},
      customStyle: ''
    }
  },
  watch: {
    config: {
      handler(val) {
        this.localStyle = { ...(val.props.style || {}) }
        this.updateCustomStyle()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleChange() {
      this.$emit('update', { ...this.localStyle })
    },
    handleColorChange(key, color) {
      this.localStyle[key] = color
      this.handleChange()
    },
    handleCustomStyle() {
      const lines = this.customStyle.split('\n')
      lines.forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim())
        if (key && value) {
          this.localStyle[key] = value.replace(';', '')
        }
      })
      this.handleChange()
    },
    updateCustomStyle() {
      const lines = []
      Object.keys(this.localStyle).forEach(key => {
        if (!['width', 'height', 'minHeight', 'padding', 'margin', 'backgroundColor', 'fontSize', 'color', 'border', 'borderRadius'].includes(key)) {
          lines.push(`${key}: ${this.localStyle[key]};`)
        }
      })
      this.customStyle = lines.join('\n')
    }
  }
}
</script>

<style lang="scss" scoped>
.style-editor {
  padding: 16px;
  
  :deep(.ivu-form-item) {
    margin-bottom: 12px;
  }
  
  .color-picker-wrapper {
    :deep(.ivu-input-group-prepend) {
      padding: 0 8px;
      
      .color-picker {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
