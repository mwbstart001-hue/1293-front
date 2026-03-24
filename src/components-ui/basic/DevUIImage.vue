<template>
  <div class="dev-ui-image" @click.stop="handleClick">
    <img class="ui-image" :src="src" :style="mergedStyle" />
  </div>
</template>

<script>
export default {
  name: 'DevUIImage',
  props: {
    src: {
      type: String,
      default: 'https://via.placeholder.com/150'
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
  computed: {
    mergedStyle() {
      return {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        ...this.styleConfig
      }
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
.dev-ui-image {
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    outline: 2px solid #2d8cf0;
    outline-offset: 2px;
  }
  
  .ui-image {
    display: block;
  }
}
</style>
