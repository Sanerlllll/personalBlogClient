<template>
  <div class="about-container" v-loading="loading || !siteLoaded">
    <iframe v-if="data"
     class="about-content" 
     :src="data" 
     frameborder="0"
     @load="siteLoaded=true"></iframe>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
      // 当网页未加载完成时，loading效果依旧显示
      siteLoaded:false//网页是否加载完成
    }
  },
  computed:{
    ...mapState('about',['loading','data'])
  },
  created(){
    this.$store.dispatch('about/fetchAbout');
  }
}
</script>

<style scoped lang="less">
  .about-container{
    width:100%;
    height:100%;
    overflow:hidden;
    position:relative;
  };
  .about-content{
    width:100%;
    height:100%;
    display:block;
    box-sizing: border-box;
  }
</style>