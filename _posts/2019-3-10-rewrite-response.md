---
layout: post
title: '理论上可行的重写okhttp的response的方法'
subtitle: ''
date: 2019-3-10
categories: Android
cover: ''
tags: Android Android-后端 Android-后端-第三方库 Android-后端-网络
---

# 记录一种理论上可行的重写okhttp的response的方法

有这样一个需求

要求的json是这样的结构

```json
{
    "data": {},
    "errorCode": 0,
    "errorMsg": ""
}

```

但实际上是这样一个结构

```json
{
    "data": [],
    "errorCode": 0,
    "errorMsg": ""
}

```

也就是一个json对象变成了一个json数据

网络是采用okhttp做客户端,retrofit请求,Rxjava做线程调度,响应都是定死了的,就是第一种json结构,否则解析不了,第一个想到的方法是利用okhttp的intercepter拦截器重写Response,写到一半,发现这种方法理论上可行,实际上...

要重写Response,就要构造一个Response,在Response的源码中看到了一个Reponse的构造器

```java
public static class Builder {
    Request request;
    Protocol protocol;
    int code = -1;
    String message;
    @Nullable Handshake handshake;
    Headers.Builder headers;
    ResponseBody body;
    Response networkResponse;
    Response cacheResponse;
    Response priorResponse;
    long sentRequestAtMillis;
    long receivedResponseAtMillis;

    public Builder() {
      headers = new Headers.Builder();
    }
```

我一看,只要一项一项构造就行了,直到写到...

```java
Response.Builder builder = new Response.Builder()
         .request(response.request())
         .protocol(response.protocol())
         .code(response.code())
         .handshake(response.handshake())
         .headers(response.headers())
         .message(response.message())
         .receivedResponseAtMillis(response.receivedResponseAtMillis())
         .sentRequestAtMillis(response.sentRequestAtMillis())
         .body()
```

前面的参数都可以用原来Response的,但是body得自己构造

ResponseBody是一个抽象类,只要实现里面的方法就行了

```java
      ResponseBody body = new ResponseBody() {

            @Override
            public MediaType contentType() {
                return null;
            }

            @Override
            public long contentLength() {
                return 0;
            }

            @Override
            public BufferedSource source() {
                return null;
            }
        };
```

一看还得构造MediaType和BufferedSource,BufferedSource是okio包里面的东西,这么搞下去,绵绵无绝期,该搞到啥时候,反过来一看,我的需求是这么简单,这绝对不是什么优雅的方法,还是想想其他的方法吧.