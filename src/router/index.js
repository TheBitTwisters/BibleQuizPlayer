import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/Login'
import ViewDashboard from '@/views/Dashboard'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
