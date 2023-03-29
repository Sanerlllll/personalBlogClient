<template>
    <div class="test-container">
        <Loading v-show="isLoading"></Loading>
        <button @click="isLoading=!isLoading" >切换</button>
    </div>
</template>

<script>
import Loading from './';
export default {
    components:{
        Loading
    },
    data(){
        return {
            isLoading:true,
        }
    }

}
</script>

<style scoped lang="less">
.test-container{
    position:relative;
}

</style>