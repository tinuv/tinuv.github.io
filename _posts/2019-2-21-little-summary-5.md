---
layout: post
title: '小结(五)判断字符是否是字母,数字,大小写'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-语言技巧
---



# 函数
使用这几个函数可以很方便的判断字符是否是字母,数字,大小写

* isalnum();
* isalpha();
* isdigit();
* islower();
* isupper();

头文件是 <cctype>(C++) 或 <ctype.h>(C)

如果是返回0,不是返回非0

# 代码
```cpp
#include <cctype>
#include <iostream>

using namespace std;

int main() {
    char a = '1';
    cout<<isdigit(a)<<" "<<isalpha(a)<<" "<<isalnum(a)<<" "<<islower(a)<<" "<<isupper(a);
    return 0;
}

```