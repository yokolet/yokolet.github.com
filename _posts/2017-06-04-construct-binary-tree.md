---
layout: post
title: "Construct Binary Tree"
description: ""
category: 
tags: []
---

#### Serialize/Deserialize ####

It depends on a programming language, but in most cases,
a binary tree is expressed by an object tree.
Each node can have at most two children: left node and right node.
Once the binary tree is constructed, it is not language neutral anymore.

What is programming language independent form?
A string would be the answer.
Sometime, creating a string from binary tree is called *serialize*.
On the contrary, constructing binary tree is sometime called *deserialize*.

Next to the string, another language independent form would be an array of intergers.
There are some differences to treat integers among programming languages.
However, still, integers are common to all.

A way to serialize the binary tree is not unique.
Occasionally, a question allows me to choose my favorit style.
As far as I learned, there are a few typical styles:
string with parens, string with markers,
combination of preorder/inorder or inorder/postorder.

Although the goals are the same, "construct a binary tree" and "construct a string,"
I need to apply different ideas.
So, I'm going to write a memo here to clarify the difference.


#### Problem Description - String with Parens ####

Given a string with parens, construct a binary tree.
When creating a node, always left child should come first.
If node is empty, it is an empty string.

For example, `4(2(-3)(1))(6(5))` is a given string, the tree should be:
<pre>

         4
       /   \
     /      \
    2        6
  /   \     /
-3     1   5

</pre>

In this problem, the first digit(s) is the root node, and
all subtrees under root are surrouded by a pair of parens.
Each node can take both positive and negative values.

As for serialization, when the tree above is given,
the string `4(2(-3)(1))(6(5))` should be returned.


#### The idea to construct from/to a string with parens ####

Construcing the tree comes first.
Here, what I need to care about are:

- an index to point a specific character in a given string
- left or right to add a new node.

Since this is a binary tree, recursive approach would work like traversing the binary tree.
The point is when go right while increamenting the index.
At first, it should go left as far as encountering opening parens.
Then, coming back from deeper process, check opening parens again.
This time, the opening paren indicates the tree should go right.
Other than this main logic, I added index range check not to end up an exception.


This serialization is a preorder traversal.
What I need to care about are:

- when returns from the subtree traversal, add closing paren
- only left child may have `()` (empty) expression, but right child is not

Because of this, extra null checks are mixed in basic preorder traversal.

#### Java code for constructing a binary tree from a string with parens ###

{% gist yokolet/363f409ffddc72521ab540cde3f6f13d %}

The result is:

<pre>
4(2(-3)(1))(6(5))
1(2()(4))(-3)
</pre>


#### Problem Description - String with Markers ####

Given a string with markers ($s), construct a binary tree.
For example, `4,2,-3,$,$,1,$,$,6,5,$,$,$` is given,
the constrcuted tree should be:

<pre>

         4
       /   \
     /      \
    2        6
  /   \     /
-3     1   5

</pre>

In this problem, digits are separated by a comma (delimiter).
When left and/or right child is null, it is expressed by a marker, `$`.

A serialization creates a string exactly the same as input to deserialization.

#### The idea to construct from/to a string with markers ####

Again, constructing the binary tree comes first.
This is quite similar but easier than the previous, the string with parens style.
Simply traversing in a preorder is all to construct a tree.
When the Marker (`$`) is found, it goes back.
Sicne each values are separated by a comma, finding a value portion from the string
is easy as well.

Constructing a string from tree is also easier then previous style.
Here again, simply traversing in the preorder creats a string.
While a node is there, add a value and delimiter.
When it comes to children of leaf node, a marker will be added.


#### Java code for constructing a binary tree from a string with markers ####

{% gist yokolet/f332e785f645e8b06c2914ff033b211c %}

The result is:

<pre>
4,2,-3,$,$,1,$,$,6,5,$,$,$
1,2,$,4,$,$,-3,$,$
</pre>



#### Problem Description - A Combination of Preorder and Inorder Traversal ####

Given two arrays of integers, preoder and inorder, construct a binary tree.
For example, preorder `[4, 2, -3, 1, 6, 5]`, inorder `[-3, 2, 1, 4, 5, 6]`
are given, the constrcuted tree should be:

<pre>

         4
       /   \
     /      \
    2        6
  /   \     /
-3     1   5

</pre>


#### The idea to construct from/to preorder and inorder  ####

If I look at difference of ways to traverse trees, there's interesting fact.
The first element in preorder is a root.
The same value in inorder divides left and right subtrees.

<pre>
preorder [|4|, 2, -3, 1, 6, 5], inorder [-3, 2, 1, |4|, 5, 6]

           4
           |
           |
    2      |      6
  /   \    |     /
-3     1   |    5

</pre>

Now, I will look at the left substree only.
The arrays are preorder `[2, -3, 1]`, inorder `[-3, 2, 1]`.
Again, the first element in preorder divides inorder into left and right subtrees.

<pre>
preorder [|2|, -3, 1], inorder [-3, |2|, 1]

     2
     |
-3   |   1

</pre>

The same division happens in the right subtree, preoder `[6, 5]` and inorder `[5, 6]`.

<pre>
preorder [|6|, 5], inorder [5, |6|]

     6
     |
5    |

</pre>

This way, I can figure out what integers should go left or right.


#### Java code for constructing a binary tree from preorder and inorder traversal  ###

{% gist yokolet/6eef5a0806b3a5a7cba0f442fef395fe %}

The result is:

<pre>
[[4, 2, -3, 1, 6, 5], [-3, 2, 1, 4, 5, 6]]
[[1, 2, 4, -3], [2, 4, 1, -3]]
</pre>


#### Problem Description - A Combination of Inorder and Postorder Traversal ####

Given two arrays of integers, inorder and postorder, construct a binary tree.
For example, inorder `[-3, 2, 1, 4, 5, 6]`, postorder `[-3, 1, 2, 5, 6, 4]`
are given, the constrcuted tree should be:

<pre>

         4
       /   \
     /      \
    2        6
  /   \     /
-3     1   5

</pre>


#### The idea to construct from/to inorder and postorder ####

Just glancing at this problem, everybody finds this is very similar to the previous one.
In the preorder, a root is the first element while the last in the postorder.

The same logic to divide left and right subtree is able to apply
looking at the last element in the subtree area.

<pre>
inorder [-3, 2, 1, |4|, 5, 6], postorder [-3, 1, 2, 5, 6, |4|]

           4
           |
           |
    2      |      6
  /   \    |     /
-3     1   |    5


inorder [-3, |2|, 1], postorder [-3, 1, |2|]

     2
     |
-3   |   1


inorder [5, |6|], postorder [5, |6|]

     6
     |
5    |


</pre>

As in the previsou section, recursively applying this idea constructs the binary tree.

#### Java code for constructing a binary tree from inorder and postorder traversal ####

{% gist yokolet/e2b2713f68c2e59d467a4929a26178d8 %}

The result is:

<pre>
[[-3, 2, 1, 4, 5, 6], [-3, 1, 2, 5, 6, 4]]
[[2, 4, 1, -3], [4, 2, -3, 1]]
</pre>


#### Resources ####

- [Serialize and Deserialize a Binary Tree](http://www.geeksforgeeks.org/serialize-deserialize-binary-tree/)
- [Serialize and Deserialize Binary Tree](http://www.programcreek.com/2014/05/leetcode-serialize-and-deserialize-binary-tree-java/)
- [Serialize and deserialize binary tree](https://kennyzhuang.gitbooks.io/algorithms-collection/content/serialize_and_deserialize_binary_tree.html)
- [Construct Tree from given Inorder and Preorder traversals](http://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/)
- [Construct Binary Tree from Preorder and Inorder Traversal](http://www.programcreek.com/2014/06/leetcode-construct-binary-tree-from-preorder-and-inorder-traversal-java/)
- [Construct a Binary Tree from Postorder and Inorder](http://www.geeksforgeeks.org/construct-a-binary-tree-from-postorder-and-inorder/)
- [Constrcut Binary Tree from Inorder and Postorder Traversal](http://www.programcreek.com/2013/01/construct-binary-tree-from-inorder-and-postorder-traversal/)
