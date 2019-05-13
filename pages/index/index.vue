<template>
  <div class="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Nuxt-系统信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!-- <div v-for="(k,v) in userInfo" :key="k" class="text item">{{v}}:{{k}}</div> -->
      <h1>系统首页信息</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({})
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
