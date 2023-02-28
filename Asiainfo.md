### 四库 vue

- 路由配置

  ```js
  // 前端未找到页面路由（固定不用改）、原来为 /404
  // redirect 路由重定向
  const notFoundRouter = {
    path: '*', redirect: '/welcome', hidden: true
  }
  ```



### 数据交付平台 vue

> 郑州数据交易中心 后台管理

1. 异步组件（只在需要的时候才从服务器加载，**性能优化**）

   ```js
   // 直接引入
   const MyComponent = ()=>import('./my-async-component')
   
   // 路由配置中直接引入
   components: () => import('./my-async-component');
   ```

2. 路由配置 router.js

3. 载入图片（一切皆模块）

   ```vue
   <!-- img的src使用methods中的方法，动态加载图片  -->
   <img class="img-di" :src="getContextImgPath('new-dacp-icon_zhengzhou.jpg')" />
   
   <script>
   // methods中配置获取图片的方法，使用require导入模块
   getContextImgPath(imgsrc) {
         return require(`./img/@2x1440/${imgsrc}`);
   },
   </script>
   ```

4. 抽离axios请求

   1. 将请求封装为方法，写在单独api文件并导出
      - 接收路径参数，拼接到axios请求路径中
      - return axios请求（promise对象）
   2. 使用时，调用方法，传入路径，.then处理返回值

5. intro.js

   - 便捷的**用户指引**插件

6. [vxe-table v4 (vxetable.cn)](https://vxetable.cn/#/table/start/install)

   - 近乎无敌的 Vue表格UI库
   - 自定义表格、侧边栏等。。。  包括动态渲染如下效果

7. 编程式路由导航（子组件之间共用一个坑）

   - 父组件中同时存在多个子组件
   - 在子组件A中挖个坑  `<router-view></router-view>`
   - 在子组件B中可以通过编程路由导航进行路由切换，如果B中没坑，切换的页面展示在A组件的坑中





### 驾驶舱数据大屏

1. App.vue中仅有一个路由坑，其他什么都不做

   - 方便后期内容的扩充
   - 更好的利用路由控制界面

2. css好看的字体

   ```css
   .title {
     font-weight: 600;
     font-size: 36px;
     color: #B7F0FD;
     letter-spacing: 2px;
     text-shadow: 0px 0px 3px #0069FF, 0px 0px 3px #0069FF,
       0px 0px 3px #0069FF, 0px 0px 3px #0069FF;
   }
   ```

   

4. Vue中使用本地图片

   1.  `src="~@/assets/images/turndown.svg"`
       - 模板的内容是vue-loader处理的，
       - 如果路径以`~`开头，其后的部分将会被看作模块依赖。意味着可以用该特性来引用一个 Node 依赖中的资源
       - 如果路径以`@`开头，也会被看作模块依赖。如果你的 webpack 配置中给`@`配置了 alias，就有用了。所有`vue-cli`创建的项目都默认配置了将`@`指向`/src`
   2.  `:src="require(`@/assets/${this.index}.png`)"`