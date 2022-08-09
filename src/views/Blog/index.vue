<template>
        <Layout>
          <!-- 主区域 -->
          <template #default>
            <BlogList></BlogList>
          </template>  
            <!--右边栏 -->
          <template #right> 
            <div class="right">
                <BlogCategory></BlogCategory>
            </div>
          </template>
        </Layout>
</template>

<script>
// import RightList from './components/RightList.vue';
import Layout from '@/components/Layout';
import BlogList from './components/BlogList';
import BlogCategory from './components/BlogCategory';
export default {
  components:{
    Layout,
    BlogList,
    BlogCategory
  },
  data(){
    return {
      
    }
  },
  created(){
    // console.log(this.$route);
  },
  methods:{
    
  }
}
</script>

<style>

</style>