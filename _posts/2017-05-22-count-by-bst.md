---
layout: post
title: "Count Smaller By BST"
description: ""
category: 
tags: []
---

#### Count Smaller on the Right in an Array ####

The problem is: given an array of integers, count integers smaller than the index i,
also, located on the right of index i. So, the answer will be also an array of the integers.
Apparently, the answer to the last element is 0.

While trying to solve this algorithm question, I saw a quite neat solution.
As far as I googled, most solutions used a merge sort with an additional post processing.
However, one of them used a binary search tree (BST) with no extra post processing.
Also, the solution was easy to follow and undertandable.
It was a so nice idea of using BST. It's definitely worth adding memo here.


#### Problem description ####

Let's start describing the problem in detail.
For example, a given array of integers is [5, 2, 6, 1], the answer will be
[2, 1, 1, 0].

- 5: 2 and 1 are smaller, right side of elements
- 2: 1 is a smaller, right side of element
- 6: 1 is a smaller, right side of element


As always, there's a bruto-force search whose performance is O(n^2).
Starting from each index and counting smaller elements to the end
will give the solution. The problem of the bruto-force is time out
while the solution is testing by massive test cases.


#### How BST works ####

The binary search tree (BST) has a property, elements in left subtree are always
smaller than the root. While building the BST, in another words, inserting a new
node to the BST, it's easy to count up how many elements are smaller than the new node.

One more neat idea of this solution is building BST from the end of the element.
Since the answer to the last element is always zero, it is the good starting point.

The BSTs created from the array [5, 2, 6, 1] and [5, 2, 6, 4, 1, 3] will be formed one by one
described below. Values of each node expresses: number (answer to this element, internal count state).

<br/>
<pre>
val (answer, count)

1 (0, 1)  1 (0, 1)      1 (0, 1)      1 (0, 1)
           \             \             \
            6 (1, 1)      6 (1, 2)      6 (1, 3)
                         /             /
                        2 (1, 1)      2 (1, 1)
                                       \
                                        5 (2, 1)



3 (0, 1)       3 (0, 2)        3 (0, 2)             3 (0, 2)                3 (0, 3)                3 (0, 3)
              /               / \                  / \                     / \                     / \
      (0, 1) 1        (0, 1) 1   4 (2, 1)   (0, 1) 1  4 (2, 1)     (0, 1) 1   4 (2, 1)     (0, 1) 1   4 (2, 1)
                                                       \                   \    \                  \   \
                                                        6 (3, 1)     (1, 1) 2    6 (3, 1)    (1, 1) 2   6 (3, 2)
                                                                                                       /
                                                                                               (4, 1) 5

</pre>

As in the above, the root node keeps how many nodes are in the left subtree (including root)
when a new node is added to the right subtree.


#### Java code  ###

Below is the code to count while creating the BST.

{% gist yokolet/30e80818436c3d707012fde581e1509f %}


The code returns the result:

{% highlight java %}
[2, 1, 1, 0]
[4, 1, 3, 2, 0, 0]
{% endhighlight %}

#### Resources ####

- [Algorithm Collection, 1.18 Count of Samller Numbers After Self](https://kennyzhuang.gitbooks.io/algorithms-collection/content/count_of_smaller_numbers_after_self.html)
