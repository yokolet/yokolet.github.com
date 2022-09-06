---
layout: post
title: "Parentheses Love"
description: ""
category: 
tags: []
hero_height: is-small
---

As a lisp family language programmer, I used to write a lot of parentheses.
Specifically, `(` and `)`.
In an algorithm world, *parentheses* often includes
other brackets as well, such as `{}` or `[]`, but that's it.
At most three types of pairs are there, some problems are much complicated to find a solution.
This post is about such problems.

Out of my curiosity, I googled names of so-called parentheses.
According Wikipedia's [Bracket](https://en.wikipedia.org/wiki/Bracket), it looks those
have their own names with a lot of variants. Probably, famous ones are these.


|      `()`      |      `[]`       |      `{}`      |      `<>`      |
|----------------|-----------------|----------------|----------------|
| parentheses    | brackets        | braces         | chevrons       |
| round brackets | square brackets | curly brackets | angle brackets |


In terms of algorithm problems, differences in names don't matter so much.
Even the shape doesn't matter so much.
For example, "`(()), ()()`" has the same meaning as "`\\//, \/\/`", "`##!!, #!#!`", etc.
Among such symbols, parens are look nice and familiar to programmer's eyes.
When solving parens related problems, an open/close pair helps visually.

To express parens love, I'm going to write about three parens-y problems:

- valid parentheses
- generate parentheses
- remove invalid parentheses


#### Problem Description - Valid Parentheses ####

Given an expression string containing `{`, `}`, `[`, `]`, `(`, and `)`, check
paris and orders of parens are valid.
For example, `[()]{}` should return true, and `[(])` should return false.


#### The idea to solve valid parentheses problem ####

This is an easy stack problem.
If the character is one of opening parens, stack it up.
If the character is one of closing parens and top of the stack is a matching pair, pop it.
Otherwise, return false.
Lastly, if the stack is empty, the given string is valid.


#### Java code for valid parentheses problem ###

{% gist yokolet/13cf1644dbc7f5ffc268d6bbb8f6d33f %}

The result is:

<pre>
[()]{}{[()()]()}: true
[(]): false
(a())(): true
</pre>

#### Problem Description - Generate Parentheses ####

Given integer n, which denotes a number of paris of parentheses,
generate all valid combinations of parentheses.
For example, n = 3, the answer will be:
`((())), (()()), (())(), ()(()), ()()()`


#### The idea to generate valid parentheses   ####

Despite the simple problem description and simple input (only one integer),
This problem needs some considerations.
If I draw pictures of n = 2 and n = 3, parens trees look like this:

<pre>

n = 2
   (
 /   \
(     )
|     |
)     (
|     |
)     )  2 patterns


</pre>

<pre>

n = 3
             (
        /        \
      /            \
    (               )
 /     \            |
(       )           (
|     /   \       /   \
)   (      )     (     )
|   |      |     |     |
)   )      (     )     (
|   |      |     |     |
)   )      )     )     )  5 patterns

</pre>

While I was drawing, I cared three conditions:

- how many opening parens are left
- how many closing parens are left
- available opening parens < available closing parens

As in the pictures above, the parens can be expressed as a tree.
To track down to all leaf nodes, Depth First Search (DFS) style algorithm would work.
Going deeper in the tree while caring three conditions will find all combinations.

DFS has two styles, recursive and iterative.
I chose the iterative since recursion tends to raise stack overflow exception.


#### Java code for generating valid parentheses ###

{% gist yokolet/6ec539a2db6a07068f68b9bc217a26c9 %}

The result is:

<pre>
[()(), (())]
[()()(), ()(()), (())(), (()()), ((()))]
[()()()(), ()()(()), ()(())(), ()(()()), ()((())), (())()(), (())(()), (()())(), (()()()), (()(())), ((()))(), ((())()), ((()())), (((())))]
</pre>


#### Problem Description - Remove Invalid Parentheses ####

Given a string which contains parentheses, remove minimum number of invalid parentheses
to make it valid. Return all possible patterns.
For example, `()())()` or `(a)())()` is given,

<pre>
()())()   ->  ()()()    ()())()  -> (())()
    ^                    ^ 
    remove               remove

(a)())()   ->  (a)()()    (a)())()  -> (a())()
     ^                      ^ 
     remove                 remove
</pre>


#### The idea for removing invalid parnetheses ####

This problem is not easy. There may be more than one solutions.
For example, a given string is `(a)())()`, the answer will be
`(a)()()` and `(a())()`.

The problem asks *minimum* number of parens to remove.
So, it's a good idea to start checking from a whole string.
If the string is valid, I'm done.

If the string is not valid, eliminate only one paren either opening or closing
at every position.
When the number of parens either opening or closing is n in total,
I will get n substrings. These will be checked next.
All valid substrings are the answer.

If there's no valid substring, eliminate only one paren either opening or closing
at every position of every substring.
I will get n * (n - 1) substrings. These will be checked next.

To go over all substrings, I used Queue and BSF style iteration.
Not like generating parentheses problem, substrings are being cut short one by one.
In extreme case, it will become an empty string.


#### Java code  for removing invalid parentheses ####

{% gist yokolet/440060611aee3cc816e36b6fb1ff4196 %}

The result is:

<pre>
[(a())(), (a)()()]
</pre>


#### Resources ####

- [Check for balanced parentheses in an expression](http://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/)
- [Valid Parentheses](http://www.programcreek.com/2012/12/leetcode-valid-parentheses-java/)
- [Find Whether Given Sequence of parentheses are well formed](http://algorithms.tutorialhorizon.com/algorithms-find-whether-given-the-sequence-of-parentheses-are-well-formed/)
- [Print all combinations of balanced parentheses](http://www.geeksforgeeks.org/print-all-combinations-of-balanced-parentheses/)
- [Generate Parentheses](http://www.programcreek.com/2014/01/leetcode-generate-parentheses-java/)
- [Print All Possible Valid Combinations Of Parentheses of Given 'N'](http://algorithms.tutorialhorizon.com/generate-all-valid-parenthesis-strings-of-length-2n-of-given-n/)
- [Remove Invalid Parentheses (GeeksforGeeks)](http://www.geeksforgeeks.org/remove-invalid-parentheses/)
- [Remove Invalid Parentheses (Program Creek)](http://www.programcreek.com/2014/05/leetcode-remove-invalid-parentheses-java/)
- [Remove Invalid Parentheses (Algorithms Collection)](https://kennyzhuang.gitbooks.io/algorithms-collection/content/remove_invalid_parentheses1.html)
