<template>
  <div class="user_list">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="uid"
        label="用户id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template
          slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看角色</el-button>
          <el-button v-if="delUserRoleAuthority" @click="delUser(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UserRoleList ref="userRoleList"
                  :userRoleListVisible="userRoleListVisible"
                  @userrolelistevent="syncUserRoleListVisible"
                  :addUserRoleAuthority="addUserRoleAuthority"
                  :delUserRoleAuthority="delUserRoleAuthority"
    ></UserRoleList>
    <el-pagination
      background
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :page-size="size"
      :total="total">
    </el-pagination>
  </div>
</template>

<style>
  .user-edit {
    text-align: center;
  }

  .show_user_roles {
    color: deepskyblue;
    cursor: pointer;
  }
</style>

<script>
  import {userApi} from "../router/api";
  import UserRoleList from "./UserRoleList";

  export default {
    data() {
      return {
        uid: 0,
        tableData: [],
        total: 0,
        page: 0,
        size: 5,
        userRoleListVisible: false,
        addUserRoleAuthority: false,
        delUserRoleAuthority: false,
        delUserAuthority: false,
      }
    },
    mounted() {
      this.changeTableData()
    },
    methods: {
      changeTableData() {
        this.tableData = []
        this.$get(userApi.userGetUserList, {page: this.page, size: this.size}).then(res => {
          for (var key in res.data.userList) {
            var data = {
              uid: res.data.userList[key]["id"],
              username: res.data.userList[key]["username"],
            }
            this.total = res.data.total
            console.log(this.total)
            this.tableData.push(data)
          }
        });
      },
      handleCurrentChange(val) {
        this.page = val
        this.changeTableData()
      },
      handleClick(row) {
        this.$refs['userRoleList'].changeTableData(row.uid)
        this.userRoleListVisible = true
        this.addUserRoleAuthority = this.$store.getters.checkAddUserRoleAuthority
        this.delUserRoleAuthority = this.$store.getters.checkDelUserRoleAuthority
        this.delUserAuthority = this.$store.getters.checkDelUserAuthority
      },
      delUser(row) {
        this.$refs['userRoleList'].changeTableData(row.uid)
        this.$post(userApi.userDelUserApi, {
          uid: row.uid,
          operation_uid: this.$store.getters.getUserInfo.uid
        }).then(res => {
          //uid
          this.changeTableData()
        });
      },
      syncUserRoleListVisible(val) {
        this.userRoleListVisible = val;
      },
    },
    components: {
      UserRoleList
    }
  }
</script>
