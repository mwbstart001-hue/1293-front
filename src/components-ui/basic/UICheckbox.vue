<template>
  <Checkbox :style="styleConfig">{{ label }}</Checkbox>
</template>

<script>
export default {
  name: 'UICheckbox',
  props: {
    label: {
      type: String,
      default: '多选项'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
