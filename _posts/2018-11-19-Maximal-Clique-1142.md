---
layout: post
title: '图的最大团(maximal Clique 1142)'
subtitle: ''
date: 2018-11-19
categories: PAT
cover: ''
tags: PAT 图 算法 数据结构
---
# 描述
A clique is a subset of vertices of an undirected graph such that every two distinct vertices in the clique are adjacent. A maximal clique is a clique that cannot be extended by including one more adjacent vertex. (Quoted from https://en.wikipedia.org/wiki/Clique_(graph_theory))

Now it is your job to judge if a given subset of vertices can form a maximal clique.

# 指定输入
Each input file contains one test case. For each case, the first line gives two positive integers Nv (≤ 200), the number of vertices in the graph, and Ne, the number of undirected edges. Then Ne lines follow, each gives a pair of vertices of an edge. The vertices are numbered from 1 to Nv.

After the graph, there is another positive integer M (≤ 100). Then M lines of query follow, each first gives a positive number K (≤ Nv), then followed by a sequence of K distinct vertices. All the numbers in a line are separated by a space.

# 指定输出
For each of the M queries, print in a line Yes if the given subset of vertices can form a maximal clique; or if it is a clique but not a maximal clique, print Not Maximal; or if it is not a clique at all, print Not a Clique.

# 输入样例
```java
8 10
5 6
7 8
6 4
3 6
4 5
2 3
8 2
2 7
5 3
3 4
6
4 5 4 3 6
3 2 8 7
2 2 3
1 1
3 4 3 6
3 3 2 1
```

# 输出样例
```java
Yes
Yes
Yes
Yes
Not Maximal
Not a Clique
```

# 分析
这一次我没有想出来.或者是说想出来了怎么去做,但是总觉得不够优雅😅😅😅,就没有往下做了,做了一半,我的思路是这样的,首先以类似邻接表的形式建立一个图,其中还包含度的信息,判断是否是一个团,如果一个顶点的度小于判断的节点总数那么他就不是一个团,其他的可以看代码看懂.

我这次看的代码是柳神的😂😂😂
下面是分析,其实柳神的代码有些也是比较暴力的,但整体而言还是比较优雅的,其实我感觉PAT还是比较基础的,不敢说没有,但大多数还是一些自己能写出来的,而不是一些经典的算法,比如什么比较有名的Dijkstra这些牛人发明的算法.

嗯,其实我也很想将这个代码重现一遍,但是我规定了一天晚上做一个,没有这么多的时间😭😭😭😭.
我觉得进度必须得往前推进,为了一道题搞很久的话容易乱军心,得不尝失,但是以后绝对会再看的

```java
#include <iostream>
#include <vector>
using namespace std;
int e[210][210]; // 图
int main() {
    // nv:顶点数
    // ne:边数
    // m:要判断的顶点序列数
    // ta,tb:两个顶点
    // k要判断的顶点数
    int nv, ne, m, ta, tb, k;
    scanf("%d %d", &nv, &ne);
    // 建立一个用数组表示的图
    for (int i = 0; i < ne; i++) {
        scanf("%d %d", &ta, &tb);
        e[ta][tb] = e[tb][ta] = 1;
    }
    scanf("%d", &m);
    for (int i = 0; i < m; i++) {
        scanf("%d", &k);
        // 存放顶点序列
        vector<int> v(k);
        // 映射,主要是为了在遍历所有顶点时判断顶点是否在这个序列中,这是一种很好的空间
        // 换时间的一种做法,值得学习🤔🤔
        int hash[210] = {0}, isclique = 1, isMaximal = 1;
        for (int j = 0; j < k; j++) {
            scanf("%d", &v[j]);
            hash[v[j]] = 1;
        }
        // 根据团的定义判断是否是一个团,比较暴力,只有顶点两两邻接才算是一个团
        for (int j = 0; j < k; j++) {
            if (isclique == 0) break;
            for (int l = j + 1; l < k; l++) {
                if (e[v[j]][v[l]] == 0) {
                    isclique = 0;
                    printf("Not a Clique\n");
                    break;
                }
            }
        }
        if (isclique == 0) continue;
        for (int j = 1; j <= nv; j++) {
            // 判断是否在顶点判断序列里,如果在的话就被置1了
            if (hash[j] == 0) {
                // 判断不在顶点序列的顶点是否和所有在顶点序列的顶点相邻接
                // 如果有这么一个点,说明其不是最大的团
                for (int l = 0; l < k; l++) {
                    if (e[v[l]][j] == 0) break;
                    if (l == k - 1) isMaximal = 0;
                }
            }
            if (isMaximal == 0) {
                printf("Not Maximal\n");
                break;
            }
        }
        if (isMaximal == 1) printf("Yes\n");
    }
    return 0;
}
```