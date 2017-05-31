---
layout: post
title: "Palindromic Substring"
description: ""
category: 
tags: []
---

#### Palindromic Substring Problems ####

Palindrome is, like "racecar," a reversed and the original are exactly the same string.
I see many types of palindrome related problems.
Sometime, problems are based on palindromic *substrings*.
Sometime, those are palindromic *subsequences*.

The most typical problem is asking the longest palindromic substring or subsequence.
However, not just the longest, asking paritions is another popular problem.
As for partition problems, palindromes should be substrings.
This kind of problems can be solved by a dynamic programming.
The dynamic programming solution creates a truthy table which will have trues
when the index i to j is a palindrom.

I'm going to write down three types of palindromic substring related problems:
the longest, minimum cuts, and printing all palindromic partitions.


#### Problem Description ####

Always, a string will be given to this sort of problems, for example, "aabcbd."
That's it for an input.
Then, problems ask what should be found: the longest, min cut (also partitions), print all palindromic partitions, etc.
The longest is relatively easy problem since there's only one the longest palindrome.
Theoretically, multiple longests are possible.
But, normally if one longest is found, that's the answer.
For example, "aabcbd" is given, the answer is "bcb."

Min cut is more diffucult. It requires an optimal partitioning.
Since a length one string is a palindrome, [a | a | b | c | b | d] (5 cuts) is one of the
partitioning based on palindrome.
However, it's obvious 5-cut isn't the optimal. [aa | bcd | d] (2 cuts) is the answer.

Printing all palindromic partitions is way more difficult.
Some solutions don't take a dynamic programming approach, like in the
"[Given a string, print all possible palindromic partitions](http://www.geeksforgeeks.org/given-a-string-print-all-possible-palindromic-partition/)."
When a dynamic approach is chosen, the solution will be two steps.
1. create a table to find palindromes.
2. recursively iterate the given string looking at the palindrome table.

The answer for "aabcbd" will be:
`[[a, a, b, c, b, d], [a, a, bcb, d], [aa, b, c, b, d], [aa, bcb, d]]`


#### The idea to create a truthy table ####

The truthy table is a key to solve this kind of problems by a dynamic programming.
The table saves true/false, whether index i to j is a palindrome or not.
Values in the table are so-called, "states," of the dynamic programming.

The table will be created expanding the range one by one, also shifting the
starting index one by one.
When filling out the table, a direction is diagonal, from upper left to lower right.

<pre>

   a a b c b d
   _ _ _ _ _ _
a |\ \ \ \ \ \
a |  \ \ \ \ \
b |    \ \ \ \
c |      \ \ \
b |        \ \
d |          \

</pre>

Going on by diagonal, i j indices will be incremented with an extra index k.
The k expresses a length of substring.

<pre>
for (int k = 3; k <= n; k++) {
    for (int i = 0; i < n - k + 1; i++) {
        int j = i + k - 1;
	    table[i][j] = ...
    }
}
</pre>


The way to expand the length and check whether substring is a palindrome or not will be proceeded like this:

<pre>

    a a b c b d       a a b c b d       a a b c b d       a a b c b d       a a b c b d       a a b c b d
    0 1 2 3 4 5       0 1 2 3 4 5       0 1 2 3 4 5       0 1 2 3 4 5       0 1 2 3 4 5       0 1 2 3 4 5
    _ _ _ _ _ _       _ _ _ _ _ _       _ _ _ _ _ _       _ _ _ _ _ _       _ _ _ _ _ _       - - - - - -
a 0|T             a 0|T T           a 0|T T F         a 0|T T F F       a 0|T T F F F     a 0|T T F F F F
a 1|  T           a 1|  T F         a 1|  T F F       a 1|  T F F F     a 1|  T F F F F   a 1|  T F F F F
b 2|    T         b 2|    T F       b 2|    T F T     b 2|    T F F F   b 2|    T F T F   b 2|    T F T F
c 3|      T       c 3|      T F     c 3|      T F F   c 3|      T F F   c 3|      T F F   c 3|      T F F
b 4|        T     b 4|        T F   b 4|        T F   b 4|        T F   b 4|        T F   b 4|        T F
ff5|          T   d 5|          T   d 5|          T   d 5|          T   d 5|          T   d 5|          T

</pre>

The logic to check whether the substring from index i to j is a palindrome or not is:

1. if characters at index i and j are the same,
2. if a previous state (saved at index i + 1 and j - 1) is true,
3. the position at index i and j will be true.


#### The idea to find the longest ####

The table saves whether the substring of index i to j is a palindrome or not.
Given that, when the value is true, i - j + 1 is the length of palindrome.
Checking all true positions and compare the length will give me the answer.

#### The idea to find minimum cuts ####

The same as the longest problem, minimum cuts sees the table.
The cuts happens when the last character of the substring doesn't form the palindrome.
Otherwise, the boundary should be expanded one by one.


#### The idea to print all palindromic substrings ####

Likewise, looking at table, adds palindrome one by one, shifting the starting index.
In this case, depth first search by recursion will be a good way to find palindromes
from the rest of the substring.

#### Java code  ####

Below is the Java code to find means anytime.

{% gist yokolet/3e9c879f1ca0a8e3775100bb22bb66fa %}

The result is:

<pre>
longest: aa
min cuts: 1
all: [[a, a, b], [aa, b]]
longest: bcb
min cuts: 2
all: [[a, a, b, c, b, d], [a, a, bcb, d], [aa, b, c, b, d], [aa, bcb, d]]
</pre>




#### Resources ####

- [Longest Palindromic Substring](http://www.programcreek.com/2013/12/leetcode-solution-of-longest-palindromic-substring-java/)
- [Palindrome Partitioning](http://www.geeksforgeeks.org/dynamic-programming-set-17-palindrome-partitioning/)
- [Given a string, print all possible palindromic partitions](http://www.geeksforgeeks.org/given-a-string-print-all-possible-palindromic-partition/)

