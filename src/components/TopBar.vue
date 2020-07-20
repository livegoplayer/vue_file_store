<template>
  <div class="topbar">
    <div class="topbar-left">
      <img class="avatar" src="../assets/logo.png"/>
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
          ><span @click="loginFormVisible = true">{{
              LoginTab
            }}</span></el-dropdown-item
          >
          <el-dropdown-item
          ><span
          ><span @click="registerFormVisible = true">注册</span></span
          ></el-dropdown-item
          >
          <el-dropdown-item
          ><span><span @click="logout">登出</span></span></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <LoginForm
        :loginFormVisible="loginFormVisible"
        @loginformevent="syncLoginFormVisible"
        @loginSuccess="checkUserStatus"
      ></LoginForm>
      <RegisterForm
        :registerFormVisible="registerFormVisible"
        @registerformevent="syncRegisterFormVisible"
      ></RegisterForm>
    </div>
  </div>
</template>

<script>
  import {userApi} from "../router/api.js";

  import LoginForm from "@/components/LoginForm.vue";
  import RegisterForm from "@/components/RegisterForm.vue";

  export default {
    created: function () {
      this.checkUserStatus();
    },
    data() {
      return {
        loginFormVisible: false,
        registerFormVisible: false
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      syncLoginFormVisible(val) {
        this.loginFormVisible = val;
      },
      syncRegisterFormVisible(val) {
        this.registerFormVisible = val;
      },
      checkUserStatus() {
        // 如果验证通过了
        this.$get(userApi.userCheckUserStatusApi).then(res => {
          // 如果已经登录了
          if (res.data.isLogin) {
            //设置全局的userInfo
            this.$store.dispatch('setLoginUser', res.data.userSession);
          } else {
            // 打开登录弹窗
            this.loginFormVisible = true;
          }
        });
      },
      logout(){
        this.$post(userApi.userLogout);
        //否则就跳到默认的首页
        if (this.$route.path !== "/main") {
          this.$router.push('/main')
          location.reload()
        }else {
          location.reload()
        }

      }
    },

    components: {
      LoginForm,
      RegisterForm
    },
    watch: {
      loginFormVisible(newName, oldName) {
        console.log("loginFormVisible from " + oldName + " to " + newName);
      },
      registerFormVisible(newName, oldName) {
        console.log("registerFormVisible from " + oldName + " to " + newName);
      }
    },
    computed: {
      LoginTab: function () {
        if (this.isLogin === true) {
          return "切换";
        } else {
          return "登录";
        }
      },
      username: function () {
        return this.$store.getters.getUserInfo.username
      },
      avatar: function () {
        return this.$store.getters.getUserInfo.avatar
      }
    }
  };
  console.log("init loginFormVisible = false");
  console.log("init registerFormVisible = false");
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
