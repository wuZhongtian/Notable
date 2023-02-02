## JS设计模式

> 2015年8月第一版，作者：张容铭

### 面向对象编程

#### 避免污染全局

1. 将多个`函数/变量`放在一个变量（对象）中保存，减少覆盖或被覆盖的风险

   ```js
   let Obj1 = {}
   Obj.Fn1 = function(){}
   
   // 对象的另一种形式：js中函数也是对象
   let Obj2 = function(){} 
   Obj2.Fn1 = function(){ ... }
   Obj2.Fn2 = function(){ ... }
   
   // 	为方便复用，通过函数返回值的形式创建,每次调用都是全新的，使用上互不影响
   let Obj3 = function(){
       return {
           Fn1:function(){},
           Fn2:function(){},
       }
   } 
   let a = Obj3();
   a.Fn1();
                         
   // 真正意义上的类,通过new关键字创建
   let Obj4 = function(){
       this.fn1=function(){...}
       this.fn2=function(){...}
   } 
   let a = new Obj4();
   // 这样每次new创建都会产生一个新的对象，但this.创建方法会造成很多开销
   // 优化：利用原型链的继承关系，创建一次供后代持续使用
   Obj4.prototype.fn3=function(){}      
   // 或者
   obj4.prototype={
       fn4:function(){},
       fn5:function(){}
   }
   // 注意：以上两种方法不要混合使用，避免覆盖之前的赋值
   ```
   



#### 链式编程

```js
// 链式调用的核心，就是函数在执行完成后，返回了this，即当前对象
let Obj = {
    fn1:function(){
        ... return this
    }
    fn2:function(){
        ... return this
    }
}
obj.fn1().fn2()

// 放到类的原型上时使用，需要先new一下再使用
let Obj2 =function(){}
Obj2.prototype = {
    fn1:function(){
        ... return this
    }
    fn2:function(){
        ... return this
    }
}
let obj2= new Obj2()
obj2.fn1().fn2()
```



#### 利用原始类型

```js
// 对 Function的原型进行操作，就可以让所有的函数都具有某个方法/属性
// 但依旧保持不能污染其他人使用的原则，可以单独创建一个使用
Function.prototype.addMethod=function(name,fn){
	this[name]=fn    
    return this  // 返回this，可以实现链式添加
}

// 创建属于自己的函数
var methods = new Function()
methods.addMethod("checkName",function(){
    ... 
    return this // 每个添加的函数都返回this，可实现方法的链式调用
})
```



#### 函数类

> 小提示：
>
> - 通过this添加的属性方法与prototype添加的属性方法有什么不同？
>   - this定义的属性或方法是该对象自身拥有，每次new新的对象都会重新创建
>   - prototype继承的属性在创建新的对象时，不会再次创建
> - 概念：
>   - 私有属性/方法：由于js函数作用域，声明在函数内部的属性和方法外界访问不到
>   - 共有方法：在函数内部通过this创建的属性和方法，在创建对象时，每个对象都拥有一份并且可以被外界访问
>   - 