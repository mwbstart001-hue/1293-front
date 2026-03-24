<template>
  <StudioEditor ref="editor" />
</template>

<script>
import StudioEditor from './views/StudioEditor.vue'

export default {
  name: 'App',
  components: {
    StudioEditor
  },
  methods: {
    // 对外暴露获取JSON树的方法
    getCanvasJsonTree() {
      return this.$refs.editor.getCanvasJson()
    }
  },
  mounted() {
    // 将方法挂载到window，方便调试
    window.getCanvasJson = this.getCanvasJsonTree
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
