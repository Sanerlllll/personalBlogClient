// 入口文件:启动vue 渲染根组件
import './mock' //导入模拟数据的文件
import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from './router'
import "./eventBus";//导入事件总线函数
import store from './store';//导入仓库
store.dispatch('setting/fetchSetting');//一开始就触发

// 导入弹窗，并将其注入到vue实例方法中
import showMessage from './utils/showMessage';
Vue.prototype.$showMessage = showMessage;

// 注册全局指令
import vLoading from '@/directives/loading';
import vLazy from '@/directives/lazy.js';
Vue.directive('loading',vLoading);
Vue.directive('lazy',vLazy);

new Vue({
  router,
  store,//向Vue配置中注入store
  // 根据模板APP渲染出虚拟节点树，生成真实dom节点
  render: h => h(App),
}).$mount('#app') 

// 测试
import * as blogApi from '@/api/blog.js';
// blogApi.getSingleBlog('3').then((r) => console.log(r));
// blogApi.postComment({
//   nickname: 'Sanerl',
//   content:'歌曲：眼泪落下之前',
//   blogId:'0928'
// }).then((r) => {
//   console.log(r);
// })
// blogApi.getComment('1').then((r) => console.log(r));

// function handler1(data) {
//   console.log("handler1", data);
// }
// function handler2(data) {
//   console.log("handler2", data);
// }
// // eventBus.$on("event1", handler1);
// // eventBus.$on("event1", handler2);
// // eventBus.$on("event2", handler1);

// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2;
// import {getSetting} from '@/api/setting';
// getSetting().then((resp)=>{
//   console.log(resp)
// })