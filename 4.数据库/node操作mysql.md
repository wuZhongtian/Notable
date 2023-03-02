# node操作mysql

## 安装mysql

`npm install mysql`

## 连接mysql

```javascript
// 导入操作mysql模块
var mysql = require('mysql');
// 定义 连接数据 默认端口 3306 如需要修改 port:端口
var connection = mysql.createConnection({
  host:'xx.xx.xx.xx',
  user:'blog',
  password:'blog',
  database:'blog',
  charset:"utf8"
});
// 连接
connection.connect(function (err,dos) {
    if (err) {
        console.log('连接失败');
        return
    }
    console.log('连接成功');
});
```

## 查询数据

```javascript
// sql语句
var  sql = 'SELECT * from user where  id = 1';
// 第一个参数是sql语句 第二个是回调函数 里面的第一个参数是错误处理 第二个是查询的结果
connection.query(sql, function (err, result) {
    // 错误处理
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
    }
    // 输出查询结果
       console.log(result); 
});
```

## 插入数据

```javascript
var addSql = "insert into test (sex,age) values('男',15)";
//增
connection.query(addSql,function (err, result) {
        if(err){
         console.log('插入失败',err.message);
         return;
        }        
       console.log('插入成功',result);          
});
 
```

## 修改数据

```javascript
var modSql = "update test set sex = '女', age = 18  where id  = 1";
//改
connection.query(modSql,function (err, result) {
   if(err){
         console.log('修改失败',err.message);
         return;
   }        
  console.log('修改成功',result.affectedRows);
});
```

## 删除数据

```javascript
var delSql = 'delete from test where id = 1';
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('删除失败',err.message);
          return;
        }        
       console.log('删除成功',result.affectedRows);
});
```

## 防止SQL注入攻击

- 使用mysql模块提供的 escape() 方法

```js
// 假定 userid是用户提供的数据，使用 escape() 方法过一遍即可
var delSql = 'delete from test where id ='+ connection.escape(userid);
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('删除失败',err.message);
          return;
        }        
       console.log('删除成功',result.affectedRows);
});
```



# node连接mysql方式2



```js
// db/db.js
var mysql = require("mysql")
// 数据库连接配置
var pool = mysql.createPool({
  host:'47.107.105.83',
  user:'blog',
  password:'blog',
  database: ：'blog',
  charset:"utf8"
})

//封装对数据库增删改查的基础函数，参数1：sql语句、参数2：执行的回调函数
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,function(err,rows){
            callback(err,rows)
            connection.release()
        })
    })
}
exports.query=query

// 在具体业务逻辑中引入使用
const db = require("./db/db.js")
aap.get("/api",(req,res)=>{
    ...
    // 进行数据库查询
    db.query("select * from areas limit 10",(err,data)=>{
        if(err){
            console.log(err)
            res.send("数据库查询出错！")
        }
        res.send(data);
    })
})
```

