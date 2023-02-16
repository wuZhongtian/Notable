### 四库 vue

- 路由配置

  ```js
  // 前端未找到页面路由（固定不用改）、原来为 /404
  // redirect 路由重定向
  const notFoundRouter = {
    path: '*', redirect: '/welcome', hidden: true
  }
  ```



### 基础能力 react





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

8. 路由传参，当用户使用浏览器的前进后退按钮，可能导致界面空白

   - 错误的解决方案
     - 使用 `<keep-alive>` 指定路由缓存（复用的组件，选择不同内容时，无法重新获取数据）
     - jiinzhi使用replace 替换路由，禁止用户回退（体验极差）
   - 解决思路
     1. 使用**路由守卫**，拦截路由回退，当从详情页跳转到其他非详情页面时并且是回退按钮，删除当前详情页面的历史记录
        - 路由守卫是否可以 检测到浏览器的前进回退按钮
        - 路由拦截到之后，**如何删除当前页面的历史记录？**
     2. 监测组件的激活与失活（每个页面都要加，即使是结合mixin也比较麻烦）
        - 在失活时保存当前数据的id
        - 激活时判断当前id 与之前保存的id 是否一致
          - 不一致就重新获取数据
     3. 动态路径，使用路由缓存
        - 将对应详情页的唯一标识放在url路径中，不同路径就会发起新的请求





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

3. Vue深度选择器

   > 引⽤第三⽅组件，如果需要在组件中局部修改第三⽅组件的样式，⽽⼜不想去除scoped属性造成组件之间的样式污染，可以⽤>>>的⽅式穿透scoped

   - **只作用于css**
   - sass/lesss 可能无法识别，这时候需要使用 /deep/ 选择器
   - vue3中 使用 `:deep()`替代 `/deep/`

   ```vue
   <!-- 
      深度作用选择器 >>>   
      可用于选中UI组件底层内部的标签内容，
      默认只能控制到最外层，除非移除scoped
   -->
   <style scoped>
      .fuck >>> .weui-cells {
   		...
   	}
   </style>
   <!--  sass/lesss 可能无法识别，需要使用 /deep/ 选择器 -->
   <style lang="scss" scoped>
   .select {
     width: 100px;
   
     /deep/ .el-input__inner {
       border: 0;
       color: #000;
     }
   }
   </style>
   ```

4. Vue中使用本地图片

   1.  `src="~@/assets/images/turndown.svg"`
       - 模板的内容是vue-loader处理的，
       - 如果路径以`~`开头，其后的部分将会被看作模块依赖。意味着可以用该特性来引用一个 Node 依赖中的资源
       - 如果路径以`@`开头，也会被看作模块依赖。如果你的 webpack 配置中给`@`配置了 alias，就有用了。所有`vue-cli`创建的项目都默认配置了将`@`指向`/src`
   2.  `:src="require(`@/assets/${this.index}.png`)"`