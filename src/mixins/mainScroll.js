/**
 * 处理事件总线中触发、监听、销毁等事件
 * @param {*} refValue  dom元素
 * setMainScroll：设置top的滚动高度回到顶部事件
 * mainScroll：当refValue页面发生滚动时触发该事件，则其他模块可监听到
 * @returns 
 */
export default function(refValue) {
    return {
        mounted(){
        // 在事件总线中监听setMainScroll(totop回到顶部)事件
        this.$bus.$on('setMainScroll',this.handleSetMainScroll);
        this.$refs[refValue].addEventListener('scroll',this.handleMixinScroll);
        },
        beforeDestroy(){
        this.$bus.$emit('mainScroll');//不传第二个参数的话则默认为undefined
        this.$refs[refValue].removeEventListener("scroll", this.handleMixinScroll);
        // 当组件销毁时取消监听事件
        this.$bus.$off('setMainScroll',this.handleSetMainScroll);
        },
       methods:{
        handleMixinScroll(){
            // console.log(refValue)
            // 利用事件总线的方式触发mainScroll事件
            this.$bus.$emit('mainScroll',this.$refs[refValue]);
        },
        // 设置ref的滚动高度
        handleSetMainScroll(scrollTop){
            this.$refs[refValue].scrollTop = scrollTop + 'px';
        },   
       }
    }
}