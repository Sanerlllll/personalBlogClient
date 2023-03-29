<template>
  <div class="test-container">
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from './'
export default {
    components:{
        Menu,
    }
}
</script>

<style scoped lang="less">
.test-container{
    width:400px;
    height:400px;
    border:1px solid rgba(0,0,0,0.5);
    background:rgba(0,0,0,0.8);
    padding:20px 0;
}

</style>