<template>
  <div class="access">
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px auto;" @click="add">添加权限</el-button>
    <el-table :data="accessList" row-key="_id" stripe border style="width: 100%">
      <!-- <el-table-column prop="_id" label="id编号" align="center" min-width="200"></el-table-column> -->
      <el-table-column prop="module_name" label="模块名" align="center" min-width="150"></el-table-column>
      <el-table-column prop="action_name" label="操作名" align="center" min-width="100"></el-table-column>
      <el-table-column prop="type" label="类型" :formatter="formatType" align="center" min-width="50"></el-table-column>
      <el-table-column prop="url" label="操作路径" align="center" min-width="120"></el-table-column>
      <el-table-column prop="module_id" label="模块ID" align="center" min-width="150"></el-table-column>
      <el-table-column prop="sort" label="排序" align="center" min-width="80"></el-table-column>
      <el-table-column prop="description" label="描述" align="center" min-width="120"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" min-width="50"></el-table-column>
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
    accessList: [
      {
        module_name: '用户管理',
        action_name: '',
        type: 1,
        url: '',
        module_id: 0,
        sort: 100,
        description: '用户管理--模块',
        status: 1
      },
      {
        module_name: '文章管理',
        action_name: '',
        type: 1,
        url: '',
        module_id: 0,
        sort: 100,
        description: '文章管理--模块',
        status: 1
      },
      {
        module_name: '分类管理',
        action_name: '',
        type: 1,
        url: '',
        module_id: 0,
        sort: 100,
        description: '分类管理--模块',
        status: 1
      }
    ]
  }),
  async asyncData({ $axios }) {
    let accessList = await $axios.$get('/api/access')
    return { accessList }
  },
  methods: {
    add() {
      this.$router.push({ path: '/users/access/accessAdd' })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/users/access/accessEdit',
        query: { _id: row._id }
      })
    },
    handleDelete(index, row) {
      this.$confirm(
        `此操作将永久删除权限：[${row.description}], 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$axios.$delete(`/api/access/${row._id}`).then(res => {
            if (res.ok) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$router.go(0)
            } else {
              this.$message.error('权限删除失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 表格中tpye属性值格式化
    formatType(row, column) {
      return row.type === 1 ? '模块' : row.type === 2 ? '菜单' : '操作'
    }
  }
}
</script>
<style scope>
</style>