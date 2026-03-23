import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入 view-design
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

// 引入全局样式
import './styles/global.css'

// 引入组件库
import RuntimeContainer from './components/ui/runtime/container'
import RuntimeWidget from './components/ui/runtime/widget'
import DevContainer from './components/ui/dev/container'

// 引入画布组件外壳（全局注册以便递归使用）
import ComponentItem from './studio/pageCanvas/componentItem.vue'

Vue.config.productionTip = false

// 使用 view-design
Vue.use(ViewUI)

// 注册运行时组件
Vue.use(RuntimeContainer)
Vue.use(RuntimeWidget)

// 注册开发时组件（dev- 前缀）
Vue.use(DevContainer)

// 全局注册组件外壳
Vue.component('component-item', ComponentItem)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
