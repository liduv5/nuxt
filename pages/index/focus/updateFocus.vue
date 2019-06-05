<template>
  <div class="add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑轮播图</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <el-form
          ref="focusForm"
          :model="focusForm"
          status-icon
          :rules="rules"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item label="名称" prop="title">
            <el-input v-model="focusForm.title" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="focusForm.link" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="focusForm.type" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-input v-model="focusForm.status" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="focusForm.sort" type="text" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              ref="upload"
              :auto-upload="false"
              :http-request="uploadFile"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :multiple="false"
              :limit="1"
              action
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('focusForm')">提交</el-button>
            <el-button @click="resetForm('focusForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    fileList: [],
    formDate: '',
    focusForm: {
      title: '',
      link: '',
      sort: 100,
      type: 1,
      status: 1
    },
    rules: {
      title: [
        { required: true, message: '请输入轮播图名称', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
      ],
      link: [
        { required: true, message: '请输入链接地址', trigger: 'blur' },
        { min: 5, max: 30, message: '长度在 5 到 20 个字符', trigger: 'blur' }
      ]
    }
  }),
  async asyncData({ $axios, query }) {
    let focusInfo = await $axios.$post('/api/focus/findOne', query)
    // let defauleFocusInfo = JSON.stringify(focusInfo, ['title', 'link', 'sort', 'type', 'status'])
    return { focusForm: focusInfo, fileList:[{ name:focusInfo.title, url:'/api'+focusInfo.focus_img }] }
  },
  methods: {
    // 文件上传
    uploadFile(file) {
      this.formDate.append('focus_img', file.file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，如需更换请先完成移除操作！`)
    },
    handleRemove(file, fileList) {
        this.$axios.$post('/api/focus/deleteImage', { path:this.focusForm.focus_img } )
      },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formDate = new FormData()
          this.$refs.upload.submit()
          this.formDate.append('title', this.focusForm.title)
          this.formDate.append('link', this.focusForm.link)
          this.formDate.append('sort', this.focusForm.sort)
          this.formDate.append('type', this.focusForm.type)
          this.formDate.append('status', this.focusForm.status)
          this.formDate.append('id', this.$route.query._id)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$axios.$put('/api/focus/updateFocus', this.formDate, config)
            .then(res => {
              if (res) {
                this.$message({
                  message: '轮播图更新成功！',
                  type: 'success'
                })
                this.$router.push('/focus')
              } else {
                this.$message.error('轮播图更新失败！')
              }
            })
            .catch(err => {
              console.log(err)
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