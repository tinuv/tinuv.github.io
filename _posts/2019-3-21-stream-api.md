---
layout: post
title: 'StreamAPI中常用的方法'
subtitle: ''
date: 2019-3-21
categories: Android
cover: ''
tags: Android Android-Java Android-Java-语言技巧
---



#  StreamAPI中常用的方法

* `filter()`

  lambda函数传入一个参数,**返回符合条件**的流

  ```java
      public static void main(String[] args) {
          List<String> strings = new ArrayList<String>() {
              {
                  add("test1");
                  add("test2");
                  add("test3");
                  add("test4");
              }
          };
          strings.stream()
                  .filter(s->s.charAt(0)=='t')
                  .forEach(s->System.out.print(s+" "));
      }
  ```

  

* `forEach()`

  不返回,直接消费,labmda函数传入一个参数,即流中的一个元素,见上例

* `limit(long maxSize)`

  返回一个指定大小的流(顺序)

  ```java
      public static void main(String[] args) {
          List<String> strings = new ArrayList<String>() {
              {
                  add("test1");
                  add("test2");
                  add("test3");
                  add("test4");
              }
          };
          strings.stream()
                  .limit(3)
                  .forEach(s -> System.out.print(s + " "));
      }
  ```

* `max()`

  按指定方式比较的最大值

  ```java
      public static void main(String[] args) {
          List<String> strings = new ArrayList<String>() {
              {
                  add("test1");
                  add("test2");
                  add("test3");
                  add("test4");
              }
          };
          String s = strings.stream()
                  .max((s1, s2) -> {
                      return s1.compareTo(s2);
                  }).get();
          System.out.print(s);
      }
  ```

* `min()`

  与`max()`相似,见上例

* sorted()

  按指定方式排序

  ```java
      public static void main(String[] args) {
          List<String> strings = new ArrayList<String>() {
              {
                  add("test1");
                  add("test2");
                  add("test3");
                  add("test4");
              }
          };
          strings.stream()
                  .sorted((s1, s2) -> {
                      return s1.compareTo(s2);
                  }).forEach(s -> System.out.print(s + " "));
  
      }
  ```

* `mapToInt()`

  将元素映射成一个整型

  ```java
      public static void main(String[] args) {
          List<String> strings = new ArrayList<String>() {
              {
                  add("test1");
                  add("test2");
                  add("test3");
                  add("test4");
              }
          };
          strings.stream()
                  .mapToInt(s -> {
                      return s.charAt(4) - '0';
                  })
                  .forEach(i -> {
                      System.out.print(i + " ");
                  });
      }
  ```

* toArray

  将流转化为一个数组

  ```java
      public static void main(String[] args) {
          List<String> strings = new ArrayList<String>() {
              {
                  add("test1");
                  add("test2");
                  add("test3");
                  add("test4");
              }
          };
          int[] a = strings.stream()
                  .mapToInt(s -> {
                      return s.charAt(4) - '0';
                  })
                  .toArray();
          for (int i : a) {
              System.out.print(i + " ");
          }
      }
  ```

  