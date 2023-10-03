### MAC

```shell
Command + Shift + .			 # 显示隐藏文件（在文件夹中同时按三个键）
Command + Shift + 5 		 # 截图工具

rm -rf 目录名		# 删除文件夹   -r 表示向下递归，不管有多少级目录，一并删除
rm 文件名				# 删除文件   -f 表示强制删除
```

- [tldr](https://link.zhihu.com/?target=https%3A//link.juejin.cn/%3Ftarget%3Dhttps%253A%252F%252Fgithub.com%252Ftldr-pages%252Ftldr)

```shell
# tldr 工具  

tldr	xxx  # 查看xxx的命令有哪些
```





### 第三方软件

- 报错1：xxx已损坏，无法打开，你应该将它移到废纸篓

  报错2：打不开xxx，因为它来自身份不明的开发者

  报错3：打不开xxx，因为 Apple 无法检查其是否包含恶意软件

  报错4：Error The xxx may be damaged……

1. 方案一：

   系统设置>隐私与安全性 ，查看是否有 「任何来源」 的选项

   如果提示阻止使用某软件，打开即可

2. 方案二：**绕过Gatekeeper公证**

   将打不开的安装包拖动到桌面

   打开终端，输入代码：`sudo xattr -r -d com.apple.quarantine`

   将安装包直接拖拽到终端中（本质是文件的路径），按下回车

   输入开机密码，再次尝试即可打开应用

3. 方案三：

   https://mp.weixin.qq.com/s?__biz=Mzg5NTcwOTk1OQ==&mid=2247512439&idx=4&sn=0f16bcc9ee5edd70a2085548900c04dc&scene=19#wechat_redirect
