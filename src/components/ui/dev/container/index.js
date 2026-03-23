import DevContainer from './DevContainer.vue'

export default {
    install(Vue) {
        Vue.component('dev-container', DevContainer)
    },
    component: DevContainer,
    name: 'dev-container'
}
