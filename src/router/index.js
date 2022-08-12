import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewTotalScores from '@/views/TotalScores'
import ViewPlay from '@/views/play/View'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TotalScores',
    component: ViewTotalScores
  },
  {
    path: '/play',
    name: 'Play',
    component: ViewPlay
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
