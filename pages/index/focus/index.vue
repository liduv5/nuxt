<template>
  <div class="focus">
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px auto;" @click="add">添加轮播图</el-button>
    <el-table :data="focusList" stripe border style="width: 100%">
      <!-- <el-table-column prop="_id" label="id编号" align="center" min-width="220"></el-table-column> -->
      <el-table-column prop="title" label="名称" align="center" min-width="150"></el-table-column>
      <el-table-column label="图片" align="center" min-width="150">
        <template slot-scope="scope">
            <div class="demo-image">
                <el-image style="width: 100px; height: 100px" :src="'/api'+scope.row.focus_img"  fit="contain"></el-image>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="链接" align="center" min-width="230"></el-table-column>
      <el-table-column prop="type" label="类型" align="center" min-width="80"></el-table-column>
      <el-table-column prop="sort" label="排序" align="center" min-width="80"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" min-width="80"></el-table-column>
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    focusList: []
  }),
  asyncData({ $axios }) {
    return $axios.$get('/api/focus').then(res => {
      return { focusList: res }
    })
  },
  methods: {
    add() {
      this.$router.push({ path: '/focus/addFocus' })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/focus/updateFocus',
        query: { _id: row._id }
      })
    },
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除轮播图：[${row.title}], 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.$delete(`/api/focus/deleteFocus/${row._id}`).then(res => {
            if (res.ok) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$axios.$get('/api/focus').then(res => {
                this.focusList = res
              })
            } else {
              this.$message.error('轮播图删除失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style scoped>
</style>