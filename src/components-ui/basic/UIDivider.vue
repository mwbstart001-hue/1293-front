<template>
  <Divider :dashed="dashed" :style="styleConfig" />
</template>

<script>
export default {
  name: 'UIDivider',
  props: {
    dashed: {
      type: Boolean,
      default: false
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
