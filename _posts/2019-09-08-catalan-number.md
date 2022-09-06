---
layout: post
title: Catalan number
date: 2019-09-08 12:41 -0700
hero_height: is-small
---

What is __Catalan number__ ?
The Catalan number belongs to the domain of combinatorial mathematics.
It is a sequence of natural numbers such that:
`1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786, 208012, 742900, 2674440, 9694845, 35357670, 129644790, 477638700, 1767263190, ...`
The sequence appears in counting problems.
Wikipedia has the details about the sequence: [Catalan Number](https://en.wikipedia.org/wiki/Catalan_number).

The algorithm of the Catalan number calculation is not difficult.
Once the problem is identified as the Catalan number,
the solution will come up relatively easy.
However, something not easy is to identify it is the Catalan number problem.

#### Various types of counting problems

The Wikipedia article mentions various types of counting problems which are solved by the Catalan number.
One more great resource is "Catalan Numbers" ([http://www.geometer.org/mathcircles/catalan.pdf](http://www.geometer.org/mathcircles/catalan.pdf)).
The document refers to multiple counting problems as well as how to solve those.
For a reference, it's worth writing a memo what kind of problems are out there.

1. Balanced parentheses

    Problem: Given `n` pairs of parentheses, how many patterns exist to create
    valid (balanced) combinations of parentheses.
    
    Example:
    
    ```
    n  counts  patterns
    0  1       *
    1  1       ()
    2  2       (()) ()()
    3  5       ((())) ()(()) ()()() (())() (()())
    ```
    
    Note: This is a basic pattern of the Catalan number.
    
2. Dyck words

    Problem: Given `n`, how many patterns exist to create words of n Xs and n Ys such that
    in every prefix of the word frequency(‘X’) ≥ frequency(‘Y’)
    
    Example:
    
    ```
    n  counts  patterns
    0  1       *
    1  1       XY
    2  2       XXYY XYXY
    3  5       XXXYYY XYXXYY XYXYXY XXYYXY XXYXYY
    ```
    
    Note: If X and Y are mapped ( and ) respectively, the problem is the same as
    the balanced parentheses.
    
3. Mountain Ranges

    Problem: Given `n` pairs of sticks, how many patterns exist to create mountains.
    
    ```
    n  counts  patterns
    0  1       *
    1  1       /\
    2  2       /\
              /  \  /\/\
    3  5        /\
               /  \     /\             /\      /\/\
              /    \  /\/  \  /\/\/\  /  \/\  /    \
    ```

    Note: If / and \ are mapped to ( and ) respectively, the problem is the same as
    the balanced parentheses.
 
4. Binary Search Trees

    Problem: Given `n`, how many unique binary search tress exist to create node value `1 to n`.

    Example:
    ```
    n  counts  patterns
    0  1       *
    1  1       1
    2  2         2  1
                /    \
               1      2
    3  5           3    3     2    1    1
                  /    /     / \    \    \
                2    1     1   3    3    2
               /      \            /      \
              1        2          2        3
    ```
    
5. Diagonal Paths

    Problem: Given `n x n` grid, how many paths of length `2n` exist from bottom left to upper right corner.
 
    Example:
    ```
    n  counts  patterns
    0  1       *
    1  1        ↑
               →
    2  2         ↑       ↑
                 ↑    ↑ →
              → →    →
    3  5           ↑        ↑         ↑        ↑          ↑
                   ↑        ↑      ↑ →      ↑ →           ↑
                   ↑   ↑ → →    ↑ →         ↑         ↑ →
              → → →   →        →         → →      → →
    ```

    Note: If → and ↑ are mapped to ( and ), the problem is the same as the
    balanced parentheses.
 
6. Multiplication orderings

    Problem: Given `n+1` numbers to multiply together, how many patterns exist to make multiplication
    precedences without changing the order of numbers.

    Example:
  
    ```
    n  counts  patterns
    0  1       (a)
    1  1       (ab)
    2  2       ((ab)c) (a(bc))
    3  5       (((ab)c)d) ((ab)(cd)) ((a(bc))d) (a((bc)d)) (a(b(cd)))
    ```
 
7. Polygon Triangulation

    Problem: Given `n+2` sides of convex polygon, how many patterns exist to cut into
    triangles of non-crossing line segments.
 
8. Handshaking

    Problem: Given `2n` people seated around the round table, how many patterns exists to
    shake hands without crossing arms.

#### Code Example

For all problems above, the number of patterns can be found the code below:

{% gist yokolet/f33be1919df2015a172fd3c80f89aaef %}

The first `numPatterns` method runs faster if the problem asks only one number such as:

- leetcode: [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/)
- topcoder: [Hands Shaking](https://community.topcoder.com/stat?c=problem_statement&pm=7868&rd=10777)

However, when problem asks accumulation of patterns such as:

- HackerRank: [Popsicle Stick Mountains](https://www.hackerrank.com/contests/walmart-codesprint-algo/challenges/popsicle-stick-mountains)

the second DP solution works to avoid repetition.

#### Resources

- Wikipedia: [Catalan number](https://en.wikipedia.org/wiki/Catalan_number)
- Tom Davis: [Catalan Numbers](http://www.geometer.org/mathcircles/catalan.pdf)
- GeeksforGeeks: [Program for nth Catalan Number](https://www.geeksforgeeks.org/program-nth-catalan-number/)
