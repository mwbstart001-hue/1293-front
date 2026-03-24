<template>
  <draggable
    class="nested-canvas"
    :list="localComponents"
    group="components"
    :animation="150"
    ghost-class="ghost-component"
    @add="handleAdd"
  >
    <template v-for="(item, index) in localComponents">
      <ComponentItem
        :key="item.componentId"
        :config="item"
        :active="activeComponentId === item.componentId"
        @click.native.stop="$emit('component-click', item)"
        @delete="$emit('component-delete', $event)"
        @copy="handleCopy($event, index)"
      >
        <template v-if="item.componentType === 'container' && item.children">
          <NestedCanvas
            :components="item.children"
            :parent-id="item.componentId"
            :active-component-id="activeComponentId"
            @component-click="$emit('component-click', $event)"
            @component-delete="$emit('component-delete', $event)"
          />
        </template>
      </ComponentItem>
    </template>
    
    <div v-if="localComponents.length === 0" class="empty-nested">
      <Icon type="ios-add-circle-outline" size="20" />
      <span>拖入子组件</span>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import ComponentItem from './ComponentItem.vue'

export default {
  name: 'NestedCanvas',
  components: {
    draggable,
    ComponentItem
  },
  props: {
    components: {
      type: Array,
      default: () => []
    },
    parentId: {
      type: String,
      default: ''
    },
    activeComponentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localComponents: this.components
    }
  },
  watch: {
    components: {
      handler(val) {
        this.localComponents = val
      },
      deep: true
    }
  },
  methods: {
    handleAdd() {
      this.$emit('update:components', this.localComponents)
    },
    handleCopy(copiedItem, index) {
      this.localComponents.splice(index + 1, 0, copiedItem)
      this.$emit('update:components', this.localComponents)
    }
  }
}
</script>

<style lang="scss" scoped>
.nested-canvas {
  min-height: 60px;
  padding: 8px;
  border: 1px dashed #e8e8e8;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.01);
  
  .empty-nested {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    color: #c5c8ce;
    
    span {
      margin-top: 4px;
      font-size: 12px;
    }
  }
  
  .ghost-component {
    opacity: 0.5;
    background: #e8f4ff;
    border: 2px dashed #2d8cf0;
    border-radius: 4px;
  }
}
</style>
