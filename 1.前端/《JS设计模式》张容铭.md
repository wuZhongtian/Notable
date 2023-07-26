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



#### 类

> 知识卡：
>
> - 通过this添加的属性方法与prototype添加的属性方法有什么不同？
>   - this定义的属性或方法是该对象自身拥有，每次new新的对象都会重新创建
>   - prototype继承的属性在创建新的对象时，不会再次创建
> - 概念：
>   - 私有属性/方法：由于js函数作用域，声明在函数内部的属性和方法外界访问不到（`类.属性` 也拿不到）
>   - 共有属性/方法：在函数内部通过this创建的属性和方法 或 通过类通过prototype创建的属性/方法，在new创建对象时都会拥有一份并且可以被外界访问
>     - 特权方法：通过this创建的方法，可以访问到函数内部的 私有属性和私有方法！
>   - 静态共有属性/方法：在函数外部通过点语法创建的属性/方法，在new创建对象时并没有被执行到，new创建的对象也无法获取他们，但能通过类来使用。
>   - 静态私有属性/方法：通常借助闭包实现，
>   - 构造器：在new创建对象时，调用特权方法初始化实例对象的一些属性，因此也叫类的构造器
>   - new关键字：通过new关键字创建对象，实质是对新对象this的不断赋值，并将prototype指向类的prototype所指向的对象。
> - 总结：
>   - 静态-new创建的对象中无法通过this访问
>   - 私有-在类的外部无法直接访问但可以借助实例的特权方法操控
>   - 共有-this或prototype创建的属性/方法，在创建的实例中可以被访问

```js
// 1.无静态私有方法/属性时：
var Book = function(id,name,price){
    // 私有属性
    var num = 1
    // 私有方法
    function checkId(){}
    // 公有属性
    this.id = id
    // 特权方法-可以操作私有属性/方法  也是公有方法
    this.getName = function(){}
    this.setName = function(){}
    this.getPrice = function(){}
    this.getPrice = function(){}
    // 其他公有方法
    this.copy = function(){}
    // 构造器-new创建实例时可以初始化对象的一些属性
    this.setName(name)
    this.setPrice(price)
}

// 静态公有属性（new创建的对象无法访问）
Book.isChinese = true
// 静态公有方法（new创建的对象无法访问）
Book.restTime = function(){}
Book.prototype={
    // 公有属性
    isJsBook:false,
    // 公有方法
    display:function(){}
}

// 测试：
var b = new Book(11,"我的心只悲伤七次",66)
console.log(Book.num , Book.isChinese) // undefined  true
console.log(b.num)  // undefined
console.log(b.isJsBook)  // false
console.log(b.id) // 11
console.log(b.isChinese)  // undefined
```

```js
// 2.借助闭包实现，实现静态私有属性/方法
let Book = (function(){
    // 静态私有变量
    var BookNum = 0
    // 静态私有方法
    function checkBook(name){}
    // 创建类
    function _book(newId,newName,newPrice){
        // 私有变量
        var name,price
        // 私有方法
        function checkId(){}
    	// 特权方法-可以操作私有属性/方法  也是公有方法
    	this.getName = function(){}
    	this.setName = function(){}
    	this.getPrice = function(){}
    	this.getPrice = function(){}
        //公有属性
        this.id=newId
        //公有方法
      	this.copy=function(){}
        
        bookNum++
        if(bookNum>100){ ... }
        
        // 构造器
        this.setName(name);
        this.setPrice(price);
	}
	// 构建原型
	_book.prototype={
		isJsBook:false, // 静态公有方法
		display:function(){} // 静态公有属性
	}
	
	return _book;  // 返回类
})()
```



#### 安全模式-检察长

> - 在使用函数类的时候容易出现 创建实例时 遗忘 new关键字而导致问题
> - 解决方法：使用不同情况下的不同现象，使用判断做区分并手动解决异常下的问题

```js
var Book = function(){
    if(this instanceof Book){
        ... // 正常代码
    }else{
        return new Book()
    }
}
    
var book1 = new Book()
var book2 = Book()
```







### 创建型设计模式

