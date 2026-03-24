import Vue from 'vue'
import App from './App.vue'

// 引入插件
import './plugins/view-design'
import './plugins/components'

// 全局样式
import './assets/styles/global.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
