import Vue from 'vue'
import VueRouter from 'vue-router'
import Studio from '@/views/Studio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Studio',
    component: Studio
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
