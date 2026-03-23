<template>
  <Input
    v-model="inputValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    style="width: 100%"
  />
</template>

<script>
export default {
  name: 'widget-input',
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '请输入内容' },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'default' }
  },
  computed: {
    inputValue: {
      get() { return this.value },
      set(val) { this.$emit('input', val) }
    }
  }
}
</script>
