<template>
  <div>
    <h2>文章列表</h2>

    <ul v-for="item in even(menu,1)" :key="item.action_name">
      {{item.action_name}}
      <li
        v-for="child in  even(item.children,2)"
        :key="child.action_name"
      >---{{child.action_name}}---{{child.module_id}}</li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    menu: []
  }),
  computed: {
    ...mapState({ userInfo: state => state.userInfo })
  },
  created() {
    this.findmenu()
  },
  methods: {
    async findmenu() {
      this.menu = await this.$axios.$get('/api/menu')
    },
    even: function(list, num) {
      return list.filter(
        item =>
          (item.checked && item.type === num) || this.userInfo.is_super === 1
      )
    }
  }
}
</script>

