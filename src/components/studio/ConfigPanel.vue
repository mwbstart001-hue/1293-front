<template>
  <div class="config-panel">
    <div v-if="!activeComponent" class="empty-config">
      <Icon type="ios-information-circle-outline" size="32" />
      <p>请选择一个组件进行配置</p>
    </div>
    
    <template v-else>
      <div class="config-header">
        <h3>
          <Icon :type="getComponentIcon()" />
          {{ activeComponent.name }}
        </h3>
        <Tag size="small" color="primary">{{ activeComponent.tag }}</Tag>
      </div>
      
      <div class="config-content">
        <Tabs v-model="activeTab" size="small">
          <TabPane label="属性配置" name="props">
            <PropsEditor
              :config="activeComponent"
              @update="handlePropsUpdate"
            />
          </TabPane>
          
          <TabPane label="样式配置" name="style">
            <StyleEditor
              :config="activeComponent"
              @update="handleStyleUpdate"
            />
          </TabPane>
          
          <TabPane label="高级配置" name="advanced">
            <AdvancedEditor
              :config="activeComponent"
              @update="handleAdvancedUpdate"
            />
          </TabPane>
        </Tabs>
      </div>
    </template>
  </div>
</template>

<script>
import PropsEditor from './editors/PropsEditor.vue'
import StyleEditor from './editors/StyleEditor.vue'
import AdvancedEditor from './editors/AdvancedEditor.vue'
import { componentList } from '@/plugins/components'

export default {
  name: 'ConfigPanel',
  components: {
    PropsEditor,
    StyleEditor,
    AdvancedEditor
  },
  props: {
    activeComponent: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTab: 'props'
    }
  },
  methods: {
    getComponentIcon() {
      const comp = componentList.find(c => c.tag === this.activeComponent.tag)
      return comp ? comp.icon : 'ios-cube-outline'
    },
    handlePropsUpdate(key, value) {
      const updated = this.$utils.deepClone(this.activeComponent)
      updated.props[key] = value
      this.$emit('update', updated)
    },
    handleStyleUpdate(styles) {
      const updated = this.$utils.deepClone(this.activeComponent)
      updated.props.style = styles
      this.$emit('update', updated)
    },
    handleAdvancedUpdate(config) {
      const updated = this.$utils.deepClone(this.activeComponent)
      Object.assign(updated, config)
      this.$emit('update', updated)
    }
  }
}
</script>

<style lang="scss" scoped>
.config-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  
  .empty-config {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #c5c8ce;
    
    p {
      margin-top: 12px;
      font-size: 14px;
    }
  }
  
  .config-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #e8e8e8;
    
    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #17233d;
    }
  }
  
  .config-content {
    flex: 1;
    overflow-y: auto;
    
    :deep(.ivu-tabs) {
      height: 100%;
    }
    
    :deep(.ivu-tabs-content) {
      height: calc(100% - 32px);
      overflow-y: auto;
    }
  }
}
</style>
