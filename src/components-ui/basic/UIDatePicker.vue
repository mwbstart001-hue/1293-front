<template>
  <DatePicker :type="type" :placeholder="placeholder" :style="styleConfig" />
</template>

<script>
export default {
  name: 'UIDatePicker',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: '选择日期'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
