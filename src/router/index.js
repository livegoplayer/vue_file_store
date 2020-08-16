import Vue from 'vue'
import VueRouter from 'vue-router'
import { userApi } from './api'
import store from '../store/store'
import { post } from '../assets/js/axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "" */ '../views/Main.vue'),
    children: [
      {
        path: 'file_list',
        name: 'fileList',
        component: () =>
          import(/* webpackChunkName: "user_edit" */ '../components/FileList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 需要调用相关
  checkUserStatus(next)
})

function checkUserStatus (next) {
  // 如果验证通过了
  // 后端先获取当前页面的cookie，如果没有就从请求头中获取token参数，如果还没有就跳转到sso的登录页面
  // 前端获取token参数，如果不为空则加到新的参数post里面
  var token = getQueryVariable('token')
  var data = {}
  if (token !== '') {
    data.token = token
    // 删除url中的token参数
    var url = funcUrlDel('token').substr(1)
    window.history.pushState({}, 'www.52db.xyz', url)
  }

  post(userApi.userCheckUserStatusApi, data).then(res => {
    // 如果已经登录了
    if (res.data.isLogin) {
      // 设置全局的userInfo
      store.dispatch('setLoginUser', res.data.userSession)
      store.dispatch('setToken', res.data.token)
    }
  }).then(next())
}

export default router

function getQueryVariable (variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return ''
}

// 删除url中某个参数,并跳转
function funcUrlDel (name) {
  var loca = window.location
  var baseUrl = loca.pathname
  var query = loca.search.substr(1)
  if (query.indexOf(name) > -1) {
    var obj = {}
    var arr = query.split('&')
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=')
      obj[arr[i][0]] = arr[i][1]
    };
    delete obj[name]
    var params = JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&')
    var url = baseUrl
    if (params) {
      url = baseUrl + '?' + JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&')
    }
    return url
  };
}
