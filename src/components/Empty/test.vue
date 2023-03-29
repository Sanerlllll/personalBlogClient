<template>
  <div class="test-container">
    <Empty></Empty>
  </div>
</template>

<script>
import Empty from './index.vue' 
export default {
    components:{
        Empty,
    }
}
</script>

<style scoped>
.test-container{
  width:200px;
  height:200px;
  /* border:1px solid black; */
  margin:0 auto;
  position: relative;
}

</style>