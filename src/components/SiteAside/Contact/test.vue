<template>
  <div class="test-container">
    <Contact></Contact>
  </div>
</template>

<script>
import Contact from './'
export default {
    components:{
        Contact
    }

}
</script>

<style scoped>
.test-container{
    width:400px;
    height:250px;
    border:1px solid rgba(0,0,0,0.5);
    background:rgba(0,0,0,0.8);
    padding:20px 0;
}
</style>