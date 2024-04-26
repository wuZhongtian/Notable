# Taro



## 基础

> 偏向于微信小程序角度展开叙述

- 下载并打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，选择**项目根目录**进行预览。

```js
pnpm dev:weapp  // 运行项目

Taro create --name  [页面名称] // 快速创建页面（尝试修改 app.config.js的 pages字段）



```



### 注意事项

1. 需要注意开发者工具的项目设置：
   - 需要设置关闭 ES6 转 ES5 功能，开启可能报错
   - 需要设置关闭上传代码时样式自动补全，开启可能报错
   - 需要设置关闭代码压缩上传，开启可能报错
2. 