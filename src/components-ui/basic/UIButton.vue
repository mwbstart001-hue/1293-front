<template>
  <Button :type="type" :size="size" :style="styleConfig">{{ text }}</Button>
</template>

<script>
export default {
  name: 'UIButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: '按钮'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
