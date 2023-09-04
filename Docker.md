##  [Docker](https://docs.docker.com/desktop/install/ubuntu/)



### 历史概念

- 物理服务器

  - 缺点：部署慢、成本高、资源浪费、难以迁移和扩展、受限于硬件

- 虚拟化技术

  > 一台物理机通过vm虚拟化多个操作系统，一个物理机部署多个虚拟机及app。通过虚拟化技术，可以将计算工作放在云上进行。
  >
  > 虚拟化，是一种资源管理技术，将计算机的各种实体资源进行抽象、转换后呈现出来并可供分割、组合为一个或多个电脑配置环境。
  >
  > 全虚拟化、半虚拟化、硬件辅助虚拟化（KVM、Hyoer-V）......

  - 虚拟机工具产品：
    - vmware worfstation（个人学习使用），主要使用windows
    - 企业虚拟化 vmware esxi虚拟化工具，高性能服务器结合，进行服务器资源虚拟化
    - linux下的虚拟化工具、kvm工具
  - 缺点：每个虚拟机都是完成的操作系统，资源消耗较大
  - ![image-20230626004511414](images/Docker/image-20230626004511414.png)

- 容器技术 Docker

  > 基于Golang语言开发而来，基于Linux内核的Cgroups、NameSpace、Union FS等技术。对进程进行封装隔离，属于操作系统层面的虚拟化技术。
  >
  > docker并非一个通用的容器工具，依赖于已存在并运行的linux内核环境。
  >
  > Docker是一个 CS模式的架构，后端是一个松耦合的架构，众多模块各司其职。

  - 概念:
    - 镜像 images：构建容器，应用程序运行所需的环境
    - 仓库 Repository：dockerhub类似于github，用于保存镜像文件、提供上传于下载功能
      - 类似maven仓库-存放jar包，github存放git项目，分为公开Public和私有Privatre两种
        - 最大的公开仓库是：https://hub.docker.com ;国内推荐使用阿里云、网易云等
    - 容器 containers：镜像文件的实例化对象，用来运行实际的应用程序（镜像创建的运行实例）
    - 网络  network
    - 数据卷 Data Volumes
    - ![image-20230626010254534](images/Docker/image-20230626010254534.png)
    - ![image-20230626005130740](images/Docker/image-20230626005130740.png)
  - 优点：
    - 提升性能，不需要单独分割硬件资源、启动耗时短、不依赖CPU的虚拟化支持、一致性的环境、便于迁移
    - 持续交付和部署







### 基础知识

```sh
# 帮助启动类命令
sudo systemctl status docker 	# 查看docker状态
sudo systemctl start docker     # 启动docker
sudo systemctl stop docker      # 停止docker
sudo systemctl restart docker   # 重启docker
sudo systemctl enable docker 	# 开机启动
sudo docker info		# 查看docker概要信息，等同于  docker --version
sudo docker--help		# 查看帮助文档
sudo docker 具体命令 --help   	 # 查看具体命令的帮助文档 


# 镜像命令
docker images		  	# 查看本地主机上的镜像有哪些
## 返回表格： REPOSITORY-镜像的仓库源/镜像名	TAG-标签/版本	IMAGE ID-镜像id	CREATED-创建时间	SIZE-大小
docker images -a		# 列出本地所有镜像（含历史映像层）
docker images -q 	 	# 只显示镜像id

docker search 镜像名	  # 查询镜像（包括远程）（选择时一般选择官方认证-命名：作者/命名） 
docker search 镜像名 --limit 5		# 查询指定镜像名下点赞数最多的5个
## 返回表格：NAME-镜像名称	DESCRIPTION-镜像说明	STARTS-点赞数量	OFFICIAL-是否属于官方	AUTOMATED-是否是自动构建的

docker pull 镜像名[:TAG]		  # 下载镜像,可指定对应tag版本，可忽略默认为最新的	

docker system df 				# 查看镜像/容器/数据卷所占的空间

docker rmi 镜像id/镜像名[:TAG] [镜像id/镜像名[:TAG]]		# 通过镜像id或镜像名，删除镜像
docker rmi 镜像id/镜像名 -f		# 强行删除，当镜像被某个容器使用时，直接删除会失败
docker rmi -f $(docker images -qa) 	# 删除全部镜像


# 容器命令（有镜像才能创建容器，容器是镜像运行的实例）
docker run [OPTIONS] 镜像名 [COMMAND] [ARG...]    	 # 新建+启动容器（交互式容器）
--name=容器的自定义命名   ## 为容器指定名称，默认为系统随机分配
-d		## 后台运行容器并返回容器id，（守护式容器-后台运行）
-i		## 以交互模式运行容器，通常与 -t 同时使用
-t		## 为容器分配一个伪输入终端，通常与 -i 同时使用
-P		## 随机端口映射，大写P
-p		## 指定端口映射，小写p		  -p 8080
## 举例：
docker run -it --name=ubuntu1 ubuntu /bin/bash # 交互式模式下新建+运行ubuntu容器，分配伪终端进入/bin/bash命令行程序，该容器的命名为ubuntu1

docker ps 	# 查看所有正在运行的容器
-a 		## 列出当前所有正在运行的容器+历史上运行过的
-l		## 显示最近创建的容器
-n		## 显示最近n个创建的容器  docker ps -n 1
-q		## 静默模式，只显示容器编号

exit		# 退出容器，exit退出时容器会停止（run进入容器）
ctrl+p+q	# 退出容器，ctrl+p+q退出时容器不停止（run进入容器）

docker start 容器名/容器id	# 启动已经停止的容器
docker restart 容器名/容器id	# 重启容器
docker stop 容器名/容器id	# 停止正在运行的容器
docker kill 容器名/容器id	# 强制停止容器

docker rm 容器id 	   		  # 删除已停止的容器（不能删除运行时容器）
sudo docker rm -f $(sudo docker ps -a -q)  # 将$()中的结果作为整个语句的参数，全部删除
## docker ps -a -q | xargs docker rm  # 将|前的内容作为参数替换xargs，全部删除

 
docker run -d 容器名	# 启动守护式容器（后台服务器）
docker logs 容器id	 # 查看容器日志
docker top 容器id 	 # 查看容器内运行的进程（容器==极简内核版linux）
docker inspect 容器id  # 查看容器内部细节（）

# 进入正在运行的容器并以命令行交互
docker exec -it 容器id /bin/bash（bashshell位置） # 在容器中打开新的终端，启动新的进程，使用exit退出不会导致容器停止,!!!推荐
-d		## 后台运行容器并返回容器id，（守护式容器-后台运行）
-i		## 以交互模式运行容器，通常与 -t 同时使用
-t		## 为容器分配一个伪输入终端，通常与 -i 同时使用
docker attach 容器id	# 直接进入容器的命令终端，不会启动新的进程1，exit退出会导致容器的停止


docker cp 容器id:容器没的路径 目的主机路径 # 从容器内拷贝文件到主机上（例：docker cp dbaguhug29uda:/usr/local/con.txt /tem/c.txt）
docker export 容器id>文件名.tar # 导出容器的内容流作为一个tar归档文件(例：docker export dbaguhug29uda>abcd.tar )
cat 文件名.tar | docker import - 镜像用户/镜像名:镜像版本号 # 从tar包导入镜像文件(例：cat abcd.tar | docker import - hahaha:0.0.1)



docker commit -m='提交的描述信息' -a='作者' 容器id 要创建的镜像名:[tag标签名]	# 提交容器副本，生成一个新的镜像，生成后通过docker images查找并使用（例：docker commit -m="add vim cmd" -a='wzt' 容器id vimUbuntu:1.0）






# 其他重要内容：
 - 有镜像才能创建容器-根本前提
 - 守护式容器：不进入对应的交互式命令窗口
 - 出现apt update失败时，可尝试重启docker解决

##  其他习惯
- docker run 运行后，使用docker ps应该能看到对应的程序，如果没有说明失败/被关闭了（docker机制问题：后台进程模式的应用，导致docker前台没有运行的应用，会认为无事可做，立即自杀）
- 最佳解决方案：将运行的程序以前台进行的形式运行（交互模式） -d,再用exec进入对应容器实例
```

![image-20230629234401761](images/Docker/image-20230629234401761.png)

![image-20230629235148054](images/Docker/image-20230629235148054.png)





![image-20230628101658449](images/Docker/image-20230628101658449.png)



#### [Install Docker](https://docs.docker.com/desktop/install/ubuntu/)

```sh
# ubuntu：

## 1.更新系统的软件包管理器
sudo apt update 	
## 2.安装依赖包以允许apt通过HTTPS使用存储库
sudo apt install apt-transport-https ca-certificates curl software-properties-common
## 3.添加Docker的官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
## 4.添加Docker存储库 
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
## 5.更新软件包索引并安装Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
## 6.验证Docker是否正确安装（如果输出一堆东西，就表明正确安装）
sudo docker run hello-world

### 输出信息：
Unable to find image 'hello-world:latest' locally  # 无法在本地找到图像"hello-world:latest",会自动下载对应的镜像，并在容器内运行
......
Hello from Docker!
......





```

![image-20230629140126421](images/Docker/image-20230629140126421.png)

![image-20230629151141252](images/Docker/image-20230629151141252.png)





#### pull 慢问题

```sh
# 第一步：创建配置文件目录 + 进入/etc/docker的路径
sudo mkdir /etc/docker
# 编辑配置文件，不存在时，该命令会自动创建
sudo nano /etc/docker/daemon.json
# 进入编辑界面，添加源，保存并退出
{
    "registry-mirrors":[
        "https://9cpn8tt6.mirror.aliyuncs.com",
        "https://registry.docker-cn.com"
    ]
}
# 重启docker服务
sudo systemctl daemon-reload 
sudo systemctl restart docker
# 检查我们刚刚的源有没有换成功,查看 Registry Mirrors配置中是否有
sudo docker info
```







#### Docker镜像

> docker镜像：是一种轻量级、可执行的独立软件包，包含运行某个软件所需的所有内容。将应用程序和配置依赖打包好形成一个可交付的运行环境。

##### UnionFS联合文件系统

> 是一种分层、轻量且高性能的文件系统。支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂在到同一个虚拟文件系统下。
>
> 是Docker镜像的基础，镜像通过分层来进行继承，基于基础镜像，可以制作各种具体的应用镜像.
>
> ![image-20230704162227434](images/Docker/image-20230704162227434.png)



##### 概念：

- docker镜像层都是只读的，容器层是可写的
- 可在原有镜像的基础上追加内容，并生成自己的镜像，类似虚拟机的快照
- Docker中的镜像分层，支持通过扩展现有镜像，创建新的镜像。类似Java继承于一个Base基础类，自己再按需扩展。新镜像是从 base 镜像一层一层叠加生成的。每安装一个软件，就在现有镜像的基础上增加一层

![img](https://office-cn-beijing.imm.aliyuncs.com/api/v3/office/copy/SDRYUEVXQ0RPUEdJeWo5dWMzL052aWhJVXpNOHo0RlNDMmVWelJML2ZkUWNGQTJGc29zNTNTd0lOaFRySURNYWlTVktycnNyMi9hMWpVYjJoejBucWszeFBCdWxlZjBhSkxSKzZtdHRYaHh5TXpQLzE2K3BJOUgya0hram9ZRjl4MEN4d1E4a1l2bWhJRlJEcmZrWjc5MUppQ0FlbnNaTjQrMnJJYkRzRGQvU2crZzVjUGt3ajRvSndJSkRZUHZvcTFNeit4K1FvT0krRnZ3LzlWRFRJTytCcVY5NDRvUnV2azA5MjVYVURWczRpbDZPdEpXWkVPbkY=/attach/object/3b43436a8951c0979e65b24c0df88e22859fb3a9)



#### 本地镜像发布到云仓库

- 案例：阿里云 镜像容器服务

  ```shell
  # 1.阿里云 开通 镜像容器服务
  # 2.本地docker登录，（阿里云会提供对应命令）
  
  # 登录阿里云Docker Registry
  docker login --username=wuzhongtian registry.cn-wulanchabu.aliyuncs.com
  
  # PULL - 从Registry中拉取镜像
  docker pull registry.cn-wulanchabu.aliyuncs.com/wuzt/wuzt:[镜像版本号]
  
  # PUSH - 将想要推送的容器打成tag
  docker tag [ImageId] registry.cn-wulanchabu.aliyuncs.com/wuzt/wuzt:[镜像版本号]
  # 将镜像推送到Registry
  docker push registry.cn-wulanchabu.aliyuncs.com/wuzt/wuzt:[镜像版本号]
  
  
  ```

  



#### 本地镜像推送到私有库 registry

[28_新镜像推送私服库案例_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1gr4y1U7CY/?p=28&spm_id_from=pageDriver&vd_source=12c717d82cfc8f0cc3894516956cc8b3)

```shell
# 运行 registry 搭建私有库
docker run -d -p 5000:5000 -v /zzyyuse/myregistry/:/tem/registry -- privileged=true registry
# docker ps 查看registry的镜像id

apt-get update   # 更新软件源
apt-get install net-tools  # 安装net-tools，可以使用ifconfig命令

# 发起get请求，查看私有库中镜像
curl -XGET http://192.xxx.xxx:5000/v2/_catalog

# 将镜像修改为符合私服规范的Tag
docker tag 镜像名:tag名 自己主机的ip地址:端口/镜像名称:版本
（例：docker tag wuzt:1.0 192.18.111.167:5000/wuzt:1.0 ）

# 修改配置，支持http传输
## docker默认不允许http方式推送镜像，通过配置选项来取消这个限制。修改完不生效时，可尝试重启docker
## vim命令新增如下红色内容:  
vim /etc/docker/daemon.json
{
	"registry-mirrors":["https://aa25jnbu.mirror.aliyuncs.com"],
	"insecure-registries":["192.xxx.xxx:5000"]
}

# 将本地容器推送放到私服库
docker push id地址:端口/镜像名称:tag
（例：docker push 192.168.111.167:5000/wuzt:1.2）

# 发起get请求，查看私有库中镜像
curl -XGET http://192.xxx.xxx:5000/v2/_catalog

# 拉取代码
docker pull 192.168.111.167:5000/wuzt:1.2
```



![image-20230710132904250](images/Docker/image-20230710132904250.png)

![image-20230710120033045](images/Docker/image-20230710120033045.png)



#### 容器数据卷

> 容器数据卷：完成数据持久化存储的方式，将重要资料备份；方式：将容器内的数据备份+持久化到本地主机目录( 映射，容器内的数据到本地主机目录)
>
> - 卷：含义是目录或文件，存在于一个或多个容器中，由docker挂载到容器，但不属于镜像的联合文件系统的内容，提供用于持续存储或共享数据的特性
> - 卷：设计目的就是`数据持久化`，完全独立于容器的生命周期，因此不会在容器删除时删除其挂载的数据卷

- 特点：
  1. 数据卷可在容器之间共享和重用数据
  2. 卷中更改-实时生效，不需要手动拷贝
  3. 数据卷中的更改不会包含在镜像的更新中
  4. 数据卷的生命周期一直在持续到没有容器使用它为止
- 权限扩容：
  - 问题：Docker挂载主机目录访问，如果出现`cannot open directory:Permission denied`
  - 解决办法：在挂载目录后多加一个 `--privileged=true`参数即可

```shell
# 命令：
docker run -it --privileged=true -v /宿主机绝对路径:/容器内目录 镜像名

例：docker run -d -p 5000:5000 -v /zzyyuse/myregistry/:/tem/registry --privileged=true registry

# -v  运行一个带有容器卷存储功能的容器实例
## /zzyyuse/myregistry/ 宿主机的路径
## /tem/registry 容器内的地址 
## --privileged=true 开启权限




# 查看容器卷是否挂载成功
docker inspect 容器id	# 查看容器内部细节的 Mounts配置， 



# 默认容器卷 rw可读可写 ro只读 wo只写
# 限制在容器内只能读，不能写
docker run -it --privileged=true -v /宿主机绝对路径:/容器内目录:ro 镜像名 



# 卷的继承和共享
# 实现在容器2、3中继承某个容器原有的容器卷规则，进行继承容器卷
- 容器1完成和宿主机的映射
- 容器2继承容器1的卷规则

docker run -it --privileged=true -v /宿主机绝对路径:/容器1目录:ro 镜像名1

docker run -it --privileged=true -volumes-from 父类容器名 --name 容器名2 镜像名	# -volumes-from 简写 -v ：继承
```













#### 常规软件安装

1. 搜索镜像（dockerhub）
2. 拉取
3. 查看镜像
4. 启动镜像 - 服务端口映射
5. 停止容器
6. 移除容器





#### [35_tomcat安装上集_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1gr4y1U7CY?p=35&spm_id_from=pageDriver&vd_source=12c717d82cfc8f0cc3894516956cc8b3)



### 虚拟化技术

#### KVM-基于内核的虚拟机

