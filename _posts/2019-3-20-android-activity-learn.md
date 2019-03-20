---
layout: post
title: 'Activity学习笔记'
subtitle: ''
date: 2019-3-20
categories: Android
cover: ''
tags: Android Android-前端 Android-前端-自带组件
---



# 笔记

* Activity有四种基本状态

  * Active/Running:一个新的Activity启动后,在屏幕的最前端,在栈顶,处于可见且可与用户交互的状态
  * Paused:失去焦点,如被一个Dialog覆盖后,此时仍然与窗口管理器保持连接,系统继续维护其内部状态,仍然可见
  * Stopped:被另一个activity覆盖,失去焦点并不可见时
  * Killed:当Activity被系统杀死回收或者没有被启动时,处于Killed状态

* 可以调用`finish()`函数结束处于**`Paused`或`Stoped`**状态的Activity

* 可以用onSaveInstanceState保存Activity的状态

* 调用`finish()`函数的结果与按下`BACK`键效果相同

* 一个Activity对象在栈的位置阅读就越有可能被系统回收

* Activity直接或间接的继承了Context,ContextWrapper,ContextThemeWrapper等类

* Activity的生命周期如下

  * onCreate

    Activity实例被启动时调用的第一个方法

  * onStart

    在onCreate被调用后调用或从Stop状态转化为Active状态调用

  * onRestart

    重新启动Activity时调用

  * onResume

    从Active状态转化为Pause状态时调用

  * onStop

    从Active状态转化为Stop状态时调用,可在此保存Activity的状态信息

  * onDestroy

    在Active状态结束时调用,可在此释放资源或清除内存

  * onPause

    暂停Activity时调用

* 使用PreferenceActivity和PreferenceFragment和方便做出设置界面

* 在清单文件中配置Activity需要配置如下属性

  * name

    类名

  * icon

    对应的图标

  * label

    标签

  * exported

    是否允许被其他应用程序调用

  * launchMode

    加载模式,支持standard,singTop,singleTask,singleInstance四种加载模式

* Activity的四种加载模式

  Android系统中采用Task来管理Activity,但是开发者无法访问,只可以调用Activity对象的getTaskId()方法来获取它所在的Task的Id,Task是以栈的形式来管理Activity

  * standard

    标准模式,为目标Activity创建一个新的实例,并将该Activity进栈

  * singleTop模式

    与标准模式相似,与标准模式不同的是如果目标Activity已经为Task栈顶时,系统不会重新创建Activity实例,而是复用已有的Activity实例

  * singleTask模式

    Activity在同一个Task中只有一个实例

    * 要启动的目标不在Task中:创建目标Activity的实例,并将其加入Task栈顶
    * 要启动的目标Activity已经位于栈顶:与singleTop模式相同
    * 要启动的目标Activity已经存在但没有位于Task栈顶:将目标Activity上面的Activity全部出栈,使得目标Activity位于栈顶

  * singleInstace

    无论从那个Task中启动目标Activity启动目标Activity,只会创建一个目标Activity实例,并会启动一个全新的Task栈来转载该Activity实例,可分为两种情况处理

    * 要启动的目标Activity不存在,系统创建一个全新的Task再创建目标Activity的实例,并将目标Activity实例入栈
    * 要启动的目标Activity已经存在,无论其位于那个应用程序中(Task)中,系统会将该Activity所在的Task转到前台,从而使该Activity显示出来.