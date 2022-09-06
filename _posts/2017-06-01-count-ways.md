---
layout: post
title: "Count Ways to Do [something]"
description: ""
category: 
tags: []
hero_height: is-small
---

"Count how may ways to do ..." is one type of algorithm questions.
For example, count ways to climb up stairs, count ways to make sum by given coins, 
or count ways to reach from top left to bottom right corner.

For this type of problem, recursion and dynamic programming are often used.
The recursion is an instinctive and understandable solution.
However, sometime, its performance goes really worse, say, exponential.
While the dynamic programming solution stays on O(n^2) time complexity.

The count ways problems have a similar idea with bits of variations.
Not to confuse those, I'm going to write a memo about three problems:
climbimg stairs, coin change, and unique paths.


#### Problem Description - Climbing Stairs ####

"Given two integers, m (number of steps) and n (number of stairs),
find how many ways to climbing up the stair"
is a typical problem of this sort.
The steps can be any number between 1 to m.

For example, m = 3 and n = 5 are given,
possible ways are 13 in total.

<pre>

                                         0

                       /                 |        \
                     /                   |          \
                   /                     |            \
                  1                      2             3
            /     |     \          /     |   \         |  \
          /       |       \      /       |     \       |   \
         1        2        3    1        2     [3]     1   [2]
      /  | \      | \      |    | \      |             |
    /    |   \    |   \    |    |   \    |             |
   1     2   [3]  1   [2] [1]   1   [2] [1]           [1]
  / \    |        |             |
 1  [2] [1]      [1]           [1]
 |
[1]

[1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 2, 1], [1, 1, 3], [1, 2, 1, 1], [1, 2, 2], [1, 3, 1]
[2, 1, 1, 1], [2, 1, 2], [2, 2, 1], [2, 3],
[3, 1, 1], [3, 2]
</pre>

As in the above, 2 -> 3 and 3 -> 2 are different.
The order of steps taken matters for this problem.


#### The idea to solve climbing stairs ####

Since I took a dynamic programming approach, I used an auxiliary array to save states.
The auxiliary array has a length of n + 1 to have an initialization parameter.
The index 0 and 1 of the array (`memo`) is initialized with the value 1.
Then, the array will be filled out one by one while increasing number of stairs one by one.
Below describes how the auxiliary array (`memo[i]`) will be changed in case of  m = 3 and n = 4.

<pre>


stairs 0   1            2                   3                          4

       0   0            0                   0                          0
           |          /   \            /    |   \                /     |     \
           1         1     2          1     2    3              1      2      3
                     |              /   \   |                 / | \    | \    |
                     1             1     2  1               /   |  \   |  \   |
                                   |                       1    2   3  1   2  1
                                   1                     /   \  |      |
                                                        1     2 1      1
                                                        |
                                                        1

memo(state)
[1, 1, 0, 0, 0]   [1, 1, 2, 0, 0]   [1, 1, 2, 4, 0]          [1, 1, 2, 4, 7]

</pre>

#### Java code for climbing stairs ###

Here's the code to count ways to climbing stairs.

{% gist yokolet/1cf65d7dc89c17f43123363f581985af %}

The result is:

<pre>
13
7
4
</pre>

#### Problem Description - Coin Change ####

"Given coins (or denominators) and sum, find how many ways to make the sum"
is a common problem description.
Mostly, infinite number of each coins are available to make the sum.
Sometime, there's a limitation of available coins.
However, basic idea is the same.

For example, coins = `[1, 2, 3]` and sum = 5 are given,
possible ways of making sum of 5 will be:
`[1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 2, 2], [1, 1, 3], [2, 3]`
So, the answer is 5.

There's a very similar, but different coin change problem.
Another coin change problem asks minimum number of coins to make a given sum.
This is not what I'm going to write here.
This memo is about how many combinations are there.


#### The idea for coin change  ####

Like climbing stairs, I took a dynamic programming approach, I used an auxiliary table
to save states.
The auxiliary table (`memo`) has a size [number of coins + 1] x [sum + 1].
Plus one is to have initialization parameters.
Table's first column means sum = 0 and initialized with 1.
This is because sum = 0 can be created by an empty set.
Table's first row (except 0) means no coins.
The first row form 1 to sum + 1 will be initialized with 0.
Then fill the rest of the table.
The value, `memo[i][j]` shows a number of patters to make sum j using coins[0] to coiins[i - 1].

If coins = `[1, 2, 3]` and sum = 5 are given, the final auxiliary table, `memo` will be:

<pre>
               sum
         0  1  2  3  4  5
        ------------------
coins 0| 1  0  0  0  0  0
      1| 1  1  1  1  1  1
      2| 1  1  2  2  3  3
      3| 1  1  2  3  4  5

</pre>

#### Java code for coin change ###

Below is the code to count ways to making a sum.

{% gist yokolet/33c80d1fbd73075fca0648d4d23164c1 %}

The result is:

<pre>
5
4
5
</pre>


#### Problem Description - Unique Paths ####

Given two integers, m and n, which expresses m rows and n columns,
find how many unique paths are there from top left to bottom right.
Available directions are right and down only.

For example, m = 3 and n = 4 are given, three of all possible paths
are like this:

<pre>

+---+---+---+---+     +---+---+---+---+     +---+---+---+---+
| x-----------┐ |     | x-------┐ |   |     | x |   |   |   |
+---+---+---+-|-+     +---+---+-|-+---+     +-|-+---+---+---+
|   |   |   | | |     |   |   | | |   |     | └-----------┐ |
+---+---+---+-|-+     +---+---+-|-+---+     +---+---+---+-|-+
|   |   |   | x |     |   |   | └---x |     |   |   |   | x |
+---+---+---+- -+     +---+---+---+---+     +---+---+---+---+

</pre>


#### The idea for unique paths ####

Like other two problems, I chose the dynamic programming to find the answer,
I used auxiliary table to save states.
The auxiliary table (`memo`) has a size [m] x [n].
In this case, plus one doesn't need since the first row and column can be
initialized without any previous state.
Movements are only right and down.
Given that, the first row are all 1 since from left is the only one way.
The first columns are all 1 as well since from above is the only one way.
Then, fill the rest of the table by expanding the path one by one, right or down.

At each table[i][j], the values on above table[i - 1][j] and left table[i][j - 1] will be added up.
This way, ways to come index i, j will be calculated.
When traversal reaches to the bottom right index, table[m - 1][n - 1], the answer is there.


#### Java code  for unique paths ####

Below is the code to count ways to reach from top left to bottom right.

{% gist yokolet/586b6a4a08c7ef3b6f4be2085a6a6b93 %}

The result is:

<pre>
6
10
</pre>




#### Resources ####

- [Count ways to reach the n'th stair](http://www.geeksforgeeks.org/count-ways-reach-nth-stair/)
- [Stairs Climbing Puzzle](http://algorithms.tutorialhorizon.com/dynamic-programming-stairs-climbing-puzzle/)
- [Coin Change](http://www.geeksforgeeks.org/dynamic-programming-set-7-coin-change/)
- [Coin Change Problem](http://algorithms.tutorialhorizon.com/dynamic-programming-coin-change-problem/)
- [Count all possible paths from top left to bottom right of a mXn matrix](http://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/)
- [Count all paths from top left to bottom right of a mXn matrix](http://algorithms.tutorialhorizon.com/dynamic-programming-count-all-paths-from-top-left-to-bottom-right-of-a-mxn-matrix/)
- [Unique Paths](http://www.programcreek.com/2014/05/leetcode-unique-paths-java/)
