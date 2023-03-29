<!-- 首页 -->
<template>
  <div v-loading="loading" class="home-container" ref="container" @wheel="handleWheel">
      <ul class="carouselitem-container" :style="{marginTop}"  @transitionend="hanldeTransitionEnd()">
        <li v-for="item in data" :key="item.id" >
          <Carouslitem :carousel="item"></Carouslitem>
        </li>
      </ul>
      <div v-show="index>=1" class="icon icon-up" @click="switchTo(index - 1)">
        <Icon type="arrowUp"></Icon>
      </div>
       <div v-show="index < data.length-1" class="icon icon-down" @click="switchTo(index + 1)">
        <Icon type="arrowDown"></Icon>
      </div>
      <ul class="indicator">
        <li 
        :class="{
          active:i === index,
        }"
        @click="switchTo(i)"
        v-for="(item,i) in data" :key="item.id"></li>
      </ul>
  </div>
</template>
 
<script>
// import {getBanner} from  '@/api/banner'; //导入banner接口文件
import Carouslitem from './Carouslitem';
import Icon from '@/components/Icon';
import {mapState} from 'vuex';//vuex提供的辅助函数
// import fetchData from '@/mixins/fetchData.js';
export default {
  // mixins:[fetchData([])],
  components:{
    Carouslitem,
    Icon,
  },
  data(){
    return{
      // isLoading:true,//判断图片是否正在加载中
      // banners:[],
      index:0,//当前显示的是第几张轮播图
      containerHeight:0,//整个容器高度
      switching:false,//是否鼠标正在滚动
    }
  },
  created(){
    this.$store.dispatch('banner/fetchBanner')
  },
  mounted(){
    // console.log(this.$refs.container.clientHeight);
    this.containerHeight = this.$refs.container.clientHeight;
    // 监听window的尺寸变化
    window.addEventListener('resize', this.handleResized);
  },
  destroyed(){
    window.removeEventListener('resize',this.handleResized);
  },
  computed:{
    marginTop(){
      return -this.index * this.containerHeight + 'px';
    },
    ...mapState('banner',['loading','data']),
  },
  methods:{
    // 切换轮播图
    switchTo(i){
      this.index = i;
    },
    // 鼠标滚动事件
    handleWheel(e){
      // 如果鼠标正在滚动 则return
      if(this.switching){
      return;
    }
      if(e.deltaY < -5 && this.index >0){
          this.switching = true;
          this.index --;
        }else if(e.deltaY > 5 && this.index <this.data.length-1){
          this.switching = true;
          this.index ++;
      }

    },
    // 滚动结束
    hanldeTransitionEnd(){
      this.switching = false;
    },
    // 监听window尺寸变化事件
    handleResized(){
      this.containerHeight = this.$refs.container.clientHeight;
    },
    // 提供一个获取远程数据的方法
    // fetchData(){
    //   return  getBanner();
    // }
  }
  
}
</script>


<style scoped lang="less">
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';
.home-container{
  width:100%;
  height:100%;
  // background-color:pink;
  position:relative;
  overflow:hidden;//通过bfc解决外边距合并问题
  .carouselitem-container{
    width:100%;
    height:100%;
    transition:500ms;
    li{
      width:100%;
      height:100%;
    }
  }
  ul{
      margin:0;
      padding:0;
      list-style:none;
  }
  .icon{
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    font-size: 30px;
    @gap:20px;
    color:@gray;
    cursor:pointer;
    &.icon-up{
      top:@gap;
      animation: jump-up 1.5s infinite;
    };
    &.icon-down{
      top:auto;
      bottom:@gap;
      animation: jump-down 1.5s infinite;
    };
    @keyframes jump-up {
      0%{
        transform:translateY(5px);
      }
      50%{
        transform:translateY(-5px);
      }
      100%{
        transform:translateY(5px);
      }
    };
     @keyframes jump-down {
      0%{
        transform:translateY(-5px);
      }
      50%{
        transform:translateY(5px);
      }
      100%{
        transform:translateY(-5px);
      }
    }
  }
  .indicator{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    right:15px;    
    li{
      margin-bottom:20px;
      width:10px;
      height:10px;
      background:@words;
      border-radius:50%;
      cursor:pointer;
      border:1px solid #fff;
      &.active{
        background:#fff;
        }
    }
  }
}
</style>