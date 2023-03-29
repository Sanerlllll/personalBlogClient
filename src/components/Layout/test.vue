<template>
    <div class="test-container">
         <Layout>
            <!-- 左边栏区域，宽度适应内容，溢出隐藏 -->
                <!-- 主区域，宽度占满剩余空间，溢出隐藏 -->
            <div class="main">
                主区域
            </div>
                <!-- 右边栏区域，宽度适应内容，溢出隐藏 -->
            <template #right>
                <div class="right">
                    右边栏
                </div>
            </template>
        </Layout>
    </div>
   
</template>

<script>
import Layout from './';
export default {
    components:{
        Layout
    }

}
</script>

<style scoped lang="less">
.test-container{
    width:70%;
    height:600px;
    border:1px solid black;
    .left{
        width:200px;
        height:100%;
        background-color:lightblue
    };
    .main{
        width:100%;
        height:100%;
        background-color:pink;
    };
    .right{
        width:150px;
        height:100%;
        background-color:yellowgreen;
    }
}

</style>