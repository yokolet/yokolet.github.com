---
layout: post
title: "K Partition Problem"
description: ""
category: 
tags: []
---

#### Divide an array of integers into K fair amount groups ####

The problem is: given an array of integers, divide into k subarrays
so that the differences of sum of each subarray will be minimized.
Keep the order of the given array.

For example, 

<pre>

given: [1, 2, 3, 4, 5, 6, 7, 8]

k = 3: [[1, 2, 3, 4, 5], [6, 7], [8, 9]]
k = 4: [[1, 2, 3, 4], [5, 6], [7, 8], [9]]

</pre>

This is called the linear parition, k-partition problem or, simply, partition problem.
Despite the simple problem description, it is quite hard to solve.
Spent some amount of time, finally, I could figure out how to solve this problem.
Thinking its difficulty, this should be a good entry.
For that reason, I'm going to write down a memo here.


#### The idea ####

The problem is well described in the document, [The Partition Problem](http://www8.cs.umu.se/kurser/TDBA77/VT06/algorithms/BOOK/BOOK2/NODE45.HTM) .
Also, the first answer of this [Quora question](https://www.quora.com/A-group-of-N-integer-numbers-need-to-be-divided-fairly-into-K-subgroups-A-fair-division-is-that-the-max-of-the-sums-of-K-subgroups-is-minimal) is a good one to understand how to solve. After reading those, what I can explain by my own words is below.

This is a dynamic programming problem. The states to keep track are optimum ways of partitioning, which will be saved in an auxiliary table.
Suppose the auxiliary table is `M[n][k]` (n: size of given array, k: number of partitions), each element of `M[i][j]`(i'th element, j paritions) will be computed by minimizing the maximum sum of partition when the given array is divided into j starting from index i.



<pre>

given: {s[0], s[1], ... , s[n-1]}

M[i][j] = min (max (M[x][j - 1], s[i] + s[i+1] + ... + s[x]));

x: from 0 to i-1

</pre>


To avoid calculate partial sums repeatedly, the algorithm calculates a prefix sum.
The prefix sum of index i is caclulate from the sum to the index i - 1.

<pre>

sum[i] = sum[i - 1] + s[i]

</pre>

To compute sum from i to m is same as `sum[m] - sum[i - 1]`.
So, repeatedly calculating same sums will be eliminated.




#### Java code  ###

The code consists from two parts: build auxiliary tables to form partitions and reconstruct partitions.
While partitioning, the algorithm uses one more table for divisers as described in the lecture note [Applications of Dynamic Porgramming](http://www3.cs.stonybrook.edu/~algorith/video-lectures/2007/lecture18.pdf). The diviser table will be used to reconstruct the partitions.


{% gist yokolet/fbc34619196b29bd730e1f5329f6253a %}


The code returns the result:

{% highlight java %}
[[1, 2, 3, 4, 5], [6, 7], [8, 9]]
[[1, 2, 3, 4, 5, 6], [7, 8, 9]]
[[1, 2, 3, 4], [5, 6], [7, 8], [9]]
[[1, 1, 1], [1, 1, 1], [1, 1, 1]]
[[1, 1, 1, 1], [1, 1, 1, 1, 1]]
[[1, 1, 1, 1], [1, 2, 2], [2, 2]]
[[1, 1, 1, 1, 1, 2], [2, 2, 2]]
{% endhighlight %}

#### Resources ####

- [The Partition Problem](http://www8.cs.umu.se/kurser/TDBA77/VT06/algorithms/BOOK/BOOK2/NODE45.HTM)
- [Applications of Dynamic Programming](http://www3.cs.stonybrook.edu/~algorith/video-lectures/2007/lecture18.pdf)
- [Quora question](https://www.quora.com/A-group-of-N-integer-numbers-need-to-be-divided-fairly-into-K-subgroups-A-fair-division-is-that-the-max-of-the-sums-of-K-subgroups-is-minimal)
- [Stack Overflow question](http://stackoverflow.com/questions/7938809/how-to-understand-the-dynamic-programming-solution-in-linear-partitioning)
- [gist: LinearPartitionTestApplication.java](https://gist.github.com/abrie/b962ee399d06ada95e88)
