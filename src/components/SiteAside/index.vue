<template>
  <div class="site-aside-container">
    <!-- data有值则显示该区域 没有则什么也不显示 -->
    <template v-if="data">
         <Avatar :url="data.avatar"
        :size="120">
        </Avatar>
        <h1 class="info">{{data.siteTitle}}</h1>
    </template>
   
    <Menu></Menu>
    <Contact v-if="data"></Contact>
  </div>
</template>

<script>
import Avatar from '../Avatar';
import Contact from './Contact';
import Menu from './Menu';
import {mapState} from 'vuex';
export default {
    components:{
        Avatar,
        Contact,
        Menu
    },
    computed:{
        ...mapState('setting',['data'])
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.site-aside-container{
    height:100%;
    box-sizing: border-box;
    padding:20px 0;
    background:@dark;
    .avatar-container{
        margin:0 auto;
    }
    overflow-x:hidden;
    overflow-y:auto; //纵向超出时出现滚动条
    .info{
        text-align: center;
        color:#fff;
        font-size: 16px;
    }
}


</style>