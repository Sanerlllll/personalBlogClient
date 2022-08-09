<template>
  <ul class="contact-container">
    <li>
        <a target="_blank" :href="data.github">
            <div class="icon">
                <Icon type="github"></Icon>
            </div>
            <span>{{data.githubName}}</span>
        </a>
    </li>
     <li>
        <a :href="`mailto:${data.mail}`">
            <div class="icon">
                <Icon type="mail"></Icon>
            </div>
            <span>{{data.mail}}</span>
        </a>
    </li>
     <li>
        <a href="">
            <div class="icon">
                <Icon type="qq"></Icon>
            </div>
            <span>{{data.qq}}</span>
        </a>
        <div class="pop">
            <img :src="data.qqQrCode" alt="qq">
        </div>
    </li>
     <li>
        <a href="">
            <div class="icon wechat">
                <Icon type="weixin"></Icon>
            </div>
            <span>{{data.weixin}}</span>
        </a>
        <div class="pop">
            <img :src="data.weixinQrCode" alt="微信">
        </div>
    </li>
  </ul>
</template>

<script>
import Icon from '@/components/Icon/index.vue';
import {mapState} from 'vuex';

export default {
    components:{
        Icon,
    },
    computed:{
        ...mapState('setting',['data'])
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/global.less';
@import '~@/styles/var.less';
.contact-container{
    color:@gray;
    margin:0;
    padding:20px;
    @li-height:30px;
    font-size: 14px;
    list-style:none;
    li{
        height:@li-height;
        line-height:30px;
        margin:15px 0;
        cursor:pointer;
        position: relative;
        &:hover .pop{
            transform:scale(1);
        };
    };
    a{
        display:flex;
        align-items:center;
    };
    .icon{
    font-size:28px;
    margin-right: 10px;
    &.wechat{
        font-size:34px;
        text-indent: -3px;
    }
    };
    .pop{
        position: absolute;
        left:0;
        bottom:@li-height + 5px;
        object-fit: cover;
        border-radius:5px;
        background-color:#fff;
        padding:5px 15px;
        transform:scaleY(0);
        transform-origin: center bottom;
         transition:.5s;
        img{
            width:100px;
            height:100px;
        }
        &::after{
            content: "";
            border:10px solid ;
            border-color:#fff  transparent transparent transparent;
            position: absolute;
            bottom:-20px;
            left:50%;
            transform: translateX(-50%);
        }
    }
}


</style>