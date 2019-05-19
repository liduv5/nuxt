<template>
  <div class="edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑用户信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="ruleForm.realname" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="QQ">
            <el-input v-model="ruleForm.QQ" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="ruleForm.role_id" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item._id"
                :label="item.description"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        realname: '',
        password: '',
        email: '',
        QQ: '',
        role_id: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  /*
   * 根据id获取单个用户的信息，并和表单数据绑定
   * 获取角色列表赋给select组件
   */
  async asyncData({ $axios, query }) {
    let [userInfo, roleList] = await Promise.all([
      $axios.$post('/api/users/findOne', query),
      $axios.$get('/api/users/roles')
    ])
    let defauleUserInfo = JSON.stringify(userInfo, [
      'username',
      'realname',
      'email',
      'QQ',
      'password',
      'role_id'
    ])
    return { ruleForm: JSON.parse(defauleUserInfo), roleList, defauleUserInfo }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /* 判断是否为无改动提交 */
          if (JSON.stringify(this.ruleForm) === this.defauleUserInfo) {
            this.$message.warning('您还未做任何更改，请勿提交！')
          } else {
            let req = {
              id: this.$route.query._id,
              data: this.ruleForm
            }

            this.$axios.$put('/api/users/updateUser', req).then(res => {
              if (res.ok) {
                this.$message({
                  message: '用户信息更新成功！',
                  type: 'success'
                })
                this.$router.push('/users')
              } else {
                this.$message.error('用户信息更新失败！')
              }
            })
          }
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.edit .box-card {
  width: 520px;
  margin: 0 auto;
}
</style>
