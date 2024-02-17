# [Next.js](https://nextjs.org/)

> - 样式：支持您首选的样式化方法，包括CSS Modules、Tailwind CSS和CSS-in-JS
> - [路由](https://nextjs.org/docs/app/building-your-application/routing)：基于文件系统的路由器，构建在服务器组件之上，支持布局、嵌套路由、加载状态、错误处理等
> - 渲染：Client-side and Server-side Rendering with Client and Server Components.通过Next.js在服务器上使用静态和动态渲染进一步优化 Edge和Node.js运行时上的流媒体。
> - 优化：图像、字体和脚本优化，以改善应用程序的核心Web关键点和用户体验。
> - Next.js现在默认附带TypeScript，ESLint和Tailwind CSS配置。





## 基础入门

### 前置概念

#### AppRouter vs PagesRouter

> 网页路由器，App Router是更新的路由器，允许使用React最新功能，例如服务器组件和流。Pages Router是最初的Next.js路由器，它允许您构建服务器渲染的React应用程序，并继续支持旧的Next.js应用程序。
>
> 本文以AppRouter为主展开：



### [[Network Boundary 网络边界](https://nextjs.org/learn/react-foundations/server-and-client-components#network-boundary)

> - 网络边界是分隔不同环境的概念线
> - **Next.js默认使用服务器组件**，提高应用程序的性能



#### 使用客户端组件

- 请在文件顶部添加React `'use client'`指令。这告诉React在客户端上渲染组件。



![image-20240211132830442](images/NextJS/image-20240211132830442.png)







#### [安装 ](https://nextjs.org/docs/getting-started/installation)

```sh
# Node.js版本 18.17.0+
# 自动安装(推荐) next.js
npx create-next-app@latest

# 手动安装
- https://nextjs.org/docs/getting-started/installation

# 创建用于学习的模板项目
npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"

```





#### 目录结构

```sh
- app	# AppRouter路由器
- pages # PagesRouter路由器
- public # 静态资源目录
- src 	 # 可选应用程序源文件夹
next.config.js	Next.js配置文件
package.json	项目依赖项和脚本
instrumentation.ts	OpenTelemetry and Instrumentation 文件
middleware.ts	Next.js请求中间件
.env	环境变量
.env.local	局部环境变量
.env.production	生产环境变量
.env.development	开发环境变量
.eslintrc.json	ESLint 的配置文件
.gitignore	要忽略的 Git 文件和文件夹
next-env.d.ts	用于 Next.js 的 TypeScript 声明文件
tsconfig.json	TypeScript 的配置文件
jsconfig.json	JavaScript 的配置文件
```

![image-20240207003149030](images/NextJS/image-20240207003149030.png)







### 问题解决

#### 编辑器报错

> 编辑器中 import 处红色错误 : Cannot find module 'next/babel'

- 解决办法：

  ```json
  // 根目录创建 .babelrc 文件夹
  {
      "presets": ["next/babel"],
      "plugins": []
  }
  
  // 根目录创建 .eslintrc 文件夹
  {
    "extends": ["next/babel","next/core-web-vitals"]
  }
  ```

  