# [Next.js](https://nextjs.org/)

> - 样式：支持您首选的样式化方法，包括 CSS Modules、Tailwind CSS 和 CSS-in-JS
> - [路由](https://nextjs.org/docs/app/building-your-application/routing)：基于文件系统的路由器，构建在服务器组件之上，支持布局、嵌套路由、加载状态、错误处理等
> - 渲染：Client-side and Server-side Rendering with Client and Server Components.通过 Next.js 在服务器上使用静态和动态渲染进一步优化 Edge 和 Node.js 运行时上的流媒体。
> - 优化：图像、字体和脚本优化，以改善应用程序的核心 Web 关键点和用户体验。
> - Next.js 现在默认附带 TypeScript，ESLint 和 Tailwind CSS 配置。

## 基础入门

### 推荐配置

#### [mockAPI](https://mockapi.io/)

> 生成自定义数据，并使用 RESTful 接口对其执行操作

[Prisma | Simplify working and interacting with databases](https://www.prisma.io/)

> 根据数据库模式自动生成类型

#### 样式相关

##### [Tailwind CSS](https://tailwindcss.com/)

> CSS 框架

##### CSSModule

```js
// 新建 xxx.module.css文件
.abc{ ... } // css样式内容

// 导入css模块化样式文件
import styles from '@/app/ui/xxx.module.css';
// 使用模块样式
<div className={styles.shape} />
```

##### [clsx](https://github.com/lukeed/clsx)

> 实现 类名的轻松切换

##### Sass

> 默认支持引入 scss 类型文件

### 前置概念

#### AppRouter vs PagesRouter

> 网页路由器，App Router 是更新的路由器，允许使用 React 最新功能，例如服务器组件和流。Pages Router 是最初的 Next.js 路由器，它允许您构建服务器渲染的 React 应用程序，并继续支持旧的 Next.js 应用程序。
>
> 本文以 AppRouter 为主展开：

#### 优化字体

> [Learn Next.js: Optimizing Fonts and Images | Next.js (nextjs.org)](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images)

#### 优化图片

> - 优化点
>   - 防止在加载图像时自动切换布局
>   - 调整图像大小以避免将大图像传送到具有较小视口的设备
>   - 默认情况下延迟加载图像（图像在进入视口时加载）
>   - 在浏览器支持的情况下，使用现代格式图像，例如 [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp) and 和 [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image)

- 使用 `<Image>` 组件 替换 HTML 的`<img>`标签

```react
import Image from 'next/image';

export default function Page() {
  return (
    // ...
      <Image
        src="/hero-desktop.png"
        width={1000} // 单位px
        height={760} // 单位px
        className="hidden md:block"  // 在桌面端才显示，其他设备中隐藏
        alt="Screenshots of the dashboard project showing desktop version"
      />
    //...
  );
}
```

#### [[Network Boundary 网络边界](https://nextjs.org/learn/react-foundations/server-and-client-components#network-boundary)

> - 网络边界是分隔不同环境的概念线
> - **Next.js 默认使用服务器组件**，提高应用程序的性能

#### 使用客户端组件

- 请在文件顶部添加 React `'use client'`指令。这告诉 React 在客户端上渲染组件。

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

#### 创建布局和页面

> - 使用文件系统路由创建路由
> - Next.js 使用文件系统路由，其中文件夹用于创建嵌套路由。每个文件夹代表一个映射到 URL 段的路由段。

- 创建路由页面：在 app 目录下新建文件夹，`文件夹名 = 路由名`，文件夹下的`page.tsx = 入口文件`；同理可在当前文件夹下继续嵌套更深层级的路由。
- 创建共享导航：文件夹下新建`layout.tsx 文件`，实现多个页面之间共享的 UI

![image-20240219172313063](images/NextJS/image-20240219172313063.png)

## 问题解决

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
