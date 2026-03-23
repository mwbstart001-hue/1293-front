<template>
  <div class="page-canvas" :class="{ 'is-mobile': mode === 'h5' }">
    <div class="canvas-wrapper">
      <div class="canvas-body" :class="'mode-' + mode" ref="canvasBody">
        <draggable
          v-model="layout"
          :group="groupConfig"
          :animation="250"
          ghostClass="sortable-ghost"
          chosenClass="sortable-chosen"
          dragClass="sortable-drag"
          handle=".drag-handle"
          class="canvas-drop-zone"
          :class="{ 'is-empty': layout.length === 0 }"
          @change="onDragChange"
        >
          <component-item
            v-for="(item, index) in layout"
            :key="item.componentId"
            :componentData="item"
            :index="index"
            @remove="removeComponent(index)"
            @edit="editComponent(item)"
          >
            <component
              :is="getComponentTag(item)"
              v-if="item.componentType === 'container'"
              :componentData="item"
            />
            <component
              :is="item.tag"
              v-else
              v-bind="item.props || {}"
            />
          </component-item>
        </draggable>

        <!-- 空状态提示 -->
        <div v-if="layout.length === 0" class="empty-tip">
          <Icon type="ios-cloud-upload-outline" size="48" color="#c5c8ce" />
          <p>从左侧拖入组件开始设计页面</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ComponentItem from './componentItem.vue'
import { createComponentInstance, deepClone } from '@/utils/utils'

export default {
  name: 'PageCanvas',
  components: {
    draggable,
    ComponentItem
  },
  props: {
    mode: {
      type: String,
      default: 'pc',
      validator: v => ['pc', 'h5'].includes(v)
    }
  },
  data() {
    return {
      layout: []
    }
  },
  computed: {
    groupConfig() {
      return {
        name: 'components',
        put: true,
        pull: false
      }
    }
  },
  methods: {
    getComponentTag(item) {
      if (item.componentType === 'container') {
        return 'dev-' + item.tag.replace('dev-', '')
      }
      return item.tag
    },
    onDragChange(evt) {
      if (evt.added) {
        const item = evt.added.element
        if (!item.componentId) {
          const instance = createComponentInstance(item)
          this.$set(this.layout, evt.added.newIndex, instance)
        }
      }
      this.$emit('layout-change', deepClone(this.layout))
    },
    removeComponent(index) {
      this.layout.splice(index, 1)
      this.$emit('layout-change', deepClone(this.layout))
    },
    editComponent(item) {
      this.$emit('edit-component', item)
    },
    /**
     * 获取画布中的布局 JSON 树
     * @returns {{ layout: Array }}
     */
    getLayoutJson() {
      return {
        layout: deepClone(this.layout)
      }
    },
    /**
     * 设置布局数据
     * @param {Array} data
     */
    setLayout(data) {
      this.layout = deepClone(data)
    },
    /**
     * 清空画布
     */
    clearLayout() {
      this.layout = []
      this.$emit('layout-change', [])
    }
  }
}
</script>

<style scoped>
.page-canvas {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: var(--bg-canvas);
  overflow: auto;
  padding: 24px;
}

.canvas-wrapper {
  width: 100%;
  max-width: 100%;
  transition: all var(--transition-normal);
}

.is-mobile .canvas-wrapper {
  max-width: 375px;
}

.canvas-body {
  background: var(--bg-canvas-inner);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  min-height: 500px;
  padding: 16px;
  position: relative;
  transition: all var(--transition-normal);
}

.canvas-body.mode-pc {
  width: 100%;
  min-height: calc(100vh - 200px);
}

.canvas-body.mode-h5 {
  width: 375px;
  min-height: 667px;
  margin: 0 auto;
  border-radius: 24px;
  border: 8px solid #2c2c2e;
  box-shadow: 0 0 0 2px #1a1a1c, var(--shadow-lg);
  position: relative;
}

.canvas-body.mode-h5::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #3a3a3c;
  border-radius: 2px;
  z-index: 5;
}

.canvas-body.mode-h5 .canvas-drop-zone {
  padding-top: 16px;
}

.canvas-drop-zone {
  min-height: 200px;
  padding: 4px;
}

.canvas-drop-zone.is-empty {
  min-height: 300px;
}

.empty-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  user-select: none;
}

.empty-tip p {
  margin-top: 12px;
  font-size: 14px;
  color: #c5c8ce;
  letter-spacing: 0.5px;
}
</style>
