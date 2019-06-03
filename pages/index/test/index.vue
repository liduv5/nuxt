<template>
  <div>
    <el-form label-width="80px" :model="fields">
      <el-form-item label="名称">
        <el-input v-model="fields.title"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="fields.link"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="fields.type"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="fields.sort"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="fields.status"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="upload-demo"
          name="focus_img"
          :action="UploadUrl()"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="fields"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      fields: {
        title: '',
        type: 1,
        sort: 100,
        status: 1,
        link: ''
      }
    }
  },
  methods: {
    UploadUrl: function() {
      return '/api/focus/addFocus'
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess(response, file, fileList) {
      if (response) {
        this.$message({
          message: '图片上传成功！',
          type: 'success'
        })
        // this.$router.push('/users/roles')
      } else {
        this.$message.error('图片上传失败！')
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>