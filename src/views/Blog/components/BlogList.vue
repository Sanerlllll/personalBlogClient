<template>
    <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
        <ul>
            <li v-for="item in data.rows" :key="item.id">
                <div class="thumb" v-if="item.thumb">
                    <RouterLink :to="{name:'BlogDetail',params:{
                        id:item.id
                    }}">
                        <img 
                        v-lazy="item.thumb"
                        :alt="item.title"
                        :title="item.title">
                    </RouterLink>
                </div>
                <div class="main">
                    <RouterLink :to="{name:'BlogDetail',params:{
                        id:item.id
                    }}">
                        <h2>{{item.title}}</h2>
                    </RouterLink>
                    <div class="aside">
                        <span>日期：{{formatDate(item.createDate)}}</span>
                        <span>浏览：{{item.scanNumber}}</span>
                        <span>评论：{{item.commentNumber}}</span>
                        <RouterLink :to="{name:'CategoryBlog',params:{
                            categoryId:item.category.id
                        }}"
                         class="">{{item.category.name}}</RouterLink>
                    </div>
                    <div class="desc">
                        {{item.description}}
                    </div>
                </div>
            </li>
        </ul>
        <!-- 无数据显示：当rows没有数据且该页面加载完成 -->
        <Empty v-if="data.rows.length === 0 && !isLoading"></Empty>
        <!-- 分页 -->
        <Pager v-if="data.total" :current="routeInfo.page" 
        :total="data.total" 
        :limit="routeInfo.limit"
        @pageChange="handlePageChange($event)"
        ></Pager>
    </div>
</template>

<script>
import Pager from '@/components/Pager';
import fetchData from '@/mixins/fetchData.js';
import {getBlog} from '@/api/blog.js'; 
import {formatDate} from '@/utils'; //导入格式化时间的js
import mainScroll from '@/mixins/mainScroll.js';
import Empty from '@/components/Empty';
export default {
    mixins:[fetchData({total:0,rows:[]}),mainScroll("mainContainer")],
    components:{
        Pager,
        Empty
    },
   
    computed:{
        // 通过路由对象$route获取路由信息
        routeInfo(){ 
            const categoryId = +this.$route.params.categoryId || -1;//分类Id,没有则默认显示全部分类
            const page = +this.$route.query.page || 1;//页数，没有页数则默认第一页
            const limit = +this.$route.query.limit || 10;//一页显示的条数，没有则默认显示10条
            return {
                categoryId,
                page,
                limit
            }
        }
    },
    methods:{
        formatDate,//格式化日期函数
        // 远程获取相应页数数据
        async fetchData(){
            return await getBlog(
                this.routeInfo.page,
                this.routeInfo.limit,
                this.routeInfo.categoryId,

            );
        },
        // 通过点击页数改变路由信息 进而改变路由内容
        handlePageChange(newPage){
            const query = {
                page: newPage,
                limit:this.routeInfo.limit,
            };
            // 当没有分类时，则地址跳转到路由名为Blog的地址，反之则跳转到CategoryId的路由地址
           if(this.routeInfo.categoryId === -1){
                this.$router.push({
                    name:'Blog',
                    query
                })
           }else{
            this.$router.push({
                name:'CategoryBlog',
                query,
                // 动态路由导航
                params:{
                    categoryId: this.routeInfo.categoryId,
                }
            })
           }
        },
},
    watch:{
        // 将要观察的对象作为函数名，当发生变化时调用函数,重新调用远程请求方法拿到数据
        // 此处的$route指的是this.$route
        async $route(){
            this.isLoading = true;
            // 点击页数后将滚动高度设为0
            this.$refs.mainContainer.scrollTop = 0;
            this.data = await this.fetchData(); 
            this.isLoading = false;
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;//平滑滚动
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>