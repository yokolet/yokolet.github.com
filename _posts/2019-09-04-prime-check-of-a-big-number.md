---
layout: post
title: Prime Check of a Big Number
date: 2019-09-04 21:05 -0700
hero_height: is-small
---

"Given an integer `n`, find whether `n` is a prime number or not" -- This is a typical
algorithm question.
If the given number is small, repeating a division from 2 to `n` gives the answer.

A better solution would be to stop looping at square root of `n`.
Suppose the given number `n` is not a prime number (composite number), the `n` has
two numbers `a, b` where `n = ab`.
From the equation, both `a` and `b` should be equal to or less than square root of `n`.
So, if the factor of `n` exists, the factor should be the equal to or less than square root of `n`.
Checking the number up to square root of `n` is enough to find `n` is prime or not.

However, looping over up to square root of `n` runs slow still once the given number becomes bigger.
Well-known faster algorithm is the Sieve of Eratosthenes ([Wikipedia](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)).
The algorithm starts from a boolean array of size n initialized by `true` value.
The iteration goes from 2 to n while crossing out all multiples of 2, then 3, 5, ... (set `false` to all multiples of 2, 3, 5...).
In the end, if the last array element is true, the given number `n` is confirmed the prime number.

The problem of the Sieve of Eratosthenes is a memory consumption.
HackerRank problem has teasing test cases of `100000003` and `1000000007`.
Those numbers easily cause memory out of error.
The naive looping approach ends up in a timeout failure.

#### Combination of Sieve and Looping

There should be plenty of solutions to find a given big number is a prime or not.
What came up in my mind is a combination of the sieve and looping over.
The first step is to find all prime numbers up to square root of the given number using the sieve.
The second step is to loop over the division by prime numbers found in the first step.
This solution has the time complexity of O(square root of n), which made all HackerRank test cases pass.
The solution would be a good entry here as my memo.


{% gist yokolet/6a16de49404c7306019b052cdb7b9401 %}