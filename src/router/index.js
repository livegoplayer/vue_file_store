import Vue from 'vue'
import VueRouter from 'vue-router'
import { userApi } from './api'
import store from '../store/store'
import { post } from '../assets/js/axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
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
  console.log(token)
  var data = {}
  if (token !== '') {
    data.token = token
    // console.log(getUrlByUrlAndQueryArray(GetUrlRelativePath(), getQueryVariables()).trim('?'))
    // console.log(getUrlByUrlAndQueryArray(GetUrlRelativePath(), getQueryVariables()))
    // history.replaceState({}, '', getUrlByUrlAndQueryArray(GetUrlRelativePath(), getQueryVariables()))
  }

  post(userApi.userCheckUserStatusApi, data).then(res => {
    // 如果已经登录了
    if (res.data.isLogin) {
      // 设置全局的userInfo
      store.dispatch('setLoginUser', res.data.userSession)
      store.dispatch('setToken', res.data.token)
    }
    next()
  })
}

export default router

function getQueryVariable (variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return ''
}

function getQueryVariables () {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  var queryVars = {}
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[1] !== '' && pair[0] !== 'token') {
      queryVars[pair[0]] = pair[1]
    }
  }

  return queryVars
}

function getUrlByUrlAndQueryArray (url, queryVars) {
  var queryString = ''
  for (const key in queryVars) {
    var tmp = key + '=' + queryVars[key]
    queryString += tmp + '&'
  }
  queryString = queryString.trim('&')
  if (queryString !== '') {
    url += '?' + queryString
  }
  return url
}

function GetUrlRelativePath () {
  var url = document.location.toString()
  var arrUrl = url.split('//')

  var start = arrUrl[1].indexOf('/')
  var relUrl = arrUrl[1].substring(start)// stop省略，截取从start开始到结尾的所有字符

  if (relUrl.indexOf('?') != -1) {
    relUrl = relUrl.split('?')[0]
  }

  if (relUrl === '/') {
    return ''
  }
  return relUrl
}
