---
layout: post
title: "String Match"
description: ""
category: 
tags: []
---

#### String Match Algorithm ####

The topic here is not a regular expression but string search algorithm.
For example, find the position(s) of matched patterns in a loooong text.

The easiest implementation is:

1. check each character of the given pattern one by one
2. shift starting index by one
3. repeat 1 and 2

A performance of this brute-force search is O(n^2), which considered
bad. When the given text is huge, it's apparent.


#### How to effectively find matched pattern ####

There's a few algorithms to effectively find the pattern. Among them,
Knuth-Morris-Pratt (KMP) algorithm would be well-known algorithm. KMP
uses prefix function to skip or find a pattern effectively. The
performance of KMP is O(N+M) where N, M are the lengths of text and
pattern respectively.


KMP is quite effective, however, understanding its idea is quite
tough. Especially, a prefix function, which is also called failure
function or partial match table, is a challenging part. Actually, it
is an array, neither of function nor table.


This famous algorithm is explained in books and websites, so we can
easily find many. Unfortunately, most of them don't help to understand
the idea so much except:

> [The Knuth-Morris-Pratt Algorithm in my own word](http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/)

This blog post is really good. The key idea of prefix function is to
find "the longest proper prefix of a substring which is also a
suffix." The blog post tells us what is it clearly using good examples.

Also, the idea how to find the pattern using prefix function is
described with easy-to-understand illustrations.


#### Prefix function (a.k.a. failure function, matching table) ####

The prefix function (an array) will be created only from a pattern. We
don't use a text at all to compute values in prefix function. The
function is used to see how the pattern matches itself. Based on this
information, we can safely skip useless comparisons.

Here's the code to calculate prefix function:

{% highlight java linenos %}
static int[] computePrefixFunction(char[] pattern) {
    int m = pattern.length;
    int[] p = new int[m];
    p[0] = 0;
    int k = 0;
    for (int q=1; q<m; q++) {
        while (k > 0 && pattern[k] != pattern[q]) {
            k = p[k];
        }
        if (pattern[k] == pattern[q]) {
            k++;
        }
        p[q] = k;
    }
    return p;
}
{% endhighlight %}


When the pattern is "ababaca", above computes:

| i         | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|----------:|---------------------------|
| pattern[i]| a | b | a | b | a | c | a |
| p[i]      | 0 | 0 | 1 | 2 | 3 | 0 | 1 |


#### Pattern search in text by prefix function ###

Once prefix function is computed, it's time to search the pattern.
This part absolutely use the given text. The rule is:

- find the length of characters matched
- if the matched length is the same as pattern, the pattern found
- look up the value in prefix function at index (matched length - 1)
- skip characters in the value at index (matched length -1)
- repeat

Below is the code to search the pattern:

{% highlight java linenos %}
static void kmp(char[] text, char[] pattern) {
    List<Integer> indexes = new ArrayList<>();
    int n = text.length;
    int m = pattern.length;
    int[] p = computePrefixFunction(pattern);
    int q = 0;
    for (int i=0; i<n; i++) {
        if (q > 0 && pattern[q] != text[i]) {
            q = p[q-1];
        }
        if (pattern[q] == text[i]) {
            q++;
        }
        if (q == m) {
            indexes.add(i-q+1);
            q = p[q-1];
        }
    }
    if (indexes.size()==0) {
        System.out.println((new String(pattern)) + " not found");
    } else {
        System.out.println((new String(pattern)) + " found at: " + indexes.toString());
    }
}
{% endhighlight %}


#### Run the code and find the pattern ###

All parts are ready. It's time to run the code and see the result.


{% highlight java linenos %}
public static void main(String[] args) {
    char[] pat = "ababaca".toCharArray();
    char[] text = "bacbababaabcbab".toCharArray();
    kmp(text, pat);

    pat = "ababaca".toCharArray();
    text = "bacbababaabcbababaca".toCharArray();
    kmp(text, pat);

    pat = "aba".toCharArray();
    text = "bacbababaabcbababaca".toCharArray();
}
{% endhighlight %}


Above prints,

{% highlight bash %}
ababaca not found
ababaca found at: [13]
aba found at: [4, 6, 13, 15]
{% endhighlight %}


#### Resources of KMP ####


- [The Knuth-Morris-Pratt Algorithm in my own word](http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/)

- [Knuth–Morris–Pratt algorithm](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)

- [Searching for Patterns \| Set 2 (KMP Algorithm)](http://www.geeksforgeeks.org/searching-for-patterns-set-2-kmp-algorithm/)
