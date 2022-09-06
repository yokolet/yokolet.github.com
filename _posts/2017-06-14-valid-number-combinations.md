---
layout: post
title: "Valid Combinations of Numbers"
description: ""
category: 
tags: []
hero_height: is-small
---

Various types of string related problems exist.
Among them, splitting it to make something valid would be a typical one.
For example, a string of numbers is given, "make valid IP addresses" is the example.
Very similar problem is "make valid lottery numbers."

When the given string is made by alphabetical characters,
the problem may ask word breaks with a dictionary.

"Valid IP addresses" and "valid lottery numbers" are quite similar problems.
I'm going to write a memo about these two here.


#### Problem Description - Restore IP Addresses ####

Given a string, restore valid IP addresses.
For example, "25525511135" is given, the answer will be ["255.255.11.135", "255.255.111.35"].

There are some constraints to make it the valid IP address.

- valid IP addresses should have four parts separated by "."(dot).
- each digits must be between 0 to 255
- if the character is '0', it should not be followed by any number. ex) 255.0.0.1
- must use all characters in the same order

When all of the constraints are met, the string becomes the valid IP address.


#### The idea to split a string to make IP addresses ####

If I think of the first part, it will be three patterns in maximum.
For example, "25525511135" is given, "2", "25", and "255 are all valid numbers to start.
When the first part is "2", the valid second part will be "5" and "55."
Possible combinations create tree structure as in below.

<pre>

            /           |          \
          /             |            \
         2             25            255
      /  |         /    |         /   |   \
    /    |      /       |       /     |      \
   5     55     5      52      2      25     255
  | \  / | \  / | \   /   \  / | \  /   \   / | \

</pre>

When four parts of an IP address are created using valid numbers, another check runs:
whether all given characters are used or not.
If yes, I will add the IP address to the result list.


To solve this problem, I see a Depth First Search (DFS) works well.
People have solved by various approaches, however, DFS is straightforward.
This is because finding the answer is traversing a tree.

In each step, take one to three characters.
When the number is valid, make it a part of IP address.
Going deeper and take one to three characters, ...(repeat)...
In the end, check whether all characters are used to create valid four parts of IP address.


#### Java code for restoring valid IP addresses ####

{% gist yokolet/3fdcfbc84049a1a94deaae80dced35fb %}

Above prints:

<pre>

[255.255.11.135, 255.255.111.35]
[0.0.0.0]

</pre>

Time complexity: O(3^4).



#### Problem Description - Restore Lottery Numbers ####

Given a string, restore valid lottery numbers.
For example, "4938532894754" is given, the answer will be ["49 38 53 28 9 47 54"].

The problem description sometimes starts from "uncle, Morty."

> Your favorite uncle, Morty, is crazy about the lottery and
> even crazier about how he picks his "lucky" numbers...


Like the IP address problem, there are some constraints to make it valid.

- valid lottery numbers should have 7 parts separated by " "(space).
- each digits must be between 1 and 59
- all digits are unique
- must use all characters in the same order


#### The idea to split a string to make lottery numbers ####

This is almost identical to valid IP address problem.
The small differences are from four parts to seven, from dot to space,
and from 0-255 to 1-59.
Relatively big difference is, in lottery problem, each digit is unique.

To check uniqueness, I added a set in the DFS interaction:
add the number to set when going deeper, remove the number when coming back.

Except the differences above, the code is the same as valid IP addresses.


#### Java code for restoring valid lottery numbers ####

{% gist yokolet/0b565ac9e3340dba6b91a3e15cf104d1 %}

The result is:

<pre>

[49 38 53 28 9 47 54]

[1 6 3 46 16 5 12, 1 6 3 46 16 51 2, 16 3 46 1 6 5 12, 16 3 46 1 6 51 2]

[]

</pre>

Time complexity: O(2^7)


#### Resources ####

- [Print all valid combinations of IP address](http://qa.geeksforgeeks.org/3336/print-all-valid-combinations-of-ip-address)
- [Restore IP Addresses](http://www.programcreek.com/2014/06/leetcode-restore-ip-addresses-java/)
- [Lottery Ticket Problem](https://github.com/raviswan/ProgrammingProblems)
- [Winning Ticket](http://blog.sdeskills.com/qotd-2016-oct-28-winning-ticket/)
