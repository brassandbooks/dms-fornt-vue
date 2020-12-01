import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Investor from '../views/Investor.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/investments',
    name: 'Investments',
    // route level code-splitting
    // this generates a separate chunk (investments.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "investments" */ '../views/Investments.vue')
  },
  {
    path: '/dueinvestments',
    name: 'Due Investments',
    // route level code-splitting
    // this generates a separate chunk (investments.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dueinvestments" */ '../views/DueInvestments.vue')
  },
  {
    path: '/investor',
    name: 'Investor',
    children:[
      {path: ':id', component: Investor}
    ],
    // route level code-splitting
    // this generates a separate chunk (investor.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "investor" */ '../views/Investor.vue')
  }
]

const router = new VueRouter({ 
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
