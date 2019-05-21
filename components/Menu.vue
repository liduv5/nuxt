<template>
  <div class="menu">
    <!-- <h2>文章列表</h2>
    
    <ul v-for="item in even(menuList,1)" :key="item.action_name">
      {{item.action_name}}
      <li
        v-for="child in  even(item.children,2)"
        :key="child.action_name"
      >---{{child.action_name}}---{{child.module_id}}</li>
    </ul>-->
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

      <el-submenu v-for="(item, index) in even(menuList, 1)" :key="index" :index="index">
        <template slot="title">
          <i :class="item.ico"></i>
          {{item.action_name}}
        </template>
        <el-menu-item
          v-for="child in  even(item.children, 2)"
          :key="child.action_name"
          :index="child.url"
        >
          <i :class="child.ico"></i>
          {{child.action_name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: ['menuList', 'userInfo'],
  methods: {
    even: function(list, num) {
      return list.filter(
        item =>
          (item.checked && item.type === num) ||
          (this.userInfo.is_super === 1 && item.type === num)
      )
    }
  }
}
</script>

<style>
</style>
