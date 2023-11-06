<WaterMark />
# JS周边库







## [GSAP](https://gsap.com/)

> GSAP 是一个强大的 JavaScript 工具集，可以将开发人员变成动画超级英雄。构建适用于所有主流浏览器的高性能动画。动画化 CSS、SVG、画布、React、Vue、WebGL、颜色、字符串、运动路径、通用对象……任何 JavaScript 可以触及的东西！ GSAP 的 ScrollTrigger 插件可让您使用最少的代码创建令人惊叹的基于滚动的动画。
>
> - [使用GSAP写出令人惊叹的动画！ - 掘金 (juejin.cn)](https://juejin.cn/post/7184080621831422011)
> - [Parallax scroll animation (codepen.io)](https://codepen.io/isladjan/pen/abdyPBw)
> - [10 个功能强大的 JavaScript 动画库，打造引人入胜的用户体验-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2327140)
> - [练习动画最好的方式：用GSAP实现可滚动和可拖动的时间轴 - 掘金 (juejin.cn)](https://juejin.cn/post/7136508854422110244#heading-12)

```js
pnpm install gsap	// 安装
import { gsap } from "gsap";	// 引入
```



### 补间动画

> gsap在早期flash繁荣时期就已存在，其核心为**补间动画**
>
> 主要的补间动画：
>
> - gsap.to()	// 从元素的起始默认状态，动画到指定的结束值
> - gsap.from()  // 从指定的起始值，动画到元素默认的状态，与to() 相反
> - gsap.fromTo()  // 自定义起始值和结束值
> - gsap.set()  // 立即设置属性（无动画）

- [Easing](https://gsap.com/docs/v3/Eases/) ：动画曲线选择配置

```js
gsap.to()	// 由初始状态变化为动画指定的状态

// 参数1：选择器，支持id、class、标签
// 参数2：动画配置对象
gsap.to('.box',{
	scale: 0.1,	// 缩放为10%
	x: -100,	// x轴移动-100px
    y: 60,	// 向y轴移动60px
    xPercent: 50,	// 水平移动元素宽度的百分比，50%
    yPercent:50,	// 垂直移动元素高度的百分比，50%
    rotation:360,	// 旋转，360°
    duration: 1,	// 动画持续时间1s
    repeat: -1,	// 重复次数 -1 无限重复； 3 重复3次
    yoyo: true,	// 往复模式,正向运动结束后，反向运动；默认为一直重复正向运动
    // stagger: 0.2, // 设置被选中全部的元素，动画依次生效间隔时间0.2s；默认为全部一起运动
    // stagger 高级配置
    stagger:{
        amount: 1.5,	// 所有动画交错完成的总时间，单位s
        grid:"auto",
        from:"center"	// 动画开始的位置，向其他位置扩散展开；center||end||edges||random||数字
    },
})


gsap.from()	// 由指定状态变化为当前默认的状态

gsap.from('.box',{
    scale:0.5,
    y:-50,
    opacity:0,	// 透明度，初始为0
    easy:'power1.out',	// 动画运动曲线；power1||power2||back||....  看官网
    delay : 1,		// 动画延迟时间
})


gsap.fromTo('.box',{ x:-40,fill:'blue' },{ x:40,fill:"green" })

gsap.set('.box',{x:100})
```





### 时间线

> 时间线 timeline：是创建易于调整、有弹性的动画序列的关键。将补间动画添加到时间线时，默认情况下，补间动画将按照添加顺序依次播放。将多组动画编排动作，从而控制整个序列。

- 参数
  - 第一个参数：选择器
  - 参数2：动画属性配置
  - 参数3：可选，位置参数，用于指定多组动画之间的执行时机
    - `Number`：等待对应秒数后再执行
    - `"<"`：与上个时间的动画同步一起执行
    - `">"`：默认值，等待上个动画接受后再执行
    - `"+=n"`：上个动画结束后，等n秒后再执行
    - `"+=n"`：上个动画结束前n秒就开始执行

```js
const t = gsap.timeline()	// 创建时间线
t.to(".box1",{ x:600, duration:2 })		// 第一步动画
t.to(".box2",{ x:600, duration:2 })		// 第一步动画结束后执行
t.to(".box3",{ x:600, duration:2 })		// 第二步动画结束后执行

// 时间线参数示例：
t.to(".box4",{ x:600, duration:2 },"+=1")		// 第二步动画结束后执行
```





### 回调动画

> 所有的时间线和补间都有以下回调：

- onStart：在动画开始时调用
- onUpata：每次动画更新时调用（在动画处于活跃状态时的每一帧上）
- onRepeat：每次动画重复时调用
- onComplete：在动画完成时回调
- onReverseComplete：当动画反转时、再次到达起点时调用？

```js
gsap.to(".box4",{ 
    x:600, 
    duration:2,
	onStart:()=>{
      console.log("动画开始了")  
    }
},"+=1")	
```







### [ScrollTrigger 滚动触发器](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

- ScrollTrigger 回调函数
  - `onUpdata`：更新时
    
    > 每次ScrollTrigger 的进度更改（滚动条位置变化）时，都会触发的回调
    >
    > - 参数self：获取滚动条的相关信息
    >   - self.progress  滚动的整体进度，取值 0-1
    >   - 
    
    - 用途：可做背景视频联动播放卡点
    
  - `onScrubComplete`：在擦除完成时

```js
// 引入
import { ScrollTrigger } from "gsap/ScrollTrigger";
// 使用（可单独使用，也可添加到gsap的时间轴中）
ScrollTrigger.create({
    trigger:".box",	// 要绑定的元素
    start:"top top",	// 滚动触发器的起始位置
    end:"+=100",	// 滚动触发器的结束位置
    scrub:true,	// 擦洗动画，就是滚动回去时是否还原动画
    pin:true,	// 动画时是否固定屏幕，true-固定当前屏幕（不下滑） false-滚动下滑 || Element-指定元素
    animation:
    	gsap.to('.box',{y:1000,x:500}),
    markers:true,	// true-开启标注功能，便于开发时观察
    toggleClass:"",	// String||Object 当滚动时向元素添加的class类名
})


ScrollTrigger.create({
    trigger:".box",	// 要绑定的元素
    start:"top-=500 top",	// 滚动触发器的起始位置
    end:"+=2000",	// 滚动触发器的结束位置（滚动动画关联的滚动长度）
    scrub:true,	// 
    pin:true,	// 动画时是否固定屏幕，true-固定当前屏幕（不下滑） false-滚动下滑 || Element-指定元素
    animation:
    	gsap.timeline()
    	.fromTo('.box1',{y:1000,x:500},{y:0,x:1000}),
    	.fromTo('.box2',{width:"100em",height:"500px"},{width:"0em",height:"500px"},"<"),
    markers:true,	// true-开启标注功能，便于开发时观察
    toggleClass:"",	// String||Object 当滚动时向元素添加的class类名
    onUpdata(self){
        console.log("当前滚动的进度：",self.progress)
    }
})
```







## PixiJS

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



## fabric.js

> [关于本文档 | fabric.js中文教程 (gitee.io)](https://k21vin.gitee.io/fabric-js-doc/docs/)





## iDraw.js

- 优点
  - 支持元素多选、固定、隐藏....
  - 支持导入、导出 data
  - 

```js
// 方法记录
idraw.方法名
idraw.setData(data,{triggerChangeEvent:true});	// 设置绘制数据 - 以最后一次 setData的data为准 - 因此可以用它清除画布
const resultData = idraw.getData();	// 获取画布JSON数据

selectElement(resultData.elements[0].uuid);	// 根据元素id,选中对应元素，一般没啥用，uuid没有时会自动创建，需求：拖拽创建元素后，默认选中创建的元素
selectElementByIndex()	// 根据元素在 data.elements中的索引位置选中。
cancelElement	// 根据uuid取消元素选中状态
cancelElementByIndex(0)	// 根据元素在 data.elements中的索引位置取消选中
getSelectedElements	// 读取被选中的元素数组数据
updateElement	// 更新画布中的元素

// 事件监听
idraw.on('事件名', (e) => { })	
changeData		// 绘图监听，画布数据变化时，获取最新数据，需配合setData的配置
screenSelectElement	 // 选中事件监听，回调
```





## Vue-Easy-DnD

```js
import { Drag, Drop } from "vue-easy-dnd";

<Drag/>  // 拖动de元素

@dragstart 	// 拖拽开始事件


type	// 允许设置 drag的type类型，仅支持两种 Number string
data	// 拖拽中携带的数据
drag-image-opacity	// 定义被拖拽元素的透明度 0-1
disabled	// 禁止此元素的拖拽，可用来做 前端权限校验！！
go-back		// 未拖动到容器的元素视为“失败”，将失败的元素以动画形式，原路返回
delta		// Number-定义拖拽效果 - 开始响应的距离，默认 3px
delay		// Number-选中元素到相应为拖拽的时长，类似于长按选中。默认 0ms
drag-class	// 给拖拽的浮动元素 自定义样式类
vibration	// Number-当拖动事件开始时，支持的移动设备上的振动反馈(默认0ms =无反馈)
handle		// 拖拽时的鼠标样式	？？
scrolling-edge-size	// 当将此元素拖到其边界容器/列表的边缘时，像素量定义了它将自动向上/向下/向左/向右滚动的距离容器边缘的距离(0 =在其边界容器上不滚动)

    
<Drop/>		// 容器
    
@dragend	// 拖拽停止事件
	- 回调函数中大量有价值的返回信息（往下看）
Modes 		// 模式 -默认copy copy源不影响 cut删除源
// 如果拖动操作源自没有声明cut事件侦听器的Drag组件，则禁止在声明cut模式的Drop组件上放置。

accepts-type="number"	// 接受Drag中对应type的内容
:accepts-data="(d) => d === 2"	// 对接受的内容进行判断，只接受符合条件的元素
drag-image-opacity	// 定义被拖拽元素的透明度 0-1




// 内部样式 - 类名直接使用，声名样式即可
.drop-allowed{ background: rgba(167, 230, 22, 0.795); }	// 拖拽元素时，匹配可接受该元素的容器样式
drop-forbidden	// 拖拽元素时，type匹配但accepts-data不匹配的容器样式
.drop-in	// 拖拽元素进入容器范围中时，容器的样式

    
    
    
// @dragend 回调 参数 
/*
	clientX和clientY与x，y一样的，都是客户区域坐标，指鼠标的坐标，以浏览器显示区域的左上角开始
	offsetX，offsetY 针对目标元素的左上角坐标（e.target）
	layerX,layerY 往上找有定位属性的父元素的左上角（自身有定位属性的话就是相对于自身），都没有的话，就是相对于body的左上角
	pageX， pageY相对页面左上角的距离(包含滚动上去的距离)
	screenX screenY 相对屏幕左上角的位置（脱离浏览器位置）
*/
    data: 携带的自定义数据
    native: {
        clientX	// 相较于浏览器视口左侧的X轴位置
        clientY	// 相较于浏览器视口顶部的Y轴位置
        screenX	// 相较于浏览器 整页左侧的X轴位置
        screenY	// 相较于浏览器 整页顶部的Y轴位置
        offsetX	// 相对于Drop容器的X轴位置 - √√
        offsetY	// 相对于Drop容器的Y轴位置 - √√
        layerX	// 相对于Drop容器的X轴位置 - √
        layerY	// 相对于Drop容器的Y轴位置 - √
    }
	position:
	....
```









## D3js

> Data-Driven Documents：**基于数据驱动文档工作方式的一款JavaScript函数库，主要用于网页作图、生成互动图形，是最流行的可视化库之一。D3使你有能力借助HTML，SVG和CSS来生动地可视化各种数据**

- 优点：
  1. 提供了一种通过 Web 构建图形的便捷方式
  2. 简化了创建动画和交互式图形的方式
  3. 易学易用的框架，擅长做通用的 DOM 处理



### 基础使用

1. 安装

   - ```vue
     <!-- 方式1：直接引入js文件  
     	注：现在已经是V5版本。V5和V3的很多语法还是有区别的！
     -->
     <script src="http://d3js.org/d3.v5.min.js"></script>
     
     
     <!-- 模块化引入  -->
     <script>
         import * as d3 from 'd3';
     </script>
     ```



#### 选择器

> Selections 允许强大的数据驱动文档对象模型(DOM)：设置attributes,styles,HTML 或 text 内容，选择集的方法通常选择当前的选择当前的选择集或者新的选择集，因此允许进行链式调用。

```js
// 选中符合条件的第一个元素，选择条件为 selector 字符串。如果没有元素被选中则返回空选择集，如果选择器有多个，那就返回匹配第一个选择集
d3.select('selector') 

// 选择所有与制定的selector匹配的元素，返回一个数组。如果没有元素被选中，则返回的空的选择集
d3.selectAll('selector')



// const p = d3.selectAll("p");
// p.attr("class","fd-tag");
// p.style("color","red");
// 等价于 以下代码：
d3.selectAll("p")
      .attr("class","fd-tag")
      .style("color","red");

```







#### d3-zoom

> *视图移动以及缩放是一种流行的交互技术 缩放行为通过*d3-zoom*模块来实现，缩放本身与DOM元素无关，可以用于SVG，HTML 或者 Canvas。*

1. 引入d3-zoom 
   - `<script src="htts://d3js.org.js/d3-zoom.v1.min.js"></script>`
   - `npm install d3-zoom`

```js
// 引入d3-zoom
d3.zoom()

// 创建一个新的缩放行为,并返回该行为。zoom既是一个对象又是一个函数，通过selection.call()来应用到元素本身上
selection.call(d3.zoom().on( "zoom" , zoomed))

// 事件绑定 .zoom 双击禁用缩放 以及 禁止滚动齿轮缩放
  selection.on("dblclick.zoom",null)
  selection.on("wheel.zoom",null)

selection.call( d3.zoom()
         // extent 即将当前视口范围设置为指定的数组[[x0,y0],[x1,y1]] 
        // x0,y0为视口的左上角，x1,y1为视口的右下角
        .extent([0,0],["画布的宽度","画布的高度"])
        // 缩放的范围[k0,k1]     k0 为缩放的最小范围，  k1为缩放的最大范围
        .scaleExtent([0.4,1])    // 缩放范围
        .on("zoom",()=>{
            // zoom事件跟缩放的回调函数   d3.event.transform 
            selection.attr( "transform" , d3.event.transform )
    })
 )
```







## 控制台禁用

[disable-devtool/README.cn.md at master · theajack/disable-devtool (github.com)](https://github.com/theajack/disable-devtool/blob/master/README.cn.md)




## [Tailwind CSS](https://www.tailwindcss.cn/)

> css in js 方案
>
> 基础的使用描述，参考文档链接即可；此处仅提供不常用的小问题解决方法

### 样式冲突

> tailwind css 样式与 其他UI库 共同使用中可能会发生样式冲突，毕竟 lg、flex这类样式名作为内置真的很好用
>
> 例：使用element-plus/antd 引入tailwind 可能导致正常的按钮样式变为“透明”！

```js
// 解决方法：
// 关闭tailwind的样式预设
// 将 @tailwind base; 引入它到项目时会包含默认的预设样式
// 通过tailwind.config.js 禁用Preflight预设样式
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,	// 禁用Preflight预设样式
  },
};
```



