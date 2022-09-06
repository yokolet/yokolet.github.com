---
layout: post
title: "Trapping Rain Water"
description: ""
category: 
tags: []
hero_height: is-small
---

"Trapping Rain Water" is one more famous algorithm problem using bars, like
[Skyline Problem](http://yokolet.github.io/2017/05/26/skyline-problem.html) or
[Lagest Rectangle in a Histogram](http://yokolet.github.io/2017/05/25/largest-rectangle-in-histogram.html).
Compared to other two bar chart problems, this was an easier problem once I understood what I should focus on.
Also, solutions are posted on many websites, which helped to solve.

However, one thing I need to care about is there're two types of problems.
One is asking a total amount, while another is asking a maximum.
These are quite similar, but takes a bit different approach.
This memo is a way of finding the total amount.


#### Problem Description ####

The array of integer will be given.
Each element of array expresses the height of a bar at that index.
Usually, the problem asks *how many units* of water will be trapped.

For example, when the array `[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]` is given,
the shape of walls look like below.
Mostly, problem defines that each wall's width is 1 for convenience.
From this definition, rather than *walls*,
it may be natural to think stacking up unit 1 blocks.


<pre>

                                             ┌────┐
3  .                                         │BBBB│
                                             └────┘
                     ┌────┐                  ┌────┐┌────┐      ┌────┐
2  .                 │BBBB│                  │BBBB││BBBB│      │BBBB│
                     └────┘                  └────┘└────┘      └────┘
         ┌────┐      ┌────┐┌────┐      ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐
1  .     │BBBB│      │BBBB││BBBB│      │BBBB││BBBB││BBBB││BBBB││BBBB││BBBB│
         └────┘      └────┘└────┘      └────┘└────┘└────┘└────┘└────┘└────┘
      .     .     .     .     .     .     .     .     .     .     .     .
      0     1     2     3     4     5     6     7     8     9     10    11 

</pre>

The trapped water is counted by units, which is the same size of wall blocks.
If I put white boxes like water is trapped by left and right walls,
it will look like below.
Between 1 and 3, 1 unit of water can be trapped.
Likewise, 4 units between 3 and 7, 1 unit between 8 and 10 can be trapped.

<pre>


                                             ┌────┐
3  .                                         │BBBB│
                                             └────┘
                     ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐
2  .                 │BBBB│|    ||    ||    |│BBBB││BBBB│|    |│BBBB│
                     └────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘
         ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐
1  .     │BBBB│|    |│BBBB││BBBB│|    |│BBBB││BBBB││BBBB││BBBB││BBBB││BBBB│
         └────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘
      .     .     .     .     .     .     .     .     .     .     .     .
      0     1     2     3     4     5     6     7     8     9     10    11 

</pre>

Above example traps 6 units of water.


#### The idea ####

If I look at each index and see how much water can be saved at that index,
both left and right heights are the key to find the number of blocks.
Minimum of the left highest and right highest will be the water height at the specific index.

For example, at index 3, the left and right highests are 2 and 3.
Minumum of 2 and 3 is 2. The height of block is 2, 2 - 2 = 0,
so no water can be trapped at index 3.
Another example would be index 5.
The left and right highests are 2 and 3, so a water height will be 2.
If the hegiht of block is subtracted, 2 - 0 = 2 is the number of 
blocks to stack up at index 5 as water.

Like this, I need the left and right highests at each index.
To avoid repetition to find left and right highest, it's good to
save those in auxiliary arrays.
For this reason, the code does a pre-processing to find highests.



#### Java code ####

Below is the Java code explained above.

{% gist  yokolet/6b554ac0a53e8e1398f1b130e0482e52 %}

The result is:

<pre>
6
10
</pre>


#### Resources ####

- [Trapping Rain Water (Geeksforgeeks)](http://www.geeksforgeeks.org/trapping-rain-water/)
- [Trapping Rain Water (Progam Creek)](http://www.programcreek.com/2014/06/leetcode-trapping-rain-water-java/)
