// 懒加载
import eventBus from '@/eventBus';
import debounce from '@/utils/debounce'; 
import defaultImg from '@/assets/default.gif';
// 要加载的图片数组
let imgs = [];
//  设置图片
function setImages(){
    for(const img of imgs){
        setImage(img);
    }
};
// 处理单个图片
function setImage(img){
    //先将图片设为默认图片
    img.dom.src = defaultImg;
    // 首先判断图片是否在视口高度范围内
    const clientHeight = document.documentElement.clientHeight;//视口可见高度
    // console.log(clientHeight);
    const rect = img.dom.getBoundingClientRect();
    // console.log(rect);
    // 一开始图片为加载出来时高度为0，因此设置一个最小高度
    const height = rect.height || 150;
    if(rect.top >= -height && rect.top <= clientHeight){
        //图片在视口范围内
        img.dom.src = img.src;
        // console.log('加载',img.dom);
        // 将处理完成的图片从图片数组中删除
        imgs = imgs.filter((i)=>{
            i !== img;
        })    
    };
}  
// 在事件总线中监听mainScroll事件，触发时该函数
eventBus.$on('mainScroll',debounce(handleMainScroll,50));

function handleMainScroll(){
    setImages();
}
export default {
    // 加到父元素后进行的操作
    inserted(el,binding){
        const img = {
            dom:el, 
            src:binding.value, 
        };
        imgs.push(img);
        // 元素已绑定，立即处理
        setImage(img);
    },
    update(){

    },
    // 当与元素解绑时，利用筛选删除掉与元素绑定时加载的图片
    unbind(el){
        imgs = imgs.filter((img) => {
            img.dom !== el;
        })
    }
}