---
layout: post
title: "Largest Rectangle in a Histogram"
description: ""
category: 
tags: []
hero_height: is-small
---

"Find the largest rectangular area in a histogram" is a famous algorithm
problem using bars.
There are some types of problems expressed by bars such as trapping water or skyline.
Those look like similar since all are plotted on 2D plain multiple bars on.
However, how to think and solve the problems are not the same.
What data structure and algorithm can be applied to solve problems effectively is,
sometime, confusing. For this reason, I'm going to add this topic to my memo.


#### Problem Description ####

Given an array of integers which denotes heights of each bar with a width 1,
find the largest rectangluar area.

For example, the given array is [6, 2, 5, 4, 5, 1, 6], the largest will be
12 created from index 2 to 4.

<pre>
  .
6 . █           █ 
  . █   █   █   █ 
  . █   █ █ █   █ 
  . █   █ █ █   █ 
  . █ █ █ █ █   █ 
  . █ █ █ █ █ █ █ 
0 . . . . . . . .
    0           6

The largest area is from index 2 to 4.
  .
6 . █           █ 
  . █   █   █   █ 
       +-----+
4 . █  |█ █ █|  █ 
  . █  |█ █ █|  █ 
  . █ █|█ █ █|  █ 
  . █ █|█ █ █|█ █ 
0 . . . . . . . .
    0   2   4   6
</pre>

If the given array is [6, 2, 5, 4, 5, 2, 6] (only one different in the sixth element),
the largest will be 14 from index 0 to 6.

<pre>
  .
6 . █           █ 
  . █   █   █   █ 
  . █   █ █ █   █ 
  . █   █ █ █   █ 
  . █ █ █ █ █ █ █ 
  . █ █ █ █ █ █ █ 
0 . . . . . . . .
    0           6

The largest area is from index 0 to 6.

  .
6 . █           █ 
  . █   █   █   █ 
  . █   █ █ █   █ 
  . █   █ █ █   █ 
   +-------------+
  .|█ █ █ █ █ █ █|
  .|█ █ █ █ █ █ █|
0 . . . . . . . .
    0           6
</pre>

Easily we can think of exhaustive search O(n^2) solution by iterating all combinations.
However, this often gets time out results at exhaustive testing.


#### The idea ####

This problem can be solved in a linear time using a stack.
The stack saves indices which gives the highest so far.
If histogram heights are 1, 2, and 3, the stack saves all three indices of 0, 1, 2.

Once it hits a lower height, a rectagular area will be calculated at that index.
For the calculation, it needs the first no greater height seen so far compared to the current height.
The information is saved in the stack.
Since the stack saves indices of highest so far,
popping out indices unitl the corresponding height is higher gives the target index.

The target index is the starting index of a subhistogram.
With starting and current indices, the area will be calculated by multiplying width (difference of indices) and height.
The ares is the result of the sub problem.

For example, after 3, if 1 comes in, the indices in the stack will be poped out.
In the end, the stack will have the index 0 only whose height is 1.

Width (4) * Height (1) = 4

Repeating this process to the end of the given array, the maximum area can be found.


#### Java code ####

Below is the Java code based on the idea explained in the previous section.

{% gist yokolet/9913edf20b07f56eadd44ecc574d3c78 %}

The performance is: time O(n), space O(n).

The result is:

<pre>
12
14
</pre>



#### Resources ####

- [Largest Rectangular Area in a Histogram - Set 2](http://www.geeksforgeeks.org/largest-rectangle-under-histogram/)
- [Problem of the day: Largest rectangle in a histogram](https://kartikkukreja.wordpress.com/2016/10/22/problem-of-the-day-largest-rectangle-in-a-histogram/)
- [Maximum Rectangular Area in Histogram (YouTube)](https://youtu.be/ZmnqCZp9bBs)
