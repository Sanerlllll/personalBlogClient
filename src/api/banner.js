import request from './request';
// import showMessage from '../utils/showMessage';

// // 创建axios实例,该实例用法和axios完全一致
// const ins = axios.create({});
// ins.interceptors.response.use(function(resp){
//     console.log(resp);
// });

export async function getBanner(){
    return await request.get('/api/banner');
    // console.log(resp.data);//输出响应体
}
