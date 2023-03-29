<template>
  <div class="blog-comment-container">
    <MessageArea title="评论列表" 
    :subTitle="`(${data.total})`" 
    :list="data.rows" 
    :isListLoading="isLoading"
    @submit="handleSubmit">
    </MessageArea>
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea';
import fetchData from '@/mixins/fetchData';
import {getComment,postComment} from '@/api/blog';
export default {
    mixins:[fetchData({ total : 0,rows : [] })],
    components:{
        MessageArea
    },
    data(){
        return {
            page:1,
            limit:10
        }
    },
    created(){
        // window.fetchComment = this.fetchComment;
        this.$bus.$on('mainScroll',this.handleScroll);
    },
    destroyed(){
        this.$bus.$off('mainScroll',this.handleScroll);
    },
    computed:{
        // 判断评论是否加载完毕
        hasMore(){
            return this.data.rows.length < this.data.total;
        }
    },
    methods:{
        async fetchData(){
            return await getComment(this.$route.params.id,this.page,this.limit);
        },
        async handleSubmit(formData,callback){
           const resp =  await postComment({
                blogId:this.$route.params.id,
                nickname:formData.nickname,
                content:formData.content
            });
            this.data.rows.unshift(resp);//将提交的评论添加到评论列表中
            this.data.total++;
            callback('评论成功');//告诉子组件 ，该父组件以处理完事件，可执行callback函数
        },
        // 加载下一页评论
        async fetchComment(){
            // 如果评论加载完毕，则什么也不做
            if(!this.hasMore){
                return;
            }
            this.isLoading = true;
            this.page++;
            const resp = await this.fetchData();
            this.data.total = resp.total;
            // 将原来的评论数组与新加载的评论数组合并
            this.data.rows = this.data.rows.concat(resp.rows);
            this.isLoading = false;
        },
        // 处理关于评论的滚动事件
        handleScroll(dom){
            // 如果评论正在加载，则退出
            if(this.isLoading || !dom){
                return;
            }
            const range = 100;//定义一个范围，在此范围内就算进度条到达底部
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);//绝对值
            if(dec <= range){
                this.fetchComment();
            }
        }
    }
}
</script>

<style scoped lang="less">
.blog-comment-container{
    margin:30px 0;
}
</style>