<template>
  <div class="dev-container" :class="{ 'is-hover': isHover }">
    <div class="dev-container-header">
      <Icon type="ios-grid" size="14" />
      <span>容器</span>
    </div>
    <draggable
      v-model="innerChildren"
      :group="groupConfig"
      :animation="250"
      ghostClass="sortable-ghost"
      chosenClass="sortable-chosen"
      dragClass="sortable-drag"
      handle=".drag-handle"
      class="dev-container-body"
      :class="{ 'is-empty': !innerChildren || innerChildren.length === 0 }"
      @change="onDragChange"
    >
      <component-item
        v-for="(item, index) in innerChildren"
        :key="item.componentId"
        :componentData="item"
        :index="index"
        @remove="removeChild(index)"
        @edit="$emit('edit-component', item)"
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
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { createComponentInstance } from '@/utils/utils'

export default {
  name: 'dev-container',
  components: { draggable },
  props: {
    componentData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isHover: false
    }
  },
  computed: {
    innerChildren: {
      get() {
        return this.componentData.children || []
      },
      set(val) {
        this.$set(this.componentData, 'children', val)
      }
    },
    groupConfig() {
      return {
        name: 'components',
        put: true,
        pull: true
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
    removeChild(index) {
      this.innerChildren.splice(index, 1)
    },
    onDragChange(evt) {
      if (evt.added) {
        const item = evt.added.element
        if (!item.componentId) {
          const instance = createComponentInstance(item)
          this.$set(this.innerChildren, evt.added.newIndex, instance)
        }
      }
    }
  }
}
</script>

<style scoped>
.dev-container {
  min-height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background: rgba(45, 140, 240, 0.02);
  transition: all 0.25s ease;
  padding: 0;
  overflow: hidden;
}

.dev-container.is-hover {
  border-color: #2d8cf0;
  background: rgba(45, 140, 240, 0.04);
}

.dev-container-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(45, 140, 240, 0.06);
  font-size: 12px;
  color: #808695;
  border-bottom: 1px dashed #e8eaec;
}

.dev-container-body {
  min-height: 60px;
  padding: 8px;
}

.dev-container-body.is-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c5c8ce;
  font-size: 13px;
}

.dev-container-body.is-empty::after {
  content: '拖入组件到此容器';
}
</style>
