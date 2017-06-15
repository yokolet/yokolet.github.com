---
layout: post
title: "Iterator To Flatten It"
description: ""
category: 
tags: []
---

#### Iterator Revisited ####

"Iterator" is one of design patterns in object-oriented programming (OOP).
Needless to say, extremely famous Gang of Four (Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides) are creators.
As in the Wikipedia's [Iterator pattern](https://en.wikipedia.org/wiki/Iterator_pattern),
the iterator pattern is used when traversing *container* without knowing how the container works. It is OOP's favorite pattern to "decouple" the iterator from container.

What does that actually mean? The iterator defines two methods, `hasNext()` and `next()`.
Repeating these two method, I can traverse all elements in the container.
For example, Java's ArrayList are LinkedList examples of the containers.
These two have different data structures, but I can traverse all elements exactly the same way: `hasNext()` and `nex()`.

Since the iterator is a handy feature, many including custom classes provide a way to access their elements by the iterator.
Probably, this is a reason I see various iterator implementation problems.
The iterator looks a good topic to leave a memo, so I'm going to write about two iterators here.
These two will flatten nested structure: 2D vector and nested list. 


#### Problem Description - Flatten 2D Vector ####

"Implement an iterator to flatten 2D vector" is the problem.
It is the iterator, so the implementation should have `hasNext()` and `next()` method.
Repeating these two methods, all elements in 2D vector should be traversed.
For example, `[[1, 2], [3], [4, 5, 6]]` is given, the code:

<pre>

while (v2DIter.hasNext()) {
    result.add(v2DIter.next());
}

</pre>

should add all elements to the result list.
When it finishes, the result should be `[1, 2, 3, 4, 5, 6]`.


#### The idea to implement iterator to flatten 2D vector ####

This sort of nested something is often solved by iterator of iterators approach.
A parent iterator traverses vectors, say `[1, 2]` or `[3]`.
Child iterators traverse individual elements, say `1`, `2`, or `3`.

The most challenging part is when and how to update the child iterator.
Choices are only two: either `hasNext()` or `next()` method must be responsible to update.
In general, it is easy to do in `next()` method.
The reason is, updating child itereator changes a current element where the iterator points.
This behavior is someting unexptected for `hasNext()`, but reasonable to `next()` method.


#### Java code for iterating 2D Vector ####

{% gist yokolet/21551034731033910bc6ebe216bfee14 %}

Above prints:

<pre>

1, 2, 3, 4, 5, 6, 

</pre>


#### Problem Description - Flatten Nested List ####




#### The idea to implement iterator to flatten nested list ####



#### Java code for iterating nested list ####

{% gist yokolet/0b565ac9e3340dba6b91a3e15cf104d1 %}

The result is:

<pre>


</pre>

Time complexity: 


#### Resources ####

