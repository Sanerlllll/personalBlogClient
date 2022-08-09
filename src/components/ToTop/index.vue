<template>
  <div class="to-top-container" v-show="show" @click="handleClick">
    顶部
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:false
        }
    },
    created(){
        this.$bus.$on('mainScroll',this.handleScroll);
    },
    destroyed(){
        this.$bus.$off('mainScroll',this.handleScroll);
    },
    methods:{
        handleScroll(dom){
            if(!dom){
                this.show = false;
                return;
            }
            // 当dom的scrollTop大于500是为true
           this.show = dom.scrollTop >= 500;
        },
        handleClick(){
            // 点击回到顶部
            this.$bus.$emit('setMainScroll',0);
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.to-top-container{
    width:50px;
    height:50px;
    background:@primary;
    border-radius: 50%;
    position:fixed;
    z-index:999;
    bottom:50px;
    right:50px;
    text-align: center;
    line-height: 50px;
    cursor:pointer;
    color:#fff;
}
</style>