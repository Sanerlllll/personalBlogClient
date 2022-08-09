//根据不同环境导出不同配置
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;

if(process.env.NODE_ENV === 'production'){
    // 导出生产环境
    module.exports = {
        // devtool:"none",//不需要打包源码地图
        plugins: [new BundleAnalyzerPlugin()],
        // 配置外部资源，不需要打包
        externals:{
            vue:"Vue",
            vuex:"Vuex",
            "vue-router":"VueRouter",
            axios:"axios",
        }
    }
}else{
    // 导出开发环境
    module.exports = {

    }
}