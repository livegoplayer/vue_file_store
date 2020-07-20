<template>
  <div class="user_role_list">
    <el-dialog title="角色列表" :visible.sync="formVisible">
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
        <el-table-column
          label="操作"
          width="180">
          <template
            slot-scope="scope">
            <el-button v-if="delUserRoleAuthority" @click="handleClick(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-if="addUserRoleAuthority" @click="addUserRoleVisible = true" type="primary">添加角色</el-button>
    </el-dialog>
    <AddUserRole
      :addUserRoleVisible="addUserRoleVisible"
      :uid="uid"
      @refreshUserRoleList="changeTableData(uid)"
      @addUserRoleEvent="syncAddUserRoleVisible">
    </AddUserRole>
  </div>

</template>

<style>

</style>

<script>
  import {userApi} from "../router/api";

  import AddUserRole from "./AddUserRole"

  export default {
    data() {
      return {
        formVisible: false,
        addUserRoleVisible: false,
        uid: 0,
        tableData: []
      }
    },
    methods: {
      changeTableData(uid) {
        this.tableData = []
        this.uid = uid
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
      },
      handleClick(row) {
        this.$post(userApi.userDelUserRoleApi, {uid: this.uid, role_id: row.role_id, operation_uid: this.$store.getters.getUserInfo.uid}).then(res => {
          //uid
          console.log(res)
          this.changeTableData(this.uid)
        });
      },
      showUserRoleList(event) {
        var el = event.currentTarget;
        alert("当前对象的内容：" + el.innerHTML);
      },
      syncAddUserRoleVisible(val){
        this.addUserRoleVisible = val;
      }
    },
    props: ["userRoleListVisible", "addUserRoleAuthority", "delUserRoleAuthority"],
    watch: {
      userRoleListVisible(newName, oldName) {
        this.formVisible = newName;
      },
      formVisible(newName, oldName) {
        this.formVisible = newName;
        this.$emit("userrolelistevent", newName);
        console.log("formVisible from " + oldName + " to " + newName);
      },
      addUserRoleVisible(newName, oldName){
        console.log("addUserRoleVisible = " + this.addUserRoleVisible)
      }
    },
    components: {
      AddUserRole
    }
  }
</script>
