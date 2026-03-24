<template>
  <div class="preview-canvas">
    <div class="preview-toolbar">
      <RadioGroup v-model="previewMode" type="button" size="small">
        <Radio label="pc">
          <Icon type="md-desktop" />
          PC端
        </Radio>
        <Radio label="h5">
          <Icon type="md-phone-portrait" />
          H5端
        </Radio>
      </RadioGroup>
    </div>
    
    <div class="preview-wrapper" :class="previewMode + '-mode'">
      <div class="preview-content">
        <template v-for="item in componentTree">
          <RenderComponent :key="item.componentId" :config="item" />
        </template>
        
        <div v-if="componentTree.length === 0" class="empty-preview">
          <Icon type="ios-document-outline" size="48" />
          <p>暂无组件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RenderComponent from './RenderComponent.vue'

export default {
  name: 'PreviewCanvas',
  components: {
    RenderComponent
  },
  props: {
    componentTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      previewMode: 'pc'
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-canvas {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  
  .preview-toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
  }
  
  .preview-wrapper {
    flex: 1;
    overflow: auto;
    display: flex;
    justify-content: center;
    padding: 24px;
    
    &.pc-mode {
      .preview-content {
        width: 100%;
        max-width: 1200px;
      }
    }
    
    &.h5-mode {
      .preview-content {
        width: 375px;
        min-height: 667px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
      }
    }
    
    .preview-content {
      background: #fff;
      padding: 16px;
      border-radius: 8px;
    }
  }
  
  .empty-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    color: #c5c8ce;
    
    p {
      margin-top: 16px;
      font-size: 14px;
    }
  }
}
</style>
