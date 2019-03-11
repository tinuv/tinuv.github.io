---
layout: post
title: 'Kotlin学习'
subtitle: ''
date: 2019-3-11
categories: Android
cover: ''
tags: Android Android-Kotlin Android-Kotlin-语言技巧
---




# 定义包,引入包

```kotlin
package me.tinuv

import java.util.*
```

这个与Java是相似的.

# 定义变量

与Java不同,kotlin的类型都是写在后面的.

```kotlin
val a: Int = 10100100
val b = 10
```

也可以省略,kotlin会自动推断,但我不知道是不是所有类型都可以自动推断.自动推断必须要有初始值

```kotlin
val c:Int
c = 100
```

**注意:定义只读局部变量使⽤关键字 `val` 定义.只能为其赋值⼀次.下面的代码将报错**

```kotlin
val x = 10
x+=1
```

**定义可变的量使用`var`关键词**

```kotlin
var x = 10
x+=1
```

# 定义函数

```kotlin
fun sum(a:Int,b:Int):Int{
    return a+b;
}
```

返回值在后面,简单的函数也可以这样定义

```kotlin
fun sum(a:Int,b:Int) = a+b
```

看起来十分简洁

对于Java空类型是void,对于kotlin空类型是Unit,空类型返回值可以不写明类型

```kotlin
fun printSum(result:Int){
    print(result)
}

fun printSum(result:Int):Unit{
    print(result)
}
```

# 字符串模板

感觉就是整合了字符串格式化,和类似于`"+a+" hello`这样的东西,因为`$`可以后接各种表达式

```kotlin
var s =  "$name is ${b.toString()} year old"
```



# 条件表达式

与Java类似,但是Kotlin没有三目运算符即:`a>b?a:b`,取而代之是这个

```kotlin
fun test(a:Int,b:Int) = if(a>b) a else b

var c = if(a>b) a else b
```

感觉还是三目运算符比较方便

# 空值检测

但某个变量可以为空的时候,必须在类型后面加一个?

```kotlin
var b:Int?

fun test(a:Int,b:Int):Int? = if(a>b) a else b
```

如果函数的返回值可能为空,那么直接调用函数赋值会报错,如下会报错

```kotlin
fun main(args: Array<String>) {
    val x = test(20,10)
    val y = test(100,79)
    print(x*y)
}

fun test(a:Int,b:Int):Int? = if(a>b) a else b
```

需要进行空检测,空检测后会转化为非空值

```java
fun main(args: Array<String>) {
    val x = test(20,10)
    val y = test(100,79)
    if (x!=null && y!=null){
        print(x*y)
    }
}

fun test(a:Int,b:Int):Int? = if(a>b) a else b
```



单个的是不报错的,如

```kotlin
fun main(args: Array<String>) {
    val x = test(20,10)
    print(x)
}

fun test(a:Int,b:Int):Int? = if(a>b) a else b
```



