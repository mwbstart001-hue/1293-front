<template>
  <i-switch v-model="switchValue" :disabled="disabled" :size="size">
    <span slot="open">开</span>
    <span slot="close">关</span>
  </i-switch>
</template>

<script>
export default {
  name: 'widget-switch',
  props: {
    value: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'default' }
  },
  computed: {
    switchValue: {
      get() { return this.value },
      set(val) { this.$emit('input', val) }
    }
  }
}
</script>
