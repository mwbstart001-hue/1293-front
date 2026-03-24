<template>
  <div class="page-canvas">
    <!-- 画布工具栏 -->
    <div class="canvas-toolbar">
      <div class="device-switch">
        <Tooltip content="PC 模式" placement="bottom" transfer>
          <div
            class="device-btn"
            :class="{ active: deviceType === 'pc' }"
            @click="switchDevice('pc')"
          >
            <Icon type="ios-desktop" size="20" />
          </div>
        </Tooltip>
        <Tooltip content="H5 模式" placement="bottom" transfer>
          <div
            class="device-btn"
            :class="{ active: deviceType === 'h5' }"
            @click="switchDevice('h5')"
          >
            <Icon type="ios-phone-portrait" size="20" />
          </div>
        </Tooltip>
      </div>
      <div class="canvas-scale">
        <span>{{ Math.round(scale * 100) }}%</span>
        <Slider v-model="sliderScale" :min="50" :max="150" :step="10" style="width: 120px; margin-left: 12px;" />
      </div>
    </div>

    <!-- 画布区域 -->
    <div class="canvas-wrapper" @click="handleCanvasClick">
      <div
        class="canvas-content"
        :class="[`device-${deviceType}`]"
        :style="canvasStyle"
      >
        <draggable
          v-model="canvasComponents"
          :group="{ name: 'components', pull: true, put: true }"
          class="canvas-drop-zone"
          :class="{ 'is-empty': isEmpty }"
          @add="handleAdd"
          @update="handleUpdate"
        >
          <ComponentItem
            v-for="(component, index) in canvasComponents"
            :key="component.componentId"
            :component-data="component"
            :index="index"
            @select="handleSelect"
            @delete="handleDelete"
            @update="handleItemUpdate"
          />
          <div v-if="isEmpty" class="empty-state">
            <Icon type="ios-add-circle-outline" size="48" />
            <p>从左侧拖拽组件到画布</p>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ComponentItem from './ComponentItem.vue'
import { generateUUID } from '@/utils/uuid'

export default {
  name: 'PageCanvas',
  components: {
    draggable,
    ComponentItem
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      deviceType: 'pc',
      scale: 1,
      sliderScale: 100,
      selectedPath: null,
      selectedComponent: null
    }
  },
  computed: {
    canvasComponents: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    isEmpty() {
      return this.canvasComponents.length === 0
    },
    canvasStyle() {
      const deviceWidth = this.deviceType === 'pc' ? 1200 : 375
      return {
        width: `${deviceWidth}px`,
        transform: `scale(${this.scale})`,
        transformOrigin: 'top center'
      }
    }
  },
  watch: {
    sliderScale(val) {
      this.scale = val / 100
    }
  },
  methods: {
    switchDevice(type) {
      this.deviceType = type
      this.$emit('device-change', type)
    },
    handleAdd(evt) {
      // 新添加的组件
      const newComponent = this.canvasComponents[evt.newIndex]
      if (newComponent && newComponent._isClone) {
        // 生成新的 UUID
        newComponent.componentId = generateUUID()
        delete newComponent._isClone
      }
      this.$emit('change', this.canvasComponents)
    },
    handleUpdate() {
      this.$emit('change', this.canvasComponents)
    },
    handleItemUpdate(data) {
      this.$emit('change', this.canvasComponents)
    },
    handleSelect(path, component) {
      this.selectedPath = path
      this.selectedComponent = component
      this.$emit('select', path, component)
    },
    handleDelete(path, component) {
      const indices = path.split('.').filter((_, i) => i % 2 === 0).map(Number)
      this.removeComponentByPath(this.canvasComponents, indices)
      this.$emit('change', this.canvasComponents)
      if (this.selectedPath === path) {
        this.selectedPath = null
        this.selectedComponent = null
        this.$emit('select', null, null)
      }
    },
    removeComponentByPath(components, indices) {
      if (indices.length === 1) {
        components.splice(indices[0], 1)
      } else {
        const [first, ...rest] = indices
        if (components[first] && components[first].children) {
          this.removeComponentByPath(components[first].children, rest)
        }
      }
    },
    handleCanvasClick() {
      // 点击画布空白处取消选中
      this.selectedPath = null
      this.selectedComponent = null
      this.$emit('select', null, null)
    },
    // 获取画布 JSON 树
    getCanvasJson() {
      return JSON.parse(JSON.stringify(this.canvasComponents))
    }
  }
}
</script>

<style lang="scss" scoped>
.page-canvas {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f0f2f5;

  .canvas-toolbar {
    height: 48px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    gap: 24px;

    .device-switch {
      display: flex;
      gap: 8px;

      .device-btn {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        color: #666;

        &:hover {
          background: #f5f5f5;
        }

        &.active {
          background: #e6f7ff;
          color: #1890ff;
        }
      }
    }

    .canvas-scale {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 14px;
    }
  }

  .canvas-wrapper {
    flex: 1;
    overflow: auto;
    padding: 24px;
    display: flex;
    justify-content: center;

    .canvas-content {
      background: #fff;
      min-height: 800px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      &.device-pc {
        width: 1200px;
      }

      &.device-h5 {
        width: 375px;
      }

      .canvas-drop-zone {
        min-height: 800px;
        padding: 20px;

        &.is-empty {
          display: flex;
          align-items: center;
          justify-content: center;

          .empty-state {
            text-align: center;
            color: #bfbfbf;

            p {
              margin-top: 16px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
