<template>
  <div class="studio-component-menu">
    <div class="menu-header">
      <h3>组件库</h3>
      <Input v-model="searchKeyword" placeholder="搜索组件" size="small" prefix="ios-search" clearable />
    </div>
    
    <div class="menu-content">
      <Collapse v-model="activeCollapse" simple>
        <Panel name="container">
          <span class="panel-title">
            <Icon type="ios-folder-outline" />
            容器组件
          </span>
          <template #content>
            <draggable
              class="component-list"
              :list="filteredContainerComponents"
              :group="{ name: 'components', pull: 'clone', put: false }"
              :clone="cloneComponent"
              :sort="false"
              :animation="150"
              ghost-class="ghost-item"
              drag-class="drag-item"
            >
              <div
                v-for="item in filteredContainerComponents"
                :key="item.tag"
                class="component-item"
              >
                <div class="item-icon">
                  <Icon :type="item.icon" size="20" />
                </div>
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-tag">{{ item.tag }}</span>
                </div>
              </div>
            </draggable>
          </template>
        </Panel>
        
        <Panel name="basic">
          <span class="panel-title">
            <Icon type="ios-apps-outline" />
            基础组件
          </span>
          <template #content>
            <draggable
              class="component-list"
              :list="filteredBasicComponents"
              :group="{ name: 'components', pull: 'clone', put: false }"
              :clone="cloneComponent"
              :sort="false"
              :animation="150"
              ghost-class="ghost-item"
              drag-class="drag-item"
            >
              <div
                v-for="item in filteredBasicComponents"
                :key="item.tag"
                class="component-item"
              >
                <div class="item-icon">
                  <Icon :type="item.icon" size="20" />
                </div>
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-tag">{{ item.tag }}</span>
                </div>
              </div>
            </draggable>
          </template>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { containerComponents, basicComponents, createComponentConfig } from '@/plugins/components'

export default {
  name: 'StudioComponentMenu',
  components: {
    draggable
  },
  data() {
    return {
      searchKeyword: '',
      activeCollapse: ['container', 'basic'],
      containerComponents,
      basicComponents
    }
  },
  computed: {
    filteredContainerComponents() {
      if (!this.searchKeyword) return this.containerComponents
      return this.containerComponents.filter(item =>
        item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        item.tag.toLowerCase().includes(this.searchKeyword.toLowerCase())
      )
    },
    filteredBasicComponents() {
      if (!this.searchKeyword) return this.basicComponents
      return this.basicComponents.filter(item =>
        item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        item.tag.toLowerCase().includes(this.searchKeyword.toLowerCase())
      )
    }
  },
  methods: {
    cloneComponent(item) {
      const config = createComponentConfig(item)
      config.componentId = this.$utils.generateId()
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
.studio-component-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  
  .menu-header {
    padding: 16px;
    border-bottom: 1px solid #e8e8e8;
    
    h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
      color: #17233d;
    }
  }
  
  .menu-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
    
    .panel-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
    }
    
    :deep(.ivu-collapse-content) {
      padding: 0;
    }
  }
  
  .component-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 12px;
  }
  
  .component-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 8px;
    background: #f7f8fa;
    border-radius: 6px;
    cursor: grab;
    transition: all 0.2s ease;
    
    &:hover {
      background: #e8f4ff;
      box-shadow: 0 2px 8px rgba(45, 140, 240, 0.15);
      transform: translateY(-1px);
    }
    
    &:active {
      cursor: grabbing;
    }
    
    .item-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 6px;
      color: #2d8cf0;
    }
    
    .item-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      
      .item-name {
        font-size: 12px;
        font-weight: 500;
        color: #17233d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .item-tag {
        font-size: 10px;
        color: #808695;
      }
    }
  }
  
  .ghost-item {
    opacity: 0.5;
    background: #e8f4ff;
  }
  
  .drag-item {
    opacity: 0.8;
    transform: rotate(3deg);
  }
}
</style>
