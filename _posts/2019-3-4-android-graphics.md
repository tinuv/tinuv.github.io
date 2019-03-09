---
layout: post
title: 'Android图形类库简要学习'
subtitle: ''
date: 2019-3-4
categories: Android
cover: ''
tags: Android Android-前端 Android-前端-自带组件
---

Android 图形类包主要包括android.graphics的一些类,这些类是Android对图形的支持.

# Bitmap位图

Bitmap是对图形的一个包装,这个对象将图片文件或流加载到内存,并获得这张图片的各种信息,并从图片中解析出图片的各种信息,常见的一些信息包括Config像素类型,高度,宽度,以及图片每个像素点的颜色信息

# Canvas

Canvas有一个空参数的构造方法也有一个传入Bitmap的构造方法,如果不传入一个Bitmap对象,则需要指定一个Bitmap作为绘制的对象,Canvas中的Bitmap就是最终的显示效果.Canvas主要是可以绘制各种特殊图形,如果不往深处追究,可以将Canvas看成是最终显示的对象,Canvas也可以将Bitmap绘制在上面.
>Construct an empty raster canvas. Use setBitmap() to specify a bitmap to draw into. The initial target density is Bitmap.DENSITY_NONE; this will typically be replaced when a target bitmap is set for the canvas.

```java
public Canvas ()

public Canvas (Bitmap bitmap)
```

# Matrix矩阵

是一个3x3的矩阵,主要是为了实现二维图像的各种变换,不过各种变换我已经忘光了,有时间复习一下

# Paint画笔

canvas本身可以绘制各种特殊图形和路径(Path),所以画笔就很简单了,切换绘制的风格.

# Rect和RectF

Rect和RectF不代表实体的或者说是可视的矩形,而是抽象的坐标,主要是作为绘图的一个数学工具,他们一个是整型的一个是浮点型,有四个很重要的参数是

```java
    public int left;
    public int top;
    public int right;
    public int bottom;
```
如下图

![image](https://tinuv.me/image/20.png)






