---
layout: post
title: '两数相加'
subtitle: '算法虐我千百遍,我待算法如初恋'
date: 2018-10-23
categories: 算法
cover: ''
tags: 算法 leetcode
---

# 题目描述

给定两个非空链表来表示两个非负整数。位数按照逆序方式存储，它们的每个节点只存储单个数字。将两数相加返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

# 示例
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)

输出：7 -> 0 -> 8

原因：342 + 465 = 807

# 输入输出
```Java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
    }
}
```

# 我的解决方案
```Java
public class TwoNumSum {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode temp1 = l1;
        ListNode temp2 = l2;
        ListNode result = null;
        ListNode currentPoint = null;
        while (temp1 != null || temp2 != null) {
            if (temp1 != null && temp2 != null) {
                int currCarry = (temp1.val + temp2.val) / 10;
                int num = temp1.val + temp2.val - currCarry * 10;
                if (result == null) {
                    if (currCarry > 0) {
                        currentPoint = new ListNode(num);
                        currentPoint.next = new ListNode(currCarry);
                        result = currentPoint;
                    } else {
                        currentPoint = new ListNode(num);
                        result = currentPoint;
                    }
                } else {
                    if (currentPoint.next != null) {
                        if (currCarry > 0) {
                            currentPoint.next.val = currentPoint.next.val + num;
                            currentPoint.next.next = new ListNode(currCarry);
                            currentPoint = currentPoint.next;
                        } else {
                            currentPoint.next.val = currentPoint.next.val + num;
                            if (currentPoint.next.val == 10) {
                                currentPoint.next.val = 0;
                                currentPoint.next.next = new ListNode(1);
                            }
                            currentPoint = currentPoint.next;
                        }
                    } else {
                        if (currCarry > 0) {
                            currentPoint.next = new ListNode(num);
                            currentPoint.next.next = new ListNode(currCarry);
                            currentPoint = currentPoint.next;
                        } else {
                            currentPoint.next = new ListNode(num);
                            currentPoint = currentPoint.next;
                        }
                    }
                }
                temp1 = temp1.next;
                temp2 = temp2.next;
            } else if (temp1 != null) {
                if (currentPoint.next != null) {
                    currentPoint.next.val = currentPoint.next.val + temp1.val;
                    if (currentPoint.next.val == 10) {
                        currentPoint.next.val = 0;
                        currentPoint.next.next = new ListNode(1);
                    }
                    currentPoint = currentPoint.next;
                } else {
                    currentPoint.next = new ListNode(temp1.val);
                    currentPoint = currentPoint.next;
                }
                temp1 = temp1.next;
                temp2 = temp2.next;
            } else {
                if (currentPoint.next != null) {
                    currentPoint.next.val = currentPoint.next.val + temp2.val;
                    if (currentPoint.next.val == 10) {
                        currentPoint.next.val = 0;
                        currentPoint.next.next = new ListNode(1);
                    }
                    currentPoint = currentPoint.next;
                } else {
                    currentPoint.next = new ListNode(temp2.val);
                    currentPoint = currentPoint.next;
                }
                temp1 = temp1.next;
                temp2 = temp2.next;
            }
        }
        return result;
    }
}

class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}

class Main {
    public static void main(String[] args) {
        ListNode head1 = new ListNode(5);
        head1.next = new ListNode(3);
        head1.next.next = new ListNode(4);
        ListNode head2 = new ListNode(5);
        head2.next = new ListNode(4);
        TwoNumSum sum = new TwoNumSum();
        ListNode res = sum.addTwoNumbers(head1, head2);
        System.out.println(res.val + "->" + res.next.val);
    }
}
```

# 大佬的解决方案
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode rs = null;
        ListNode last = null;
        ListNode cur = null;
        int val = 0;
        while (null != l1 || null != l2) {
            if (null != l1) {
                val += l1.val;
                l1 = l1.next;
            }
            if (null != l2) {
                val += l2.val;
                l2 = l2.next;
            }
            cur = new ListNode(val % 10);
            val = val / 10;
            if (null == last) {
                rs = cur;
            } else {
                last.next = cur;
            }
            last = cur;
        }
        if (val > 0) {
            cur = new ListNode(val);
            last.next = cur;
        }
        return rs;
    }
}
```