## Vite

简介

- 与 vue-cli同类型，都属于项目初始化构建工具，相当于第二代vue项目构建工具
- `vite`生产环境下打包需要借助`Rollup`完成

特性：

- Vite冷启动服务，在开发预览时不进行打包，使用`ES6 import`
  - 项目过大时，webpack需要处理的时间就会更长
- 实时热更新，开发时代码更新保存时页面自动更新
- 按需进行编译，不会刷新全部DOM
- Vite的模块化规范基于 es6 module 不支持 commonjs模块化
  - webpack中，可以混用 es6和commonjs模块化，侧重于兼容性（必须一次性解析所有依赖）
  - vite侧重于浏览器开发的体验（按需解析依赖）

趋势：

- Vite是Vue团队的官方出品，vue-cli将把vite作为预设构架工具
- vite目前只基于浏览器项目
- vite也支持react项目，也支持angular项目，svelte项目





### 基础知识

#### 构建工具

> 可以让开发者不用关心代码是如何在浏览器运行的，只需要一份配置文件，他就能进行一系列的处理

- 企业可能需要的功能

  > 稍微修改一点代码，就需要执行一系列麻烦的操作

  - 如果遇到TS文件,需要使用tsc将ts文件转换为js
  - React/Vue代码，需要安装react-compiler / vue-compiler 将jsx文件或vue文件 转换为js文件
  - less/sass代码，需要安装 less-loader，sass-loader等一系列编译工具
  - 语法降级 bable，将es新语法转化为低版本浏览器支持的语法
  - 体积优化 uglifyjs：将代码进行压缩变成体积更小性能更高的代码

- 构建工具的功能

  1. 将大量模块集成在一起，我们只需要关注自己写的代码，会自动进行构建流程
  2. 模块化开发支持：支持直接从node_modules中引入代码 + 多种模块化支持
  3. 提高项目性能：打包过程进行 文件压缩、代码分割
  4. 优化开发体验：
     - 热更新：构建工具自动监听文件的变化，自动进行重新打包，再浏览器重新运行
     - 开发服务器：解决跨域问题，用vue-cli react-cli creat-react-app

- 市面常见的构建工具

  - webpack （国内主流）
  - vite
  - esbuild
  - parcel（国外）          rollup      grunt



#### vite脚手架

 p3



