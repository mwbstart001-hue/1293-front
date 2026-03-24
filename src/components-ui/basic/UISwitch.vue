<template>
  <Switch :size="size" :style="styleConfig" />
</template>

<script>
export default {
  name: 'UISwitch',
  props: {
    size: {
      type: String,
      default: 'default'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
