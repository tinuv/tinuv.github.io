---
layout: post
title: '1013 Battle Over Cities'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



这道题跟大佬的思路差不多,用一边dfs,或者bfs找到几个连通图,有一点不同就是被占领城市的处理方式不同,把占领的城市设为被访问过显然更快

**还有就是scanf,printf比cin,cout快**

```cpp
#include <stdio.h>
#include <algorithm>

using namespace std;

int graph[1010][1010];
int m, n, c;
int visited[1010];

void dfs(int v) {
    visited[v] = 1;
    for(int i = 1; i <= m; i++) {
        if(graph[v][i] == 1 && visited[i] == 0) {
            dfs(i);
        }
    }
}

int main() {
    scanf("%d%d%d", &m, &n, &c);
    for(int i = 1; i <= n; i++) {
        int c1, c2;
        scanf("%d%d", &c1, &c2);
        graph[c1][c2] = graph[c2][c1] = 1;
    }
    for(int i = 0; i < c; i++) {
        int checkv;
        scanf("%d",&checkv);
        fill(visited, visited + 1010, 0);
        int cnt = 0;
        visited[checkv] = 1;
        for(int i = 1; i <= m; i++) {
            if(visited[i] == 0) {
                dfs(i);
                cnt++;
            }
        }
        printf("%d\n",cnt-1);
    }
    return 0;
}

```