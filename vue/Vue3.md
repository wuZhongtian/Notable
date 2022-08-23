## Vue3

### 基础内容

#### 创建项目

- 使用 Vue-cli 创建（Vue-cli 版本4.5.0  +）

  ```js
  vue -V // 查看Vue-cli 版本   （4.5.0+ 才能创建vue3）
  vue create 项目名  //创建vue3项目
  npm run serve //运行项目 
  npm run build //项目打包
  ```
  
- 使用 [Vite](https://vitejs.cn/) 创建

  ```js
  npm init vite-app 项目名  //创建vue3项目
  npm install //安装依赖！
  npm run dev //运行项目 
  ```

#### 关闭语法检查

- 在 项目根目录下 vue.config.js 中进行配置

```js
module.exports = {
    lintOnSave: false, //关闭语法检查 修改配置后需要重启
}
```



#### main.js

- 入口文件 发生改动（不兼容Vue2的写法）

```js
// 引入createApp工厂函数 创建vm
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')  // app为index.html容器的id
/*
	createApp(App).mount('#app') 可拆分为
	const app=createApp(App)  // 相当于创建vm，但app比vm更轻
	app.mount('#app')   // 挂载到节点
*/

/*  引入的不再是Vue构造函数 
    new Vue({
      render: h => h(App),
    }).$mount('#app')
*/
```





#### 杂项

1. Vue文件结构中可以 存在多个标签，不再要求只有一个根标签包裹

2. Vue3中使用Vue2 的data、methods配置依旧生效，**尽量不要与Vue2.x配置混用**
   - - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
     - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
     - 如果有重名, setup优先。

3. Vue3中setup配置的响应式数据，是深层次的
   - 可以对代理过的数据 直接进行删除、添加操作，同时界面跟随变化

4. 单向数据流 props

   > 组件间数据传递时，依旧需要使用props进行接收

   - vue2中接收后可以直接使用
   - vue3中接收后可通过**setup函数**的**第一个参数**拿到，也能直接使用



### 组合式API

#### setup配置

> - Vue3中的一个配置项，值为一个函数；是所有Composition API(组合式api)的`表演舞台`
> - 组件中所有用到的：数据、方法、计算属性等，均要配置在setup中

- setup的两种返回值
  1. 若返回一个对象，则对象中的属性、方法，在模板中均可直接使用
  2. 若返回一个渲染函数：可以自定义渲染内容！
     - 需要单独引入 渲染函数 h  `import {h} from 'vue'`
     - 返回值是一个函数，函数中需要 再返回 h函数调用的结果
     - `template`模板中的内容会被完全替换为 h函数调用的结果
- 注意点：
  - setup**执行时机 **
    - 在beforeCreate之前执行一次，this指向undefined
  - setup 接受的参数
    - 参数1 props：通过props接收的父组件传递过来的数据（具有响应式）
      - 多传未收有警告，未传多收不警告
    - 参数2 context：
      - attrs：父组件传递且当前组件未props接收的数据
      - emit：
  - setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

```vue
<!-- setup 的第一种返回值，对象中的属性、方法，在模板中均可直接使用 -->
<template> 
  <h2>姓名{{ name }}</h2>
  <h2>年龄{{ age }}</h2>
  <button @click="sayHello">说话</button>
</template>
<script>
export default {
  name: "App", //配置组件名
  setup() {
    // 数据
    let name = "张三";
    let age = 18;
    //方法
    function sayHello() {
      alert(`你好,我是${name}`);
    }
    return {
      name,
      age,
      sayHello,
    };
  },
};
</script>
```

```vue
<!-- setup 的第二种返回值，渲染函数,自定义渲染内容 -->
<template>
	<h2>23456 会被替换的内容</h2>
</template>
<script>
import {h} from 'vue'
export default{
	name:'App', //配置组件名
    setup(){
        // 数据
        let name = "张三";
        let age = 18;
        //方法
        function sayHello(){
            alert(`你好,我是${name}`)
        }
        return ()=>{ return h('h1',name)}
    }
}
</script>
```



#### ref函数

- 作用: 定义一个**响应式的数据**

  - 引入 `import {ref} from 'vue'`

- 语法: `const xxx = ref(initValue)`

  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据需要携带  .value： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`

- 备注：

  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。（Proxy实现）

- ```vue
  <template>
    <h2>姓名{{ name }}</h2>
    <h2>工作{{ job.type }}</h2>
    <button @click="changeInfo">修改信息</button>
  </template>
  <script>
  import {ref} from 'vue'
  export default{
  	name:'App', //配置组件名
      setup(){
          // 数据
          let name = ref("张三");
          let job= ref({
              type:'前端工程师',
              salary:'30k'
          })
          //方法
          function changeInfo(){
              name.value='李四'
              job.value.type='UI设计师'
          }
          return{
              name,
              job,
              changeInfo
          }
      }
  }
  </script>
  ```



#### reactive函数

- 作用: 定义一个`对象类型`的响应式数据（基本类型，要用```ref```函数）
- 语法：`const 代理对象= reactive(源对象)`
  - 接收一个 对象 / 数组，返回一个代理对象（Proxy的实例对象，简称proxy对象）
  - 对于数组可以直接通过下标进行修改
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

```js
setup(){
    // 数据
    let name=ref('张三'),
    let job=ref({
        type:'前端开发',
        salary:{
            number:'12k'
        }
    })
    let hobby=reactive(['吸烟','喝酒','打游戏'])
    // 方法
    function changeInfo(){
        name.value='李四',
        job.value.salary.number='32k'
        hobby[1]='吃饭'
    }
}
```





#### reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：基本类型数据
   -  reactive用来定义：对象（或数组）类型数据。
   -  备注：ref 也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref 通过`Object.defineProperty()`的```get```与`set`来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作 源对象 内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。





### 重要内容

#### 响应式原理

##### vue2的响应式

- 实现原理：

  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - Object.defineProperty() 捕获不到 新增属性、删除属性的操作, 无法直接相应式更新界面。
  - 直接通过下标修改数组, 界面不会自动更新。



##### Vue3的响应式

- 实现原理: 

  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过Reflect（反射）:  对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
      	// 拦截读取属性值
          get (target, prop) {
          	return Reflect.get(target, prop)
          },
          // 拦截设置属性值或添加新属性
          set (target, prop, value) {
          	return Reflect.set(target, prop, value)
          },
          // 拦截删除属性
          deleteProperty (target, prop) {
          	return Reflect.deleteProperty(target, prop)
          }
      })
      
      proxy.name = 'tom'   
      ```



##### 模拟Vue3响应式数据原理

###### Proxy  代理对象

- Proxy构造函数 参数
  - 参数1：源数据
  - 参数2：配置对象，get、set、deleteProperty 函数
  - 不配置这些函数时，默认就会达成相应操作
- get 函数 **读取数据**
  - 参数1：new Proxy时传入的源对象
  - 参数2：读取的属性名
- set 函数 **修改数据 **  新增
  - 参数1、参数2 同上get函数
  - 参数3：修改后的值
- deleteProperty 函数 **删除数据**
  - 参数同 get 函数

```js
// 原数据
let person = {
    name:'张三',
    age:18
}
const p = new Proxy(person,{
    get(target,propName){
        console.log(`读取了person的${person}值`);
        return Reflect.get(targrt,propName)
    },
    set(target,propName,value){
        console.log(`修改了person的${propName}值,改变为${value}`)
        return Reflect.set(targrt,propName,value)
    },
    deleteProperty(target,propName){
        return Reflect.deleteProperty(target,propName)
    }
}) 
// 增删改查时调用Proxy底层的Handler
// 此时通过p修改属性值，会导致person的值一起改，实现代理操作
```





###### Reflect 反射对象

- Reflect 优点
  - 重复追加同一个属性，
    - Object.defineProperty对导致代码出错挂掉
    - Reflect.defineProperty不会导致代码挂掉，代码依旧能执行，会返回true/false告知是否成追加成功
      - 只有第一次成功返回ture，第二次失败返回false

```js
// 使用window身上的Reflect对象  
let obj={a:1,b:2}
// 读取obj.a
Reflect.get(obj,'a')    // 1
// 修改obj.a
Reflect.set(obj,'a',666)   // true
// 删除obj.a
Reflect.deleteProperty(obj,'a')  // true
// 追加obj.c
Reflect.defineProperty(obj,'c',{
    get(){ return 4 }
})
```







