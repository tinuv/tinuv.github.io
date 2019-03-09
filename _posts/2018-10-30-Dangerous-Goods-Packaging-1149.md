---
layout: post
title: 'PAT:1149-危险物品打包-Dangerous Goods Packaging'
subtitle: '算法虐我千百遍,我待算法如初恋'
date: 2018-10-30
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT 数据结构与算法-图
---
# 描述
When shipping goods with containers, we have to be careful not to pack some incompatible goods into the same container, or we might get ourselves in serious trouble. For example, oxidizing agent （氧化剂） must not be packed with flammable liquid （易燃液体）, or it can cause explosion.

Now you are given a long list of incompatible goods, and several lists of goods to be shipped. You are supposed to tell if all the goods in a list can be packed into the same container.

# 输入
Each input file contains one test case. For each case, the first line gives two positive integers: N (≤10^4), the number of pairs of incompatible goods, and M (≤100), the number of lists of goods to be shipped.

Then two blocks follow. The first block contains N pairs of incompatible goods, each pair occupies a line; and the second one contains M lists of goods to be shipped, each list occupies a line in the following format:
>K G[1] G[2] ... G[K]

where K (≤1,000) is the number of goods and G[i]'s are the IDs of the goods. To make it simple, each good is represented by a 5-digit ID number. All the numbers in a line are separated by spaces

# 输出
For each shipping list, print in a line Yes if there are no incompatible goods in the list, or No if not.

# 示例输入
```java
6 3
20001 20002
20003 20004
20005 20006
20003 20001
20005 20004
20004 20006
4 00001 20004 00002 20003
5 98823 20002 20003 20006 10010
3 12345 67890 23333
```
# 示例输出
```java
No
Yes
Yes
```

# 代码
又超时了,大佬是用hash表做的,我原本也想到了hash表,但想到hash表的key必须是唯一的就没用,但大佬用的是一个key对应一个一个列表,但python直到现在我也不知道怎么用.

## 我的代码
```python
n, m = map(int, input().split(" "))
dangerous = []
goods = set({})
for index in range(n):
    item = list(map(int, input().split(" ")))
    dangerous.append(item)
    goods.add(item[0])
    goods.add(item[1])

for index in range(m):
    temp = []
    item = list(map(int, input().split(" ")))
    for good in range(1, item[0] + 1):
        if item[good] in goods:
            temp.append(item[good])
    need_break = False
    if len(temp) > 1:
        for j in temp:
            for d in dangerous:
                if j == d[0]:
                    if d[1] in temp:
                        print("No")
                        need_break = True
                        break
                elif j == d[1]:
                    if d[0] in temp:
                        print("No")
                        need_break = True
                        break
            if need_break:
                break
    if not need_break:
        print("Yes")
```
## 大佬的代码
[链接在这里](https://www.liuchuo.net/archives/6500)

大佬的分析
>分析：用map存储每一个货物的所有不兼容货物～在判断给出的一堆货物是否是相容的时候，判断任一货物的不兼容货物是否在这堆货物中～如果存在不兼容的货物，则这堆货物不能相容～如果遍历完所有的货物，都找不到不兼容的两个货物，则这堆货物就是兼容的～

```c++
#include <iostream>
#include <vector>
#include <map>
using namespace std;
int main() {
    int n, k, t1, t2;
    map<int,vector<int>> m;
    scanf("%d%d", &n, &k);
    for (int i = 0; i < n; i++) {
        scanf("%d%d", &t1, &t2);
        m[t1].push_back(t2);
        m[t2].push_back(t1);
    }
    while (k--) {
        int cnt, flag = 0, a[100000] = {0};
        scanf("%d", &cnt);
        vector<int> v(cnt);
        for (int i = 0; i < cnt; i++) {
            scanf("%d", &v[i]);
            a[v[i]] = 1;
        }
        for (int i = 0; i < v.size(); i++)
            for (int j = 0; j < m[v[i]].size(); j++)
                if (a[m[v[i]][j]] == 1) flag = 1;
        printf("%s\n",flag ? "No" :"Yes");
    }
    return 0;
}
```