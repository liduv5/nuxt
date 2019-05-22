<template>
  <div>
    <el-breadcrumb separator="/" style="margin: 10px auto;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-home"></i>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="{path:item.path}"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data: () => ({
    menu1: [
      { name: '', title: '系统首页', path: '/' },
      { name: 'users', title: '用户管理', path: '/users' },
      { name: 'addUser', title: '添加用户', path: '/users/addUser' },
      { name: 'updateUser', title: '编辑用户信息', path: '/users/updateUser' },
      { name: 'roles', title: '角色管理', path: '/users/roles' },
      { name: 'auth', title: '角色授权', path: '/users/roles/auth' },
      { name: 'addRole', title: '添加角色', path: '/users/roles/addRole' },
      {
        name: 'updateRole',
        title: '编辑角色信息',
        path: '/users/roles/updateRole'
      },
      { name: 'access', title: '权限配置', path: '/users/access' },
      { name: 'addAccess', title: '添加权限', path: '/users/access/addAccess' },
      {
        name: 'updateAccess',
        title: '编辑权限信息',
        path: '/users/access/updateAccess'
      },
      {
        name: 'article',
        title: '文章管理',
        path: '/article'
      },
      {
        name: 'list',
        title: '菜单',
        path: '/article/list'
      },
      {
        name: 'links',
        title: '友情链接',
        path: '/links'
      }
    ],
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
        let newArr = this.menu1.find(element => element.name === value)
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
      let newArr = this.menu1.find(element => element.name === value)
      this.breadcrumbList.push(newArr)
    })
  }
}
</script>
<style>
</style>
