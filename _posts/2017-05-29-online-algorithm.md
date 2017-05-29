---
layout: post
title: "Online Algorithm - mean and median"
description: ""
category: 
tags: []
---

#### What is Online Algorithm ####

If fixed number of integers (or real numbers) are given, it's easy to find
a mean or median.
Summing up all, then deviding by a number of given values gives me the mean.
For a median, sorting the given values then finding center index (indices)
would be the almost all.

What if input is not limited? say, a stream of data?

As for mean, still summing up and saving it to a value may work.
But, what if the stream sends billions of 10?
"Saving it to a value" will turn to a hard job.
Nevertheless, the hard job would be hardly paid since still the answer is 10, just 10.

What about median?
Still sorting may work if it uses a heap sort.
The problem of heap is: I need to take out all values by the center position, say, half billion.
Then, those values must get back to the heap, again half billion.
Simple sorting would be very hard to say, *"it works"*.

As for the stream of data, it looks something called *online algorithm* works.
The online algorithm finds an answer from previous state.
Wikipedia uses the term, [*recurrence relation*](https://en.wikipedia.org/wiki/Recurrence_relation) to describe the way to find the answer.


This unique way of solving a problem is definitely worth writing down a memo.



#### Problem Description ####

The problem is simple: Given a stream of data, answer the mean or median anytime.
It may be everytime data is added, may be after some or many data are added.


#### The idea to find the mean ####

There are some math-y proofs in the Wikipedia, section 4: Online algorithm - [Algorithms for calculating variance](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance).
The idea is to focus on the difference between a current value and mean up to a prevous value.
If the difference divided by total number of values is added to the mean so far,
a new mean will be calculate including a current value.

Aside of the mathematical proof, this is a pretty simple and working solution.


#### Java code for mean ####

Below is the Java code to find means anytime.

{% gist yokolet/bb4034f40d8602f4d1d6dcf30c1d6070 %}

The result is:

<pre>
8.0
6.4
6.5
</pre>


#### The idea to find the median ####

I found a couple of websites which describe how to find the median from a stream of data.
Among them, [GeeksforGeeks: Median in a stream of integers (running integers)](http://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/) was the best to understand how to.
As the entry says, there are a couple of options to solve the problem.
Using two heaps is indeed a simple yet *it works* solution.

The idea is to maintain smaller half and greater half in two heaps.
The smaller half will be sorted in descending order, while greater half will be in ascending order.
If I peek the smaller half, I'll get the biggest value in the smaller half.
If I peek the greater half, I'll get the smallest value in the greater half.
These values, two or one depending on the sizes, are the median.

<pre>
                                  
                                         the smallest value in the greater half
  the biggest value in the smaller half   /
                                     \   /
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
       |<----------------------------->|<----------------------------->|
              smaller half                      greater half

</pre>

I should keep the size difference of two heaps in 0 or 1.
So, when I add a new value, there's an extra work to maintain the size.
However, other than that, solution is pretty simple.


#### Java code for median ####

Below is the Java code to find median anytime.

{% gist yokolet/4c37b422d44caa121399658a4e5f521f %}

The result is:

<pre>
8.0
5.0
6.0
</pre>


#### Resources ####

- [Algorithms for calculating variance (Wikipedia)](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance)
- [Median in a stream of integers (Geeksforgeeks)](http://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/)
- [Find Median from Data Stream (Progam Creek)](http://www.programcreek.com/2015/01/leetcode-find-median-from-data-stream-java/)
