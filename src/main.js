import Vue from 'vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App.vue'
import './assets/styles/global.scss'

import ComponentsUI from './components-ui'
import Plugins from './plugins'

Vue.use(ViewUI)
Vue.use(ComponentsUI)
Vue.use(Plugins)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
