---
layout: post
title: '无重复最长子串'
subtitle: '算法虐我千百遍,我待算法如初恋'
date: 2018-10-24
categories: 算法
cover: ''
tags: 算法 leetcode 滑动窗口
---
# 题目描述
给定一个字符串，找出不含有重复字符的最长子串的长度。

# 示例
输入: "abcabcbb"

输出: 3 

解释: 无重复字符的最长子串是 "abc"，其长度为 3。

---
输入: "bbbbb"

输出: 1

解释: 无重复字符的最长子串是 "b"，其长度为 1。

---
输入: "pwwkew"

输出: 3

解释: 无重复字符的最长子串是 "wke"，其长度为 3。

请注意，答案必须是一个子串，"pwke" 是一个子序列 而不是子串。

# 输入输出
```Java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}
```


# 我的思路(错误)
建立一个空集合,这个集合存放了一个过程首次遇到的字符,扫描字符串s,判断字符s[i]是否在集合中,如果没有,就将这个字符填充到缓冲数组中,如果有,就判断比较缓冲数组的长度,看他是否是最大值,并且将集合清空,缓冲数组情况,准备下一个过程
```python
class Solution:
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        buffer = []
        accpet = []
        first_see = set({})
        maxlen = 0
        for i in range(len(s)):
            if s[i] not in first_see:
                first_see.append(s[i])
                buffer.append(s[i])
                if i is len(s) - 1:
                    accpet.append(buffer)
            else:
                accpet.append(buffer)
                if len(buffer) > maxlen:
                    maxlen = len(buffer)
                buffer = []
                first_see = set({})
                buffer.append(s[i])
                first_see.append(s[i])
                if i is len(s) - 1:
                    accpet.append(buffer)
        return maxlen
```
# 解决方案:滑动窗口法
## 滑动窗口
滑动窗口是数组/字符串问题中常用的抽象概念。 窗口通常是在数组/字符串中由开始和结束索引定义的一系列元素的集合，即[i, j)[i,j)(左闭，右开).而滑动窗口是可以将两个边界向某一方向"滑动"的窗口.例如，我们将 [i, j)[i,j) 向右滑动1个元素，则它将变为 [i+1, j+1)[i+1,j+1)（左闭，右开）.


## 基本思路
基本思路是这样的,首先定义空的滑动窗口,遍历字符串s,如果字符是s[i]不在窗口中,则将窗口扩张(即往窗口中添加元素),如果字符s[i]已在窗口中,则左指针会一直移动,直到所有与s[i]值相同的元素从窗口中移出,随后又会进行一轮扩充

## 代码
```python
    def lengthOfLongestSubstring(s):
        n = len(s)
        window = set({})
        i = 0
        j = 0
        ans = 0
        while i < n and j < n:
            if s[j] not in window:
                window.add(s[j])
                j = j + 1
                ans = max(ans, j - i)
            else:
                window.remove(s[i])
                i = i + 1
        return ans
```

## 大佬的解决方案
```python
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        sub=''
        sub_len=0
        max_len=0
        max_sub=''
        for letter in s:
            if letter in sub:
                if sub_len>max_len:
                    max_len=sub_len
                    max_sub=sub
                index=sub.index(letter)
                sub=sub[index+1:]+letter
                sub_len=sub_len-index
            else:
                sub=sub+letter
                sub_len+=1
        if sub_len>max_len:
            max_len=sub_len
        return max_len
```