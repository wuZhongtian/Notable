# Taro



## 基础

> 偏向于微信小程序角度展开叙述

- 下载并打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，选择**项目根目录**进行预览。

```js
pnpm dev:weapp  // 运行项目

Taro create --name  [页面名称] // 快速创建页面（尝试修改 app.config.js的 pages字段）

```





### 样式相关

- 建议使用px、%单位，默认以`750px`为基准

  - 默认：尺寸转换，wx小程序中 100px == 100rpx；H5中 100px == 100rem
  - 避免转换：使用大写的PX或Px或pX

- 可通过`config/index.ts`的`designWidth`配置基准尺寸，默认750

- 忽略注释（用在编译导致内容丢失、取消转换时）

  1. 使用行内样式

  ```css
  /*postcss-pxtransform disable*/   2.头部注释，忽略整个文件
  
  /* autoprefixer: ignore next */    3.忽略下一行
  
  /* autoprefixer: off */
  -webkit-box-orient: vertical;		/*  4.CSS 注释强制声明注释中间多行 */
  /* autoprefixer: on */
  ```





### 页面配置

```js
/* 传统写法：在页面路径下新建 [页面名].config.js */
// [page].config.ts
export default definePageConfig({
  navigationBarTitleText: '首页',
})


/* Taro支持：在page.js中使用definePageConfig直接书写配置 */
definePageConfig({
  navigationBarTitleText: '首页',
})

export default function Index() {}
```



### 环境变量

- 在项目根目录下新建.env文件
  - 只有以 `TARO_APP_` 开头的变量将通过 `webpack.DefinePlugin` 静态地嵌入到客户端侧的代码中
  - 环境变量我们可以在所有 `taro` 插件、 `config/index.ts`配置文件 以及 `src` 目录下面的项目文件中使用
- 自定义模式
  - `taro build --type weapp --mode [模式名]`
  - 记载指定的自定义环境变量文件的信息，`.env.模式名`

```sh
.env.development     # 在 development 模式时被载入
.env.production      # 在 production 模式时被载入
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

taro build --type weapp --watch --mode development 	# development 模式运行命令
taro build --type weapp --mode production	# production 模式运行命令



TARO_APP_API="https://api.tarojs.com" # 配置环境变量
process.env.TARO_APP_API	# 使用环境变量
```





### 注意事项

1. 需要注意开发者工具的项目设置：
   - 需要设置关闭 ES6 转 ES5 功能，开启可能报错
   - 需要设置关闭上传代码时样式自动补全，开启可能报错
   - 需要设置关闭代码压缩上传，开启可能报错
2. 修改更新
   - `xxx.config.js`的修改需要重启项目，才生效

















### React差异

- Taro 3 中开发者使用的是真实的 React，可使用所有的 React Hooks

  ```jsx
  // 从 'react' 包中获取 React API
  import React, { Component, useState, useEffect } from 'react'
  ```

- 标签

  - 支持使用H5标签： `div  span 等`
  - 支持使用小程序规范的内置组件`<View> <Text>  <Button> `等，需遵循大驼峰命名规范

- 事件

  - 内置事件以`on`开头，采用小驼峰命名；点击事件使用`onClick`

  - 小程序的 bindtap 对应 Taro 的 onClick；其它事件名把 bind 换成 on 即是 Taro 事件名

  - bind与catch事件

    > Bind 绑定的事件 不会阻止冒泡事件向上冒泡 ， catch 绑定的事件 可以阻止冒泡事件向上冒泡
    >
    > Taro 3 的事件机制中，事件都以`bind`形式绑定，且无法使用 `e.stopPropagation()` 阻止
    >
    > - 解决办法
    >   - 【推荐】使用样式解决：[禁止被穿透的组件滚动](https://github.com/NervJS/taro/issues/5984#issuecomment-614502302)
    >   - 为 `View` 组件增加 **catchMove** 属性

- 注意：

  - 使用小程序内置组件，需从`@tarojs/components`中引入；部分平台新增组件可能不支持！

```jsx
import { Swiper, SwiperItem } from '@tarojs/components'

function Index() {
  return (
    <Swiper
      className="box"
      autoplay
      interval={1000}
      indicatorColor="#999"
      onClick={() => {}}
      onAnimationFinish={() => {}}
    >
      <SwiperItem>
        <View className="text">1</View>
      </SwiperItem>
      <SwiperItem>
        <View className="text">2</View>
      </SwiperItem>
    </Swiper>
  )
}


function Comp() {
  function clickHandler(e) {
    e.stopPropagation() // 阻止冒泡
  }

  function scrollHandler() {}

  // 只有小程序的 bindtap 对应 Taro 的 onClick
  // 其余小程序事件名把 bind 换成 on 即是 Taro 事件名（支付宝小程序除外，它的事件就是以 on 开头）
  return <ScrollView onClick={clickHandler} onScroll={scrollHandler} />
}
```





#### 生命周期

- React 组件的生命周期方法在 Taro 中**都支持**
- `componentWillMount ()`
  - 页面组件渲染到 Taro 的虚拟 DOM 之前触发
- componentDidMount 
  - 页面组件渲染到 Taro 的虚拟 DOM 之后触发；可操作虚拟dom，但不一定渲染到视图中





#### 其他注意点：

1. 由于小程序不支持动态引入，因此小程序中无法使用 `React.lazy` API
2. 由于dev版本react较大，默认使用prod版本，导致报错看不到详细信息，可修改编译配置的 [mini.debugReact](https://docs.taro.zone/docs/config-detail#minidebugreact) 选项，重新开启编译。
3. React `createPortal` 支持将组件渲染至特定的 dom 节点中，由于不能在页面组件的 DOM 树之外插入元素，无法实现应用级别的 `<Portal>` 组件。但你仍可以在当前页面中使用 `createPortal`。
4. [渲染 HTML | Taro 文档](https://docs.taro.zone/docs/html/)
5. 小程序页面的方法，在 Taro 的页面中同样可以使用：在 Class Component 中书写同名方法、在 Functional Component 中使用对应的 Hooks







进度：[入口组件 | Taro 文档](https://docs.taro.zone/docs/react-entry)

- 直接开始写，遇到问题再看文档，因为有点太无聊，大多数都是一致的内容（微信小程序基础+React基础）







