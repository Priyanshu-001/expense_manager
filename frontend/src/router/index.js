import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/dashboard',
    name: 'Dashboard',
    component:()=>import('../views/Dashboard.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import(/* webpackChunkName: "Report" */ '../views/Report.vue')
  },
  {
    path: '/all',
    name: 'All',
    component: () => import(/* webpackChunkName: "Report" */ '../views/AllTransactions.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
