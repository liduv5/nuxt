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
      } else {
        arr = to.path.split('/').filter(item => item)
        // console.log(arr.pop())
      }
      this.breadcrumbList = []
      arr.forEach((value, index, array) => {
        // console.log(`value:${value}    index:${index}     array:${array}`)
        let newArr = this.$store.state.accessList.find(element => element.url.split('/').pop() === value)
      this.breadcrumbList.push(newArr)
      })
    }
  },
  created() {
    let arr = []
    if (this.$route.path === '/') {
      arr = ['']
    } else {
      arr = this.$route.path.split('/').filter(item => item)
    }
    this.breadcrumbList = []
    arr.forEach((value, index, array) => {
      let newArr = this.$store.state.accessList.find(element => element.url.split('/').pop() === value )
      this.breadcrumbList.push(newArr)
    })
  }
}
</script>
<style>
</style>
