import Vue from 'vue'
import components from '../components-ui'

// 全局注册所有组件
Object.keys(components).forEach(name => {
  Vue.component(name, components[name])
})
