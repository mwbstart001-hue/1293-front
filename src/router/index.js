import Vue from 'vue'
import VueRouter from 'vue-router'
import Studio from '@/studio/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Studio',
        component: Studio
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
