<template>
  <div class="layout-container">
    <div class="left">
         <!-- 左边栏 -->
        <slot name="left" ></slot>
    </div>
   <div class="main">
        <!-- 主区域 -->
        <slot></slot>
   </div>
    <div class="right">
        <!-- 右边栏 -->
        <slot name="right"></slot>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="less" scoped>
.layout-container{
    width:100%;
    height:100%;
    display:flex;
    .left,.right{
        flex:0 0 auto;
        overflow:hidden;
    }
    .main{
        flex:1 1 auto;
        overflow:hidden;
    }
    
}

</style>