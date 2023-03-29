<!-- 轮 播图 -->
<template>
  <div class="carousel-item-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImageLoader @load="this.showWords" :src="carousel.bigImg" :placeholder="carousel.midImg"></ImageLoader>
    </div>
    <div class="title" ref="title">
      {{carousel.title}}
    </div>
    <div class="desc" ref="desc">
      {{carousel.description}}
    </div>
  </div> 
</template>

<script>
import ImageLoader from '@/components/ImageLoader';
export default { 
  props:["carousel"],
  components:{
    ImageLoader,
  },
  data(){
    return{
      titleWidth:0,
      descWidth:0,
      containerSize:null,//外层容器的尺寸
      innerSize:null,//内层图片的尺寸
      mouseX:0,//鼠标横坐标
      mouseY:0,//鼠标纵坐标
    }
  },
  computed:{
    // 设置图片坐标
    imagePosition(){
      // 图片大于容器时多出的高度以及宽度
      if(!this.innerSize || !this.containerSize){
        return {};
      }
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      // console.log(extraWidth,extraHeight);
      const left = -(extraWidth / this.containerSize.width) * this.mouseX;
      const top = -(extraHeight / this.containerSize.height) * this.mouseY
      return {
        // 最好不要用left和top，会导致页面重排
        // left:left + 'px',
        // top:top + 'px'
        transform:`translate(${left}px,${top}px)`
      }
    },
    center(){
      // 最初设置鼠标位置在中心
      return {
        x:this.containerSize.width /2,
        y:this.containerSize.height/2
      }
    }
  },
  mounted(){
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSizes();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener('resize',this.setSizes);
  },
  destroyed(){
    window.removeEventListener('resize',this.setSizes);
  },
  methods:{
    showWords(){
      // 先将文字元素显现出来且宽度设为0
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      //强制浏览器重新渲染一次
      this.$refs.title.clientWidth;
      // 设置动画效果且慢慢讲宽度过渡为正常
      this.$refs.title.style.transition = '1s';
      this.$refs.title.style.width = this.titleWidth + 'px';

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;//强制浏览器重新渲染一次
      this.$refs.desc.style.transition = '1s 1s';
      this.$refs.desc.style.width = this.descWidth + 'px';

    },
    setSizes(){
      // 给容器尺寸重新赋值
    this.containerSize = {
      width:this.$refs.container.clientWidth,
      height:this.$refs.container.clientHeight
    },
    this.innerSize = {
      width:this.$refs.image.clientWidth,
      height:this.$refs.image.clientHeight
    }
    // console.log(this.containerSize,this.innerSize)
    },
    handleMouseMove(e){
      // 拿到container距离视口的尺寸
      const rect = this.$refs.container.getBoundingClientRect();
      // console.log(rect);
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave(){
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    }
  }
  /**
   * 图片移动思路：
   * （1）首先得到内外层容器的宽高
   * （2）记录鼠标在容器内位置：注册鼠标移动事件，通过此实际按拿到鼠标相对于视口的距离clientX，
   *      鼠标横坐标 = 鼠标相对于视口距离 - 外层容器相对于视口距离
   * （3）计算图片坐标。找特殊情况，比如鼠标在外层容器的最右侧，
   *      图片溢出的宽度（extraWidth） = 图片宽度 - 容器宽度 
   *      图片的left与鼠标的位置相关，当鼠标在容器最右侧时，图片溢出宽度(extraWidth)/鼠标横坐标 = 当鼠标在容器中间时，图片溢出宽度(x)/ 鼠标位置
   *      即 -extraWidth / 容器宽度 = x / mouseX ,由此可计算出x,即图片的left值
   *      
   */
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.carousel-item-container{
  width: 100%;
  height: 100%;
  color:#fff;
  position: relative;
  overflow: hidden;
  .carousel-img{
    width: 105%;
    height: 105%;
    transition:0.2s;
    position:absolute;
    left:0;
    top:0;
    // z-index:-1;
  };
  .title,.desc{
    position:absolute;
    top:50%;
    left:30px;
    letter-spacing: 5px;
    color:#fff;
    text-shadow: 1px 0 3px #FC0; 
    white-space: nowrap;
    overflow:hidden;
    opacity:0;
  };
  .title{
    top:40%;
    font-size:20px;
  };
  .desc{
    color:lighten(@gray,10%);
  }
}
</style>