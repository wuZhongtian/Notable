### PixiJS

> Pixi是一个非常快的2D sprite渲染引擎。
>
> - 通过 `WebGL` 来调用 GPU 渲染动画，极大的提升了性能
> - 兼容性好、支持 `WebGL` 和 `canvas` 两种渲染模式，如果有需要可以无缝回退到 `HTML5 Canvas`框架底层做了抹平处理，支持在各个平台上运行
> - 非常灵活纯粹的渲染引擎，相对游戏引擎更轻量，比较适合做动画，采用插件系统，与其他插件或框架无缝集成 不会入侵代码，不与任何 `IDE` `工具` 绑定，任何项目都能很容易都接入
> - 不足：
>   - 不支持 3D（有相关的 3D 插件，自行体会🤔）
>   - 不适合做复杂的游戏

```js
// 下载 npm 或 yarn
npm i pixi.js
yarn add pixi.js
```



#### 绘制基础形状

- 利用`new PIXI.Application`创建应用
  - 使用`appendChild`将它的`view`添加到页面
- 利用`new PIXI.Graphics`绘制图像
  - `beginFill`填充的颜色，参数1：十六进制颜色值， 参数2：透明度0-1
    - `rectangle.beginFill(0x66ccff,0.5);`
  - `drawRect` 绘制矩形
  - `drawCircle`绘制圆形

```js
// 导入pixi
import * as PIXI from 'pixi.js'
// 创建应用
const app = new PIXI.Application({
    // 配置宽高、背景色、屏幕像素比（pc：1，手机可能为2）
    width:window.innerWidth,
    height:window.innerHeight,
    backgroundColor:0x1099bb,
    resolution:window.devicePixelRatio || 1,
    antialias:true,//抗锯齿
})
// 将应用画布添加到DOM中
document.body.appendChild(app.view)

//创建一个形状
const rectangle1 = new PIXI.Graphics();
// 绘制结束前的操作：
rectangle1.lineStyle(4,0xff0000,1)	// 设置边框样式 线宽，颜色，透明度
rectangle1.beginFill(0x66ccff);   	// 设置填充颜色
rectangle1.drawRect(0,0,64,64);  	// 绘制矩形 起始点xy，结束点xy
rectangle1.drawCircle(0,0,32);		// 绘制圆形，圆心xy，半径
rectangle1.endFill();	// 结束绘制

// 绘制后的操作：
// 图形的缩放
rectangle1.scale.set(2,2);
// 图形的位移
rectangle1.position.set(100,100)
//图形的旋转
rectangle1.rotation=0.5;
//图形的锚点位置（旋转中心）
rectangle1.pivot.set(82,32)

// 将形状添加到舞台 app
app.stage.addChild(rectangle1)
```





#### 更多形状

```js
// 绘制矩形 起始点xy，结束点xy
shape.drawRect(0,0,64,64);  	
// 绘制圆形，圆心xy，半径
shape.drawCircle(0,0,32);
// 绘制椭圆 x,y,宽,高
shape.drawEllipse(0,0,164,64)
// 绘制圆角矩形 x,y，宽，高，圆角半径
shape.drawRoundeRect(0,0,164,64,10)
// 绘制多边形 参数是一个数组，分别是x,y,x,y,x,y...组成
shape.drawPolygon([0,0,100,0,100,100,0,100])
// 绘制圆弧 圆心x,y,半径，起始角度，结束角度，是否逆时针
shape.arc(0,0,32,0,Math.PI,false])

// 绘制线段 
line.move(0,0) // 设置绘制起始点
line.lineTo(100,100); // 下一个点
line.lineTo(200,0); // 下一个点
line.lineTo(100,100);

// 绘制圆角矩形 x,y，宽，高，圆角半径
const roundedRectangle = new PIXI.Graphics();
roundedRectangle.beginFill(0x66ccff,1);
roundedRectangle.drawRoundeRect(0,0,164,64,10)
roundedRectangle.endFill();   // 结束绘制
roundedRectangle.target.position.set(500,500) // 设置位移
app.stage,addChild(roundedRectangle);  //添加到舞台 

```

 

#### 纹理/图片

```js
// 导入pixi
import * as PIXI from 'pixi.js'
// 创建应用
const app = new PIXI.Application({
    // 配置宽高、背景色、屏幕像素比（pc：1，手机可能为2）
    width:window.innerWidth,
    height:window.innerHeight,
    backgroundColor:0x1099bb,
    resolution:window.devicePixelRatio || 1,
    antialias:true,//抗锯齿
})
// 将应用画布添加到DOM中
document.body.appendChild(app.view)

// 创建一个纹理
const texture = PIXI.Texture.from("./xx/xx/a.png")
// 创建一个精灵（用来放置纹理）
const sprite = new PIXI.Sprite(texture);
// 设置精灵的锚点/中心点，正中心
sprite.anchor.set(0.5,0.5)

// 设置精灵的位置(默认以左上角为中心点/锚点)
sprite.x = app.screen.width/5   // 宽度局中
sprite.y = app.screen.height/5  // 高度局中
// 设置精灵的旋转45度
sprite.rotation = Math.PI / 4
// 透明度
sprite.alpha = 0.5
// 缩放
v.scale.set(2,2)

// 添加到舞台
app.stage,addChild(sprite);

// 实现动画
```

