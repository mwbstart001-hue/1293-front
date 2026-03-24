<template>
  <div class="dev-image-wrapper" :style="wrapperStyle">
    <img :src="src" :alt="alt" :style="imageStyle" />
  </div>
</template>

<script>
export default {
  name: 'DevImage',
  props: {
    src: {
      type: String,
      default: 'https://picsum.photos/200/150'
    },
    alt: {
      type: String,
      default: '图片'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '150px'
    },
    fit: {
      type: String,
      default: 'cover'
    }
  },
  computed: {
    wrapperStyle() {
      return {
        padding: '8px',
        display: 'inline-block'
      }
    },
    imageStyle() {
      return {
        width: this.width,
        height: this.height,
        objectFit: this.fit,
        borderRadius: '4px'
      }
    }
  }
}
</script>

<style scoped>
.dev-image-wrapper {
  min-height: 40px;
}
</style>
