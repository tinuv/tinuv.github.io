---
layout: post
title: '1019 General Palindromic Number'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



# 题目
1019 General Palindromic Number （20 分）

[题目链接](https://pintia.cn/problem-sets/994805342720868352/problems/994805487143337984)

A number that will be the same when it is written forwards or backwards is known as a Palindromic Number. For example, 1234321 is a palindromic number. All single digit numbers are palindromic numbers.

Although palindromic numbers are most often considered in the decimal system, the concept of palindromicity can be applied to the natural numbers in any numeral system. Consider a number N>0 in base b≥2, where it is written in standard notation with k+1 digits a
​i
​​  as ∑
​i=0
​k
​​ (a
​i
​​ b
​i
​​ ). Here, as usual, 0≤a
​i
​​ <b for all i and a
​k
​​  is non-zero. Then N is palindromic if and only if a
​i
​​ =a
​k−i
​​  for all i. Zero is written 0 in any base and is also palindromic by definition.

Given any positive decimal integer N and a base b, you are supposed to tell if N is a palindromic number in base b.

Input Specification:
Each input file contains one test case. Each case consists of two positive numbers N and b, where 0<N≤10
​9
​​  is the decimal number and 2≤b≤10
​9
​​  is the base. The numbers are separated by a space.

Output Specification:
For each test case, first print in one line Yes if N is a palindromic number in base b, or No if not. Then in the next line, print N as the number in base b in the form "a
​k
​​  a
​k−1
​​  ... a
​0
​​ ". Notice that there must be no extra space at the end of output.

Sample Input 1:

27 2

Sample Output 1:

Yes

1 1 0 1 1

Sample Input 2:

121 5

Sample Output 2:

No

4 4 1

# 思路
输入一个数n和一个底数b,判断在b进制下n是不是回文数,如果是输出yes,并输出在b进制下的数,如果不是输出No,并输出b进制下的数

这道题很简单,主要是一个进制转化的问题,进制转化[进制转化](https://tinuv.me/2019/01/12/176.html)

# 代码
```cpp
#include <iostream>

using namespace std;

int main() {
    int n,b;
    cin>>n>>b;
    int result[100000];
    int cnt = 0;
    while(n!=0) {
        result[cnt] = n%b;
        n = n/b;
        cnt++;
    }
    bool flag = true;
    for(int i=0; i<cnt/2; i++) {
        if(result[i]!=result[cnt-1-i]) {
            flag = false;
        }
    }
    cout<<(flag?"Yes\n":"No\n");
    for(int i=cnt-1;i>=0;i--){
        if(i!=0){
            cout<<result[i]<<" ";
        }else{
            cout<<result[i];
        }
    }
    return 0;
}

```