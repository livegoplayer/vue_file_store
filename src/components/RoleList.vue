<template>

  <div class="user_list">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="role_id"
        label="角色id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色名"
        width="180">
      </el-table-column>
    </el-table>
  </div>

</template>

<style>
  .user-edit {
    text-align: center;
  }
</style>

<script>
  import {userApi} from "../router/api";

  export default {
    data() {
      return {
        uid: 0,
        tableData: []
      }
    },
    mounted() {
      this.changeTableData()
    },
    methods: {
      changeTableData() {
        var uid = this.$store.getters.getRoleListUid
        //如果没有赋值就使用本地user
        if (!uid) {
          uid = this.$store.getters.getUserInfo.uid
          this.$store.dispatch('setRoleListUid', uid)
        }
        this.tableData = []
        if (uid) {
          this.$get(userApi.userGetUserRoleListApi, {uid: uid}).then(res => {
            for (var role_id in res.data.userRoleList) {
              var data = {
                role_id: role_id,
                role_name: res.data.userRoleList[role_id],
              }
              this.tableData.push(data)
            }
          });
        }
      }
    }
  }
</script>
