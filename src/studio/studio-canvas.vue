<template>
  <div class="studio-canvas">
    <div class="canvas-toolbar">
      <RadioGroup v-model="deviceType" type="button" size="small">
        <Radio label="pc">
          <Icon type="md-desktop" />
          <span>PC</span>
        </Radio>
        <Radio label="h5">
          <Icon type="md-phone-portrait" />
          <span>H5</span>
        </Radio>
      </RadioGroup>
    </div>
    
    <div class="canvas-wrapper" :class="deviceType">
      <div class="canvas-content" :style="canvasStyle">
        <componentItem
          v-for="(item, index) in componentList"
          :key="item.componentId"
          :component="item"
          :index="index"
          :is-selected="selectedId === item.componentId"
          @select="selectComponent"
          @delete="deleteComponent"
          @update="updateComponent"
        >
          <component :is="getComponentName(item.tag)" v-bind="item.props" />
        </componentItem>
        
        <div v-if="componentList.length === 0" class="empty-tip">
          <Icon type="md-add-circle-outline" size="48" />
          <p>拖拽左侧组件到此处</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import componentItem from './studio-componentItem.vue'
import { runtimeComponentMap } from '../components-ui'

export default {
  name: 'StudioCanvas',
  components: {
    draggable,
    componentItem
  },
  props: {
    componentList: {
      type: Array,
      default: () => []
    },
    selectedId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      deviceType: 'pc'
    }
  },
  computed: {
    canvasStyle() {
      return {
        minHeight: '100%'
      }
    }
  },
  methods: {
    getComponentName(tag) {
      return runtimeComponentMap[tag] || tag
    },
    selectComponent(component) {
      this.$emit('select', component)
    },
    deleteComponent(componentId) {
      this.$emit('delete', componentId)
    },
    updateComponent(data) {
      this.$emit('update', data)
    }
  }
}
</script>

<style scoped>
.studio-canvas {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.canvas-toolbar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.canvas-wrapper {
  flex: 1;
  overflow: auto;
  padding: 24px;
  display: flex;
  justify-content: center;
}

.canvas-wrapper.pc .canvas-content {
  width: 1200px;
  min-height: 600px;
}

.canvas-wrapper.h5 .canvas-content {
  width: 375px;
  min-height: 667px;
}

.canvas-content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  position: relative;
  transition: all 0.3s;
}

.empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #999;
  gap: 12px;
}

.empty-tip p {
  font-size: 14px;
  margin: 0;
}
</style>
