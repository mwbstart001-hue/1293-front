<template>
  <div class="dev-lc-image" :style="wrapperStyle">
    <img 
      :src="src" 
      :alt="alt"
      :style="imageStyle"
    >
  </div>
</template>

<script>
export default {
  name: 'DevLcImage',
  props: {
    src: {
      type: String,
      default: 'https://via.placeholder.com/300x200'
    },
    alt: {
      type: String,
      default: '图片'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    objectFit: {
      type: String,
      default: 'cover'
    }
  },
  computed: {
    wrapperStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
        borderRadius: typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius,
        overflow: 'hidden'
      }
    },
    imageStyle() {
      return {
        width: '100%',
        height: '100%',
        objectFit: this.objectFit,
        display: 'block'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-lc-image {
  img {
    transition: transform 0.3s ease;
  }
}
</style>
