# 数据库

**数据的组织结构**：指的就是数据以什么样的结构进行存储

职称：DBA  考证

- 分类：

  - 传统型数据库（关系型数据库）：MySQL、Oracle、SQL Server
  - 新型数据库（非关系数据库 / NoSQL数据库）：Mongodb；在一定程度上弥补了传统型数据库的缺陷。
  - MySQL 数据库（流行、广泛的 开源免费数据据库）
  - Oracle 数据库（收费）
  - SQL Server 数据库（收费）
  - Mongodb 数据库

- 特点：

  - 持久化存储
  - 读写速度极高
  - 保证数据的有效性
  - 对程序支持性非常好，容易扩展

- SQL语句：

  - **查询语句**
  - **增删改查**
  - 事务处理语句
  - 数据控制语句，进行授权与权限回收
  - 数据定义语句，进行数据库、表的管理等

- MySQL数据可视化软件

  - MySQL Server：专门用来提供数据存储和服务的软件。
  - MySQL Workbench：可视化的 MySQL管理工具，便于操作存储在 MySQL Server数据库的数据。

  

## 安装数据库

[MySQL Community msi版安装教程](https://blog.csdn.net/qq_45554010/article/details/104254892)

安装**MySQL**和**MySQL Workbench** 

- 将MySQL连接到MySQL workbench
- 安装路径不能出现中文！





- 数据类型
  - 整数：int  bit(0、1)
  - 小数：decimal
  - 字符串：varchar   char  text
  - 日期事件：data   time   datetime
  - 枚举类型：enum
- 类型说明：
  - decimal表示浮点数，decimal(5,2)表示有5位数，小数占2位
  - char表示固定长度的字符串、char(3)如果填充'ab'时会补空格'ab '
  - varchar可变长字符串，varchar(3)如果填充'ab'时就只存储'ab'
  - text，表示存储大文本，当字符大于4000时，推荐使用
  - 对于图片、视频、音频等文件，不直接存在数据库中，只保存文件路径
- 数据约束
  - 主键约束：
  - 非空约束
  - 唯一约束
  - 默认值
  - 外键
- 
