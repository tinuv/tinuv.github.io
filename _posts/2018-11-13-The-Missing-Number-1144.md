---
layout: post
title: '缺失的数|The Missing Number_1144'
subtitle: ''
date: 2018-11-12
categories: PAT
cover: ''
tags: PAT 算法 数据结构
---
# 描述
Given N integers, you are supposed to find the smallest positive integer that is NOT in the given list.

# 指定输入
Each input file contains one test case. For each case, the first line gives a positive integer N (≤10^5). Then N integers are given in the next line, separated by spaces. All the numbers are in the range of int.

# 指定输出
Print in a line the smallest positive integer that is missing from the input list.

# 输入样例
```python
10
5 -25 9 6 1 3 4 2 5 17
```

# 输出样例
```Java
7
```

# 分析
其实就是找出连续最小的正数,网上有一种解法,怎么说呢,想法很清奇但也很有效,就是下面这个
```c++
#include <bits/stdc++.h>
using namespace std;
const int maxn = 100000 + 10;
int n;
int vis[maxn];
int main() {
    scanf("%d", &n);
    int MAX = -1;
    for (int i = 0; i < n; i++) {
        int a;
        scanf("%d", &a);
        if (a > 0 && a < maxn) vis[a] = 1;//注意这里
    }
    for (int i = 1; i < maxn; i++) {
        if (vis[i] == 0) {
            printf("%d\n", i);
            break;
        }
    }
 
    return 0;
}
```
但python很难做到,因为python只有列表(list)类型,很难初始化一个这样庞大的数组(又或许是我队python掌握得不够深),我的想法是下面(本来使用python写的,但一不小心被我删了),只有c++版本,总是有一个错误但是没有搞出来,很气
```c++
#include <iostream>
#include <algorithm>

using namespace std;

int main()
{
	int n;
	cin >> n;
	int in[11000];
	for (int i = 0; i < n; i++) {
		cin >> in[i];
	}
	sort(in, in + n);
	int left_p = 0;
	int right_p = 1;

	for (int i = 0; i < n-1; i++) {
		if (in[left_p] < 0) {
			left_p += 1;
			right_p += 1;
			if (right_p == n) {
				if (in[n - 1] <= 0) {
					cout << 1;
				}
				else
				{
					cout << in[n - 1] + 1;
				}
			}
		}
		else if (in[right_p] - in[left_p] == 1 || in[right_p] - in[left_p] == 0) {
			left_p += 1;
			right_p += 1;
			if (right_p == n) {
				cout << in[left_p] + 1;
				break;
			}
		}
		else
		{
			cout << in[left_p] + 1;
			break;
		}
	}
}
```