<template>
  <div class="dev-ui-table" @click.stop="handleClick">
    <Table :columns="columns" :data="data" :style="styleConfig" />
  </div>
</template>

<script>
export default {
  name: 'DevUITable',
  props: {
    columns: {
      type: Array,
      default: () => [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age' }
      ]
    },
    data: {
      type: Array,
      default: () => [
        { name: '张三', age: 25 },
        { name: '李四', age: 30 }
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
.dev-ui-table {
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
}
</style>
