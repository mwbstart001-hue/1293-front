<template>
  <div class="dev-ui-datepicker" @click.stop="handleClick">
    <DatePicker :type="type" :placeholder="placeholder" :style="styleConfig" />
  </div>
</template>

<script>
export default {
  name: 'DevUIDatePicker',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: '选择日期'
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
.dev-ui-datepicker {
  display: inline-block;
  width: 200px;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
