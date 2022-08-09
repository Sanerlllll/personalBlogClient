<template>
  <nav class="menu-container">
        <RouterLink :to="{name:item.name}" :exact="item.exact" v-for="(item,i) in items" :key="i">
            <div class="icon">
                <Icon :type="item.icon"></Icon>
            </div>
            <span>{{item.title}}</span>
        </RouterLink>
  </nav>
</template>

<script>
import Icon from '@/components/Icon';
export default {
    components:{
        Icon
    },
    data(){
        return {
            items:[
                {
                    name:"Home",
                    title:"首页",
                    icon:"home",
                    exact:true
                },
                 {
                    name:"Blog",
                    title:"文章",
                    icon:"blog",
                    exact:false,//激活状态是否要精确匹配
                },
                 {
                    name:"About",
                    title:"关于我",
                    icon:"about",
                    exact:true
                },
                 {
                    name:"Project",
                    title:"项目&效果",
                    icon:"code",
                    exact:true
                }, {
                    name:"Message",
                    title:"留言板",
                    icon:"chat",
                    exact:true
                }
            ]
        }
    },

}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
@import '~@/styles/global.less';
.menu-container{
    color:@gray;
    margin:20px 0;
    padding:0px;
    a{
        padding:0 50px;
        display:flex;
        align-items:center;
        height:45px;
         .icon{
        font-size:16px;
        margin-right: 10px;
        };
        &:hover{
            color:#fff;
        };
       &.router-link-active{
            background:#2d2d2d;
        }
        }
    };

</style>