<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="top-title">
          <h1 class="title">Nuxt-管理系统</h1>
        </div>
        <Menu :menuList="menu" :userInfo="userInfo"></Menu>
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
import Menu from '~/components/Menu.vue'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  components: {
    Menu
  },
  data: () => ({
    menu: [],
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
    ]
  }),
  computed: {
    ...mapState({ userInfo: state => state.userInfo })
  },
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
    this.findmenu()
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
  },
  methods: {
    async findmenu() {
      this.menu = await this.$axios.$get('/api/menu')
    },
    logout() {
      // 使外部API上的JWT Cookie无效
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      Cookie.remove('userInfo')
      this.$store.commit('saveUserInfo', {})
      this.$router.push('/login')
      this.$axios.$post('/api/logout', { nuxtLogout: true })
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