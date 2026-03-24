<template>
  <Radio :style="styleConfig">{{ label }}</Radio>
</template>

<script>
export default {
  name: 'UIRadio',
  props: {
    label: {
      type: String,
      default: '单选项'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
