<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="login-ruleForm"
    >
      <h1 class="title">
        <i class="el-icon-service"></i> nuxt-登录
      </h1>
      <el-form-item label="账户" prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      // 登录表单的数据
      loginForm: {
        username: '',
        password: ''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .$post('/api/login', this.loginForm)
            .then(response => {
              if (response) {
                this.$store.commit('saveUserInfo', response) // 存储在vuex中用来进行客户端渲染
                Cookie.set('userInfo', response) // 在cookie中保存userinfo用来进行服务器端渲染

                const h = this.$createElement

                this.$notify({
                  title: '登录成功！',
                  message: h(
                    'i',
                    { style: 'color: teal' },
                    response.username + '欢迎您！'
                  )
                })
                this.$router.push('/')
              } else {
                this.$message({
                  type: 'error',
                  message: '用户名或密码错误',
                  showClose: true
                })
              }
            })
            .catch(e => {
              this.$message({
                type: 'error',
                message: '用户名或密码错误',
                showClose: true
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #e9e9e9;
}
html,
body,
#__nuxt,
#__layout,
#app,
.login {
  height: 100%;
  overflow: hidden;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-ruleForm {
  width: 400px;
  border-radius: 8px;
  padding: 0 45px 10px 10px;
  background-color: #fff;
  -moz-box-shadow: 0px 2px 10px #333333;
  -webkit-box-shadow: 0px 2px 10px #333333;
  box-shadow: 0px 2px 10px #333333;
}
.login-ruleForm .title {
  font-size: 22px;
  color: #ccc;
  font-weight: bold;
  padding: 20px 0 20px 60px;
}
</style>