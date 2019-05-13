<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="top-title">
          <h1 class="title">Nuxt-管理系统</h1>
        </div>
        <el-menu
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i> 系统首页
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>用户管理
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-user-solid"></i>用户管理
            </el-menu-item>
            <el-menu-item index="/users/roles">
              <i class="el-icon-user"></i>角色管理
            </el-menu-item>
            <el-menu-item index="/users/access">
              <i class="el-icon-finished"></i>权限配置
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>文章管理
            </template>
            <el-menu-item index="/article/list">文章列表</el-menu-item>
            <el-menu-item index="/article/add">添加文章</el-menu-item>
            <el-menu-item index="/article/edit">文章编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人资料</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{userInfo.realname}}</span>
        </el-header>

        <el-main>
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
          <!-- 子路由出口 -->
          <nuxt-child/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  data: () => ({
    breadcrumbList: [],
    menu: [
      { name: '', title: '系统首页', path: '/' },
      { name: 'users', title: '用户管理', path: '/users' },
      { name: 'userAdd', title: '添加用户', path: '/users/userAdd' },
      { name: 'userEdit', title: '编辑用户信息', path: '/users/userEdit' },
      { name: 'roles', title: '角色管理', path: '/users/roles' },
      { name: 'roleAdd', title: '添加角色', path: '/users/roleAdd' },
      { name: 'roleEdit', title: '编辑角色信息', path: '/users/roleEdit' },
      { name: 'access', title: '权限配置', path: '/users/access' },
      { name: 'accessAdd', title: '添加权限', path: '/users/accessAdd' },
      { name: 'accessEdit', title: '编辑权限信息', path: '/users/accessEdit' }
    ]
  }),
  computed: {
    ...mapState({ userInfo: state => state.userInfo })
  },

  watch: {
    $route(to, from) {
      let arr = []
      if (to.path === '/') {
        arr = ['']
      } else {
        arr = to.path.split('/').filter(item => item)
      }
      this.breadcrumbList = []
      arr.forEach((value, index, array) => {
        // console.log(`value:${value}    index:${index}     array:${array}`)
        let newArr = this.menu.find(element => element.name === value)
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
      let newArr = this.menu.find(element => element.name === value)
      this.breadcrumbList.push(newArr)
    })
  },
  methods: {
    logout() {
      // 使外部API上的JWT Cookie无效
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      Cookie.remove('userInfo')
      this.$store.commit('saveUserInfo', {})
      this.$router.push('/login')
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #e9e9e9;
}
html,
body,
#__nuxt,
#__layout,
#app,
.index {
  height: 100%;
  overflow: hidden;
}
.el-container {
  height: 100% !important;
}
.el-header {
  background-color: #66cccc;
  color: #333;
  line-height: 60px;
}
.el-aside {
  background-color: #545c64 !important;
  color: #333;
}
.el-menu {
  border-right: 0;
}
.top-title {
  text-align: center;
  padding: 15px 0;
  background-color: #000;
}
.top-title .title {
  color: #fff;
  font-weight: bold;
  font-size: 22px;
}
</style>