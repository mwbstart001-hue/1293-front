<template>
  <div class="dev-ui-select" @click.stop="handleClick">
    <Select :placeholder="placeholder" :clearable="clearable" :style="styleConfig">
      <Option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'DevUISelect',
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
    },
    componentId: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('component-click', this.componentId)
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-ui-select {
  display: inline-block;
  width: 200px;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
