---
layout: post
title: Complete Binary Tree
date: 2019-09-09 21:19 -0700
hero_height: is-small
---

Problems which ask a binary tree traverse, add/delete nodes, etc. are popular in algorithm questions.
The binary trees are often just a binary tree or binary search tree.
Sometimes, the problem pinpoints a particular type of a binary tree,
for example, a balanced binary tree or complete binary tree.

The complete binary tree has unique properties.
Problems which specify the tree as the complete binary tree expect an efficient
solution based on the tree's properties.
I found it is an interesting topic, so I decided to write a post about the complete binary tree.

Well, what is exactly the complete binary tree?
Wikipedia's article about [Binary Tree](https://en.wikipedia.org/wiki/Binary_tree) explains that:

    In a complete binary tree every level, except possibly the last,
    is completely filled, and all nodes in the last level are as far left
    as possible. It can have between 1 and 2^h nodes at the last level h.

Given the above definition, in every level, nodes are filled out strictly from left to right.

```
complete binary tree      not complete binary tree
    1                              1
   / \                            / \
  2   3                          2   3
 /                                \
4                                  4

      1                            1
    /   \                        /  \ 
  2      3                      2    3
 / \    /                      /    / \ 
4   5  6                      4    5   6
```

For the complete binary tree, it's easy to store the tree in an array.
For example, the second complete binary tree above can be expressed by
```[1, 2, 3, 4, 5, 6]```.
This would remind a heap data structure. In fact, the heap is the complete binary tree.

Another interesting property is the left and right subtree's heights.
The left subtree is always higher or equal to the right subtree.
When the right subtree exists the left subtree should be completely filled.

For now, we learned the completed binary tree's properties, it's time to look at algorithm problems.

#### Counting Nodes in the Complete Binary Tree

__Problem description__: Given a complete binary tree, find how many nodes are in the tree.

A naive solution is obvious -- traverse the tree whether level order or pre-order.
The correct answer will be found.
However, when the tree type is specified as the complete binary tree, there's no need to traverse all.
The solution should use the complete binary tree property that nodes are packed to the left.

This is the problem to compare left and right subtree heights.
At some level, if the right subtree has the same height as the left subtree, that level is all filled.
For example, the second complete binary tree above has the same left and right subtree heights at the level of node 2 and 3.
That means the left subtree is completely filled, so the next step goes to the right subtree to check.
If the left subtree is higher at some level as described in the first complete binary tree,
the next step goes left to check.

Below is the code example of counting problem. It takes a bottom up counting style.

#### Code Example of Node Count

{% gist yokolet/64781fb9082954396c34272dd94ae705 %}

The performance is: time `O(log(n))`, space `O(h)`, where n: number of nodes, h: height of the tree.


#### Validating a Completeness of Binary Tree

__Problem description__: Given a binary tree, check if it is a complete binary tree.

Like counting problem, left and right subtree's heights are a clue to find an answer.
If the right subtree is higher as in the first not complete binary tree, it is invalid.
If the left subtree if higher more than one, it is invalid.
When left min and max heights are not the same, the right min/max should be the same as the left min.

Below is the code example of validation problem. It takes post-order traversal style.

#### Code Example of Completeness check

{% gist yokolet/e66a00ad3d523577a515e403d26581a1 %}

The performance is: time `O(n)`, space `O(h)`, where n: number of nodes, h: height of the tree.


#### Designing a Complete Binary Tree Inserter

__Problem description__: Write a data structure `CBTInserter` which is initialized by a
complete binary tree and provides operations below:

- `CBTInserter(TreeNode root)`: initializes the data structure with the root of the complete binary tree
- `insert(int v)`: inserts a new node with the value `v` to the tree and returns the value of the parent node. After the insertion, the tree should keep the completeness.
- `get_root()`: returns the root node of the tree.


This is a problem to use heap-like data structure internally.
Under a zero based index, left and right children are on the index of `2*i+1` and `2*i+2` respectively
when the parent node is at index `i`.
When the child is on the index `i`, its parent is at index `(i-1) / 2`.

When the class is initialized, the given tree will be saved in an array using level order traversal.
When a new node is inserted, the parent's index is easily found from the array length.
So the new node can be added to its parent's left or right child easily.


#### Code Example of Complete Binary Tree Inserter

{% gist yokolet/afa881446150ce323492d31d30738f4d %}

The performance is:
- initialization: time: `O(n)`, space: `O(n)`
- insert: time `O(1)`, space: `O(1)`
- get_root: time `O(1)`, space: `O(1)`

#### Ressources

- Wikipedia: [Types of Binary Tree](https://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees)
- [Binary Heaps](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/heaps.html)

