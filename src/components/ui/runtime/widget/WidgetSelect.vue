<template>
  <Select
    v-model="selectValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    style="width: 100%"
  >
    <Option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </Option>
  </Select>
</template>

<script>
export default {
  name: 'widget-select',
  props: {
    value: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '请选择' },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'default' },
    options: {
      type: Array,
      default: () => [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' }
      ]
    }
  },
  computed: {
    selectValue: {
      get() { return this.value },
      set(val) { this.$emit('input', val) }
    }
  }
}
</script>
