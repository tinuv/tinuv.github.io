---
layout: post
title: ' 1150 Travelling Salesman Problem'
subtitle: ''
date: 2019-2-21
categories: PAT C++
cover: ''
tags: PAT C++
---



![image](https://gitee.com/tinuv/static-resource/raw/master/1150/shot.png)

主要搞懂两个概念

* 简单路径:除开始节点和结束节点可以相同外,其他的必须不同
* 简单回路:开始节点和结束节点相同的简单路径


# 代码
这次超时了,得了评分是21分,通过集合判断是否是环和通过集合判断是否周游了全部节点显然太耗时了,这是改善的空间

```python
n, m = map(int, input().split(" "))

graph = matrix = [([-1] * n) for i in range(n)]

for index in range(m):
    i, j, dist = map(int, input().split(" "))
    graph[i - 1][j - 1] = dist
    graph[j - 1][i - 1] = dist

path_num = int(input())
paths = []
nodes = set(range(1, n + 1))
min_ = 9999
ind = 0
for index in range(path_num):
    path = list(map(int, input().split(" ")))
    d = 0
    circle = False
    simple = False
    ts = False
    if path[1] == path[-1]:
        circle = True
    if circle:
        if len(set(path[1:-1])) == (path[0] - 1):
            simple = True
    else:
        if len(set(path[1:-1])) == path[0]:
            simple = True

    for i in range(path[0] - 1):
        if graph[path[i + 1] - 1][path[i + 2] - 1] == -1 or graph[path[i + 2] - 1][path[i + 1] - 1] == -1:
            d = "NA"
            circle = False
            break
        else:
            if graph[path[i + 1] - 1][path[i + 2] - 1] != -1:
                d = d + graph[path[i + 1] - 1][path[i + 2] - 1]
            else:
                d = d + graph[path[i + 2] - 1][path[i + 1] - 1]

    if set(path[1:-1]) == nodes:
        ts = True
    if circle and simple and ts:
        print("Path " + str(index + 1) + ": " + str(d) + " " + "(TS simple cycle)")
    elif circle and simple == False and ts:
        print("Path " + str(index + 1) + ": " + str(d) + " " + "(TS cycle)")
    else:
        print("Path " + str(index + 1) + ": " + str(d) + " " + "(Not a TS cycle)")
    if type(d) is int and circle and ts:
        if d < min_ and d > 0:
            min_ = d
            ind = index + 1
print("Shortest Dist(" + str(ind) + ") = " + str(min_) + "")
```