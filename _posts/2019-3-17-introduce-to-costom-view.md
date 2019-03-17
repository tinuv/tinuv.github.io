---
layout: post
title: '自定义组合控件基础'
subtitle: ''
date: 2019-3-17
categories: Android
cover: ''
tags: Android Android-前端 Android-前端-自带组件
---


自定义组合控件我以前没有用过,对我来说是一个新的领域,由于今天的时间很少了,没有很只学了一点点,但也记录下来,作为一个开头.

# 实现一个最简单的组合控件

实现组合控件很关键的一点是动态加载布局,就是使用LayoutInflater来动态加载布局,加载完了之后基本上一个最简单的组合控件就算完了.组合控件在统一界面风格方面的作用很大,尤其是重用的时候,可以减少很多代码冗余,因为在组合控件可以处理一些公共的逻辑,比如按钮点击事件的逻辑都是相同的时候,在组合控件中就可以统一处理这些逻辑,减少冗余.

# 步骤

* 写一个布局文件作为组合控件的内容,必要的时候可以使用Merge来减少不必要的嵌套

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <merge xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="horizontal">
  
      <Button
          android:id="@+id/view_1_bnt_1"
          android:layout_width="0dp"
          android:layout_height="50dp"
          android:layout_weight="1"
          android:text="BUTTON1" />
  
      <Button
          android:id="@+id/view_1_bnt_2"
          android:layout_width="0dp"
          android:layout_height="50dp"
          android:layout_weight="1"
          android:text="BUTTON2" />
  
      <Button
          android:id="@+id/view_1_bnt_3"
          android:layout_width="0dp"
          android:layout_height="50dp"
          android:layout_weight="1"
          android:text="BUTTON3" />
  </merge>
  
  ```

  

* 创建一个类继承一个ViewGroup(Linearlayout)作为容器

* 动态加载布局,构造方法里面使用LayoutInflater动态加载布局,并可以使用findViewById()实例化子View,并处理公共逻辑

  ```java
  package me.tinuv.costomviews;
  
  import android.content.Context;
  import android.support.annotation.Nullable;
  import android.util.AttributeSet;
  import android.util.Log;
  import android.view.LayoutInflater;
  import android.widget.Button;
  import android.widget.LinearLayout;
  
  public class CostomView1 extends LinearLayout {
      public CostomView1(Context context) {
          super(context);
          init(context);
      }
  
      public CostomView1(Context context, @Nullable AttributeSet attrs) {
          super(context, attrs);
          init(context);
      }
  
      public CostomView1(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
          super(context, attrs, defStyleAttr);
          init(context);
      }
  
      public CostomView1(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
          super(context, attrs, defStyleAttr, defStyleRes);
          init(context);
      }
  
      private void init(Context context) {
          LayoutInflater.from(context).inflate(R.layout.costom_view_1, this, true);
          Button button1 = findViewById(R.id.view_1_bnt_1);
          Button button2 = findViewById(R.id.view_1_bnt_2);
          Button button3 = findViewById(R.id.view_1_bnt_3);
  
          button1.setOnClickListener((v) -> {
              Log.e("tinuv", "hello");
          });
      }
  }
  
  ```

  