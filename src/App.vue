<template>
  <div id="app">
    <LowCodeEditor ref="editor" />
  </div>
</template>

<script>
import LowCodeEditor from './components/LowCodeEditor.vue'

export default {
  name: 'App',
  components: {
    LowCodeEditor
  },
  mounted() {
    window.getCanvasJson = () => {
      return this.$refs.editor.getCanvasJson()
    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/global.scss';

#app {
  width: 100%;
  height: 100%;
}
</style>
