<template>
    <div class="empty-container">
        <Icon type="empty"></Icon>
        <p>{{text}}</p>
    </div>
</template>

<script>
import Icon from '../Icon';
export default {
    components:{
        Icon
    },
    props:{
        text:{
            type:String,
            default:'无数据',
        }
    }
}
</script> 

<style scoped lang="less">
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';
/* 使该组件在父容器中居中 */
.empty-container{
   .self-center();
    // position:absolute;
    // top:50%;
    // left:50%;
    // transform:translate(-50%,-50%);
    color:@gray;
    text-align: center;

}
.icon-container{
    font-size:72px;
    // color:@gray;
}
</style>