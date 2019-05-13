<template>
    <div>
        <h2>文章列表</h2>
       
        <ul v-for="item in menu" :key="item.title">{{item.title}}---{{item.role}}
            <li v-for="child in item.children" :key="child.title">&nbsp;&nbsp;{{child.title}}---{{child.role}}</li>
        </ul>
   
        
    </div>
    
</template>
<script>
export default {
    data:()=>({
        menu:[]
    }),
    created(){
        this.findmenu()
    },
    methods:{
       async findmenu(){
            let menu1 = await this.$axios.$get('/api/menu')
            this.menu=menu1
            console.log(menu1)
        }
    }
}
</script>

