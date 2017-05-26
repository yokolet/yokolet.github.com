---
layout: post
title: "Skyline Problem"
description: ""
category: 
tags: []
---

#### One of famous bar problems, also ####

The skyline problem is another famous algorithm problem using bars, like
[Lagest Rectangle in a Histogram](http://yokolet.github.io/2017/05/25/largest-rectangle-in-histogram.html).
Although the problem is described using bars, it is totally another problem
compared to the largest rectangle. The skyline problem asks range maximum values.

While the largest rectangle has almost only one effective algorithm (using stack),
this problem has a few effective ways to solve it.

For example:

- [heap sort (YouTube)](https://youtu.be/GSBLe8cKu0s) / [heap sort (Code)](https://github.com/mission-peace/interview/blob/master/src/com/interview/geometry/SkylineDrawing.java)
- [devide and conquer](http://www.geeksforgeeks.org/divide-and-conquer-set-7-the-skyline-problem/)
- [segment tree](https://discuss.leetcode.com/topic/20091/a-segment-tree-solution)


The first solution by heap sort is the most popular, simplest way.
So, the solutions are here and there with a slight variation.
The second, divide and conquer (merge sort) is interesting solution.
Not so popular, but still a few are using this technique.
The third by the segement tree is not so popular, but shows very unique two-step solution.
In case of the segment tree, the tree should be created first.
Then making queries of intervals gives the result.


#### Problem Description ####

The coordinates of each building will be given by `[left, right, height]`.
The input is an array of three element arrays. For example,

<pre>
[[1, 5, 11], [2, 7, 6], [3, 9, 13], [12, 16, 7], [14, 25, 3],
 [19, 22, 18], [23, 29, 13], [24, 28, 4]]
</pre>

This input creates buildings below:

<pre>

   .
18 .                                     +-----+
   .                                     |     |
   .                                     |     |
15 .                                     |     |
   .                                     |     |
   .     +-----------+                   |     | +-----------+
   .     |           |                   |     | |           |
   . +---|----+      |                   |     | |           |
10 . |   |    |      |                   |     | |           |
   . |   |    |      |                   |     | |           |
   . |   |    |      |                   |     | |           |
   . |   |    |      |     +-------+     |     | |           |
   . | +-|-------+   |     |       |     |     | |           |
 5 . | | |    |  |   |     |       |     |     | |           |
   . | | |    |  |   |     |       |     |     | | +-------+ |
   . | | |    |  |   |     |   +---------|-----|-|-|-+     | |
   . | | |    |  |   |     |   |   |     |     | | | |     | |
   . | | |    |  |   |     |   |   |     |     | | | |     | |
 0 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
   0         5         10        15        20        25        30
</pre>

From this input, the problem requires to find `[position, height]` pairs
to draw outer shape.
In the picture below, positions of `@` should be returned.
Since, lines only go left, up or down, `@`s are enough to draw the outer shape (skyline).

<pre>
[[1, 11], [3, 13], [9, 0], [12, 7], [16, 3], [19, 18], [22, 3], [23, 13], [29, 0]]
</pre>

<pre>

   .
18 .                                     @-----+
   .                                     |     |
   .                                     |     |
15 .                                     |     |
   .                                     |     |
   .     @-----------+                   |     | @-----------+
   .     |           |                   |     | |           |
   . @---|           |                   |     | |           |
10 . |               |                   |     | |           |
   . |               |                   |     | |           |
   . |               |                   |     | |           |
   . |               |     @-------+     |     | |           |
   . |               |     |       |     |     | |           |
 5 . |               |     |       |     |     | |           |
   . |               |     |       |     |     | |           |
   . |               |     |       @-----|     @-|           |
   . |               |     |       |     |     | |           |
   . |               |     |       |     |     | |           |
 0 . . . . . . . . . @ . . . . . . . . . . . . . . . . . . . @ . .
   0         5         10        15        20        25        30
</pre>



#### The idea ####

As far as I compared three well-cited solutions, I decided to choose the first, heap sort
solution. It is simple and easy to understand.
However, I ended up in a slight variation of the typical way.

The key ideas is re-queuing the lower height buildings as possible surviors.
All buildings are sorted by the left position (starting position).
If multiple buildings have the same left value, those will be sorted by their height.
Before the re-queuing lower height buildings, those left position will be
adjusted to the end of a current maximum height building.
This way, when the higher building ends, the lower previously started buildings show up
again as possible candidates.

Not like typical heap sort solutions, my solution uses one PriorityQueue only.
Although there's not a big difference in terms of big-O notation,
it is slightly space effective.
Downside is time complexity depends on how buildings are shaped.
This solution was accepted by LeetCode testing (14 ms), it won't so bad even though
building locations are complicated.


#### Java code ####

Below is the Java code explaied above.

{% gist  yokolet/5cc5af72ddcc1b53af6784123a78bb23  %}

The result is:

<pre>
[[1, 11], [3, 13], [9, 0], [12, 7], [16, 3], [19, 18], [22, 3], [23, 13], [29, 0]]
[[2, 10], [3, 15], [7, 12], [12, 0], [15, 10], [20, 8], [24, 0]]
</pre>


#### Thoughts ####

If I neglect real height differences of the skyline and delete vertical bars,
it turns to below:

<pre>

   .                                     @-----
   .     @-----------                            @-----------
   . @---                                                     
   .                       @-------                          
   .                               @-----      @-             
   . . . . . . . . . @-----. . . . . . . . . . . . . . . . . @ . .
   0         5         10        15        20        25        30

</pre>

This has been seen somewhere else.
It is quite similar to a weighted scheduling problem.
Most weighted scheduling doesn't require lower priority jobs to come back.
However, if it does, the solution will be almost equivalant to the skyline problem.


#### Resources ####

- [Skyline Problem (YouTube)](https://youtu.be/GSBLe8cKu0s) / [SkylineDrawing.java (Code)](https://github.com/mission-peace/interview/blob/master/src/com/interview/geometry/SkylineDrawing.java)
- [Devide and Conquer - Set 7 (The Skyline Problem)](http://www.geeksforgeeks.org/divide-and-conquer-set-7-the-skyline-problem/)
- [segment tree](https://discuss.leetcode.com/topic/20091/a-segment-tree-solution)

- [The Skyline Problem](http://www.zrzahid.com/the-skyline-problem/) 
