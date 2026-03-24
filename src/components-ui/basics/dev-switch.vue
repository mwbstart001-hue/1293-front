<template>
  <div class="dev-switch-wrapper" :style="wrapperStyle">
    <i-switch v-model="switchValue" :size="size" />
  </div>
</template>

<script>
export default {
  name: 'DevSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
      switchValue: this.value
    }
  },
  watch: {
    value(val) {
      this.switchValue = val
    },
    switchValue(val) {
      this.$emit('input', val)
    }
  },
  computed: {
    wrapperStyle() {
      return {
        padding: '8px'
      }
    }
  }
}
</script>

<style scoped>
.dev-switch-wrapper {
  min-height: 40px;
  display: flex;
  align-items: center;
}
</style>
