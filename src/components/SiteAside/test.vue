<template>
  <div class="test-container">
    <SiteAside></SiteAside>
  </div>
</template>

<script>
import SiteAside from './';
export default {
    components:{
        SiteAside
    }
}
</script>

<style scope lang="less">
body{
    margin:0;
};
.test-container{
    width:250px;
    height:600px;
    padding:0;
}

</style>