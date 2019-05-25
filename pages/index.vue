<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div class="top-title">
          <h1 class="title">Nuxt-管理系统</h1>
        </div>
        <Menu v-if="userInfo" :userinfo="userInfo"></Menu>
      </el-aside>

      <el-container>
        <el-header v-if="userInfo" style="text-align: right; font-size: 12px">
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
          <Breadcrumb></Breadcrumb>
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
import Breadcrumb from '~/components/Breadcrumb.vue'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  components: { Menu, Breadcrumb },
  computed: {
    ...mapState({ userInfo: state => state.userInfo })
  },
  methods: {
    logout() {
      // 使外部API上的JWT Cookie无效
      Cookie.remove('userInfo')
      this.$store.commit('saveUserInfo', null)
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
  -moz-box-shadow: 0px 2px 5px #333333;
  -webkit-box-shadow: 0px 2px 5px #333333;
  box-shadow: 0px 2px 5px #333333;
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
  line-height: 60px;
  background-color: #000;
}
.top-title .title {
  color: #fff;
  font-weight: bold;
  font-size: 22px;
}
</style>