---
layout: post
title: "Math Without Operator To Do It"
description: ""
category: 
tags: []
hero_height: is-small
---

Do division or power calculation without language provided operators --
we see this sort of questions among algorithm problems.
I wrote [Addtion without +/- operators](http://yokolet.github.io/2017/05/24/you-can-do-it-by-xor.html#addition-without-----operators) in the post about XOR related questions.
"Divide without division" and "power without its operator or function" are examples as well.

Not like the addition, a division and power need to repeat.
Intuitive implementations would be simply repeat subtraction or multiplication.
Those calculates correctly, however, time complexity tends to be O(n).
Better ways are out there.

I'm going to write a memo how to calculate effectively such
Math-y stuff without exact operators to divide/power.


#### Problem Description - Divide without division and mod ####

"Given two integers, dividend and divisor, calculate division
without divide and modulo operators."

The division itself is nothing special.
An answer will be an integer when the dividend is divided by divisor.

For example, given 10 (dividend) and -3 (divisor),
the answer will be -3.


#### The idea to divide without division/modulo operators ####

Simple solution is count up one by one starting from zero,
while subtracting the divisor from dividend.
A counter is the quotient, which is the answer.

<pre>
int sign = ...
int a = Math.abs(dividend);
int b = Math.abs(divisor);
int count = 0;
while (a >= b) {
    a -= b;
    count++;
}
return sign * count;
</pre>


This solution's performance is considered O(n), where n is the quotient.
This is simple and correct, but surely can be improved.


To improve above, I should see the number a bit different way.
All numbers can be expressed as:

<pre>

X = x_0 * (2 ^ 0) + x_1 * (2 ^ 1) + x_2 * (2 ^ 2) + ..... + x_n * (2 ^ n)

</pre>

For example, 10 is `10 * (2 ^ 0) + 1 * (2 ^ 1) + 0 * (2 ^ 2) + 1 * (2 ^ 3)`, and
3 is `1 * (2 ^ 0) + 1 * (2 ^ 1)`.

If I write how to manually calculate the division:

<pre>

         1 1      <- quotient
    ---------
1 1) 1 0 1 0
       1 1
    ---------
       1 0 0
         1 1
    ---------
           1      <-- modulo

</pre>

The first step is to find where is the highest bit.
While shifting divisor to the left and counting how many time to repeat,
I will get the answer.

<pre>

devidend: 10 = 1010
divisor: 3 = 11
count: 1

the first iteration:
divisor: 11 << 1 => 110
count:   1 << 1  => 10

the second iteration
divisor: 110 << 1 => 1100 (exceeds 1010)
count:    10 << 1 => 100
</pre>

The second step is to find what is the quotient.
I've already learned how many times to repeat.
So, I want to know each bit is zero or one.

This step goes like in the manual calculation.

<pre>
1010 - 110 = 100    --> the second bit is one
100 - 11 = 1        --> the first bit is one
1 - ... (no more)
</pre>

This division's time complexity turns to O(log(n)) .



#### Java code for dividing number without division ###

{% gist yokolet/a5b99980f553e67d5280767b46c559d1 %}

The result is:

<pre>
-3
228
</pre>


#### Problem Description - Implement Power ####

Given two integers, x and y, implement a function (method) to
calculate `x ^ y`.

I believe every computer language provides a way to
calculate a power out of the box.
However, the problem asks the implementation without using such
existing feature.


#### The idea to construct from/to a string with markers ####

Also, there's a simple solution.
Repeating multiplication y times gives me the answer.
The performance of this simple solution will be O(n) (n = y).

There's a way to improve this.

The improved version calculates `x ^ (y / 2)` recursively.
While returning, calculate `(x ^ (y / 2)) * (x ^ (y / 2))`.
If y is odd, multiply x.

<pre>

y is even:   y = 2n

x ^ y = x ^ (2n) = (x ^ n) * (x ^ n)

y is odd:    y = 2n + 1

x ^ y = x ^ (2n + 1) = x * x ^ (2n) = x * (x ^ n) * (x ^ n)

</pre>

This way, the time complexity goes down to O(log(n)).


#### Java code for constructing a binary tree from a string with markers ####

{% gist yokolet/1a6f1312a9172cebdac33f5edaa6f50f %}

The result is:

<pre>
1024
-512
</pre>


#### Resources ####

- [Divide two integers without using multiplication, division and mod operator](http://qa.geeksforgeeks.org/3794/divide-integers-without-multiplication-division-operator)
- [Division without using '/'](https://stackoverflow.com/questions/5386377/division-without-using)
- [Divide Two Integers](http://www.programcreek.com/2014/05/leetcode-divide-two-integers-java/)
- [Write a program to cslculate pow(x, n)](http://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/)
- [Pow(x, n)](http://www.programcreek.com/2012/12/leetcode-powx-n/)
