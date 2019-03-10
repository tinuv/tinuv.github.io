---
layout: post
title: '使用线程池创建线程'
subtitle: ''
date: 2019-3-10
categories: Android
cover: ''
tags: Android Android-后端 Android-后端-自带组件 Android-后端-多线程调度
---

# 使用线程池创建线程的好处

阿里巴巴Java规约推荐使用线程池来创建线程而不是显式的创建线程,使用线程池来创建线程有如下好处

* 重用线程池中的线程,避免因为线程的创建和销毁所带来的性能开销.

  线程是轻量级的进程,虽然创建和销毁的开销比进程小得多,但仍是一笔不小的开销

* 能有效控制线程池的最大并发数，避免大量的线程之间因互相抢占系统资源而导致的阻塞现象
* 能够对线程进行简单的管理，并提供定时执行以及指定间隔循环执行等功能

Android中的线程池的概念来源于Java中的Executor，Executor是一个接口，真正的线程池的实现为ThreadPoolExecutor.

ThreadPoolExecutor提供了一系列参数来配置线程池，通过不同的参数可以创建不同的线程池，从线程池的功能特性上来说，Android的线程池主要分为4类，这4类线程池可以通过Executors所提供的工厂方法来得到

Android中的线程池都是直接或者间接通过配置ThreadPoolExecutor来实现的

# ThreadPoolExecutor

```java
public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              ThreadFactory threadFactory)
```

各个参数代表的含义

* **corePoolSize**

  线程池的核心线程数,默认情况下,核心线程会在线程池中一直存活,即使它们处于闲置状态.如果将ThreadPoolExecutor的allowCoreThreadTimeOut属性设置为true,那么闲置的核心线程在等待新任务到来时会有超时策略,这个时间间隔由keepAliveTime所指定,当等待时间超过keepAliveTime所指定的时长后,核心线程就会被终止.

* **maximumPoolSize**

  线程池所能容纳的最大线程数,当活动线程数达到这个数值后,后续的新任务将会被阻塞

* **keepAliveTime**

  非核心线程闲置时的超时时长,超过这个时长,非核心线程就会被回收,当ThreadPoolExecutor的allowCoreThreadTimeOut属性设置为true时，keepAliveTime同样会作用于核心线程

* **unit**

  用于指定keepAliveTime参数的时间单位

* **workQueue**

  阻塞队列,线程池中的任务队列，通过线程池的execute方法提交的Runnable对象会存储在这个参数中

* **threadFactory**

  线程工厂,为线程池提供创建新线程的功能,ThreadFactory是一个接口,它只有一个方法：`Thread newThread(Runnable r)`

* **RejectedExecutionHandler**

  不常用,当线程池无法执行新任务时，这可能是由于任务队列已满或者是无法成功执行任务，这个时候ThreadPoolExecutor会调用handler的rejectedExecution方法来通知调用者，默认情况下rejectedExecution方法会直接抛出一个RejectedExecutionException,RejectedExecutionHandler提供了几个可选值:CallerRunsPolicy,AbortPolicy,DiscardPolicy和DiscardOldestPolicy,其中AbortPolicy是默认值，它会直接抛出RejectedExecutionException

# 线程池的分类

*  **FixedThreadPool**

  通过Executors的newFixedThreadPool方法来创建.它是一种线程数量固定的线程池,当线程处于空闲状态时,它们并不会被回收,除非线程池被关闭了.当所有的线程都处于活动状态时,新任务都会处于等待状态,直到有线程空闲出来.由于FixedThreadPool只有核心线程并且这些核心线程不会被回收,这意味着它能够更加快速地响应外界的请求

* **CachedThreadPool**

  通过Executors的newCachedThreadPool方法来创建.它是一种线程数量不定的线程池,它只有非核心线程,并且其最大线程数为`Integer.MAX_VALUE`.由于`Integer.MAX_VALUE`是一个很大的数,实际上就相当于最大线程数可以任意大.当线程池中的线程都处于活动状态时,线程池会创建新的线程来处理新任务,否则就会利用空闲的线程来处理新任务.线程池中的空闲线程都有超时机制,这个超时时长为60秒,超过60秒闲置线程就会被回收.

* **ScheduledThreadPool**

  通过Executors的newScheduledThreadPool方法来创建.它的核心线程数量是固定的,而非核心线程数是没有限制的,并且当非核心线程闲置时会被立即回收.ScheduledThreadPool这类线程池主要用于执行定时任务和具有固定周期的重复任务

* **SingleThreadExecutor**

  通过Executors的newSingleThreadExecutor方法来创建.这类线程池内部只有一个核心线程,它确保所有的任务都在同一个线程中按顺序执行.SingleThreadExecutor的意义在于统一所有的外界任务到一个线程中,这使得在这些任务之间不需要处理线程同步的问题.

# 但是...

阿里巴巴不推荐使用Executors创建线程

![插图](https://tinuv.me/image/26.png)

而是使用原始的ThreadPoolExecutor,这样会让人了解线程的规则.所以关于ThreadPoolExecutor的介绍就很重要了