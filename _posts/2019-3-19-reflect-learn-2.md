---
layout: post
title: '反射学习(二)'
subtitle: ''
date: 2019-3-19
categories: Android
cover: ''
tags: Android Android-Java Android-Java-语言技巧
---


* [反射学习一](https://tinuv.me/2019/03/18/reflect-learn-1.html)

# 对成员的访问

## 访问字段

通过反射获取到的字段使用Field类表示,Field类提供了一系列的方法来访问基础数据类型,如`getInt()`,`getBoolean()`

```java

Field field = testClass.getField("intData");
int a = field.getInt(test);
field.setInt(test, 5);
```

通过`setInt()`还可以修改一个对象的值,要注意的是使用get,set方法都要传入一个对象,作为获取或者修改的对象.

## 访问方法

通过反射获取的方法可以用Method类来表示,Methon提供了一个`invoke()`提供对方法的调用.

```Java
Method method = testClass.getMethod("getIntData");
method.invoke(test, null);
```

如果方法是静态的,第一个参数应该为空,表示不需要对象.

## 访问构造函数

通过反射获得一个构造方法用Constructor来表示,可以利用构造器创建一个新的实例.通过Class对象的一个方法:`newInstance()`也可以创建一个新的实例,但是收到限制的是这个方法本身不能传递参数,但是如果使用Constructor对象来创建新的对象就可以使用参数.

```java
Constructor constructor = testClass.getConstructor(Integer.class,Integer.class);
constructor.newInstance(5,6);
```

获取构造方法的时候需要传入参数的类型,调用时直接传入参数.

## 访问注解数据

通过反射可以获得注解,使用Annotation类来表示,通过Annotation对象可以获得Annotation的注解数据

```java
CostomAnnotation annotation = field.getAnnotation(CostomAnnotation.class);
int code = annotation.code();
```

反射配合注解可以实现注入.