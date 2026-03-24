<template>
  <div class="studio-panel">
    <div class="panel-header">
      <span class="panel-title">属性配置</span>
    </div>
    
    <div class="panel-content" v-if="selectedComponent">
      <div class="form-item">
        <label>组件类型</label>
        <Input :value="selectedComponent.name || selectedComponent.tag" disabled />
      </div>
      
      <div class="form-item">
        <label>组件ID</label>
        <Input :value="selectedComponent.componentId" disabled />
      </div>
      
      <div 
        v-for="(value, key) in selectedComponent.props" 
        :key="key"
        class="form-item"
      >
        <label>{{ getPropLabel(key) }}</label>
        <Input 
          v-if="typeof value === 'string' && !isImageProp(key)"
          :value="value"
          @input="(newVal) => updateProp(key, newVal)"
        />
        <InputNumber 
          v-else-if="typeof value === 'number'"
          :value="value"
          @input="(newVal) => updateProp(key, newVal)"
        />
        <i-switch 
          v-else-if="typeof value === 'boolean'"
          :value="value"
          @change="(newVal) => updateProp(key, newVal)"
        />
        <div v-else-if="isImageProp(key)" class="image-input">
          <img :src="value" alt="" class="prop-image" />
          <Input 
            :value="value"
            @input="(newVal) => updateProp(key, newVal)"
            placeholder="输入图片地址"
          />
        </div>
        <div v-else-if="Array.isArray(value)" class="array-editor">
          <div 
            v-for="(item, idx) in value" 
            :key="idx"
            class="array-item"
          >
            <Input 
              :value="item.label"
              placeholder="标签"
              @input="(newVal) => updateArrayItem(key, idx, 'label', newVal)"
            />
            <Input 
              :value="item.value"
              placeholder="值"
              @input="(newVal) => updateArrayItem(key, idx, 'value', newVal)"
            />
            <Button 
              type="text" 
              size="small" 
              @click="removeArrayItem(key, idx)"
            >
              <Icon type="md-close" />
            </Button>
          </div>
          <Button size="small" @click="addArrayItem(key)" class="add-btn">
            <Icon type="md-add" /> 添加选项
          </Button>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-panel">
      <Icon type="md-cube" size="48" />
      <p>请选择一个组件</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudioPanel',
  props: {
    selectedComponent: {
      type: Object,
      default: null
    }
  },
  methods: {
    getPropLabel(key) {
      const labels = {
        text: '文本内容',
        type: '类型',
        size: '尺寸',
        placeholder: '占位文本',
        width: '宽度',
        content: '内容',
        fontSize: '字体大小',
        color: '颜色',
        src: '图片地址',
        height: '高度',
        options: '选项列表',
        value: '默认值',
        title: '标题',
        padding: '内边距',
        background: '背景色',
        border: '边框',
        labelWidth: '标签宽度',
        labelPosition: '标签位置'
      }
      return labels[key] || key
    },
    isImageProp(key) {
      return ['src', 'image', 'icon'].includes(key)
    },
    updateProp(key, value) {
      this.$emit('update', {
        componentId: this.selectedComponent.componentId,
        key,
        value
      })
    },
    updateArrayItem(arrayKey, index, key, value) {
      const newArray = [...this.selectedComponent.props[arrayKey]]
      newArray[index][key] = value
      this.updateProp(arrayKey, newArray)
    },
    addArrayItem(key) {
      const newArray = [...this.selectedComponent.props[key]]
      newArray.push({ label: '新选项', value: String(newArray.length + 1) })
      this.updateProp(key, newArray)
    },
    removeArrayItem(key, index) {
      const newArray = this.selectedComponent.props[key].filter((_, idx) => idx !== index)
      this.updateProp(key, newArray)
    }
  }
}
</script>

<style scoped>
.studio-panel {
  width: 100%;
  height: 100%;
  background: #fff;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
}

.panel-header {
  height: 50px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.panel-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}

.image-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.prop-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}

.array-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.array-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.array-item .ivu-input {
  flex: 1;
}

.add-btn {
  width: 100%;
  margin-top: 4px;
}

.empty-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  gap: 12px;
}

.empty-panel p {
  font-size: 14px;
  margin: 0;
}
</style>
