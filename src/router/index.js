import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/Login'
import ViewDashboard from '@/views/Dashboard'

import ViewPlay from '@/views/play/View'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ViewLogin
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ViewDashboard
  },
  {
    path: '/play/:game_id',
    name: 'Play',
    props: true,
    component: ViewPlay
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
