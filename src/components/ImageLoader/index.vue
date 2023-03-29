<template>
  <div class="image-loader-container">
    <!-- 占位图 -->
    <img v-if="!everyDone" class="placeholder" :src="placeholder"/>
    <!-- 原图 -->
    <img class="origin" :src="src" alt="" @load="handleLoad" 
    :style="{ opacity: originOpacity,transition:`${duration}ms` }"/> 
  </div>
</template>

<script>
export default {
  props:{
    src:{
      type:String, 
      required:true,
    },
    placeholder:{
      type:String,
      required:true,
    },
    duration:{
      type:Number,
      default:2000,
    }
  },
  data(){
    return {
      originLoaded : false, //判断原图状态 是否加载完成,当它为true时，原图opacity应为1
      everyDone:false,//用来判断占位图 ，当原图加载完成时，everyDone为true，移除占位图
    }
  },
  computed:{
    originOpacity(){
      return this.originLoaded ? 1 : 0;
    }
  },
  methods:{ 
    // 当图片触发img元素的load事件时，触发handleLoad事件
    handleLoad(){
      this.originLoaded = true;
      setTimeout(() => {
        this.everyDone = true;
        this.$emit('load');//向父组件抛出事件
      },this.duration)
    }
  }
    
}
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
.image-loader-container{
  width:100%;
  height:100%;
  position:relative;
  overflow:hidden;
  img{
  .self-fill();
  object-fit:cover;
  }
  // 设置占位图的模糊程度:也可这是单位为vw，根据视口宽度调整
  .placeholder{
    filter:blur(10px);
  }
}
</style>