<template>
  <div class="user_role_list">
    <el-dialog title="请选择一个需要添加的角色" :visible.sync="formVisible">
      <el-form ref="addUserRoleForm" :model="form">
        <el-form-item label="角色">
          <el-select v-model="form.role_id" placeholder="请选择一个角色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm()">添加角色</el-button>
    </el-dialog>
  </div>

</template>

<style>

</style>

<script>
  import {userApi} from "../router/api";

  export default {
    data() {
      return {
        formVisible: false,
        form: {
          role_id: "1"
        },
        options: []
      }
    },
    methods: {
      showUserRoleList() {
        //先获取所有的角色列表
        this.$get(userApi.userGetRoleListApi)
          .then(res => {
            //重置
            this.options = []
            for (var id in res.data.userRoleList) {
              var data = {
                value: id,
                label: res.data.userRoleList[id],
                disabled: false
              }

              this.options.push(data)
            }
          })
      },
      submitForm() {
        this.$post(userApi.userAddUserRoleApi, {uid: this.uid, role_id: this.form.role_id, operation_uid: this.$store.getters.getUserInfo.uid}).then(res => {
          //uid
          console.log(res.data.success)
          this.resetForm("addUserRoleForm")
          this.$emit("refreshUserRoleList")
          this.formVisible = false
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    props: ["addUserRoleVisible", "uid"],
    watch: {
      addUserRoleVisible(newName, oldName) {
        this.formVisible = newName;
        console.log("formVisible =" + newName)
      },
      formVisible(newVal, oldVal) {
        this.formVisible = newVal;
        this.$emit("addUserRoleEvent", newVal);
        //如果重新打开了
        if (newVal === true) {
          this.showUserRoleList()
        }
        console.log("formVisible from " + oldVal + " to " + newVal);
      }
    },
  }
</script>
