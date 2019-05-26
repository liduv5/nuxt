<template>
  <div class="users">
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px auto;" @click="add">添加用户</el-button>
    <el-table :data="userList" stripe border style="width: 100%">
      <!-- <el-table-column prop="_id" label="id编号" align="center" min-width="200"></el-table-column> -->
      <el-table-column prop="username" label="账号" align="center" min-width="100"></el-table-column>
      <el-table-column prop="realname" label="姓名" align="center" min-width="100"></el-table-column>
      <el-table-column prop="role[0].description" label="角色" align="center" min-width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" min-width="150"></el-table-column>
      <el-table-column prop="QQ" label="QQ" align="center" min-width="120"></el-table-column>
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
    userList: []
  }),
  asyncData({ $axios }) {
    return $axios.$get('/api/users').then(res => {
      return { userList: res }
    })
  },
  methods: {
    add() {
      this.$router.push({ path: '/users/addUser' })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/users/updateUser',
        query: { _id: row._id }
      })
    },
    handleDelete(index, row) {
      this.$confirm(
        `此操作将永久删除用户：[${row.username}], 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$axios.$delete(`/api/users/deleteUser/${row._id}`).then(res => {
            if (res.ok) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$axios.$get('/api/users').then(res => {
                  this.userList = res
                })
            } else {
              this.$message.error('用户删除失败！')
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
<style>
</style>