# ESP32-Python

## demo
## 1. 环境搭建

### 1.1 安装Python

- 下载安装Python3.7.2，并将其添加到环境变量中

### 1.2 安装pip

- 下载pip，并将其添加到环境变量中

### 1.3 安装相关库

- 打开命令行，输入以下命令安装相关库：
  - pip install esptool
  - pip install micropython-stubber
  - pip install pyserial
  - pip install pyusb
  - pip install pywinusb
  - pip install pywin32
  - pip install pyinstaller
  - pip install pyserial
  - pip install pyusb
  - pip install pywinusb
  - pip install pywin32
  - pip install pyinstaller

### 1.4 安装ESP32-Python

- 下载ESP32-Python，并解压

## 2. 编译

- 打开命令行，进入ESP32-Python文件夹，输入以下命令编译：
  - pyinstaller -F main.py

## 3. 烧录

- 打开ESP32-Python文件夹，找到main.bin文件，将其烧录到ESP32中

## 4. 运行

- 打开串口工具，连接ESP32，设置波特率为115200，点击打开，即可看到输出信息

## 5. 注意事项

- 请注意，在烧录时，请将ESP32的BOOT模式切换到QIO模式，否则无法正常运行

## 6. 代码示例

```python
import machine
import time

led = machine.Pin(2, machine.Pin.OUT)

while True:
    led.value(not led.value())
    time.sleep_ms(500)
```
以上代码将LED灯的状态每隔500ms翻转一次。
在ESP32-Python中，Pin类用于表示GPIO口，Pin.OUT表示输出，Pin.IN表示输入。

machine.Pin(2, machine.Pin.OUT)表示LED灯连接到GPIO口2，并设置为输出。

led.value(not led.value())表示将LED灯的状态翻转一次。

time.sleep_ms(500)表示延时500ms。
