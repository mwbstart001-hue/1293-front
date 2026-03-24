<template>
  <Card :style="cardStyle" :dis-hover="true">
    <p slot="title" v-if="showTitle">{{ title }}</p>
    <div class="lc-card-content">
      <slot />
    </div>
  </Card>
</template>

<script>
export default {
  name: 'LcCard',
  props: {
    title: {
      type: String,
      default: '卡片标题'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    padding: {
      type: [String, Number],
      default: 16
    },
    shadow: {
      type: String,
      default: 'hover'
    },
    borderRadius: {
      type: [String, Number],
      default: 4
    }
  },
  computed: {
    cardStyle() {
      return {
        borderRadius: typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lc-card-content {
  min-height: 50px;
}
</style>
