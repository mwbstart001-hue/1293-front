<template>
  <div class="runtime-container">
    <draggable
      v-model="innerChildren"
      :group="groupConfig"
      :animation="200"
      class="container-drop-zone"
      :class="{ 'is-empty': !innerChildren || innerChildren.length === 0 }"
    >
      <div v-for="item in innerChildren" :key="item.componentId" class="container-child">
        <component
          :is="item.tag"
          v-if="item.componentType === 'container'"
          :componentData="item"
        />
        <component
          :is="item.tag"
          v-else
          v-bind="item.props || {}"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'container',
  components: { draggable },
  props: {
    componentData: {
      type: Object,
      default: () => ({})
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
  }
}
</script>

<style scoped>
.runtime-container {
  min-height: 50px;
  padding: 8px;
  border: 1px solid #e8eaec;
  border-radius: 4px;
  background: rgba(45, 140, 240, 0.02);
}

.container-drop-zone {
  min-height: 40px;
}

.container-drop-zone.is-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #dcdee2;
  border-radius: 4px;
  color: #999;
  font-size: 13px;
  min-height: 60px;
}

.container-drop-zone.is-empty::after {
  content: '拖入组件到此容器';
}

.container-child {
  margin-bottom: 4px;
}

.container-child:last-child {
  margin-bottom: 0;
}
</style>
