import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/main',
    component: () => import('@/views/Main'),
    children: [{
      path: '/',
      component: () => import('@/views/dashboard/index')
    }, {
      path: '/demo',
      component: () => import('@/views/demo/index')
    }]
  }
]

export default new Router({
  mode: 'history',
  routes: constantRoutes
})
