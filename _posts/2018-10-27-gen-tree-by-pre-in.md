---
layout: post
title: '由先序遍历和中序遍历生成二叉树'
subtitle: '算法虐我千百遍,我待算法如初恋'
date: 2018-10-27
categories: 算法
cover: 'https://github.com/tinuv/MyResource/blob/master/IMG_20181027_203321.jpg?raw=true'
tags: 算法 PAT 二叉树
---
# 算法思想
生成算法是递归的,对于先序序列来讲,第一个元素就是当前子树的根节点,对于中序序列来讲,每一个中序序列都会被分割为两个部分,这两个部分就是下一次的要构造的子树,所以说生成子树的过程是自顶向下的


![image](https://github.com/tinuv/MyResource/blob/master/IMG_20181027_203154.jpg?raw=true)
![image](https://github.com/tinuv/MyResource/blob/master/IMG_20181027_203321.jpg?raw=true)

# 代码
```java
public class GenTree {

    Node root = null;

    public Node gen(String[] pre, String[] in, int n) {
        Node rootNode = null;
        if (n == 0) {
            return null;
        }
        String rootData = pre[0];
        String[] leftIn = new String[10];
        String[] rightIn = new String[10];
        String[] leftPre = new String[10];
        String[] rightPre = new String[10];
        int flag = 0;
        for (int i = 0; i < n; i++) {
            if (in[i] == pre[0]) {
                flag = i;
                continue;
            }
            if (flag == 0) {
                leftIn[i] = in[i];
                leftPre[i] = pre[i + 1];
            } else {
                rightIn[i - flag - 1] = in[i];
                rightPre[i - flag - 1] = pre[i];
            }
        }
        if (root == null) {
            rootNode = new Node();
            rootNode.data = rootData;
            root = rootNode;
        } else {
            rootNode = new Node();
            rootNode.data = rootData;
        }
        rootNode.lNode = gen(leftPre, leftIn, flag);
        rootNode.rNode = gen(rightPre, rightIn, n - flag - 1);
        return rootNode;
    }
}

class Node {
    public String data;
    public Node lNode;
    public Node rNode;
}

class Main {
    public static void main(String[] args) {
        String[] pre = {"A", "B", "D", "C", "F", "G"};
        String[] in = {"D", "B", "A", "F", "C", "G"};
        GenTree genTree = new GenTree();
        genTree.gen(pre, in, 6);
        Node root = genTree.root;
        show(root);
    }

    public static void show(Node node) {
        if (node != null) {
            System.out.println(node.data);
            show(node.lNode);
            show(node.rNode);
        }
    }
}
```