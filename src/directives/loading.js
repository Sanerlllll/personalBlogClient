import loadingUrl from '@/assets/loading.svg';
import styles from './loading.module.less';
// 配置全局loading指令 
// el:被绑定的元素对应的真实的dom
// binging：指令中的相关信息
export default function(el,binding){
    // 根据binging.value的值决定创建或删除img元素
    // 如果当前有img元素则拿到
    const curImg = getLoadingImg(el);
    if(binding.value){
        //如果当前el中没有带有loading的img元素则创建一个
        if(!curImg){
            const img = createLoadingImage();
            el.appendChild(img);
        }
    }else{
        if(curImg){
            curImg.remove();
        }
    }
}

// 得到el元素中带有loading指令的img元素
function getLoadingImg(el){
    return el.querySelector('img[data-role=loading]');
}
// 创建带有loading效果的img元素
function createLoadingImage(){
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}