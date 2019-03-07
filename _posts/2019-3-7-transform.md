---
layout: post
title: '二维图形变换的数学基础'
subtitle: ''
date: 2019-3-7
categories: Android知识体系
cover: ''
tags: Android知识体系 图形变换
---

# 平移

将点由 $(x,y)$ 变化为 $(x',y')$ ,即$(x+T_x,y+T_y)$ ,用齐次坐标表示为

$$
\begin{bmatrix}
x& y& 1
\end{bmatrix} \times 
\begin{bmatrix}
1& 0& 0& \\
0& 1& 0& \\
T_x& T_y& 1
\end{bmatrix}
$$

# 比例变换

将点 $(x,y)$ **相对于点 $O$** 沿 $x$ 方向缩放$S_x$ 倍,沿$y$ 方向缩放$S_y$ 倍,即变化为$(x\times S_x,y \times S_y)$ 用齐次坐标方程表示为

$$
\begin{bmatrix}
x'& y'& 1
\end{bmatrix}
 = \begin{bmatrix}
 x& y& 1
 \end{bmatrix}
 \times
 \begin{bmatrix}
 S_x& 0& 0&\\
 0& S_y& 0\\
 0& 0& 1
 \end{bmatrix}
$$

# 旋转变换

将点 $(x,y)$ **相对于点 $O$** 旋转 一个角度 $\beta$ (逆时针为正,顺时针为正)所得到的点,用齐次坐标方程表示为

$$
\begin{bmatrix}
x'& y'& 1
\end{bmatrix} 
= 
\begin{bmatrix}
x& y& 1
\end{bmatrix}
\times
\begin{bmatrix}
cos\beta& sin\beta& 0\\
-sin\beta& cos\beta& 0\\
0& 0& 1
\end{bmatrix}
$$

即

$$
\begin{cases}
x' = xcos\beta - ysin\beta \\
y' = xsin\beta + ycos\beta
\end{cases}
$$

# 反射变换

将某个点 $(x,y)$ 关于原点,或某个坐标轴反射得到的点

* 关于源点反射变化为

  $$
  \begin{cases}
  x' = -x\\
  y' = -y
  \end{cases}
  $$
  所以变换矩阵为
  $$
  \begin{bmatrix}
  -1& 0& 0\\
  0& -1& 0\\
  0& 0& 1
  \end{bmatrix}
  $$

* 关于$x$坐标反射变换为

  $$
  \begin{cases}
  x' = x\\
  y' = -y
  \end{cases}
  $$
  所以变换矩阵为
  $$
  \begin{bmatrix}
  1& 0& 0\\
  0& -1& 0\\
  0& 0& 1
  \end{bmatrix}
  $$

* 关于$y$ 左标反射变换为

  $$
  \begin{cases}
  x' = -x\\
  y' = y
  \end{cases}
  $$
  所以变换矩阵为
  $$
  \begin{bmatrix}
  -1& 0& 0\\
  0& -1& 0\\
  0& 0& 1
  \end{bmatrix}
  $$

# 错切变换

错切变换我感觉是我最难理解的一种变换,书上的原话是

> 错切变换是点$P(x,y)$ 沿$x$ 轴和$y$轴发生不等量的变换,得到$P'(x',y')$点的过程,坐标变换为
>
> $$
> \begin{cases}
> x' = x+cy\\
> y' = bx+y
> \end{cases}
> $$

用齐次坐标矩阵表示为

$$
\begin{bmatrix}
x'& y'& 1
\end{bmatrix}
=
\begin{bmatrix}
x& y& 1
\end{bmatrix}
\times
\begin{bmatrix}
1& b& 0\\
c& 1& 0\\
0& 0& 1
\end{bmatrix}
$$
