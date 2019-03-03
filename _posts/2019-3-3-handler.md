---
layout: post
title: 'Handler解析'
subtitle: ''
date: 2019-3-3
categories: Android知识体系
cover: ''
tags: Handler
---


# Handler,Looper,MessageQueue之间的关系

Handler需要绑定一个Looper,而Looper持有一个MessageQueue成员变量,在初始化成员变量时Handler会拿到一个Looper对象和MessageQueue对象

```java
public Handler(Callback callback, boolean async) {
         //检查当前的线程是否有 Looper
         mLooper = Looper.myLooper();
         if (mLooper == null) {
             throw new RuntimeException(
                 "Can't create handler inside thread that has not called Looper.prepare()");
         }
         //Looper 持有一个 MessageQueue
        mQueue = mLooper.mQueue;
}
```

之后Handler就有了一个Looper作为成员变量和一个MessageQueue作为成员变量了

## 发送
handler对象可以发送消息,无论通过什么方法发送,都会通过mQueue对象进队

```java
//Handler
sendEmptyMessage(int)
 -> sendEmptyMessageDelayed(int,int)
    -> sendMessageAtTime(Message,long)
      -> enqueueMessage(MessageQueue,Message,long)
             -> queue.enqueueMessage(Message, long);
```

## 接收消息

接受消息主要是通过Looper.loop()将消息从MessageQueue中出队,这个Looper对象与handler绑定的Looper是同一个对象,msg从MessageQueue中出队后投递到目标,因为发消息是handler对象发出的,所以msg中的target对象就是handler

```java
public static void loop() {
     final Looper me = myLooper();//获得looper对象,与handler绑定的looper对象是同一个
     if (me == null) {
         throw new RuntimeException("No Looper; Looper.prepare() wasn't called on this thread.");
     }
     final MessageQueue queue = me.mQueue;//从Looper对象中获得MessageQueue对象
     //...
     for (;;) {
       // 不断从 MessageQueue 获取 消息
        Message msg = queue.next(); // might block
        //退出 Looper 
        if (msg == null) {
            // No message indicates that the message queue is quitting.
           return;
        }
        //...
        try {
            msg.target.dispatchMessage(msg);
            end = (slowDispatchThresholdMs == 0) ? 0 : SystemClock.uptimeMillis();
        } finally {
            //...
        }
        //...
                //回收 message
        msg.recycleUnchecked();
    }
}
```

过程就是这样一个过程.



# UI线程与其他线程进行通信
UI线程已经创建了Looper对象

```java
package me.tinuv.handlertest;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final Handler handler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
                Log.e("tinuv",(String) msg.obj);
            }
        };

        new Thread(new Runnable() {
            @Override
            public void run() {
                Message msg = handler.obtainMessage();
                msg.obj = new String("hello");
                handler.sendMessage(msg);
            }
        }).start();


    }
}
```

# 两个不同的线程通信

```java
package me.tinuv.handlertest;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        new Thread(new Runnable() {
            @Override
            public void run() {
                Looper.prepare();
                Handler handler = new Handler() {
                    @Override
                    public void handleMessage(Message msg) {
                        super.handleMessage(msg);
                        Log.e("tinuv", (String) msg.obj);
                    }
                };
                new MyThread(handler).start();
                Looper.loop();
            }
        }).start();


    }
}

class MyThread extends Thread {
    private Handler mHandler;

    public MyThread(Handler handler) {
        this.mHandler = handler;
    }

    @Override
    public void run() {
        super.run();
        Message msg = mHandler.obtainMessage();
        msg.obj = new String("hello");
        mHandler.sendMessage(msg);
    }
}

```