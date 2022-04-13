import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '@/store'

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
    meta:{
      auth:true
    },
    component:()=>import('../views/Dashboard.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/report',
    name: 'Report',
    meta:{
      auth:true
    },
    component: () => import('../views/Report.vue')
  },
  {
    path: '/all',
    name: 'All',
    meta:{
      auth:true
    },
    component: () => import('../views/AllTransactions.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  let redirect=false
  if(to.meta.auth && !store.state.auth.loggedIn)
      {
        redirect= true
        next({name:'Login'})
      }
  else if(to.name==='Login' && store.state.auth.loggedIn)
    {
      redirect = true
      next({name:'Dashboard'})
    }
  if(!redirect)
    next()
})

export default router
