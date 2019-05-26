<template>
  <div class="add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加权限</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="模块名" prop="module_name">
            <el-input v-model="ruleForm.module_name" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.type"
                :label="item.label"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作名" prop="action_name">
            <el-input v-model="ruleForm.action_name" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="操作路径" prop="url">
            <el-input v-model="ruleForm.url" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="模块ID">
            <el-select v-model="ruleForm.module_id" placeholder="请选择">
              <el-option label="顶级模块" value="0"></el-option>
              <el-option
                v-for="item in module_ids"
                :key="item._id"
                :label="item.module_name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="ico">
            <el-input v-model="ruleForm.ico" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="ruleForm.description"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              >
            </el-input>
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
        module_name: '',
        action_name: '',
        type:1,
        url:'',
        module_id:'0',
        sort:100,
        ico:'',
        description:''
      },
      types: [{
          type: 1,
          label: '模块'
        }, {
          type: 2,
          label: '菜单'
        }, {
          type: 3,
          label: '操作'
        }],
      module_ids: [{
          module_id: 0,
          label: '--顶级模块--'
        }, {
          module_id: 1,
          label: '其他模块1'
        }, {
          module_id: 2,
          label: '其他模块2'
        }],
      rules: {
        module_name: [
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
    async asyncData({ $axios }) {
    let accessList = await $axios.$get('/api/users/access',{params: {module_id: '0'}})
    return { module_ids:accessList }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.$post('/api/users/access/addAccess', this.ruleForm).then(res => {
            if (res.success) {
                this.$message({
                  message: '权限添加成功！',
                  type: 'success'
                })
                this.$router.push('/users/access')
              } else {
                  this.$message.error('权限添加失败！')
              }
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
.add .box-card {
  width: 520px;
  margin: 0 auto;
}
</style>
