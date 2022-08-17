## [webpack](https://www.webpackjs.com/)

- 现代JavaScript应用 的静态模块打包器，在项目上线前打包

- 文件压缩合并：html css js 图片 表格....

- 语法转化

  - ```shell
    less/sass/stylus  ===>   css
    ES6+  ===>  ES5
    typescript  ===>  js
    ```

- 为开发提供服务器环境：代码热更新

- 其他特点：

  - 兼容所有模块化规范，借助webpack都可以直接在代码中使用
  - 



### webpack使用

```shell
# 初始化项目
yarn init -y
# 安装webpack 和 webpack-cli(使用webpack4+时)
yarn add --save-dev webpack webpack-cli

# 在项目的package.json文件中配置命令
"scripts": {
    "start": "webpack --config webpack.config.js",
    "build": "webpack 要打包的文件路径 -o 输出到的文件路径"
}
# 运行package.json文件中配置的命令
npm run 命令      #例：npm run build
```



