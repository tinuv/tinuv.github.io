---
layout: post
title: 'Java随机访问类笔记'
subtitle: ''
date: 2019-3-31
categories: Android
cover: ''
tags: Android Android-Java Android-Java-语言技巧
---



# 随机访问文件类

* 流(输入输出流)和读写类(Reader和Writer及其子类)只能按照数据的先后顺序读取数据源的数据

* RandomAccessFile类不属于流,具有随机读写文件的功能,能从文件的任意位置开始执行读写操作.

* RandomAccessFile的常用方法

  * getFilePointer()

    返回读写指针的位置

  * seek(Long pos)

    设置读写指针的位置,与文件头相隔pos个字节数

  * skipBytes(int n)

    使读写指针从当前位置开始,跳过pos个字节数

  * length()

    文件所包含的字节数

* 随机读写类的访问模式

  * r模式

    read only,只写

  * wr模式

    可读也可写

  ⚠️注意没有`w`模式