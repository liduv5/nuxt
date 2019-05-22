<template>
  <div>
    <el-breadcrumb separator="/" style="margin: 10px auto;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-home"></i>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="{path:item.url}"
      >{{item.action_name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data: () => ({
    breadcrumbList: []
  }),
  watch: {
    $route(to, from) {
      let arr = ['']
      if (to.path === '/') {
        arr = ['']
        this.breadcrumbList = [{ action_name: '系统首页', url: '/' }]
      } else {
        arr = to.path.split('/').filter(item => item)
        // console.log(arr.pop())
        this.breadcrumbList = []
        arr.forEach((value, index, array) => {
          // console.log(`value:${value}    index:${index}     array:${array}`)
          let newArr = this.accessList.find(
            element => element.url.split('/').pop() === value
          )
          this.breadcrumbList.push(newArr)
        })
      }
    }
  },
  async created() {
    await this.accessList()
    let arr = ['']
    if (this.$route.path === '/') {
      arr = ['']
      this.breadcrumbList = [{ action_name: '系统首页', url: '/' }]
    } else {
      arr = this.$route.path.split('/').filter(item => item)
      this.breadcrumbList = []
      arr.forEach((value, index, array) => {
        let newArr = this.accessList.find(
          element => element.url.split('/').pop() === value
        )
        this.breadcrumbList.push(newArr)
      })
    }
  },
  methods: {
    async accessList() {
      let data = await this.$axios.$get('/api/users/access/find')
      this.accessList = data
    }
  }
}
</script>
<style>
</style>
