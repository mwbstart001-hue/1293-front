<template>
  <img class="ui-image" :src="src" :style="mergedStyle" />
</template>

<script>
export default {
  name: 'UIImage',
  props: {
    src: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },
    styleConfig: {
      type: Object,
      default: () => ({})
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
  }
}
</script>
