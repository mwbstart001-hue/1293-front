<template>
  <Modal
    v-model="visible"
    title="页面真实预览"
    width="90"
    :footer-hide="true"
    class-name="preview-modal"
  >
    <div class="preview-container">
      <div class="preview-toolbar">
        <RadioGroup v-model="viewMode" type="button" size="small">
          <Radio label="pc">
            <Icon type="ios-desktop" />
            <span>PC 视图</span>
          </Radio>
          <Radio label="h5">
            <Icon type="ios-phone-portrait" />
            <span>H5 视图</span>
          </Radio>
        </RadioGroup>
        <div class="toolbar-tip">渲染引擎：运行时组件 (Runtime)</div>
      </div>

      <div class="preview-body" :class="'mode-' + viewMode">
        <div class="preview-content">
          <!-- 递归渲染运行时组件 -->
          <div v-for="item in layout" :key="item.componentId" class="preview-item">
            <component
              :is="getFinalTag(item)"
              v-if="item.componentType === 'container'"
              :componentData="item"
            />
            <component
              :is="item.tag"
              v-else
              v-bind="item.props || {}"
            />
          </div>
          <div v-if="layout.length === 0" class="preview-empty">
            无渲染内容
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'PreviewModal',
  data() {
    return {
      visible: false,
      layout: [],
      viewMode: 'pc'
    }
  },
  methods: {
    show(layoutData, mode = 'pc') {
      this.layout = layoutData
      this.viewMode = mode
      this.visible = true
    },
    getFinalTag(item) {
      // 预览时使用 runtime 容器，而不是 dev-容器
      if (item.componentType === 'container') {
        return 'container'
      }
      return item.tag
    }
  }
}
</script>

<style scoped>
.preview-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  background: #f8f8f9;
}

.preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid #e8eaec;
}

.toolbar-tip {
  font-size: 12px;
  color: #999;
}

.preview-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.preview-content {
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.mode-pc .preview-content {
  width: 100%;
  min-height: 100%;
  padding: 24px;
}

.mode-h5 .preview-content {
  width: 375px;
  height: 667px;
  padding: 0;
  overflow-y: auto;
  border: 12px solid #2c2c2e;
  border-radius: 36px;
  position: relative;
}

.mode-h5 .preview-content::-webkit-scrollbar {
  display: none;
}

.preview-item {
  margin-bottom: 10px;
}

.preview-empty {
  text-align: center;
  padding: 50px;
  color: #c5c8ce;
}

:deep(.preview-modal .ivu-modal-body) {
  padding: 0;
}
</style>
