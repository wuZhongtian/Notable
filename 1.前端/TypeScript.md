## TypeScript

### 基础知识

#### 初识TS

- 安装`npm i typescript -g`

- 查看版本`tsc -v`

- 浏览器不支持ts，始于js，终于js

- 使用工具
  - `npm install @types/node -D`
  - `npm i ts-node -g`
  - 命令行输入`ts-node ts文件.ts` 直接使用node运行ts文件
  
- 命令

  ```cmd
  tsc ts文件.ts          # 编译ts生成js并执行
  tsc 文件名.ts --watch  # 编译ts生成js并执行，后续自动检测文件变化，自动执行
  
  tsc -v   # 查看当前typescript版本
  ```

  

#### 基础类型

- new返回的是对象，用大写`Boolean/Number/String`接收
  - `let b:Boolean = new Boolean(1)`
  - `let str:string = "TS"`

```typescript
// 字符串
let str:string = "TS"
let muban:string = `web ${str}`
console.log(muban)

// 数值(NaN/Infinity无穷大/0xf00d十六进制/0b1010二进制/0o744八进制)
let num1:number = NaN
let num2:number = 0xf00d

// 布尔值
let b:boolean = false
console.log(b)   // false
let a:boolean = Boolean(1)
console.log(a)   // true  隐式转换
let a:boolean = Boolean(1)
console.log(a) 
let a:Boolean = new Boolean(1) // new返回的是对象，用大写Boolean接收
console.log(a) 

// 空值
//  - js中没有空值(Void)的概念，ts中用void表示没有任何返回值的函数 
function fnVoid():void {
    return //此函数将不能有返回值，可以不写或为空
}
//  - 也可以定义 undefined 和 null 类型
let u:void = undefined
let n:void = null
console.log(u,n)  // undefined null

// undefined
let u2:undefined = undefined
// null
let n2:null = null
```



##### 注意点

- void定义的空值不能赋值给其他变量

  ```typescript
  let v:void = undefined
  let srt:string = '123'
  // str = v   此时编译会报错！！！
  ```





#### 任意类型

```typescript
// any类型（可以任意赋值，类似js变量）
let anys:any = "我很大，你小心一点"
anys = 18
anys = {}
anys = Symbol("123")

// unknown
// - unknown比any类型更安全，不能取调用属性和方法，不能是引用类型
// - unknown类型只能作为父类型，不能充当子类型，也就是不能赋值给别人
// - unknown类型只能赋值给any类型或unknown类型
let un:unknown = "我很大，你小心一点"
un = 18
// un.a  直接报错！
```





#### 接口和对象类型

##### Object、object、`{}`

```ts
// Object 与原型链有关,原型链的顶端，
// ts中 Object包含了所有类型，类似于与any或function
let a:Object = 1
let a1:Object = {}
let a2:Object = []
let a:Object = "123"

// object 常用于泛指约束，代表非原始类型
let b:object = '123 '   //错误，不支持原始类型（数字、字符串、布尔）
let b1：object = []     //正确，支持所有引用类型（函数、数组、对象）

// {} 可以理解为 new Object(),支持所有的类型
let c:{} = {name:1}
c.age=18   // 错误，对象类型无法对变量进行赋值操作
```



##### 对象类型

- interface   （接口）声明对象的关键词，类似于类的定义
  - 声明出现重名时会进行自动合并
- readonly   设置属性为`只读`，定义后不可修改
  - 指针只读，引用类型中的内容仍可以修改
- ?    可选值属性，在定义对象时可为空
- `[propName:String]:any `  任意属性，可以在对象中有其他任意类型
  - `[propName:String]:String | number`  任意属性、联合类型，对象中可以使用多种数据类型
- 函数类型  `（）`
- 合并继承   `interface B extends A { ... }`

```typescript
// 声明对象  interface约束接口
interface 命名A{
    name:String
}

interface 命名A{     // 重名时会自动合并
    readonly age:number,     // readonly 只读，该属性不能做修改
    sex?:String     // ? 表示可选值属性，在定义对象时可为空
    [propName:String]:any   // [propName:String]  任意属性，可以在对象中有其他任意类型
}

// 定义对象
let obj1:命名A = {name:"夏之一周"} // 报错，未指定必填的age属性
let obj2:命名A = {name:"夏之一周",age:15} // 正确，sex为可选值
let obj3:命名A = {name:"夏之一周",age:15，sex:"男"} // 正确
obj2.age=18 // 报错，无法分配到name，因为它是只读属性

interface Person{
    name:String,      
    age:number,                // 报错，因为任意类型定义为String，不能使用 number
    [propName:String]:String   // 任意属性，且指定为字符类型，所以不能使用其他类型
}

[propName:String]:String | number  // 任意属性，联合类型可以使用String、number类型


// 声明对象中的函数类型
interface Dog{
    name:String,      
	cd():number,        // void表示函数无返回值，也可以为number/string等
}
// 定义带有函数类型的对象
let Dog1={	name:"哈巴狗",
    		cb:():number=>{ return 123 }
         }


// 合并继承
interface A{
    name:String
}
interface B extends A{
    age:number
}
let b={name:"法外狂徒张三",age:18}
```







#### 数组

- 类型声明方法：
  - 直接限定类型：`arr:type[]`
  - 借助interface限定的类型：`arr:interfaceType[]`
  - 使用联合类型：`number | boolean`
  - 任意类型：`arr:any[]`
- 多维数组声明：`arr:number[][]`或`arr:Array<Array<boolean>>`
- 函数参数arguments使用：IArguments

```typescript
// 定义数组普通类型 直接限定类型
let arr:number[] = [1,2,3]  // 定义number类型的数组
let arr:boolean[] = [true,false]  // 定义boolean类型的数组
或
let arr:Array<boolean> = [true,false] 

// 定义对象数组,使用interface
interface X {
    name:string,
    age?:number,     // ? 表示该项可有可无
}
let arr:X[] = [{name:"夏之一周"},{name:"红烧肉",age:16}]

// 定义多维数组,几个[]表示几维
let arr:number[][] = [[1],[20],[3]]
或
let arr:Array<Array<boolean>> = [[true],[false]]

// 大杂烩，任意类型
let arr:any[] = [1,"夏天"，true]
// 大杂烩，指定元组，一一对象
let arr:[number,string,boolean] = [1,"夏天"，true]

// 函数接收参数时定义类型、arguments这种`类数组`的定义- IArguments
function a(...args:any[]){
    console.log(args)
    let abc:IArguments = arguments
}
a("1",2)

// IArguments的原理:
interface A {
    callee:Function
    length:number
    [index:number]:any
}
```





#### 函数

- 函数重载：方法名相同、参数不同；返回值可同可不同
  - 如果参数类型不同，则操作函数参数类型应设置为`any`
  - 如果参数数量不同，可将不同的参数设置为可选值

```typescript
// 函数传参类型限制
// 参数个数、参数类型、返回值类型
// 如果指定传参的默认值，可在调用时不传，否则为必传值
// 加 ? 表示可选值，默认为undefined
const fn = function(name:string,age:number=30,sex?:string):string {
    return name+age
}

// 数组/对象 形式
interface User {
    name:string,
    age:number
}
const fn = function(user:User):User{
    return user
}
let a=fn({"张三",55})





// 重载函数（规则） 定义,可以是多套
function fn1 = function(params:number):void
function fn1 = function(parmas:string,params2:any):void
// 执行函数逻辑的定义（应满足上述所有规则要求）,执行时会从上述规则中选择执行，具体根据使用时的传参来定
function fn1 = function(parmas:any,parmas2?:any):void{
    console.log(parmas+parmas2)
}

fn1(1) // 执行第一个规则
fn("夏之一周") //执行第二个规则
```





#### 联合类型|类型断言|交叉类型

- 联合类型：为某个值指定的多种类型
- 交叉类型：合并多个属性
- 类型断言：推断取值的类型并执行某些操作，欺骗ts编译器，不影响运行结果
  - 使用中需额外谨慎，避免出现程序运行的错误

```typescript
// 联合类型，可定义为指定的多种类型
// 手机号可能是number/string 类型时：
let phone:number | string = 123456
// 函数传参可能是多种类型
let fn = function(types:number|boolean):boolean{
    return !!types
}


// 交叉类型 合并多个属性
interface People{
    name:String,
    age:number
}
interface Man{
    sex:number
}
const xiaoming = (man:People & MaN):void=>{
   console.log(man)
}
xiaoming({
    name:"交叉属性",
    age:15,
    sex:1
})



// 类型断言（欺骗ts编译器，不影响运行结果）
// any可以被断言为任何类型
let fn = function (num:number | strimg):void {
    console.log((num as string).length)
}
fn(12345)  // 打印 undefined，因为不属于string类型
fn("12345") // 打印 5

interface A {
    run:string
}
interface B {
    build:string
}
let fn = (types: A | B):void => {
    console.log( types.run );  // 错误提示，types上没有run
    console.log( (<A>type).run ); // 方式1：断言为A
    console.log( (types as A).run ); // 方式2：断言为A
}


windows.abc = 123  // 报错，window上没有abc
// 临时断言
(window as any).abc = 123


// 纯纯的欺骗编译器，
const fn = (types:any):boolean =>{
    return types as boolean
}
console.log( fn(1) )    // 输出 1 ，而不是布尔值，欺骗ts编译器，不影响运行结果
```





#### 内置对象

##### ECMAscript

> **`Boolean`、Number、`string`、`RegExp`、`Date`、`Error`**

```typescript
// 声明正则表达式
const regexp:RegExp = /\w\d\s/
// 时间
const data:Date = new Date()
//error
const error:Error = new Error("错误")
```



##### DOM-BOM

> **`Document`、`HTMLElement`、`Event`、`MouseEvent`、`NodeList`** 等

- `NodeList` 伪数组，不同于`argument`的伪数组
  - 用于`querySelectorAll`时多个节点的接收定义
- Promise

```typescript
// 约束返回值的类型 Promise<number>
// Promise作为函数返回值定义 - function promise():Promise<number> {...}
function promise():Promise<number> {
    return new Promise<number>((resolve,reject)=>{
        resolve(1)
    })
}

promise().then(res=>{
    console.log(res)
})
```

```js
let body:HTMLElement = document.body;
let list:NodeList = document.querySelectorAll('#list li');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {
    ...
});


//dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}

let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {

```

[原文链接](https://blog.csdn.net/qq1195566313/article/details/122282325)



#### Class类

- `extend` 继承
- `implements`约束类型

```typescript
// 定义类 js写法 ,ts中提示存在问题
class Person = {
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        this.sub =sub
    }
}

// ts写法 需要提前声明
class Person = {
    name:string
    age:number
    sub:boolean = false
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        // this.sub =sub  定义但不使用时会报错，可以通过给默认值解决
    }
}


// class类修饰符
//  public 内部外部都能访问，默认存在的值pubilc
//  private 私有变量_只能在内部访问，其他都访问不到
//  protected 内部和子类中可以访问
class Person = {
    public name:string
    private age:number
    protected sub:boolean = false
    static aaa:string = '123' // 静态属性
    constructor (name:string,age:number,sub:boolean) {
        this.name = name
        this.age = age
        this.sub = sub
    }
	static run(){     // 静态方法
        // this.age  //  报错！只能访问该类的静态属性(如static)，不能访问其他属性age\name
        // 也不能访问内部的_非静态方法
        return '110'
    } 
}

class Man extends Person {
    constructor (){
        super("夏之一周",23,false)
        this.name = "夏之一周"
    }
}

let p = new Person("夏天",23,false)
p.name   // 夏天
p.age // 无法访问，为私有属性，只能在Person内部访问

Person.aaa  // 访问静态属性
Person.run()  // 访问静态方法



// 通过interface 约束类
interface Person(){
    run(types:boolean):boolean  //run函数参数types值为boolean，返回值为boolean
}
interface H(){
    set():void  //run函数参数types值为boolean，返回值为boolean
}
// 使用 implement 关联单个或多个interface 
class Man implement Person {
    params:string
    constructor(params){
        this.params=params
    }
    run (types:boolean):boolean{
        return types
    }
}
    //或多个interface 使用逗号间隔,那么类中也必须对应使用
class Man2 extends Man implement Person,H {
    set(){}
}
```



#### 抽象类/基类

- abstract 定义抽象类
- abstract 所定义的方法 都只能描述不能进行一个实现
- 抽象类无法被实例化
- 使用场景：使用派生类继承抽象类

```typescript
abstract class Vue {
    name:String
    constructor(name?:string){
        this.name = name;
    }
    getName():string{
        return this.name
    }
    abstract init(name:st): void  // 加上这个方法就无法被实现/实例化
}

// 使用派生类 继承 抽象类,派生类可以被实例化
// 需要实例化 抽象类的方法
class React extends Vue{
    constrctor(){
        super()
    }
    init(name:string){}
    setName(name:string){
        this.name=name
    }
}
const react = new React()
react.setName("夏之一周-哈哈哈")
console.log(reacr.getname()) //夏之一周-哈哈哈
```





#### 元组类型 readonly

- 特点：
  - 元组（Tuple）是固定数量的不同类型的元素组合
  - 元素与集合的不同：元组中的类型可以是不同的，且数量长度固定
  - 长度无法修改，每一项的元素无法修改
  - 优点：可以把多个元素作为一个单元传递，如果一个方法需要返回多个值，可以把它们作为元组返回，而不需要创建额外的类来表示
- 使用场景
  - 用来接受固定的接口返回值

```typescript
const arr:[number,boolean] = [1,false]
const arr:readonly[number,boolean] = [1,false]
// 给值起名字，随便起，并设置可选值，可有可无
const arr:readonly [x:number,y:boolean] = [1,false]
const arr:readonly [x:number,y?:boolean] = [1]
const excel:[string,string,number][]=[
    ['哒哒哒','男',18],
    ['哒哒哒','男',18],
]

// 当赋值或访问一个已知索引的元素时，会得到正确的类型

const arr:readonly[number,boolean] = [1,false]
// type first = arr[0]   // 报错.这里arr表示一个值，不能直接 arr[0] 取值
type first = typeof arr[0]  // first=number
type first = typeof arr['length']  // first=2
```





#### 枚举类型 enum

> 可以更清晰明了的看出具体某个值得实际意义

- 默认枚举：从 0 开始递增
- 增长枚举：指定开始递增的初始 number
- 字符串枚举
- 异构枚举
- 接口枚举
- const 枚举
  - let 和 var 都是不允许的声明，只能使用 const
  - const 声明的枚举会被编译成常量
  - 普通声明的枚举编译完后是个对象
- 反向映射
  - 正向映射name=>value 	反向映射value=>name
  - 注意：字符串枚举成员 不支持反向映射

```typescript
// js中没有枚举类型
// 默认从 0 开始，
enum Color {
    red,
    green,
    blue
}
console.log(Color.red,Color.green,Color.blue) //0 1 2

// 增长枚举，可自定义起始值
enum Color {
    red = 1,
    green,
    blue
}
console.log(Color.red,Color.green,Color.blue) //1 2 3

// 字符串枚举
// 如果不指定值，会报错，因为不会自增之类得自动给值
enum Color {
    red='red',
    green='green',
    blue='blue'
}
console.log(Color.red,Color.green,Color.blue) //red green blue

// 异构枚举（混合字符串和数字,不常用）
enum yupes {
    No = 'NO',
    Yes = 1,
}

// 接口枚举
interface S {
    red : yupes.yes
}
let obj:S = {
    red : yupes.yes    // 1
}

//const 枚举
const enum Types {
 	sucess,
    fail
}
let code:number = 0
if(code == Types.sucess){}
// 编译后 为常量
var code = 0;
if(code === 0 /* sucess */){}

// 反向映射(包含正向映射name=>value 反向映射value=>name)
enum Types {
    success
}
let success:number = Types.success
let key = Types[success]
console.log(`value---${success}`,`key---${key}`)   // 1 success
```





#### 类型推论|类型别名







### [tsconfig.json配置](https://blog.csdn.net/muguli2008/article/details/122246623)

```json
{
  "compilerOptions": {
    /* 访问 https://aka.ms/tsconfig.json 以阅读有关此文件的更多信息 */

    
    /* 基本选项 */
    "incremental": true,                   /* 启用增量编译 */
    "target": "ESNEXT",                    /* 指定 ECMAScript 目标版本：'ES3'、'ES5'（默认）、'ES2015'、'ES2016'、'ES2017'、'ES2018'、'ES2019'、'ES2020' 或 'ESNEXT'。 */
    "module": "commonjs",                  /* 指定模块代码生成：“none”、“commonjs”、“amd”、“system”、“umd”、“es2015”、“es2020”或“ESNext”。 */
    "lib": [],                             /* 指定要包含在编译中的库文件。 */
    "allowJs": true,                       /* 允许编译 javascript 文件。 */
    "checkJs": true,                       /* 报告 .js 文件中的错误。 */
    "jsx": "preserve",                     /* 指定 JSX 代码生成：'preserve'、'react-native' 或 'react'。 */
    "declaration": true,                   /* 生成相应的“.d.ts”文件。 */
    "declarationMap": true,                /* 为每个对应的“.d.ts”文件生成一个源映射。 */
    "sourceMap": true,                     /* 生成相应的“.map”文件。 */
    "outFile": "./",                       /* 连接输出到单个文件。 */
    "outDir": "./",                        /* 将输出结构重定向到目录。 */
    "rootDir": "./",                       /* 指定输入文件的根目录。用于通过 --outDir 控制输出目录结构。 */
    "composite": true,                     /* 启用项目编译 */
    "tsBuildInfoFile": "./",               /* 指定文件存放增量编译信息 */
    "removeComments": true,                /* 不要向输出发出注释（删除除代码注释）。 */
    "noEmit": true,                        /* 不发出输出（不生成编译后的文件）。 */
    "noEmitOnError": true,                 /* 在输出js代码时，如果有错将不编译文件。 */
    "importHelpers": true,                 /* 从 'tslib' 导入发射助手。 */
    "downlevelIteration": true,            /* 以“ES5”或“ES3”为目标时，为“for-of”、展开和解构中的迭代提供全面支持。 */
    "isolatedModules": true,               /* 将每个文件转换为一个单独的模块（类似于 'ts.transpileModule'）。 */


    /* 严格的类型检查选项 */
    "strict": true,                        /* 启用所有严格的类型检查选项。 在开发中，建议将stricet这类选项都开启。 */
    "strictNullChecks": true,              /* 启用严格的空（undefined、null）检查，可以防止“未定义不是对象”。 建议开启*/
    "strictFunctionTypes": true,           /* 启用函数类型的严格检查。 */
    "strictBindCallApply": true,           /* 在函数上启用严格的“绑定”、“调用”、应用”方法。 */
    "strictPropertyInitialization": true,  /* 启用对类中属性初始化的严格检查。 */
    "noImplicitThis": true,                /* 使用隐含的“any”类型在“this”表达式上引发错误。 */
    "noImplicitAny": true,                 /* 使用隐含的“any”类型在表达式和声明上引发错误（主要用于控制变量、参数是否必须知道它们的类型【类型检查】），如果是将JavaScript迁移到TypeScript时，可以关闭此项，但不建议这样做。 */
    "alwaysStrict": true,                  /* 以严格模式解析并为每个源文件发出“使用严格”。 */


    /* 额外检查 */
    "noUnusedLocals": true,                /* 报告未使用的本地人的错误。 */
    "noUnusedParameters": true,            /* 报告未使用参数的错误。 */
    "noImplicitReturns": true,             /* 不是函数中的所有代码路径都返回值时报告错误。 */
    "noFallthroughCasesInSwitch": true,    /* 在 switch 语句中报告失败情况的错误。 */


    /* 模块分辨率选项 */
    "moduleResolution": "node",            /* 指定模块解析策略：'node' (Node.js) 或 'classic' (TypeScript pre-1.6)。 */
    "baseUrl": "./",                       /* 解析非绝对模块名称的基目录。 */
    "paths": {
         "@/*": ["src/*"]			// 设置@符号，默认执向src/目录
    },                           /* 一系列将导入重新映射到相对于“baseUrl”的查找位置的条目。 */
    "rootDirs": [],                        /* 根文件夹列表，其组合内容代表运行时项目的结构。 */
    "typeRoots": [],                       /* 包含类型定义的文件夹列表。 */
    "types": [],                           /* 类型声明文件要包含在编译中。 */
    "allowSyntheticDefaultImports": true,  /* 允许从没有默认导出的模块中默认导入。 这不会影响代码发出，只是类型检查。 */
    "esModuleInterop": true,               /* 通过为所有导入创建命名空间对象，在 CommonJS 和 ES 模块之间启用发射互操作性。 暗示“allowSyntheticDefaultImports”。 */
    "preserveSymlinks": true,              /* 不解析符号链接的真实路径。 */
    "allowUmdGlobalAccess": true,          /* 允许从模块访问 UMD 全局变量。 */


    /* 源映射选项 */
    "sourceRoot": "",                      /* 指定调试器应该定位 TypeScript 文件而不是源位置的位置。 */
    "mapRoot": "",                         /* 指定调试器应该定位映射文件而不是生成位置的位置。 */
    "inlineSourceMap": true,               /* 发出带有源映射的单个文件而不是单独的文件。 */
    "inlineSources": true,                 /* 在单个文件中与源映射一起发出源； 需要设置“--inlineSourceMap”或“--sourceMap”。 */


    /* 实验选项 */
    "experimentalDecorators": true,        /* 启用对 ES7 装饰器的实验性支持。 */
    "emitDecoratorMetadata": true,         /* 为装饰器的发射类型元数据启用实验性支持。 */


    /* 高级选项 */
    "skipLibCheck": true,                     /* 跳过声明文件的类型检查。 */
    "forceConsistentCasingInFileNames": true  /* 禁止对同一文件的大小写不一致的引用。 */
  }
}

```







### 类型定义

```ts
let timeInterval:ReturnType<typeof setInterval>;	// setInterval定时器
let timerId: ReturnType<typeof setTimeout>;		//  setTimeout定时器         
```

