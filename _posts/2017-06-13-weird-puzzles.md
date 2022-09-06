---
layout: post
title: "Weird Puzzle Questions - Egg and Celebrity"
description: ""
category: 
tags: []
hero_height: is-small
---

I'm going to write about two weird algorithm problems.
Those seem quite weired at least to me, yet famous as algorithm questions.
One is so-called egg dropping, another is finding a celebrity.
I see these two problems here and there.
From that, I guess those two are famous algorithm questions.
But, at least, those two are quite weird.
Some call them *puzzle*. (Yeah, maybe... I was totally puzzled.)



The egg dropping and finding a celebrity problems are unrelated.
The approaches and solutions are very different.
However, in terms of their weirdness,
I'm going to write a memo put those two together here.


#### Problem Description - Egg Dropping ####

Many algorithm questions have succinct descriptions.
Not like those, this problem needs lengthy explanation.
I re-read a few times to understand such long description correctly.
Also, it was to figure out how to solve the problem.

The problem is sometime called "Two Egg Problem" since often *two* eggs are used.
These two eggs play a role to find the highest, safe floor to drop the egg without breaking it.
The problem description is:

- K floors are there in total.
- There exists the highest floor an egg safely lands.
- Two (or more) eggs are given.
- If the egg doesn't break after the dropping, it can be reused.
- If the egg breaks, the broken egg won't be used again.
- If the egg safely lands after dropping from the floor K_j, lower floors of K_j are considered safe.

Given above conditions, "find the highest, safe floor to drop the egg" is the problem.


#### The idea to find the highest safe floor ####

A bruto force solution is always there which starts dropping the egg from the lowest floor.
Then, try one by one going upward to the top floor.
At some floor, the egg will break for the first time.
One floor below (the last safe floor) is the answer.
If only one egg is available, this is only way to solve the problem.

However, there's an effective solution when multiple eggs are available.

This problem is often categorized to dynamic programming.
So, an optimal substructure exists:

- the egg breaks
- the egg doesn't break (safely lands)

The state to maintain in memorization table is a minimum number of attemps.
For example, table[i][j] expresses the minimum attemps at i eggs and j-th floor.


table[i][j] will be calcuated by:

<pre>

min(1 + max(table[i - 1][k - 1], table[i][j - k])) where k = 1 to j
            ^^^^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^
                  breaks          doesn't break

</pre>


#### Java code for finding the highest safe floor ####

{% gist yokolet/a6843a4336e46e13fa7a3ef44ef2d0b9 %}

Above prints:

<pre>

8

</pre>

Time complexity: O(nk^2), n: eggs, k: floors




#### Problem Description - Finding a Celebrity ####

This problem also has a lot of descriptions like egg dropping problem.
The details are:

- n people come to a party
- one of them is a celebrity either he or she
- this only one celebrity does not know anyone in the party
- all n - 1 people know who is the celebrity
- only one available question is "does A know B?"
- `boolean know(int A, int B)` method is proveded which returns true if A knows B


Given above conditions, "find the celebrity in the minimum
number of questions" is the problem.


#### The idea to find the celebrity ####

The problem describes relations between people.
If I draw the relations, it will be a directed graph of n people (n nodes).
The celebrity node has an out-degree zero and in-degree n - 1.

<pre>

              +----------------------+
              |                      |
              v                      |
 (p0) -----> (C) <----- (p2) <----- (p3)
            ^   ^^
            |   | \
            |   |   \
            |   |     \
         (p4) (p5) <--- (p6)

</pre>

Given the graph above, the method, `know(A, B)`, is the same as `has an edge from A to B`.

To solve this problem, a typical approach consists of two steps.

1. Elimination step
2. Verification step

The elimination step eliminates people who are not a celeb apprently.
Here, stack is a good data structure.
After pushing all poeple to the stack, run `know` method.
If A has an edge to B, eliminates A since A is not a celeb.
Also, check the edge from B to A.


The verification step verifies the last person is a celeb.
This is because the elimination process may leave no celeb person in the stack.
For example, a top rightmost node p3 in the graph has two outbound edges.
Suppose the first question is made against the celeb (C), p3 will be removed.
Later, p2 appears, and nobody says "I know p2." 

For this reason, the verification step is there to
ensure the person in the stack is the celeb.


#### Java code for square root implementation ####

{% gist yokolet/8b9e766261890b78e849d162efcf82a1 %}

Time complexity: O(n), space complexity O(n)

The result is:

<pre>
1
</pre>


#### Resources ####

- [Dynamic Programming Set 11 (Egg Dropping Puzzle)](http://www.geeksforgeeks.org/dynamic-programming-set-11-egg-dropping-puzzle/)
- [Egg Dropping Dynamic Programming (YouTube)](https://www.youtube.com/watch?v=3hcaVyX00_4)
- [The Celebrity Problem](http://www.geeksforgeeks.org/the-celebrity-problem/)
- [Celebrity Identification Problem](https://www.cs.princeton.edu/courses/archive/spring13/cos423/problem0-1.pdf)
