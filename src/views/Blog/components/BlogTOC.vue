<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import {debounce} from "@/utils";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data(){
    return{
      activeAnchor:'',
    }
  },
  created(){
    this.setActiveAnchorDebounce = debounce(this.setActiveAnchor,100);
    // 使用事件总线中的监听函数
    this.$bus.$on('mainScroll',this.setActiveAnchorDebounce);
  },
  destroyed(){
    this.$bus.$off('mainScroll',this.setActiveAnchorDebounce);
  },
  computed:{
    // 使用递归，得到toc的每个属性，并为其添加isSelect属性
    tocWithSelect(){
      const getToc = (toc=[]) => {
        return toc.map((t)=>({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children:getToc(t.children)
        }))
      };
      return getToc(this.toc);
    },
    // 使用递归，循环遍历toc中每一个anchor，并拿到其绑定的dom元素
    doms(){
      const doms= [];
      const addToDoms = (toc) => {
        for(const t of toc){
          // 将拿到的dom元素添加到doms数组中
          doms.push(document.getElementById(t.anchor));
          if(t.children && t.children.length>0){
            addToDoms(t.children)
            }
        };
       
      };
      addToDoms(this.toc);
      return doms;
    }
  },
  methods: {
    handleSelect(item) {
      // console.log(item);
      // 将地址栏中的哈希值赋值为item中的anchor属性
      location.hash = item.anchor;
    },
    // 将activeAnchor设为正确值
    setActiveAnchor(scrollDom){
      // 如果监听的dom元素不存在，则无需运行
      if(!scrollDom){
        return;
      }
      this.activeAnchor = '';//先清空之前的值
      const range = 200;//设定一个距离视口顶部的高度
      for(const dom of this.doms){
        // 如果当前dom不存在，则进行下一轮循环
        if(!dom){
          continue;
        };
        // 得到当前dom距离视口顶部的高度
        const top = dom.getBoundingClientRect().top;
        // 当top值在0-range之间时
        if(top >=0 && top <=range){
          this.activeAnchor = dom.id
        }else if(top > range){
          // 当dom位于下方时,没有被选中的
          return;
        }else{
          // 当dom位于上方时,先将this.activeAnchor设为自己的id，
          // 继续往下，如果后面的dom符合range范围，则会将其覆盖
          this.activeAnchor =dom.id;
        }
      }
    }
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
