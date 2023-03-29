<template>
    <div class="blog-category-container" v-loading="isLoading">
        <h2>文章样式</h2>
        <RightList :list="list" @select="handleSelect"></RightList>
    </div>
</template>

<script>
import RightList from './RightList.vue';
import fetchData from '@/mixins/fetchData.js';
import { getBlogTypes } from '@/api/blog';
export default {
    mixins:[fetchData([])],
    components:{
        RightList
    },
    computed:{
        categoryId(){
           return +this.$route.params.categoryId || -1;
        },
        limit(){
           return +this.$route.query.limit|| 10;
        },
        list(){
            // 计算全部文章总数
            const totalArticleCount = this.data.reduce((a,b) => a + b.articleCount,0);
            // 将全部文章总数添加到this.data数组中
            const result = [
                {name:'全部',id:-1,articleCount:totalArticleCount},
                ...this.data
            ];
            return result.map(it=>({
                ...it,
                isSelect:it.id === this.categoryId,
                aside:`${it.articleCount}篇`
            }));
        },
    },
    methods:{
        async fetchData(){
            return await getBlogTypes();
        },
        handleSelect(item){
            // 通过点击的分类改变路由
            const query = {
                page:1,
                limit:this.limit
            };
            // 当没有分类时，则地址跳转到路由名为Blog的地址，反之则跳转到CategoryId的路由地址
        //    先判断点击的分类是否为'全部'
           if(item.id === -1){
                this.$router.push({
                    name:'Blog',
                    query
                })
           }else{
            // 点击的是某一个具体分类
            this.$router.push({
                name:'CategoryBlog',
                query,
                params:{
                    categoryId: item.id,
                }
            })
           }
        }
    }
}
</script>

<style scoped lang="less">
.blog-category-container{
    width:300px;
    height:100%;
    box-sizing: border-box;
    padding:20px;
    position: relative;
    overflow-y:auto;
    h2{
        font-weight: bold;
        letter-spacing:2px;
        margin:0;
        font-size:1em;
    }
}

</style>