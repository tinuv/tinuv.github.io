---
layout: post
title: 'PAT-1148-Werewolf-Simple Version-狼人杀简单版本'
subtitle: ''
date: 2018-11-6
categories: PAT
cover: ''
tags: PAT
---
# 描述
1148 Werewolf - Simple Version （20 分）
Werewolf（狼人杀） is a game in which the players are partitioned into two parties: the werewolves and the human beings. Suppose that in a game,

player #1 said: "Player #2 is a werewolf.";
player #2 said: "Player #3 is a human.";
player #3 said: "Player #4 is a werewolf.";
player #4 said: "Player #5 is a human."; and
player #5 said: "Player #4 is a human.".
Given that there were 2 werewolves among them, at least one but not all the werewolves were lying, and there were exactly 2 liars. Can you point out the werewolves?

Now you are asked to solve a harder version of this problem: given that there were N players, with 2 werewolves among them, at least one but not all the werewolves were lying, and there were exactly 2 liars. You are supposed to point out the werewolves.

# 输入
Each input file contains one test case. For each case, the first line gives a positive integer N (5≤N≤100). Then N lines follow and the i-th line gives the statement of the i-th player (1≤i≤N), which is represented by the index of the player with a positive sign for a human and a negative sign for a werewolf.

# 输出
If a solution exists, print in a line in ascending order the indices of the two werewolves. The numbers must be separated by exactly one space with no extra spaces at the beginning or the end of the line. If there are more than one solution, you must output the smallest solution sequence -- that is, for two sequences A=a[1],...,a[M] and B=b[1],...,b[M], if there exists 0≤k<M such that a[i]=b[i] (i≤k) and a[k+1]<b[k+1], then A is said to be smaller than B. In case there is no solution, simply print No Solution.


# 示例
## 示例1输入
5

-2

+3

-4

+5

+4

##  示例1输出
1 4

## 示例2输入
6

+6

+3

+1

-5

-2

+4
## 示例2输出
1 5
## 示例3输入
5

-2

-3

-4

-5

-1

## 示例3输出
No Solution