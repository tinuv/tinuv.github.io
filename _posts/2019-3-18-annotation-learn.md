---
layout: post
title: '注解学习'
subtitle: ''
date: 2019-3-18
categories: Android
cover: ''
tags: Android Android-Java Android-Java-语言技巧
---

# 理论学习

## 是什么

* 是什么

  注解是告知**编译器**要做什么的说明

* 可以对哪些元素进行注解

  * 包
  * 类型(类,接口,枚举)
  * 构造器
  * 属性(变量/域)
  * 方法
  * 参数
  * 局部变量

注解类型和注解

* 注解类型:特殊的接口
* 注解:注解类型的实例
* 两者关系类似于类与实例的关系

分类

* 源码注解:只在源码中存在
* 编译时注解:在class中仍然存在
* 运行时注解:运行阶段起作用

## 标准注解

* @Override

  覆盖父类(超类)的一个方法

* @Deprecated

  方法被弃用

* @SuppressWarning

  抑制警告

## 标准元注解

元注解:对注解进行标注的注解,说白了就是就是可以定义注解,*元*这个字已经说得很清楚了

* @Decymented

  标记类注解,用于对注解类型的声明进行标注,使该注解的实例包含在利用Javadoc或类似工具产生的文档里面

* @Inherited

  使用此注解标注,使得被标注的注解类型的任何实例都会被继承(**不大怎么清楚**)

* @Retension

  表示被标注的注解内心不够会保存多久,可以是:

  * SOURCE: 只在源代码中存在,被编译器丢弃
  * CLASS: 在类文件中记录,默认值
  * RUNTIME: 在运行时起作用,可被反射获取

  他们都在`java.lang.annotation.RetentionPolicy`这个枚举类中

* @Target

  表示哪些程序类型可以被注解类型的实例进行标注,取值可以为:

  * ANNOTATION_TYPE:可以对注解进行标注
  * CONSTRUCTION:可以对构造器进行标注
  * FIELD:可以对域(成员变量,属性)进行标注
  * LOCAL_VARIBLE:  可以对局部变量进行标注
  * METHOD:可以对方法进行标注
  * PACKAGE:可以对包进行标注
  * PARAMETER:可以对参数进行注解
  * TYPE:可以对类型(类,枚举类,接口)进行注解

  ## 语法

  * 声明

    ```java
    @Documented
    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})
    public @interface CostomAnnotation {
        String name();
        String age();
    }
    ```

    一个特殊的接口,然后使用元注解对其进行定义

  

  

# 实例

注解一般与反射配合,因为注解只是一个接口(特殊的接口),只有方法声明,没有方法体,如果不实现方法体那么只有一个标注的作用,如

```Java
   @Override
    @CostomAnnotation(name = "tinuv", age = "21")
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        mBroadcastReceiver = new NetWorkBroadcastReceiver();
        registerReceiver(mBroadcastReceiver, intentFilter);
    }
```

## 配合反射使用

* 自定义注解

  ```java
  import java.lang.annotation.*;
  
  @Documented
  @Retention(RetentionPolicy.RUNTIME)
  @Target({ElementType.FIELD, ElementType.METHOD})
  public @interface CostomAnnotation {
      int code();
  }
  ```

  

* 使用注解

  ```java
  package annotationdemo;
  
  public class TestClass {
      @CostomAnnotation(code = 10)
      private int value;
  
      @Override
      public String toString() {
          return value + "";
      }
  }
  ```

  

* 配合反射实现注入

  ```java
  package annotationdemo;
  
  import java.lang.reflect.Field;
  
  public class Main {
      public static void main(String[] args) throws IllegalAccessException {
          Class c = TestClass.class;
          TestClass testClass = new TestClass();
          Field[] fields = c.getDeclaredFields();
          for (Field field : fields) {
              if (field.isAnnotationPresent(CostomAnnotation.class)) {
                  CostomAnnotation annotation = field.getAnnotation(CostomAnnotation.class);
                  int code = annotation.code();
                  field.setAccessible(true);
                  field.setInt(testClass,code);
                  System.out.println(testClass);
              }
          }
  
      }
  }
  
  ```

  