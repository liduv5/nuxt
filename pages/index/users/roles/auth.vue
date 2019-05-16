<template>
  <div class="auth">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色授权</span>
        <el-button style="float: right; padding: 5px" type="primary" @click="getCheckedKeys()">提交</el-button>
      </div>
      <div class="text item">
        <el-tree
          ref="tree"
          :data="accessList"
          show-checkbox
          default-expand-all
          node-key="_id"
          highlight-current
          :check-strictly="true"
          :props="defaultProps"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span> ->
            <span>[{{ formatType(data) }}]</span>
          </span>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'action_name'
      }
    }
  },
  async asyncData({ $axios }) {
    let accessList = await $axios.$get('/api/access')
    return { accessList }
  },
  mounted() {
    this.setCheckedKeys()
  },
  methods: {
    // 节点内容中tpye属性值格式化
    formatType(data) {
      return data.type === 1 ? '模块' : data.type === 2 ? '菜单' : '操作'
    },
    getCheckedKeys() {
      let sumKey = this.$refs.tree.getCheckedKeys()
      let fKey = this.$refs.tree.getHalfCheckedKeys()
      let accessId = sumKey.concat(fKey)
      let role_id = this.$route.query._id
      let arr = { access_id: accessId, role_id }
      this.$axios.$post('/api/roles/auth', arr).then(res => {
        if (res.success) {
          this.$message({
            message: '角色授权成功！',
            type: 'success'
          })
          this.$router.push('/users/roles')
        } else {
          this.$message.error('角色添加失败！')
        }
      })
    },
    async setCheckedKeys() {
      let authList = await this.$axios.$post('/api/roles/getAuth',{ role_id:this.$route.query._id })
      // console.log(authList)
      this.authArr = []
      authList.forEach(element => {
       this.authArr.push(element.access_id)
      })
      this.$refs.tree.setCheckedKeys(this.authArr)
    }
  }
}
</script>
<style>
.auth .box-card {
  width: 520px;
  margin: 0 auto;
}
.custom-tree-node {
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>