<template>
  <div class="topbar">
    <div class="topbar-left">
      <img class="avatar" src="../assets/logo.png"/>
      <span>fileStore</span>
    </div>
    <div class="topbar-right">
      <span class="username">{{ username }}</span>

      <el-dropdown :hide-on-click="true" trigger="click">
        <span class="el-dropdown-link">
          <img class="logo" :src="avatar"/><i
          class="el-icon-arrow-down el-icon--right"
        ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
          ><span @click="goToLogin">{{
              LoginTab
            }}</span></el-dropdown-item
          >
          <el-dropdown-item
          ><span
          ><span @click="goToRegister">注册</span></span
          ></el-dropdown-item
          >
          <el-dropdown-item
          ><span><span @click="logout">登出</span></span></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { userApi } from '../router/api.js'
import { userSSOHost } from '../router/host.js'

export default {
  data () {
    return {
    }
  },
  methods: {
    goToLogin () {
      this.logout()
    },
    goToRegister () {
      window.location.href = userSSOHost + '?goto=2'
    },
    logout () {
      this.$post(userApi.userLogout, { uid: this.$store.getters.getUid }).then(res => {
        if (res.data.success) {
          if (this.$route.path !== '/') {
            this.$router.push('/')
            location.reload()
          } else {
            location.reload()
          }
        }
      }
      )
    }
  },

  watch: {
  },
  computed: {
    LoginTab: function () {
      if (this.$store.getters.checkUserLogin === true) {
        return '切换'
      } else {
        return '登录'
      }
    },
    username: function () {
      return this.$store.getters.getUserInfo.username
    },
    avatar: function () {
      return this.$store.getters.getUserInfo.avatar
    }
  }
}
</script>

<style scoped>
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    vertical-align: middle !important;
    text-align: right;
  }

  .topbar {
    padding: 16px;
    background-color: #545c64;
    color: #fff;
    display: flex;
    flex-direction: row; /* flex布局 内部对其方式*/
  }

  .logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    vertical-align: middle !important;
    text-align: right;
  }

  .topbar-left {
    display: block;
    flex-grow: 1; /* 占据所有剩余空间，其他都是0*/
  }

  .topbar-right {
    display: block;
    flex-grow: 0;
  }

  .login-span {
    margin-right: 10px;
    margin-top: 2px;
  }

  .register-span {
    margin-right: 10px;
    margin-top: 2px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .username {
    /* color: #fff; */
    padding-right: 10px;
  }
</style>
