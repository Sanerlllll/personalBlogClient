// 导入Vue构造函数
import Vue from "vue"
// 导入vue-router插件
import VueRouter from 'vue-router'
// 导入路由匹配规则
import routes from './routes'
import {titleController} from '@/utils'

// 使用vue的构造函数中的静态方法use(),传入一个插件对象来使用插件，
// 使用传统方法在html中引入vueRouter插件的话，会自动注册成为插件，且有一个全局变量Router，
// 不需要使用Vue.use方法注册插件
if(!window.VueRouter){
  Vue.use(VueRouter);
}

// VueRouter实际上是一个构造函数,得到一个实例
const router = new VueRouter({
  routes,  // 路由规则配置：每一项是一个数组，对应着一个规则
  mode:"history", //配置路由模式
}); 
// 页面跳转过后的操作
router.afterEach((to,from) => {
  if(to.meta.title){
    titleController.setRouteTitle(to.meta.title);
  }
})
// 导出router实例
export default router;