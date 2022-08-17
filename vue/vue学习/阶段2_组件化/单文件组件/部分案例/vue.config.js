// module.exports = {
//     //关闭语法检查
//     lintOnSave: false,
//     devServer: {
//         //开启代理服务器，告诉浏览器代理转发发给谁
//         Proxy: "http://127.0.0.1"
//     }
// }


module.exports = {
    // 两种开启代理服务器的方法不能同时使用   
    devServer: {
        proxy: {
            // "/api" 表示代理服务器请求的前缀，根据需要自定义
            // 请求前缀默认是请求路径的一部分，且是最开始的部分
            // pathRewrite:{'^/api':''},正则,路径重写，将以api开头的部分置为空,消除请求前缀对路径的影响
            // target 请求的url
            '/api': {
                target: "http://127.0.0.1",
                pathRewrite: { '^/api': '' },
                // ws:true,  用于支持websocket
                ws: true,
                //  changeOrigin: true 控制请求头中的 host值
                // true 表示隐藏自己的请求来源，避免请求拦截
                // false 表示实话实说,会告诉请求的服务器自己的地址
                changeOrigin: true
            },
            '/wzt': {
                //配置多个代理，直接追加配置项即可
                target: "http://127.0.0.2",
                pathRewrite: { '^/wzt': '' },
                ws: true,
                changeOrigin: true
            }
        }
    }
}