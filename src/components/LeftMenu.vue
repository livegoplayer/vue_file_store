<template>
  <div class="page">
    <div class="left-menu">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">文件中心</span>
          </template>
          <el-menu-item-group title="文件操作">
            <el-menu-item index="1-1">
              <router-link :to="'/file_list'"><span>文件列表</span></router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" >
          <template slot="title">
            <i @click="checkAuthority" class="el-icon-menu"></i>
            <span @click="checkAuthority" slot="title">高级操作</span>
          </template>
          <el-menu-item-group title="用户">
            <el-menu-item v-if="getUserListAuthority" index="2-2">
              <router-link :to="'/user_list'"><span>用户列表</span></router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">关于</span>
        </el-menu-item>
      </el-menu>

    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>

</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .page {
    display: flex;
    flex-direction: row; /* flex布局 内部对其方式*/
  }

  .content {
    /*margin: auto;*/
    width: 100%;
    margin-bottom: 0px;
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

  .page{
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse){
    min-height: 100% !important;
  }
  .left-menu{
    min-height: 100% !important;
  }
</style>

<script>

export default {
  data () {
    return {
      isCollapse: false,
      addUserAuthority: false,
      delUserAuthority: false,
      getUserListAuthority: false,
      addUserRoleAuthority: false,
      delUserRoleAuthority: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    checkAuthority () {
      this.addUserAuthority = this.$store.getters.checkAddUserAuthority
      this.delUserAuthority = this.$store.getters.checkDelUserAuthority
      this.getUserListAuthority = this.$store.getters.checkGetUserListAuthority
      this.addUserRoleAuthority = this.$store.getters.checkAddUserRoleAuthority
      this.delUserRoleAuthority = this.$store.getters.checkDelUserRoleAuthority
    }
  }

}
</script>
