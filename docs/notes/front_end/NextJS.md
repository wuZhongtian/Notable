# [Next.js](https://nextjs.org/)

> - 样式：支持您首选的样式化方法，包括 CSS Modules、Tailwind CSS 和 CSS-in-JS
> - [路由](https://nextjs.org/docs/app/building-your-application/routing)：基于文件系统的路由器，构建在服务器组件之上，支持布局、嵌套路由、加载状态、错误处理等
> - 内置服务器渲染：Client-side and Server-side Rendering with Client and Server Components.通过 Next.js 在服务器上使用静态和动态渲染进一步优化 Edge 和 Node.js 运行时上的流媒体。
> - 优化：图像、字体和脚本优化，以改善应用程序的核心 Web 关键点和用户体验。
> - Next.js 现在默认附带 TypeScript，ESLint 和 Tailwind CSS 配置。
> - 特性：可添加伪后端代码，适用于文件系统、链接数据库，添加API
> - 其他特点：更好的SEO优化、

## 基础入门









### 推荐配置

#### [mockAPI](https://mockapi.io/)

> 生成自定义数据，并使用 RESTful 接口对其执行操作

[Prisma | Simplify working and interacting with databases](https://www.prisma.io/)

> 根据数据库模式自动生成类型

#### 样式相关

- Sass支持：默认支持引入 scss 类型样式文件

- [Tailwind CSS](https://notes.wudetian.top/notes/front_end/JS周边库.html#tailwind-css)

- [UnoCSS: The instant on-demand Atomic CSS engine](https://unocss.dev/)

  - [UnoCSS 中文网 (nodejs.cn)](https://unocss.nodejs.cn/)

- CSSModule

  > 优点：
  >
  > - 生成唯一的类名标识，只在引用的位置生效，有效避免出现全局的类名冲突

  ```js
  // 新建 xxx.module.css文件
  .abc{ ... } // css样式内容
  
  // 导入css模块化样式文件
  import styles from '@/app/ui/xxx.module.css';
  // 使用模块样式
  <div className={styles.shape} />
  ```

- [clsx](https://github.com/lukeed/clsx)：实现 类名的轻松切换

  ```react
  // TODO: 与classnames用法一致，but classnames针对所有浏览器，clsx主要针对react中使用
  ...
  ```





### 前置概念



#### AppRouter vs PagesRouter

> 网页路由器，App Router 是更新的路由器，允许使用 React 最新功能，例如服务器组件和流。Pages Router 是最初的 Next.js 路由器，它允许您构建服务器渲染的 React 应用程序，并继续支持旧的 Next.js 应用程序。
>
> 本文以 AppRouter 为主展开：





#### [[Network Boundary 网络边界](https://nextjs.org/learn/react-foundations/server-and-client-components#network-boundary)

> - 网络边界是分隔不同环境的概念线
> - **Next.js 默认使用服务器组件**，提高应用程序的性能

#### 使用客户端组件

- 请在文件顶部添加 React `'use client'`指令。这告诉 React 在客户端上渲染组件。

<img src="images/NextJS/image-20240211132830442.png" alt="image-20240211132830442" style="zoom: 67%;" />





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

- 动态路由，文件夹命名为`[xxx]`,使用中括号包裹，可实现再当前路由层级输入任何内容

  - 获取路由参数 params.xxx ， 取值为文件命名的xxx

  ![image-20240313090209231](images/NextJS/image-20240313090209231.png)

![image-20240219172313063](images/NextJS/image-20240219172313063.png)









### 相对关键

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



#### 优化字体

> [Learn Next.js: Optimizing Fonts and Images | Next.js (nextjs.org)](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images)
>
> 追求美观，但自定义字体的获取与加载，会明显的影响性能
>
> - CLS：chrome 评估网站性能和用户体验的指标之一，衡量网页加载中布局的稳定性
> - 浏览器显示页面->备用/系统字体->渲染显示->自定义字体下载->替换旧字体->布局偏移
> - next/front 模块，会自动优化字体
>   - 从 Google Fonts 加载字体：`next/font` 组件会自动从 Google Fonts 加载所需的字体。它会根据 `next.config.js` 中的配置，选择合适的字体文件。
>   - 优化字体大小：自动根据设备的屏幕尺寸调整字体大小。在 `next.config.js` 文件中配置 `fontSizes` 属性，可以自定义要使用的字体大小。
>   - 字体预加载：在页面加载时预加载所需的字体，从而提高页面加载速度。在 `next.config.js` 文件中配置 `preloadFonts` 属性，可以自定义要预加载的字体。
>   - 使用 `woff2` 格式：Next.js 会自动将字体文件转换为 `woff2` 格式，这种格式可以提高字体加载速度。
>   - 缓存字体：Next.js 会自动缓存加载的字体，以便在后续访问时直接使用。这可以减少网络请求，提高性能。
>   - 在build构建时，将字体和静态资源打包在一起，避免依赖外部的三方请求

- [subsets 配置项](https://fonts.google.com/knowledge/glossary/subsetting) 【需科学上网】
- 推荐 tailwind css属性`antialiased`  // 让字体拥有更平滑的触感

```jsx
// 导入Inter、Lusitana 两种 谷歌字体
import { Inter,Lusitana } from 'next/font/google'
// 使用Inter字体中的拉丁字符集【大写字母A到Z，小写字母a到z，以及数字0到9】
export const inter = Inter({ subsets:['latin'] })	
// 使用Lusitana字体中的拉丁字符集,以及weight为400 和700的部分
export const lusitana = Lusitana({ subsets:['latin'],weight:['400','700'] })	

// 全局使用inter字符集 本质是个字符串
( <body className={`${inter.className}`}>....</body> )

// 局部使用Lusitana字体
(<div className={`${lusitana.className}`}>....</div>)



```





#### 优化图片

> - 优化点
>   - 防止在加载图像过程中发生布局偏移
>   - 自动调整图像大小，为客户端提供尺寸合适的图片，避免大图到小屏幕，而浪费带宽
>   - 默认懒加载（图像将要进入视口时再加载）
>   - 转化使用现代化的图像格式，例如 [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp) 和 [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image)

- 使用 `<Image>` 组件 替换 HTML 的`<img>`标签
- 设置图片具体的宽高【宽高比】是个较好的行为

```jsx
import Image from 'next/image';

export default function Page() {
  return (
    // ...
      <Image
        src="/hero-desktop.png"
        width={1000} // 单位px
        height={760} // 单位px
        className="hidden md:block"  // 在桌面端才显示，其他设备中隐藏，移动端优先的写法
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-moblie.png"
        width={1000} // 单位px
        height={760} // 单位px
        className="block md:hidden"  // 在移动端才显示，其他设备中隐藏，移动端优先的写法
        alt="Screenshots of the dashboard project showing moblie version"
      />
    //...
  );
}
```



#### 文件路由

- `app/*/*`     文件夹名	===	url 路由名
  - `page.tsx`	路由的入口文件
  - `layout.tsx` 布局模板文件
    - children 参数类似于vue中的 `<router-view />`
    - 多个子路由中【共享数据】，也利于实现局部渲染
    - 当前目录如果存在`page.tsx`，也会作为单独的路由页存在于当前的 `layout.tsx`
  - 目录下的其他文件，不会被暴露在浏览器的路由中，只有 page.tsx

```tsx
// page.tsx
export default function Page(){
    return <h1>Page页面-路由入口</h1>
}

// layout.tsx	根路由
import {inter} from '@/app/ui/fonts'	// 引入优化的字体
export default function RootLayout({children}:{children:React.ReactNode;}){
    return (
        <html lang='en'>
        	<body className={`${inter.className}`}>{children}</body>	<!--设置全局字体+路由总入口 -->
        </html>
    )
}

// layout.tsx   子路由
import SideNav from 'xxxx'
export default function Layout({children}:{children:React.ReactNode}){
    return (<div> 
                <SideNav /> 
                <div>{children}</div> 
            </div>);
}




////>>>>?????
// app/blog/[post]/layout.js
export default const BlogLayout = ({children})=>{
    return children;
}


export async function generateMetadata({params}){
    return{
        title:params.post,	// 自定义浏览器标签页的文字
    }
}
```





### 路由导航

- `<Link>` 组件替代 `<a>`
- 优点：
  - 基于路由刷新，不会造成整页刷新
  - 代码自动分割（基于路由的分割刷新？）
  - 代码预取（链接出现在可视区，提前加载背后的内容？）

```tsx
// 导入Link
import Link from 'next/link'
// 使用Link
<Link href='xxx'>
    
// 基于页面url，设置激活状态
'use client'
import { usePathname }  from  'next/navigation'
```









## 其他





#### API设置

```js
import { NextResponse } from 'next/server';
export async function 
```









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
