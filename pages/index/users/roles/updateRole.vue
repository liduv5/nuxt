<template>
  <div class="edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑角色信息</span>
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
          <el-form-item label="名称" prop="title">
            <el-input v-model="ruleForm.title" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description" type="text" auto-complete="off"></el-input>
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
        title: '',
        description: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述信息', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  async asyncData({ $axios, query }) {
    let roleInfo = await $axios.$post('/api/users/roles/findOne', query)
    let defauleRoleInfo = JSON.stringify(roleInfo, ['title', 'description'])
    return { ruleForm: JSON.parse(defauleRoleInfo), defauleRoleInfo }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /* 判断是否为无改动提交 */
          if (JSON.stringify(this.ruleForm) === this.defauleRoleInfo) {
            this.$message.warning('您还未做任何更改，请勿提交！')
          } else {
            let req = {
              id: this.$route.query._id,
              data: this.ruleForm
            }
            this.$axios.$put('/api/users/roles/updateRole', req).then(res => {
              if (res.ok) {
                this.$message({
                  message: '角色信息更新成功！',
                  type: 'success'
                })
                this.$router.push('/users/roles')
              } else {
                this.$message.error('角色信息更新失败！')
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
<style scoped>
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
