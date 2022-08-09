// 路由匹配规则
// import Home from '@/views/Home'
// import About from '@/views/About'
// import Blog from '@/views/Blog'
// import Project from '@/views/Project'
// import Message from '@/views/Message'
// import BlogDetail from '@/views/Blog/Detail'
import NotFound from '@/views/NotFound';//导入404组件
import 'nprogress/nprogress.css';//导入css
import {satrt,done,configure, start} from 'nprogress';//导入nprogress中的start、done方法以及配置函数
configure({
  trickleSpeed:20,//设置加载速度
  showSpinner:false //不显示加载的圆圈
})
function delay(duration) {
  return new Promise((resolve) =>{
    setTimeout(() =>{
      resolve();
    },duration);
  })
};
// 封装加载异步组件的函数
function getPageComponent(pageComResolver){
  return async () => {
      start();//开始加载
      // vue-cli向浏览器注入了process配置，用于判断当前node环境
      // 如果是开发环境，则延迟两秒
      if(process.env.NODE_ENV === 'development'){
        await delay(1000);
        console.log('延迟1秒');
      }
      const comp = await pageComResolver();
      done();//加载完成
      return comp;
  }
}

// 动态导入组件依赖，打包结果的src包会把不同页面的代码打包到不同文件中
export default [
    // 配置路由名，使导航根据不同路由名实现地址的转换以及组件的渲染
    // () => import("") 为路由懒加载：用到该组件时，才会去加载components中的组件，最终导致打包结果分包
    {name:"Home",path:"/",component:getPageComponent(() => import(/*webpackChunkName:"home"*/"@/views/Home")),meta:{title:'首页'}},
    {name:"About",path:'/about',component:() =>import(/*webpackChunkName:"about"*/"@/views/About"),meta:{title:'关于我'}},
    {name:"Blog",path:'/blog',component:() =>import(/*webpackChunkName:"blog"*/"@/views/Blog"),meta:{title:'博客'}},
    {name:"CategoryBlog",path:'/blog/cate/:categoryId',component:() =>import(/*webpackChunkName:"blog"*/"@/views/Blog"),meta:{title:'文章'}},
    {name:"BlogDetail",path:'/blog/:id',component:() =>import(/*webpackChunkName:"detail"*/"@/views/Blog/Detail"),meta:{title:'文章详情'}},
    {name:"Project",path:'/project',component:() =>import(/*webpackChunkName:"project"*/"@/views/Project"),meta:{title:'项目&效果'}},
    {name:"Message",path:'/message',component:() =>import(/*webpackChunkName:"message"*/"@/views/Message"),meta:{title:'留言板'}},
    {name:"NotFound",path:'*',component:NotFound}
    // * 表示前面的都没匹配则被该组件匹配
  ];