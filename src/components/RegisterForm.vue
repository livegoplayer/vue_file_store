<template>
<div>
<el-dialog title="注册" :visible.sync="formVisible">
  <el-form :rules="rules" ref="registerForm" :model="registerForm">
    <el-form-item label="账号名" :label-width="formLabelWidth" prop="username">
      <el-input placeholder="请输入用户名" v-model="registerForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="账号密码" :label-width="formLabelWidth" prop="password">
      <el-input placeholder="请输入密码" show-password v-model="registerForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="repassword">
      <el-input placeholder="重新输入密码" show-password v-model="registerForm.repassword" autocomplete="off"></el-input>
    </el-form-item>
    <div class="captcha">
      <div class="captchaAnswer">
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="answer">
        <el-input placeholder="不区分大小写" v-model="registerForm.answer" autocomplete="off"></el-input>
      </el-form-item>
      </div>
      <div class="captchaImg">
      <el-form-item  :label-width="formLabelWidth" prop="answer">
        <img @click="changeCaptcha"  class="img" :src="captchaImg"/>
      </el-form-item>
      </div>
    </div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('registerForm')">重 置</el-button>
    <el-button type="primary" @click="submitForm('registerForm')">注 册</el-button>
  </div>
</el-dialog>
</div>

</template>

<script>

import { userApi, commonApi } from '../router/api.js'

export default {
  data () {
    var registerForm = {
      username: '',
      password: '',
      repassword: '',
      captchaId: '',
      answer: ''
    }

    // 验证密码的函数
    var nameValidator = (rule, value, callback) => {
      // 用户名正则
      var uPattern = /^[a-zA-Z0-9_-]$/
      if (uPattern.test(value)) {
        return callback(new Error('用户名不能包含特殊符号'))
      }
      callback()
    }

    var repasswordValidator = (rule, value, callback) => {
      if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      }
      callback()
    }

    var passwordValidator = (rule, value, callback) => {
      // // 密码正则，至少包含数字和小写字母
      // var pPattern = /^.*(?=.*\d)(?=.*[a-z]).*$/
      // if (pPattern.test(value)) {
      //   return callback(new Error('密码需要包含数字和小写字母'))
      // }
      callback()
    }

    return {
      formVisible: false,
      registerForm: registerForm,
      captchaImg: '',
      rules: {
        username: [{
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        }, { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }, { validator: nameValidator, trigger: 'blur' }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, { min: 6, message: '密码不少于6个字符', trigger: 'blur' }, { validator: passwordValidator, trigger: 'blur' }
        ],
        repassword: [{
          required: true,
          message: '请再次输入密码',
          trigger: 'blur'
        }, { validator: repasswordValidator, trigger: 'blur' }
        ],
        captchaId: [{
          required: true,
          message: '请刷新页面获取二维码',
          trigger: 'blur'
        }
        ],
        answer: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, { len: 6, message: '验证码为6位', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  props: [
    'registerFormVisible'
  ],
  watch: {
    registerFormVisible (newName, oldName) {
      this.formVisible = newName
    },
    formVisible (newName, oldName) {
      this.formVisible = newName
      this.$emit('registerformevent', newName)
      // 获取二维码,每次打开的时候
      if (newName === true) {
        this.changeCaptcha()
      }

      console.log('formVisible from ' + oldName + ' to ' + newName)
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果验证通过了
          this.$post(userApi.userRegisterApi, this.registerForm)
            .then(res => {
              this.resetForm('registerForm')
              this.formVisible = false
            })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    changeCaptcha () {
      this.$get(commonApi.captchaGetCaptcha)
        .then(res => {
          this.registerForm.captchaId = res.data.captchaId
          this.captchaImg = res.data.captchaImg
        })
    }
  }
}
</script>

<style scoped>
  .captcha{
    display: flex;
  }
  .captchaAnswer{
    flex-grow: 3;
  }
  .captchaImg{
    flex-grow: 1;
  }
  .img{
    height: 40px;
  }

</style>
