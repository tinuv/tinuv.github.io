---
layout: post
title: 'Djikstra温故知新'
subtitle: ''
date: 2019-2-23
categories: PAT
cover: ''
tags: C++ PAT 数据结构 算法
---

# Djikstra算法思路
Djikstra算法其实前面总结过,这次有了新收获.

Djikstra算法有点动态规划的感觉,后一个结果根前一个结果有关.3个数组很重要,一个是dist数组,也就是顶点之间的距离,一个是visit,记录顶点是否已经被访问过,一个是path,记录最短路径.

一开始我写出来的Djisktra算法是模仿书上的,后来看到了更加精简的版本,主要是初始化的不同.过程还是类似,过程:

```cpp
Dijkstra() {
  初始化;
  for(循环n次) {
    u = 使dis[u]最小的还未被访问的顶点的编号;
    记u为确定值;
    for(从u出发能到达的所有顶点v){
      if(v未被访问 && 以u为中介点使s到顶点v的最短距离更优)
        优化dis[v];
    }
  }
}
```

精简版的初始化中,dist数组除了源点外其他全部初始化为整型的最大值,这是为了方便在dist数组中找最小值,visit数组全部置为false,这是为了在第一次迭代的时候找到源点,path的每个元素置为自己的下标.接下来就差不多了

# 优化

从源点出发到某一点的最短路径可能有多条,为了解决这个问题,可以将path数组设为二维数组,为了方便的加入数据,可以将数组的元素设为vector.

# 代码
```cpp
#include <iostream>
#include <climits>
#include <vector>

using namespace std;

int n = 7;
const int INF = INT_MAX;

int graph[7][7] = {
    {0, 4, 6, 6, INF, INF, INF},
    {INF, 0, 1, INF, 7, INF, INF},
    {INF, INF, 0, INF, 6, 4, INF},
    {INF, INF, 2, 0, INF, 5, INF},
    {INF, INF, INF, INF, 0, INF, 6},
    {INF, INF, INF, INF, 1, 0, 8},
    {INF, INF, INF, INF, INF, INF, 0}
};

void dfs(int v,vector<int> *path,int s) {
    cout<<v<<" ";
    if(v==s) {
        return;
    }
    for(int i=0; i<path[v].size(); i++) {
        dfs(path[v][i],path,s);
    }
}

void djikstra(int s) {
    bool visit[n] = {false};
    vector<int> path[n];
    int dist[n];
    fill(dist,dist+n,INF);
    dist[s] = 0;
    path[s].push_back(s);
    for(int i=0; i<n; i++) {
        int mdis = INF;
        int u = -1;
        for(int j=0; j<n; j++) {
            if(visit[j]==false&&dist[j]<mdis) {
                mdis = dist[j];
                u = j;
            }
        }
        if(u==-1)
            return;

        visit[u] = true;
        for(int j=0; j<n; j++) {
            if(visit[j]==false&&graph[u][j]!=INF&&graph[u][j]+dist[u]<dist[j]) {
                dist[j] = graph[u][j]+dist[u];
                path[j].clear();
                path[j].push_back(u);
            } else if(visit[j]==false&&graph[u][j]!=INF&&graph[u][j]+dist[u]==dist[j]) {
                path[j].push_back(u);
            }
        }
    }
    for(int i=0; i<n; i++) {
        cout<<visit[i]<<" ";
    }
    cout<<"\n";
    for(int i=0; i<n; i++) {
        cout<<dist[i]<<" ";
    }
    cout<<"\n";
    dfs(6,path,s);
}


int main() {
    djikstra(0);

    return 0;
}

```

# 多条最短路径计算最小边权,点权,最短路径数目
[点这里](https://www.liuchuo.net/archives/2502)