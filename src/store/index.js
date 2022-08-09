import Vuex from "vuex";//导入vuex插件
import Vue from "vue";
import banner from './banner.js';
import setting from './setting.js';
import about from './about.js';
import project from './project.js';

// 使用传统方法在html中引入vuex插件的话，会自动注册成为插件，且有一个全局变量Vuex，
// 不需要使用Vue.use方法注册插件
if(!window.Vuex){
    Vue.use(Vuex);//利用vue的静态方法use，使用插件
}
// 使用Vuex插件中的构造方法Store
const store = new Vuex.Store({
    modules:{
        banner,
        setting,
        about,
        project
    },
    strict:true,
});
export default store;