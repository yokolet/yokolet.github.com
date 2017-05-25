---
layout: post
title: "You can do it by XOR"
description: ""
category: 
tags: []
---

#### XOR basics ####

Nothing is special. Here, I'm going to revisit what is XOR.
XOR is exclusive or and often denoted as &oplus; or ^ (caret).
It is a bitwise operation which works like this:


| x | y | x &oplus; y |
|---|---|-------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |


XOR has properties of commutative and associative.

x &oplus; y = y &oplus; x

x &oplus; (y &oplus; z) = (x &oplus; y) &oplus; z

<br/>
So what?
Well, to my surprise, there are many problems XOR really works to solve.
Once, XOR is applicable to the problem, a solution is extremely simple.
If a language supports features of map and/or reduce,
the solution may be one line of code.


I put some of such problems together here.


#### Lonely Integer ####

Problem: given an array of integers which forms pairs (appear twice) except one,
find the integer apprear only once.

All other integers are pairs except one. So, this one is called a lonely integer.
Sometime, the problem description is not like this straightforward. For example,
checking drone ids when flying out and coming back,
find a missing drone which didn't return. Like this, some variations are out there.

From XOR basics above, XORing a pair of the same values gives zero.
If all elements are XORed one by one, the answer is there.

{% gist yokolet/eb6341c79d80aa1c22d780b059b7e6e5 %}

Above returns `2`.


#### Swapping values without any extra space ####

Problem: given two integers x and y, swap values without any extra space.
Don't use temp variable. Use only x and y.


At a glance, it looks tight. The requirement is no extra space.
Commonly, swapping values uses one additional space to save a value.
However, this is not the option from its requirement.
Here comes XOR. The answer is extremely simple, just repeating x XOR y three times
while assigning the result to x, y, then x.

x = x &oplus; y

y = x &oplus; y

x = x &oplus; y


Why this works? For example, let's think values a and b are assigned to x and y:


x = a

y = b

x = x &oplus; y = a &oplus; b

y = x &oplus; y = (a &oplus; b) &oplus; b = a &oplus; (b &oplus; b) = a

x = x &oplus; y = (a &oplus; b) &oplus; a = a &oplus; b &oplus; a = a &oplus; a &oplus; b = (a &oplus; a) &oplus; b = b


After three times of XORs, x becomes b and y becomes a.


Below is an example to swap two elements in an array.

{% gist yokolet/4ad1b3b7186d9cd53330b7a5438db514 %}

Above prints:

<pre>
5 2 3 4 1
</pre>


#### Addition without `+` / `-` operators ####

Problem: Add two integers x and y without using `+` / `-` operators.

Here again, XOR does the job. XOR has a memorable feature:
XORing two values is equivalent to adding two values without a carry.
To find whether the carry is there or not, AND is a good operator.
Using this XOR's feature, we can solve this problem.


Java code to solve this problem is in below:

{% gist yokolet/95396ef38d5d1ce7c14fba6722cae6b9 %}


Let's see how this works. For example, a = 5 (101), b = 7 (111).

|  a   |  b   | carry = a &amp; b | a = a &oplus; b | b = carry << 1 |
|------|------|-------------------|-----------------|----------------|
| 101  | 111  | 101               | 10              | 1010           |
|  10  | 1010 |  10               | 1000            | 100            |
| 1000 | 100  | 0                 | 1100            | 0              |

The answer is 1100 in base 2, which is 12.


#### Nim Game ####

Nim is a simple two player game.
At the beginning, n piles (called *nim heap*) of stones are there.
Each pile has positive number of stones, for example, 5 piles of {2, 5, 10, 4, 6} stones.
Players take turns removing one or more stones from any, but a single pile.
The player who doesn't have any stones left will lose the game.

<br/>
The problem is which players, the first or second, will win the game.

The solution is pretty easy. Just XORing all number of stones in piles gives the answer.
When the XORed result is zero, the second player wins, otherwise the first player.
The hard part would be to understand why XORing all numbers leads to the answer.

<br/>
Let's think the state transition from S to T.
When the game goes S to T, one of piles will have the change which is certainly
a decrease in number of stones of that pile, say the pile k.

Suppose a previous state S and post state T are expressed:

S = X1 &oplus; X2, &oplus; ..., &oplus; Xk, &oplus; ..., &oplus; Xn

T = Y1 &oplus; Y2, &oplus; ..., &oplus; Yk, &oplus; ..., &oplus; Yn



Here's some neat formula transitions.

T = T

T = 0 &oplus; T

T = (S &oplus; S) &oplus; T

T = S &oplus; (X1 &oplus; X2, &oplus; ... &oplus; Xk, &oplus; ... &oplus; Xn) &oplus; (Y1 &oplus; Y2, &oplus; ... &oplus; Yk, &oplus; ... &oplus; Yn)

T = S &oplus; (X1 &oplus; Y1) &oplus; ... &oplus; (Xk &oplus; Yk) &oplus; ... &oplus; (Xn &oplus; Yn)

T = S &oplus; 0 &oplus; ... &oplus; (Xk &oplus; Yk) &oplus; ... &oplus; 0

T = S &oplus; (Xk &oplus; Yk)


This means the next state will be XOR of the previous state and the number change.
Accumulation of this state changes will be XORing all stone numbers at the beginning.

<br/>
The Java code below solves the Nim game.

{% gist yokolet/334e8e49afee1a9061ee70c2d540601f %}

Above prints:

<pre>
First
Second
</pre>


#### Resources ####

- [Exclusive or](https://en.wikipedia.org/wiki/Exclusive_or)
- [The Magic of XOR](https://www.cs.umd.edu/class/sum2003/cmsc311/Notes/BitOp/xor.html)
- [Why XOR operator works](https://math.stackexchange.com/questions/416042/why-xor-operator-works)
- [Add two numbers without using arithmetic operators](http://www.geeksforgeeks.org/add-two-numbers-without-using-arithmetic-operators/)
- [Nim](https://en.wikipedia.org/wiki/Nim)
- [Theory of Imparial Games](http://web.mit.edu/sp.268/www/nim.pdf)
- [Solving Nim](http://www.ams.org/samplings/feature-column/fcarc-games4)
