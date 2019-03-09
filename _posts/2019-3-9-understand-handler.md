---
layout: post
title: 'Handler机制中的消息队列'
subtitle: ''
date: 2019-3-9
categories: Android
cover: ''
tags: Android Android-后端 Android-后端-多线程调度 Android-后端-自带组件
---

学习自[蘑菇街大佬](https://android-notes.github.io/2016/12/03/5%E5%88%86%E9%92%9F%E5%AE%8C%E5%85%A8%E7%90%86%E8%A7%A3android-handler/)

Handler机制可以看成是一个消息阻塞队列,当有消息时立即处理消息,没有消息时则阻塞.在Android系统中APP启动后很快进入死循环,不断读取MessageQueue中的消息,有消息则立即处理,没有消息则阻塞.Android的View绘制，事件响应(点击，触摸屏幕等)都是把消息发送到了主线程的消息队列,包括自己在主线程创建的handler最终也是把消息插入到了主线程消息队列中,并最终分发到到指定的handler处理消息.

```java
handler.send(msg)
->sendMessageDelayed(msg, 0)
->sendMessageAtTime(msg, SystemClock.uptimeMillis() + delayMillis)
->enqueueMessage(queue, msg, uptimeMillis)
//这里就是进入到消息队列,进入的是主线程的Looper(MainLooper)
->queue.enqueueMessage(msg, uptimeMillis);
```

当出队的时候会根据msg中的一个成员变量target(这个target就是handler)来分发的对应的handler,这样handler就拿到了信息,

```java
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
```

这个target是怎么来的呢,Message有几个静态方法可以传入Handler实例作为target的值

```Java
public static Message obtain(Handler h);
public static Message obtain(Handler h, Runnable callback) ;
public static Message obtain(Handler h, int what);
public static Message obtain(Handler h, int what, Object obj);
public static Message obtain(Handler h, int what, int arg1, int arg2);
public static Message obtain(Handler h, int what,
            int arg1, int arg2, Object obj);
```

那没有传参数的Message是怎么拿到的handler的呢?我也不知道,只从注释中发现呢这一段话,等待探索

>each Handler has its own name-space for message codes, so you do not need to worry about yours conflicting with other handlers.

![截图](https://tinuv.me/image/25.png)

