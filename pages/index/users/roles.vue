<template>
  <div class="users">
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px auto;" @click="add">添加角色</el-button>
    <el-table :data="roleList" stripe border style="width: 100%">
      <el-table-column prop="_id" label="id编号" align="center" min-width="220"></el-table-column>
      <el-table-column prop="title" label="名称" align="center" min-width="120"></el-table-column>
      <el-table-column prop="description" label="描述" align="center" min-width="120"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" align="center" min-width="180"></el-table-column>
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
    roleList: []
  }),
  asyncData({ $axios }) {
    return $axios.$get('/api/roles').then(res => {
      return { roleList: res }
    })
  },
  methods: {
    add() {
      this.$router.push({ path: '/users/roleAdd' })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/users/roleEdit',
        query: { _id: row._id }
      })
    },
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除角色：[${row.title}], 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.$delete(`/api/roles/${row._id}`).then(res => {
            if (res.ok) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$router.go(0)
            } else {
              this.$message.error('角色删除失败！')
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
<style scope>
</style>