<template>
  <Select :placeholder="placeholder" :clearable="clearable" :style="styleConfig">
    <Option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Option>
  </Select>
</template>

<script>
export default {
  name: 'UISelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
