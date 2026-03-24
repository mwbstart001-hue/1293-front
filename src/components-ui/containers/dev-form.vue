<template>
  <div class="dev-form" :style="formStyle">
    <div class="form-title" v-if="showTitle">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DevForm',
  props: {
    title: {
      type: String,
      default: '表单'
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    padding: {
      type: String,
      default: '16px'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formStyle() {
      return {
        padding: this.padding,
        border: '1px dashed #ccc',
        borderRadius: '4px',
        minHeight: '100px'
      }
    }
  }
}
</script>

<style scoped>
.dev-form {
  box-sizing: border-box;
  background: #fafafa;
}
.form-title {
  font-size: 14px;
  font-weight: bold;
  color: #666;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
</style>
