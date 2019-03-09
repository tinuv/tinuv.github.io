---
layout: post
title: '拓扑序|Topological Order_1146'
subtitle: ''
date: 2018-11-12
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT 数据结构与算法-图
---
# 描述
This is a problem given in the Graduate Entrance Exam in 2018: Which of the following is NOT a topological order obtained from the given directed graph? Now you are supposed to write a program to test each of the options.

![image](https://images.ptausercontent.com/5d35ed2a-4d19-4f13-bf3f-35ed59cebf05.jpg)

# 指定输入
Each input file contains one test case. For each case, the first line gives two positive integers N (≤ 1,000), the number of vertices in the graph, and M (≤ 10,000), the number of directed edges. Then M lines follow, each gives the start and the end vertices of an edge. The vertices are numbered from 1 to N. After the graph, there is another positive integer K (≤ 100). Then K lines of query follow, each gives a permutation of all the vertices. All the numbers in a line are separated by a space.

# 指定输出
Print in a line all the indices of queries which correspond to "NOT a topological order". The indices start from zero. All the numbers are separated by a space, and there must no extra space at the beginning or the end of the line. It is graranteed that there is at least one answer.


# 输入样例
```java
6 8
1 2
1 3
5 2
5 4
2 3
2 6
3 4
6 4
5
1 5 2 3 6 4
5 1 2 6 3 4
5 1 2 3 6 4
5 2 1 6 3 4
1 2 3 4 5 6
```

# 输出样例
```Java
3 4
```

# 分析
这道题我做得答案错了,但思路是正确的,程序还有bug,鉴于现在时间已经很晚了,先把过程记录下来,以后在做修改

## 分析点一:拓扑序的定义
拓扑序:若不存在回路即为有向无环图,所有节点可排成线性序列,使得节点的前驱节点都排在该节点的前面

## 分析点二:拓扑序算法
* 首先扫描每一个节点,如果入度等于0(即无前驱节点),则入队
* 当队列不为空时,出队,接下来处理与这个顶点相邻接的点
* 找到所有与当前节点相邻接的点,删除边,即入度减一,如过入度为0,加入到队列中
![image](https://gitee.com/tinuv/static-resource/raw/master/%E6%8D%95%E8%8E%B7%E5%A4%8D%E5%9E%A6%E8%B4%B9.PNG)

## 分析点三:c++实现的拓扑排序
```cpp
/* 邻接表存储 - 拓扑排序算法 */
 
bool TopSort( LGraph Graph, Vertex TopOrder[] )
{ /* 对Graph进行拓扑排序,  TopOrder[]顺序存储排序后的顶点下标 */
    int Indegree[MaxVertexNum], cnt;
    Vertex V;
    PtrToAdjVNode W;
       Queue Q = CreateQueue( Graph->Nv );
  
    /* 初始化Indegree[] */
    for (V=0; V<Graph->Nv; V++)
        Indegree[V] = 0;
         
    /* 遍历图，得到Indegree[] */
    for (V=0; V<Graph->Nv; V++)
        for (W=Graph->G[V].FirstEdge; W; W=W->Next)
            Indegree[W->AdjV]++; /* 对有向边<V, W->AdjV>累计终点的入度 */
             
    /* 将所有入度为0的顶点入列 */
    for (V=0; V<Graph->Nv; V++)
        if ( Indegree[V]==0 )
            AddQ(Q, V);
             
    /* 下面进入拓扑排序 */ 
    cnt = 0; 
    while( !IsEmpty(Q) ){
        V = DeleteQ(Q); /* 弹出一个入度为0的顶点 */
        TopOrder[cnt++] = V; /* 将之存为结果序列的下一个元素 */
        /* 对V的每个邻接点W->AdjV */
        for ( W=Graph->G[V].FirstEdge; W; W=W->Next )
            if ( --Indegree[W->AdjV] == 0 )/* 若删除V使得W->AdjV入度为0 */
                AddQ(Q, W->AdjV); /* 则该顶点入列 */ 
    } /* while结束*/
     
    if ( cnt != Graph->Nv )
        return false; /* 说明图中有回路, 返回不成功标志 */ 
    else
        return true;
}
```

# 我的代码
```python
v, e = map(int, input().split(" "))
v_set = set({})
v_map = dict({})
for i in range(e):
    a, b = map(int, input().split(" "))
    v_set.add(b)
    if v_map.get(a) is None:
        temp = list()
        temp.append(b)
        v_map[a] = temp
    else:
        v_map[a].append(b)

res = []
v_container = []

for j in range(1, v + 1):
    if j not in v_set:
        v_container.append(j)

if len(v_container) > 0:
    p = set(v_container)
    res.append(p)

while True:
    t = []
    while len(v_container) > 0:
        temp = v_container.pop()
        s = v_map.pop(temp)
        t.append(s)

    v_set = set({})
    v_container = []
    for value in v_map.values():
        for n in value:
            v_set.add(n)
    temp_set = set({})
    if len(v_set) != 0:
        for d in t:
            for e in d:
                if e not in v_set and len(v_set) != 0:
                    temp_set.add(e)
        v_container = list(temp_set)
    else:
        for d in t:
            for e in d:
                temp_set.add(e)
        res.append(temp_set)

    if len(v_container) == 0:
        break

    po = set(v_container)
    res.append(po)

h = int(input())
cnt = 0
result_set = set({})
for g in range(h):
    s = list(map(int, input().split(" ")))
    cnt += 1
    count = 0
    for k in res:
        for l in range(len(k)):
            if s[count + l] not in k:
                result_set.add(cnt - 1)
                break
        count = count + len(k)

result_set = list(result_set)
for z in range(len(result_set)):
    if z == len(result_set) - 1:
        print(result_set[z], end="")
    else:
        print(result_set[z], end=" ")

```