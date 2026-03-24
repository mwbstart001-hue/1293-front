<template>
  <div class="studio-component-menu">
    <div class="menu-header">
      <span class="menu-title">组件列表</span>
    </div>
    
    <div class="component-group">
      <div class="group-title">
        <Icon type="md-folder-open" />
        <span>容器组件</span>
      </div>
      <draggable
        v-model="containerList"
        :sort="false"
        :group="{ name: 'components', pull: 'clone', put: false }"
        :clone="cloneComponent"
        item-key="tag"
      >
        <template #item="{ element }">
          <div class="component-item">
            <Icon :type="element.icon" size="20" />
            <span>{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>

    <div class="component-group">
      <div class="group-title">
        <Icon type="md-cube" />
        <span>基础组件</span>
      </div>
      <draggable
        v-model="basicList"
        :sort="false"
        :group="{ name: 'components', pull: 'clone', put: false }"
        :clone="cloneComponent"
        item-key="tag"
      >
        <template #item="{ element }">
          <div class="component-item">
            <Icon :type="element.icon" size="20" />
            <span>{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { containerComponents, basicComponents } from '../config/components-config'

export default {
  name: 'StudioComponentMenu',
  components: {
    draggable
  },
  data() {
    return {
      containerList: containerComponents,
      basicList: basicComponents
    }
  },
  methods: {
    cloneComponent(component) {
      return {
        ...component,
        __clone: true
      }
    }
  }
}
</script>

<style scoped>
.studio-component-menu {
  width: 100%;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
}

.menu-header {
  height: 50px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
}

.menu-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.component-group {
  padding: 12px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
  padding-left: 4px;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  cursor: move;
  transition: all 0.2s;
}

.component-item:hover {
  background: #e3f2fd;
  border-color: #2196f3;
  color: #2196f3;
}

.component-item:active {
  cursor: grabbing;
}
</style>
