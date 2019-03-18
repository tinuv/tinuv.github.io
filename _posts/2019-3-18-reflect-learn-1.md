---
layout: post
title: '反射学习(一)'
subtitle: ''
date: 2019-3-18
categories: Android
cover: ''
tags: Android Android-Java Android-Java-语言技巧
---
# 理论学习

1. Class类

   关于类的抽象,或者说,Class类描述了一个类,每个类中都有一个Class对象,在Java中,类是现实世界的一种抽象,或者说是一种描述,比如Person类,可以根据需求将人抽象成具有性别,年龄属性,能吃饭(方法)的一种实体,同样Class类也抽象了Java类中的一些特点.

2. 每一个类中都有一个Class对象,可以通过如下方法获得一个Class类的实例

   ```java
   Class stringClass = new String().getClass();
   Class stringClass = String.class;
   try {
         Class stringClass = Class.forName("String");
       } catch (ClassNotFoundException e) {
          e.printStackTrace();
       }
   ```

   使用类似于`String.class`看上去一个类的静态变量,实际上由编译器来解析,最后一种方法需要捕获一个异常

3. 反射是一个类或对象自我检查的一种能力,反射可以使Java代码查看对象的一个类,并确定其结构

4. 反射可以找到一个类的构造函数,方法和字段,甚至修改字段值,动态的调用方法,以及构造新的对象

5. 类的主要特性有构造方法,字段(域,成员变量),方法分别由下列类表示

   * Constructor
   * Field
   * Method

   上述类分别来自java.lang.reflect

   上述类的实例可以通过Class对象获得,Class对象提供了两组方法来获得上述对象,一组允许访问类的公共特性,包括继承的成员,另一组允许访问直接在类中声明的任何公共或非公共成员(不包括继承的成员)

   ## Class类中关于反射的一些方法

   * 获得字段
     * getFields()
     * getDeclaredFields()
     * getField()
     * getDeclardField()

   都是诸如此类的方法,总之,通过Class类可以获得

   * 构造器
   * 字段
   * 方法
   * 注解
   * 实现的接口
   * 内部类

   ## 安全性

   Method,Constructor等等类都有一个`getModifiers()`来获得访问权限标志,可以通过Modifier的一个静态方法来解析,如

   ```java
   Method method = stringClass.getMethod("equalsIgnoreCase");
   int m = method.getModifiers();
   boolean b = Modifier.isPublic(m);
   ```

   私有成员能否访问取决于Java安全管理器和安全策略,在不违反安全策略的情况下,可以通过setAccessible使成员允许访问

   ```java
   Method method = stringClass.getMethod("equalsIgnoreCase");
   method.setAccessible(true);
   ```