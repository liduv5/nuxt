<template>
  <div>
    <Menu :userinfo='userInfo'></Menu> 
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Menu from '~/components/Menu.vue'
export default {
  components:{
    Menu
  },
  computed: {
    ...mapState({ userInfo: state => state.userInfo })
  },
  created() {
  },
  methods: {
  }
}
</script>

