<template>
  <div class="app-container">
    <Layout>
      <!--左边栏 -->
      <template #left> 
        <div class="left">
            <SiteAside></SiteAside>
        </div>
      </template>
      <!-- 主区域 -->
      <template #default>
        <!-- 根据不同路由地址渲染不同组件-->
        <RouterView/>
      </template>  
    </Layout>
    <ToTop></ToTop>
  </div>
</template>

<script>
import SiteAside from '@/components/SiteAside';
import Layout from '@/components/Layout';
import ToTop from '@/components/ToTop';
export default {
  components:{
    SiteAside,
    Layout,
    ToTop,
  },
}
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
.app-container{
  .self-fill(fixed);
  .left{
  width:250px;
  height:100%;
}
}

</style>