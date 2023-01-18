## JS设计模式

> 2015年8月第一版，作者：张容铭

### 面向对象编程

#### 第一章

- 避免污染全局变量

  1. 将多个`函数/变量`放在一个变量中保存，减少覆盖或被覆盖的风险

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
                           
     // 真正意义上的类
                           
     ```

     