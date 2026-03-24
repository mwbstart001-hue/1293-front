<template>
  <Table :columns="columns" :data="data" :style="styleConfig" />
</template>

<script>
export default {
  name: 'UITable',
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
    }
  }
}
</script>
