<template>
  <div class="dev-button-wrapper" :style="wrapperStyle">
    <Button :type="type" :size="size" :long="long">{{ text }}</Button>
  </div>
</template>

<script>
export default {
  name: 'DevButton',
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'medium'
    },
    long: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wrapperStyle() {
      return {
        display: 'inline-block',
        padding: '8px'
      }
    }
  }
}
</script>

<style scoped>
.dev-button-wrapper {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
