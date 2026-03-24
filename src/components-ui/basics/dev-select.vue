<template>
  <div class="dev-select-wrapper" :style="wrapperStyle">
    <Select v-model="selectValue" :placeholder="placeholder" :style="{ width: width }">
      <Option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'DevSelect',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      default: () => [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    },
    width: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      selectValue: this.value
    }
  },
  watch: {
    value(val) {
      this.selectValue = val
    },
    selectValue(val) {
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
.dev-select-wrapper {
  min-height: 40px;
  display: flex;
  align-items: center;
}
</style>
