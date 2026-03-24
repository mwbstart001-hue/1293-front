<template>
  <div class="lc-input-wrapper">
    <label v-if="label" class="lc-input-label">{{ label }}</label>
    <Input
      v-model="innerValue"
      :type="type"
      :placeholder="placeholder"
      :size="size"
      :clearable="clearable"
      :disabled="disabled"
      :style="inputStyle"
      @on-change="handleChange"
      @on-blur="handleBlur"
      @on-focus="handleFocus"
    />
  </div>
</template>

<script>
export default {
  name: 'LcInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    size: {
      type: String,
      default: 'default'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '100%'
    }
  },
  data() {
    return {
      innerValue: this.value
    }
  },
  watch: {
    value(newVal) {
      this.innerValue = newVal
    },
    innerValue(newVal) {
      this.$emit('input', newVal)
    }
  },
  computed: {
    inputStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width
      }
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    handleBlur() {
      this.$emit('blur')
    },
    handleFocus() {
      this.$emit('focus')
    }
  }
}
</script>

<style lang="scss" scoped>
.lc-input-wrapper {
  .lc-input-label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  }
}
</style>
