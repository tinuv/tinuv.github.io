---
layout: post
title: 'OkkHttp客户端配置项'
subtitle: ''
date: 2019-3-7
categories: Android知识体系
cover: ''
tags: Android知识体系 OkHttp
---


# addInterceptor()

```java
addInterceptor(Interceptor interceptor)
```

添加一个应用拦截器 (application interceptor) , 拦截器是 OkHttp 中提供一种强大机制，它可以实现网络监听、请求以及响应重写、请求失败重试等功能。

![拦截器](https://tinuv.me/image/24.webp)

它的作用主要是拦截请求和拦截响应信息,发出请求后,请求可以被拦截器拦截,收到响应前也可以被拦截器拦截

应用拦截器的特点如下

* 不需要担心中间过程的响应,如重定向和重试.

  也就是说无论重定向多少词,我拦截的总是第一次的请求信息和最终的响应信息,而不用管中间结果

* 总是只调用一次,即使HTTP响应是从缓存中获取.

* 观察应用程序的初衷. 不关心OkHttp注入的头信息如:`If-None-Match`.

* 允许不调用`Chain.proceed()`,即中止调用,不发出请求

* 允许重试,使`Chain.proceed()`调用多次.

# addNetworkInterceptor()

```java
addNetworkInterceptor(Interceptor interceptor)
```

添加一个网络拦截器,网络拦截器的特点如下

* 允许操作中间响应,比如当请求操作发生重定向或者重试等

  管中间操作

* 不允许调用缓存来`short-circuit (短路)`这个请求

  意思就是说不能从缓存池中获取缓存对象返回给客户端，必须通过请求服务的方式获取响应，也就是`Chain.proceed()`

* 可以监听数据的传输

* 允许`Connection`对象装载这个请求对象

  Connection`是通过`Chain.proceed()`获取的非空对象

# authenticator()

```java
    authenticator(Authenticator authenticator)
```

OkHttp 会在返回为`401`的情况下重新进行请求,但是请注意,只有 HTTP 返回的状态码为`401`的时候,才会调用该接口,实现Authenticator 接口返回一个含有令牌的请求.

# cache()

```java
cache(Cache cache)
```

设置缓存对象

# callTimeout()

```java
callTimeout(Duration duration)
```

[callTimeout](http://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.Builder.html#callTimeout-java.time.Duration-)([Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html?is-external=true "class or interface in java.time") duration)设置完整调用超时时间  

或: callTimeout(long timeout, TimeUnit unit)

# certificatePinner()

证书锁定,默认情况下，OkHttp信任运行平台支持的证书颁发机构。这种策略最大化了连通性，但它受到对认证机构的攻击的制约,它也假定了你的HTTPS服务器的证书是由证书颁发机构签名的。

使用[CertificatePinner](http://square.github.io/okhttp/2.x/okhttp/com/squareup/okhttp/CertificatePinner.html)来约束哪些认证机构被信任。证书锁定增加了安全性，但限制了你的服务器团队升级TLS证书的能力。

# connectionPool()

```java
	connectionPool(ConnectionPool connectionPool)
```

设置连接池用于回收HTTP和HTTPS的连接