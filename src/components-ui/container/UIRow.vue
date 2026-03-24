<template>
  <Row class="ui-row" :gutter="gutter">
    <slot></slot>
  </Row>
</template>

<script>
export default {
  name: 'UIRow',
  props: {
    gutter: {
      type: Number,
      default: 16
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-row {
  min-height: 50px;
}
</style>
