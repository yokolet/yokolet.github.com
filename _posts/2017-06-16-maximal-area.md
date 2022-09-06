---
layout: post
title: "Maximal Square and Rectangle"
description: ""
category: 
tags: []
hero_height: is-small
---


A bunch of algorithm questions take a style of "maximum is a good thing."
Maximal sum, maximal length or maximal size are examples.
This memo is about maximal size, precisely, square and rectangle.

These two have quite similar descriptions. So, I call those siblings.
The problems are "given 2D matrix filled with 0's and 1's, find maximal square/rectangle."
Approaches how to solve are also similar.
However, a difficulty level is not the same.
The maximal square question is much easier.
The maximal rectangle question needs an additional step to find the maximum.

I'm going to start off with the maximal square.


#### Problem Description - Maximal Square ####

Given a 2D binary matrix filled with 0's and 1's, find the maximal square with all 1's.

For example, following 2D matrix is given:


<pre>

1   0   1   0   0

1   0   1   1   1

1   1   1   1   1

1   0   0   1   0

</pre>


The answer will be 4.

<pre>

1   0   1   0   0
      +-------+
1   0 | 1   1 | 1
      |       |
1   1 | 1   1 | 1
      +-------+
1   0   0   1   0

</pre>


#### The idea to find maximal square ####

This is a dynamic programming question, so optimal substructure exists:

1. include the current cell to form a square
2. exclude the current call

The state to maintain in the auxiliary table is the size of the square so far.
Following the DP manner, the table will be created by bottom up.

The first column and row remain as those are.
When the value of matrix at i'th row and j'th column is 1,
look above, above-left, and left.
Among three, find minimum then plus one.
This is the value in the auxiliary table.


#### Java code for finding maximal square ####

{% gist yokolet/6855bc82a187fa8cd2316973bdbe03dd %}

The performance is: time O(nm), space O(nm), where n: rows, m: columns

The result is:

<pre>

4

</pre>

#### Problem Description - Maximal Rectangle ####

Given a 2D binary matrix filled with 0's and 1's, find the maximal rectangle with all 1's.

For example, following 2D matrix is given:


<pre>

1   0   1   0   0

1   0   1   1   1

1   1   1   1   1

1   0   0   1   0

</pre>


The answer will be 6.

<pre>

1   0   1   0   0
      +-----------+
1   0 | 1   1   1 |
      |           |
1   1 | 1   1   1 |
      +-----------+
1   0   0   1   0

</pre>



#### The idea to find maximal rectangle ####

Also, this is a dynamic programming problem, but has an extra process.
The first step of DP sees vertically.
The second step sees horizontally.

For the DP step, the optimal substructure exists, like the square problem.

1. include the current cell to form a rectangle
2. exclude the current cell

The state to maintain in the auxiliary table is the size of 1's of vertical stretch.
Following the DP manner, the table will be created by bottom up.
When the value of matrix at i'th row and j'th column is 1, look above then plus one.
This is the value in the auxiliary table.

After creating the auxiliary table, I need to find the maximal area looking at horizontally.
How to find it?
This is exactly the same as [Largest Rectangle in Histogram](http://yokolet.github.io/2017/05/25/largest-rectangle-in-histogram.html) problem.

The second step looks each row to find its max.
By comparison of each max, I can get the maximal area.



#### Java code for finding maximal rectangle ####

{% gist yokolet/0e865893f44e5329c138a4cb24be4d45 %}

The performance is: time O(nm), space O(nm), where n: rows, m: columns

The result is:

<pre>

6

</pre>


#### Resources ####

- [Maximum size square sub-matrix with all 1s](http://www.geeksforgeeks.org/maximum-size-sub-matrix-with-all-1s-in-a-binary-matrix/)
- [Maximal Square](http://www.programcreek.com/2014/06/leetcode-maximal-square-java/)
- [Maximum size square sub-matrix with all 1s](http://algorithms.tutorialhorizon.com/dynamic-programming-maximum-size-square-sub-matrix-with-all-1s/)
- [Maximum size rectangle binary sub-matrix with all 1s](http://www.geeksforgeeks.org/maximum-size-rectangle-binary-sub-matrix-1s/)
- [Maximal Rectangle](http://www.programcreek.com/2014/05/leetcode-maximal-rectangle-java/)
