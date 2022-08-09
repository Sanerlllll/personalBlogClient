// axios拦截器

import axios from 'axios';
import showMessage from '../utils/showMessage';


// 创建axios实例,该实例用法和axios完全一致
const ins = axios.create();
// 添加请求拦截器
ins.interceptors.response.use(function(resp){
    // console.log('拦截器');
    // 如果远程请求有错误
    if(resp.data.code !== 0){
    showMessage({   
        content: resp.data.msg,
        type:"error",
        duration:1500,
    });
    return null;
    }
    // 远程请求没有错误
    return resp.data.data;
});
export default ins;