<template>
  <Layout>
     <template #default>
          <div class="main" ref="mainContainer" v-loading="isLoading">
            <BlogDetail :blog="data" v-if="data"></BlogDetail> 
            <BlogComment v-if="!isLoading"></BlogComment>
         </div>
      </template>
       <template #right>
          <div class="right" v-loading="isLoading">
            <BlogTOC :toc="data.toc" v-if="data"></BlogTOC>
          </div>
        </template>
  </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData.js';
import { getSingleBlog }  from '@/api/blog.js';
import Layout from '@/components/Layout';
import BlogDetail from './components/BlogDetail';
import BlogTOC from './components/BlogTOC';
import BlogComment from './components/BlogComment';
import mainScroll from '@/mixins/mainScroll.js';
import { titleController } from '@/utils';
export default {
  mixins:[fetchData(null),mainScroll("mainContainer")],
  components:{
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  updated() {
    // 在页面渲染完真实dom节点后,根据地址栏哈希值重新渲染页面的滚动位置
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
  methods:{
    async fetchData(){
      const resp =  await getSingleBlog(this.$route.params.id);
      if(!resp){
        //文章不存在,跳转到404组件
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  }

}
</script>

<style scoped lang="less">
.main{
  overflow-y:scroll!important;
  width:100%;
  height:100%;
  box-sizing: border-box;
  padding:15px;
  position:relative;
  scroll-behavior: smooth;
};
.right{
  width:300px;
  height:100%;
  overflow-y:auto;
  box-sizing: border-box;
  position:relative;
}
</style>