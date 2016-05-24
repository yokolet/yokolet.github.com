---
layout: post
title: "Digital Root"
description: ""
category: 
tags: []
---
{% include JB/setup %}

#### What is Digital Root ####

Suppose you are given some digits, say 123456, the digital root will
be calculated like this:

```
1 + 2 + 3 + 4 + 5 + 6 = 21
2 + 1 = 3
```

Summing each digit repeatedly to get a single digit is a process to
get the digital root.


#### How to effectively find the digital root ####

An intuitive solution would be to recurse steps: 1. get singles digits
from the given number. 2. sum up all.
However, if the given number is really big, this is not an effective
solution.

Luckily, there's a formula to calculate the digital root. This
wikipedia page explains what and why
[Digital root](https://en.wikipedia.org/wiki/Digital_root).


The formula is:

```
int n = 123456;
int digital_root = n - 9*(int)Math.floor((double)(n-1)/9);
```

Why this is the answer? The digital root sees how many numbers are
there after the closest of multiple of 9 but less than the given
number.
If the given number is 123456, its closest, multiple of 9 is 123453.
So, the digital root of 123456 is 3.

