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

A way to serialize the binary tree is not unique.
A question may allow me to choose my favorit style.
Such sort of questions test a result using a pair of serialization and deserialization.

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


#### Java code for constructing a binary tree from inorder and postorder traversal ####

{% gist yokolet/f332e785f645e8b06c2914ff033b211c %}

The result is:

<pre>
4,2,-3,$,$,1,$,$,6,5,$,$,$
1,2,$,4,$,$,-3,$,$
</pre>



#### Problem Description - From Preorder and Inorder Traversal ####



#### The idea to construct from preorder and inorder traversal  ####



#### Java code for constructing a binary tree from preorder and inorder traversal  ###

{% gist yokolet/6ec539a2db6a07068f68b9bc217a26c9 %}

The result is:

<pre>
</pre>


#### Problem Description - From  Inorder and Postorder Traversal ####


#### The idea to construct a binary tree from inorder and postorder traversal ####


#### Java code for constructing a binary tree from inorder and postorder traversal ####

{% gist yokolet/440060611aee3cc816e36b6fb1ff4196 %}

The result is:

<pre>
</pre>


#### Resources ####

- []()

