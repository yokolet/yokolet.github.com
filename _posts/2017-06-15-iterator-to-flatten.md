---
layout: post
title: "Iterator To Flatten It"
description: ""
category: 
tags: []
hero_height: is-small
---

Let's revisit the Iterator pattern.
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
It is the iterator, so the implementation should have `hasNext()` and `next()` methods.
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
In general, it is reasonable to do in `next()` method.
This is because, updating the itereator changes a current element where the iterator points.
This behavior is something unexptected for `hasNext()`, but reasonable to `next()` method.


#### Java code for iterating 2D Vector ####

{% gist yokolet/21551034731033910bc6ebe216bfee14 %}

Above prints:

<pre>

1, 2, 3, 4, 5, 6, 

</pre>


#### Problem Description - Flatten Nested List ####

"Implement an iterator to flatten nested list" is the problem.
Like previous problem, the iterator implementation should have `hasNext()` and `next()` methods.
Repeating these two methods, all elements in the nested list should be traversed.
For example, `[[1, 2], 3, [4, [5, 6]]]` is given, the code:

<pre>

    while (nestedLIter.hasNext()) {
        result.add(nestedLIter.next());
    }

</pre>

should add all elements to the result list.
When it finishes, the result should be `[1, 2, 3, 4, 5, 6]`.

This is similar to flatten 2D vector.
Big difference is inside of an outermost list is not always a list.
Inner elements may be an integer, list, or nested list.
This problem is more complicated compared to the previous one.


To express each element in the nested list,
the interface `NestedInteger` is provided.

<pre>

    interface NestedInteger {
        boolean isInteger();
        Integer getInteger();
        List&lt;NestedInteger&gt; getList();
    }

</pre>


#### The idea to implement iterator to flatten nested list ####

Here again, this sort of nested something can be solved by iterator of iterators approach.
In this case, iterator of iterafor of iterator of ... may be there.
To keep track the data something like ... of ... of ... of ...., a stack would be a good data structure.

If I find the itereator points a list, I will stack it.
Then, I will pull out an inner iterator.
If the inner iteartor points another list, I will stack it.
Then, I will pull out the inner of inner iterator (repeat this as long as needed).
At some level, pulled out iterator should point an integer.
This is the value to add to the result.


Likewise, the challenging part is when and how to update the iterators.
Following the policy, "reasonable to do in `next()` method,
the iterators will be updated in `next()`.
However, in this case, I saved a current integer value to an instance variable.
This is because current interator may or may not points a value. It may another itereator.
Saving a *next* value makes easy to update the iterators.


#### Java code for iterating nested list ####

{% gist yokolet/e9f1387f213e872d15697d5d13eaedcd %}


#### Resources ####

- [Flatten Nested List Iterator](http://www.programcreek.com/2014/05/leetcode-flatten-nested-list-iterator-java/)
