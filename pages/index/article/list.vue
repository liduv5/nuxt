<template>
  <div>
    <Menu :menuList='menu' :userInfo='userInfo'></Menu> 
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Menu from '~/components/Menu.vue'
export default {
  components:{
    Menu
  },
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
    }
  }
}
</script>

