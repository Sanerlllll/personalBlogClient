<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea title="留言板" :subTitle="`(${data.total})`" 
    :list="data.rows" :isListLoading="isLoading"
    @submit="handleSubmit"></MessageArea>
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea';
import  fetchData from '@/mixins/fetchData';
import {getMessage,postMessage} from '@/api/message';
import mainScroll from '@/mixins/mainScroll.js';
export default {
  mixins:[fetchData({total:0,rows:[]}),mainScroll('messageContainer')],
  data(){
    return{
      page:1,
      limit:10
    }
  },
  created(){
    this.$bus.$on('mainScroll',this.handleScroll);
  },
  destroyed(){
    this.$bus.$off('mainScroll',this.handleScroll);
  },
  components:{
    MessageArea
  },
  computed:{
    // 判断评论是否加载完毕
    hasMore(){
      return this.data.rows.length < this.data.total;
    }
  },
  methods:{
    async fetchData(){
      return await getMessage(this.page, this.limit);
    },
    async handleSubmit(data,callback){
      const resp = await postMessage(data);
      callback('感谢您的留言');//传一个回调函数
      this.data.rows.unshift(resp);//将留言添加到留言列表中
    },
      // 处理关于评论的滚动事件
    handleScroll(dom){
      // 如果评论正在加载，则退出
      // console.log(dom)
      if(this.isLoading || !dom){
          return;
        }
      const range = 100;//定义一个范围，在此范围内就算进度条到达底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);//绝对值
      // console.log(dec);
      if(dec <= range){
        this.fetchComment();
      }
    },
    // 加载下一页评论
    async fetchComment(){
      // 如果评论加载完毕，则什么也不做
      if(!this.hasMore){
          return;
       };
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      // 将原来的评论数组与新加载的评论数组合并
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
  }
}
</script>

<style scoped lang="less">
.message-container{
  width:100%;
  height:100%;
  overflow-y: auto;
  padding:25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
};
.message-area-container{
  width:700px;
  margin:0 auto;

}
</style>