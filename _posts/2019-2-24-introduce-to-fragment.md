---
layout: post
title: 'Fragment基础知识'
subtitle: ''
date: 2019-2-24
categories: Android
cover: ''
tags: Android Android-前端 Android-前端-自带组件
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

## 代码

### fragment
```java
package me.tinuv.fragmenttest;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class MyFragment extends Fragment {
    private MainActivity mActivity;


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        mActivity = (MainActivity) context;
        Log.e("Tinuv", getArguments().getString("key"));
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_my, container, false);
    }

    public static MyFragment newInstance(Bundle param) {
        MyFragment fragment = new MyFragment();
        fragment.setArguments(param);
        return fragment;
    }
}

```

### activity

```java
package me.tinuv.fragmenttest;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Bundle args = new Bundle();
        args.putString("key", "hello");
        getSupportFragmentManager().beginTransaction()
                .add(R.id.fragment_container, MyFragment.newInstance(args), "f")
                .commit();
    }
}

```

# FragmentManager的常用API

* getFragments():可以获取所有创建时候add进去的所有Fragment；通常可以通过这个api来获取需要指定操作的fragment对象

* manager.findFragmentByTag(String tag): 通过TAG获取指定的Fragment；这个TAG，是在创建Fragment时，调用addToBackStack(String tag)进行绑定关系的

我也不知道为什么,总是没法获得Fragment,总是空指针

* popBackStack()： 弹出栈顶fragment

* popBackStack(String tag,int flags)：

tag可以为null或者相对应的tag，flags只有0和1(POP_BACK_STACK_INCLUSIVE)两种情况
如果tag为null，flags为0时，弹出回退栈中最上层的那个fragment。
如果tag为null ，flags为1时，弹出回退栈中所有fragment。
如果tag不为null，那就会找到这个tag所对应的fragment，flags为0时，弹出该 
fragment以上的Fragment，如果是1，弹出该fragment（包括该fragment）以 
上的fragment。
popBackStackImmediate相关的方法与上面逻辑是一样的与上面不同的是，在调用的时候会立即执行弹出。

# FragmentTransaction的常用API

* add()：将一个Fragment实例对象添加到集合列表的尾部，当展示的时候会在activity的最上层
* remove()：将一个Fragment实例对象从存储的集合列表中移除，并且将其从UI界面中销毁
* replace()：将上一个Fragmnt的实例对象从存储的集合列表中移除，将当前的Fragment实例对象添加到存储的链表尾部，当展示的时候会在activity的最上层
* hide()：将一个fragment，从展示状态隐藏起来，实例对象不被销毁
* show()：将一个fragment实例对象，展示出来
* addToBackStack()：将fragment添加到回退栈中
* 

**add() 和 replace() 运用总结：**

在项目的使用中，通常习惯使用add()加载，add方式视图不会重建，会被保存起来，而replace()每次都会remove掉前面的视图，而replace方式的回退，旧的视图每一次都会重建，在用户体验上不好。

add()和replace()的使用，不能够混合使用，在混合使用的情况下，会导致回退栈混乱，导致的原因是在回退过程中记录的角标存在问题

## FragmentTransaction遇到的一个错位.


```java
java.lang.IllegalStateException: commit already called
```

这个错误是将FragmentTransaction作为了一个变量  
如:
```java
    FragmenTransaction ft = getSupportFragmentManager().beginTransaction();
    ft.add(fragment)
      .commit();
      
    ft.hide(fragment)
      .commit();
```
就会报这个错误

只要每次commit()之前都beginTransaction()就好了

```java
    getSupportFragmentManager().beginTransaction()
        .add(fragment)
        .commit();
      
    getSupportFragmentManager().beginTransaction()
        .hide(fragment)
        .commit();
```
就不会报错了





