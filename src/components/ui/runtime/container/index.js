import RuntimeContainer from './container.vue'

export default {
    install(Vue) {
        Vue.component('container', RuntimeContainer)
    },
    component: RuntimeContainer,
    name: 'container'
}
