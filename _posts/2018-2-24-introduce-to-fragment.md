---
layout: post
title: 'Fragment基础知识'
subtitle: ''
date: 2019-2-24
categories: Android知识体系
cover: ''
tags: Android知识体系 Android-Fragment
---
# 基础知识
Fragment，简称碎片，是Android 3.0（API 11）提出的，为了兼容低版本，support-v4库中也开发了一套Fragment API，最低兼容Android 1.6。

过去support-v4库是一个jar包，24.2.0版本开始，将support-v4库模块化为多个jar包，包含：support-fragment, support-ui, support-media-compat等，这么做是为了减少APK包大小，你需要用哪个模块就引入哪个模块。

如果想引入整个support-v4库，则compile 'com.android.support:support-v4:24.2.1'，如果只想引入support-fragment库，则com.android.support:support-fragment:24.2.1。

不管是v4支持包还是v7支持包都是为了将一些较为先进的app设计理念向后兼容,一般来说,v4支持包的版本和v7支持包的版本与编译sdk或者目标sdk一致,比如我的编译版本(即API level)是27,那么最好使用版本号以27开头的v4或v7包.

推荐使用支持包中的fragment,兼容性更强.


# fragment的特点与优势


## 特点
* Fragment是依赖于Activity的，不能独立存在的。
* 一个Activity里可以有多个Fragment。
* 一个Fragment可以被多个Activity重用。
* Fragment有自己的生命周期，并能接收输入事件。
* 我们能在Activity运行时动态地添加或删除Fragment。

## 优势


* 模块化（Modularity）：我们不必把所有代码全部写在Activity中，而是把代码写在各自的Fragment中。

* 可重用（Reusability）：多个Activity可以重用一个Fragment。

* 可适配（Adaptability）：根据硬件的屏幕尺寸、屏幕方向，能够方便地实现不同的布局，这样用户体验更好


# fragment核心的API
* Fragment：Fragment的基类，任何创建的Fragment都需要继承该类。
* FragmentManager：管理和维护Fragment。他是抽象类，具体的实现类是-  FragmentManagerImpl。
* FragmentTransaction：对Fragment的添加、删除等操作都需要通过事务方式进行。他是抽象类，具体的实现类是BackStackRecord。
* Nested Fragment（Fragment内部嵌套Fragment的能力）是Android 4.2提出的，support-fragment库可以兼容到1.6。通过getChildFragmentManager()能够获得管理子Fragment的FragmentManager，在子Fragment中可以通过getParentFragment()获得父Fragment。


# fragment的生命周期
![Fragment生命周期](https://tinuv.me/image/18.png)
* onAttach()：Fragment和Activity相关联时调用。可以通过该方法获取Activity引用，还可以通过getArguments()获取参数。
* onCreate()：Fragment被创建时调用。
* onCreateView()：创建Fragment的布局。
onActivityCreated()：当Activity完成onCreate()时调用。
* onStart()：当Fragment可见时调用。
* onResume()：当Fragment可见且可交互时调用。
* onPause()：当Fragment不可交互但可见时调用。
* onStop()：当Fragment不可见时调用。
* onDestroyView()：当Fragment的UI从视图结构中移除时调用。
* onDestroy()：销毁Fragment时调用。
* onDetach()：当Fragment和Activity解除关联时调用。


# fragment的基本使用

## 设置参数和解析参数
activity可以通过fragment的setArguments()对关联的fragment设置参数,可以在onAttach()中获得参数,即getArgument()获得参数,getArgument()返回一个Bundle,解析这个Bundle即可.

>It is strongly recommended that subclasses do not have other constructors with parameters, since these constructors will not be called when the fragment is re-instantiated.

如果在创建Fragment时要传入参数，必须要通过setArguments(Bundle bundle)方式添加，而不建议通过为Fragment添加带参数的构造函数，因为通过setArguments()方式添加，在由于内存紧张导致Fragment被系统杀掉并恢复（re-instantiate）时能保留这些数据


## fragment的容器

Fragment有很多可以复写的方法，其中最常用的就是onCreateView()，该方法返回Fragment的UI布局，需要注意的是inflate()的第三个参数是false，因为在Fragment内部实现中，会把该布局添加到container中，如果设为true，那么就会重复做两次添加，则会抛如下异常：

```java
Caused by: java.lang.IllegalStateException: The specified child already has a parent. You must call removeView() on the child's parent first.
```

fragment有两种添加方式
* 静态添加：通过xml的方式添加，缺点是一旦添加就不能在运行时删除。
* 动态添加：运行时添加，这种方式比较灵活，因此建议使用这种方式。
虽然Fragment能在XML中添加，但是这只是一个语法糖而已，Fragment并不是一个View，而是和Activity同一层次的。

运行时添加需要一个容器,这个容器一般是framelayout,至于为什么用framelayout我就不知道了.




