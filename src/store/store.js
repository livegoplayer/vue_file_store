import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 这是一个全局的用户信息
const userInfo = {
  uid: 0,
  username: '请先登录',
  userRoleList: '',
  userAuthorityList: '',
  addDatetime: '',
  updateDatetime: '',
  avatar: require('../assets/avatar.png')
}

const isLogin = false
const userId = 0

const state = {
  userInfo: userInfo,
  isLogin: isLogin,
  user_id: userId,
  roleListUid: 0,
  addUserAuthority: false,
  delUserAuthority: false,
  getUserListAuthority: false,
  addUserRoleAuthority: false,
  delUserRoleAuthority: false,
  token: ''
}

const getters = { // 实时监听state值的变化(最新状态)
  getUserInfo () { // 方法名随意,主要是来承载变化的showFooter的值
    return state.userInfo
  },
  checkUserLogin () { // 方法名随意,主要是用来承载变化的changableNum的值
    return state.isLogin
  },
  checkAddUserAuthority () {
    return state.addUserAuthority
  },
  checkGetUserListAuthority () {
    return state.getUserListAuthority
  },
  checkDelUserAuthority () {
    return state.delUserAuthority
  },
  checkAddUserRoleAuthority () {
    return state.addUserRoleAuthority
  },
  checkDelUserRoleAuthority () {
    return state.delUserRoleAuthority
  },
  getUid () { // 方法名随意,主要是来承载变化的showFooter的值
    console.log(state)
    console.log(state.user_id)
    return state.user_id.toString()
  },
  getToken () {
    return state.token
  }
}

const mutations = {
  setLoginUser (state, userInfos) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.isLogin = true
    if (userInfos.uid !== undefined) {
      state.user_id = state.userInfo.uid = userInfos.uid
    }
    if (userInfos.username !== undefined) {
      state.userInfo.username = userInfos.username
    }
    if (userInfos.userAuthorityList !== undefined) {
      state.userInfo.userAuthorityList = userInfos.userAuthorityList
      for (const id in state.userInfo.userAuthorityList) {
        // 添加用户
        if (id == 1) {
          state.addUserAuthority = true
        }

        // 获取用户列表
        if (id == 2) {
          state.getUserListAuthority = true
        }

        // 删除用户
        if (id == 3) {
          state.delUserAuthority = true
        }

        // 为用户添加角色
        if (id == 4) {
          state.addUserRoleAuthority = true
        }

        // 为用户删除角色
        if (id == 5) {
          state.delUserRoleAuthority = true
        }
      }
    }
    if (userInfos.userRoleList !== undefined) {
      state.userInfo.userRoleList = userInfos.userRoleList
    }
    if (userInfos.addDatetime !== undefined) {
      state.userInfo.addDatetime = userInfos.addDatetime
    }
    if (userInfos.updateDatetime !== undefined) {
      state.userInfo.updateDatetime = userInfos.updateDatetime
    }
  },
  setRoleListUid (state, uid) {
    state.roleListUid = uid
  },
  setAddUserAuthority (state, addUserAuthority) {
    state.addUserAuthority = addUserAuthority
  },
  setGetUserListAuthority (state, getUserListAuthority) {
    state.getUserListAuthority = getUserListAuthority
  },
  setDelUserAuthority (state, delUserAuthority) {
    state.delUserAuthority = delUserAuthority
  },
  setAddUserRoleAuthority (state, addUserRoleAuthority) {
    state.addUserRoleAuthority = addUserRoleAuthority
  },
  setDelUserRoleAuthority (state, delUserRoleAuthority) {
    state.delUserRoleAuthority = delUserRoleAuthority
  },
  setToken (state, token) {
    state.token = token
  }
}

const actions = {
  setLoginUser (context, userInfos) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('setLoginUser', userInfos)
  },
  setRoleListUid (context, uid) {
    context.commit('setRoleListUid', uid)
  },
  setAddUserAuthority (context, addUserAuthority) {
    context.commit('addUserAuthority', addUserAuthority)
  },
  setGetUserListAuthority (context, getUserListAuthority) {
    context.commit('getUserListAuthority', getUserListAuthority)
  },
  setDelUserAuthority (context, delUserAuthority) {
    context.commit('setDelUserAuthority', delUserAuthority)
  },
  setAddUserRoleAuthority (context, addUserRoleAuthority) {
    context.commit('addUserRoleAuthority', addUserRoleAuthority)
  },
  setDelUserRoleAuthority (context, delUserRoleAuthority) {
    context.commit('delUserRoleAuthority', delUserRoleAuthority)
  },
  setToken (context, token) {
    context.commit('setToken', token)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
