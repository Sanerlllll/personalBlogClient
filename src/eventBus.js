// 用vue的方法使用事件总线
import Vue from 'vue';
/**
 * 事件名1：mainScroll
 * 含义：主区域的滚动条位置变化后触发
 * 参数：滚动的dom元素,如果参数值为undefined，则表示dom元素已不存在
 * 
 * 事件名2：setMainScroll
 * 含义：当需要设置滚动条位置时触发
 * 参数：滚动高度
 */
// 将该方法注入到Vue原型中，使得每个组件都拥有该方法
const app = new Vue({});
Vue.prototype.$bus = app;
// 将该模块导出，便于在js模块使用
export default app;







/**
 * 要监听的事件
 * {
 *     "eventName1":[],
 *     "eventName2":[handler1,handler2]
 * }
 */
// const listeners = {};

// // 事件总线：跨越组件，跨越js模块
// export default{
//     // 监听事件  eventName:事件名 handler:事件处理函数
//     $on(eventName,handler){
//         if(!listeners[eventName]){
//             listeners[eventName] = new Set();
//             console.log(listeners[eventName]);
//         };
//         listeners[eventName].add(handler);
//     },
//     // 移除监听事件
//     $off(eventName,handler){
//         if(!listeners[eventName]){
//             return;
//         };
//         listeners[eventName].delete(handler);
//     },
//     //触发事件，并传递参数  args:事件参数
//     $emit(eventName,...args){
//         if(!listeners[eventName]){
//            return;
//         };
//         // 循环该事件的处理函数，并向每个处理函数传递事件参数
//         for(const handler of listeners[eventName]){
//             handler(...args);
//         }
//     }
// }
