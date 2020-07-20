import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    children: [
      {
        path: 'user_edit',
        name: 'UserEdit',
        component: () =>
          import(/* webpackChunkName: "user_edit" */ '../components/UserEdit.vue')
      },
      {
        path: 'user_list',
        name: 'UserList',
        component: () =>
          import(/* webpackChunkName: "user_list" */ '../components/UserList.vue')
      },
      {
        path: 'role_list',
        name: 'RoleList',
        component: () =>
          import(/* webpackChunkName: "user_list" */ '../components/RoleList.vue')
      },
      {
        path: 'user_list',
        name: 'UserList',
        component: () =>
          import(/* webpackChunkName: "user_list" */ '../components/UserList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
