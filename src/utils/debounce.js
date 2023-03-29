// 函数防抖
export default function(fn,duration=100){
    let timer = null
    return (...args) => {
        clearTimeout(timer);//清除定时器
        timer = setTimeout(() =>{
            fn(...args);
        },duration);
    } 
}