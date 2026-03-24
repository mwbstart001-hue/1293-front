<template>
  <div
    class="component-item-wrapper"
    :class="{
      'is-hover': isHover,
      'is-selected': isSelected,
      'is-container': isContainer
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click.stop="handleClick"
  >
    <!-- 拖拽锚点 - 仅在选择时显示 -->
    <div
      v-if="isSelected"
      class="drag-anchor"
      @mousedown.stop="handleDragStart"
    >
      <Icon type="md-move" size="14" color="#fff" />
    </div>

    <!-- 组件标题栏 -->
    <div v-if="isHover || isSelected" class="component-header">
      <span class="component-title">{{ componentName }}</span>
      <div class="component-actions">
        <Tooltip content="编辑" placement="top" transfer>
          <Icon
            type="md-create"
            size="16"
            class="action-icon"
            @click.stop="handleEdit"
          />
        </Tooltip>
        <Tooltip content="删除" placement="top" transfer>
          <Icon
            type="md-trash"
            size="16"
            class="action-icon delete"
            @click.stop="handleDelete"
          />
        </Tooltip>
      </div>
    </div>

    <!-- 组件内容 -->
    <div class="component-content">
      <component
        :is="devComponentName"
        v-bind="componentData.props"
      >
        <!-- 容器组件递归渲染子组件 -->
        <template v-if="isContainer && componentData.children">
          <draggable
            v-model="componentData.children"
            :group="{ name: 'components', pull: true, put: true }"
            class="nested-drop-zone"
            :class="{ 'is-empty': isEmptyContainer }"
            @add="handleChildAdd"
          >
            <ComponentItem
              v-for="(child, index) in componentData.children"
              :key="child.componentId"
              :component-data="child"
              :index="index"
              :parent-path="currentPath"
              @select="handleChildSelect"
              @delete="handleChildDelete"
              @update="handleChildUpdate"
            />
            <div v-if="isEmptyContainer" class="empty-placeholder">
              <Icon type="ios-add-circle" size="24" />
              <span>拖拽组件到此处</span>
            </div>
          </draggable>
        </template>
      </component>
    </div>

    <!-- 选中边框 -->
    <div v-if="isSelected" class="selection-border"></div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { getComponentConfig } from '@/config/componentConfig'

export default {
  name: 'ComponentItem',
  components: {
    draggable
  },
  props: {
    componentData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    parentPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isHover: false,
      isSelected: false
    }
  },
  computed: {
    devComponentName() {
      return this.componentData.devTag || `Dev${this.componentData.tag}`
    },
    componentName() {
      const config = getComponentConfig(this.componentData.tag)
      return config ? config.name : this.componentData.tag
    },
    isContainer() {
      return this.componentData.componentType === 'container'
    },
    isEmptyContainer() {
      return this.isContainer && (!this.componentData.children || this.componentData.children.length === 0)
    },
    currentPath() {
      return this.parentPath
        ? `${this.parentPath}.children.${this.index}`
        : `${this.index}`
    }
  },
  mounted() {
    this.$on('select', this.onParentSelect)
  },
  beforeDestroy() {
    this.$off('select', this.onParentSelect)
  },
  methods: {
    handleMouseEnter() {
      this.isHover = true
    },
    handleMouseLeave() {
      this.isHover = false
    },
    handleClick() {
      this.isSelected = true
      this.$emit('select', this.currentPath, this.componentData)
    },
    onParentSelect(path) {
      // 如果选中的不是当前组件，取消选中状态
      if (!path.startsWith(this.currentPath)) {
        this.isSelected = false
      }
    },
    handleEdit() {
      this.$emit('select', this.currentPath, this.componentData)
    },
    handleDelete() {
      this.$emit('delete', this.currentPath, this.componentData)
    },
    handleDragStart(e) {
      // 开始拖拽
      this.$emit('dragstart', {
        path: this.currentPath,
        component: this.componentData,
        event: e
      })
    },
    handleChildAdd(evt) {
      this.$emit('update', {
        path: this.currentPath,
        component: this.componentData
      })
    },
    handleChildSelect(path, data) {
      this.$emit('select', path, data)
    },
    handleChildDelete(path, data) {
      this.$emit('delete', path, data)
    },
    handleChildUpdate(data) {
      this.$emit('update', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.component-item-wrapper {
  position: relative;
  margin: 4px 0;
  transition: all 0.2s ease;

  &.is-hover {
    .component-content {
      box-shadow: 0 0 0 1px #1890ff;
    }
  }

  &.is-selected {
    .component-content {
      box-shadow: 0 0 0 2px #1890ff;
    }
  }

  .drag-anchor {
    position: absolute;
    top: -12px;
    left: -12px;
    width: 24px;
    height: 24px;
    background: #1890ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.4);

    &:hover {
      transform: scale(1.1);
    }
  }

  .component-header {
    position: absolute;
    top: -28px;
    left: 0;
    height: 28px;
    background: #1890ff;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
    padding: 0 8px;
    z-index: 99;
    white-space: nowrap;

    .component-title {
      font-size: 12px;
      color: #fff;
      margin-right: 12px;
    }

    .component-actions {
      display: flex;
      gap: 8px;

      .action-icon {
        color: #fff;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }

        &.delete:hover {
          color: #ff4d4f;
        }
      }
    }
  }

  .component-content {
    position: relative;
    border-radius: 4px;
    transition: box-shadow 0.2s ease;

    .nested-drop-zone {
      min-height: 60px;
      padding: 8px;
      border-radius: 4px;
      transition: all 0.2s ease;

      &.is-empty {
        border: 2px dashed #d9d9d9;
        display: flex;
        align-items: center;
        justify-content: center;

        .empty-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #bfbfbf;
          gap: 8px;

          span {
            font-size: 12px;
          }
        }
      }
    }
  }

  .selection-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: 4px;
  }
}
</style>
