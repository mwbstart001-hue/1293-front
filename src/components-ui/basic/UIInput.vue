<template>
  <Input :placeholder="placeholder" :size="size" :clearable="clearable" :style="styleConfig" />
</template>

<script>
export default {
  name: 'UIInput',
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    size: {
      type: String,
      default: 'default'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    styleConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
