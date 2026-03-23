<template>
  <i-button
    :type="btnType"
    :size="size"
    :long="long"
    :disabled="disabled"
  >
    {{ text }}
  </i-button>
</template>

<script>
export default {
  name: 'widget-button',
  props: {
    text: { type: String, default: '按钮' },
    btnType: { type: String, default: 'primary' },
    size: { type: String, default: 'default' },
    long: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  }
}
</script>
