<template>
  <ul class="right-list-container">
    <li v-for="(item,i) in list" :key="i" >
    <span :class="{active:item.isSelect}" @click="handleClick(item)">{{ item.name }}</span>
    <span v-if="item.aside" class="aside" 
    :class="{active:item.isSelect}"
    @click="handleClick(item)"
    >{{item.aside}}</span>
    <!-- 使用当前组件 组件递归 -->
    <RightList class="right-list-container" :list="item.children" @select="handleClick"></RightList>
    </li>
  </ul>

</template>

<script>
export default {
    name:'RightList',//给组件取名，用于在组件内部使用本组件
    props:{
        // 列表数组，列表的每一项都是一个对象
        list:{
            type:Array,
            default:() => [],//通过函数返回一个空数组
        }
    },
    data(){
        return {

        }
    },
    created(){
        // console.log(this.list);
    },
    methods:{
        handleClick(item){
            if(!item.isSelect){
            this.$emit('select',item);
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.right-list-container{
    list-style: none;
    padding:0;
    .right-list-container{
        margin-left:1em;
    };
    li{
        min-height:35px;
        line-height:35px;
        cursor: pointer;
        font-size:14px;
        span{
            &.active{
            font-weight: bold;
            color:@warn;
        }
        };
        .aside{
            margin-left:30px;
            font-size:12px;
            color:@gray;
             &.active{
            font-weight: bold;
            color:@warn;
             }
        }
    }

}
</style>