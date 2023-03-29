// vue-cli的配置文件


// vue-cli是在node环境下运行的，因此要使用common JS导出
module.exports = {
    devServer:{
        proxy:{
            "/api":{
                target:"http://test.my-site.com",
            }
        }
    },
    // 配置webpack及webpack插件
    configureWebpack:require("./webpack.config"),
}