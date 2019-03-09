---
layout: post
title: 'Fragment和BottomNavigationview实现导航布局'
subtitle: ''
date: 2019-2-26
categories: Android
cover: ''
tags: Android Android-前端 Android-前端-自带组件
---


# 思路分析

实现导航栏有很多思路,一种比较简单的方法是使用 Fragment 和 BottomNavigationView 实现

* Activity 作为 Fragment 的宿主
* BottomNavigationview 作为底部 tab 用来切换
* Framelayout 作为 Fragment 的容器
* FragmentManager (FragmentTransaction) 作为隐藏和显示的开关

思路很简单,实现起来也很简单,我看到 wanAndroid 这款 APP 就是使用这种思路做的导航栏

效果如下
![效果](https://tinuv.me/image/19.png)

# 代码

## Activity
```java
package me.tinuv.fragmentfornavi;

import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    ArrayList<Fragment> fragments;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        fragments = new ArrayList<>();
        fragments.add(HomeFragment.newInstance());
        fragments.add(DashBoardFragment.newInstance());
        fragments.add(NoticeFragment.newInstance());
        BottomNavigationView navigation = findViewById(R.id.navigation);
        FragmentManager fm = getSupportFragmentManager();
        fm.beginTransaction().add(R.id.fragment_container, fragments.get(0), "HOME")
                .add(R.id.fragment_container, fragments.get(1), "DASHBOARD")
                .add(R.id.fragment_container, fragments.get(2), "NOTICE")
                .commit();

        fm.beginTransaction()
                .hide(fragments.get(1))
                .hide(fragments.get(2))
                .commit();

        navigation.setOnNavigationItemSelectedListener((item) -> {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    fm.beginTransaction()
                            .hide(fragments.get(1))
                            .hide(fragments.get(2))
                            .show(fragments.get(0))
                            .commit();
                    return true;
                case R.id.navigation_dashboard:
                    fm.beginTransaction()
                            .hide(fragments.get(0))
                            .hide(fragments.get(2))
                            .show(fragments.get(1))
                            .commit();
                    return true;
                case R.id.navigation_notifications:
                    fm.beginTransaction()
                            .hide(fragments.get(0))
                            .hide(fragments.get(1))
                            .show(fragments.get(2))
                            .commit();
                    return true;
            }
            return false;
        });
    }

}

```


## Fragment

很简单,没有太多东西
```java
package me.tinuv.fragmentfornavi;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class HomeFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.layout_home, container, false);
    }

    public static HomeFragment newInstance() {

        return new HomeFragment();
    }
}

```

## 布局

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity"
    android:gravity="bottom">

    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="500dp">
    </FrameLayout>

    <android.support.design.widget.BottomNavigationView
        android:id="@+id/navigation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="?android:attr/windowBackground"
        app:menu="@menu/navigation" />
</LinearLayout>
```


