## [uni-app](https://uniapp.dcloud.net.cn/)

> uni id    uni Admin     uniCloud

### 基础学习

#### 初识uniapp

1. 创建项目

   hbuilder 文件 -- 新建项目 -- uniap/vue2/vue3

2. 项目结构

   ```js
   ┌─uniCloud              云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
   │─components            符合vue组件规范的uni-app组件目录
   │  └─comp-a.vue         可复用的a组件
   ├─utssdk                存放uts文件
   ├─pages                 业务页面文件存放的目录
   │  ├─index
   │  │  └─index.vue       index页面
   │  └─list
   │     └─list.vue        list页面
   ├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
   ├─uni_modules           存放[uni_module](/uni_modules)。
   ├─platforms             存放各平台专用页面的目录，详见
   ├─nativeplugins         App原生语言插件 详见
   ├─nativeResources       App端原生资源目录
   │  └─android            Android原生资源目录 详见
   ├─hybrid                App端存放本地html文件的目录，详见
   ├─wxcomponents          存放小程序组件的目录，详见
   ├─unpackage             非工程代码，一般存放运行或发行的编译结果
   ├─AndroidManifest.xml   Android原生应用清单文件 详见
   ├─main.js               Vue初始化入口文件
   ├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
   ├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
   ├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
   └─uni.scss  		   uni-app内置的常用样式变量
   ```

3. 运行项目：直接点运行....

   > 运行配置：
   >
   > - 运行--运行到web服务器--运行配置--添加对应浏览器/小程序 安装路径
   > - 运行到微信小程序（需提前在微信开发工具、设置、安全设置中打开服务端口）

4. 创建页面

   - 在pages文件夹右键，新建页面，会自动生成对应页面，可勾选直接在pages中注册

     ![image-20221126235341993](images/uniapp/image-20221126235341993.png)

5. 页面配置  pages.json （类wx）

   - 官网文档 -- 全局文件 -- pages.json中查看
   - 作用域越大，优先级越低

6. 组件使用（类wx）

   - 在uniapp中可以写div span等原生标签，虽不报错，但在不同平台存在兼容性问题，因此使用官方提供组件更为合适。

7. 样式单位  rpx  （类wx）

   - 750rpx == 100vw == 屏幕可视野宽度的100%
   - 响应式单位

8. [组件局部注册 easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)

   > - 传统Vue中需要三步  import引入  components注册  使用
   > - uniapp中可自动引入（HBuilderX 2.5.5起支持easycom组件模式）
   >   - 组件安装在components目录下，并符合 components/组件名称/组件名称.vue 目录结构。就可以不用引用、注册，直接在页面中使用
   >   - <组件名称></组件名称>

   - 优点：
     - easycom打包后会自动剔除没有使用的组件，组件库批量安装，随意使用，自动按需打包。
     - `easycom`是自动开启的，不需要手动开启
     - 引入组件无需`import  components`，即可在任意页面使用
     - 组件名完全一致的情况下，`easycom`引入的优先级低于手动引入（区分连字符形式与驼峰形式）
     - 可以在`pages.json`的`easycom`节点进行个性化设置，如关闭自动扫描，或自定义扫描匹配组件的策略
     - `easycom`只处理vue组件，不处理小程序专用组件（如微信的wxml格式组件）

9. 特殊的修饰符

   - `.natice`   给自定义标签使用原生事件

     ```html
     <!-- 这里的 @click 会被认为是自定义事件 -->
     <myevent @click="onClick"></myevent>
     
     <!-- 使用.natice修饰符 给自定义标签使用原生事件 -->
     <myevent @click="onClick"></myevent>
     ```

     



### p26
