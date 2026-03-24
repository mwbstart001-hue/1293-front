<template>
  <div class="render-component">
    <component :is="componentName" v-bind="componentProps">
      <template v-if="config.componentType === 'container' && config.children">
        <RenderComponent
          v-for="child in config.children"
          :key="child.componentId"
          :config="child"
        />
      </template>
    </component>
  </div>
</template>

<script>
import { componentMap } from '@/components-ui'

export default {
  name: 'RenderComponent',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  computed: {
    componentName() {
      const mapping = componentMap[this.config.tag]
      return mapping ? mapping.runtime : this.config.tag
    },
    componentProps() {
      const props = { ...this.config.props }
      if (props.style) {
        props.styleConfig = props.style
        delete props.style
      }
      return props
    }
  }
}
</script>

<style lang="scss" scoped>
.render-component {
  margin-bottom: 8px;
}
</style>
