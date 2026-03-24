<template>
  <div class="dev-input-wrapper" :style="wrapperStyle">
    <Input 
      v-model="inputValue" 
      :placeholder="placeholder" 
      :type="type"
      :style="{ width: width }"
    />
  </div>
</template>

<script>
export default {
  name: 'DevInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    type: {
      type: String,
      default: 'text'
    },
    width: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      inputValue: this.value
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
    inputValue(val) {
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
.dev-input-wrapper {
  min-height: 40px;
  display: flex;
  align-items: center;
}
</style>
