---
layout: post
title: "Permutation"
description: ""
category: 
tags: []
---

#### How bad naive implementation of generating permutation ####

Permutation is a well-known problem in mathematics as well as
programming. If a set of three characters, {A, B, C}, its permutation
is:

```
ABC, ACB, BAC, BCA, CAB, CBA
```

Three characters generate six patterns, which is `3*2*1`, a factorial
of its size.


The easiest implementation is a brute-force, recursing all. How
many times will it repeat? The answer is a factorial of total number of given
characters. Crap! In terms of Big-O complexity, the factorial is the
worst. See Big-O Complexitiy Chart at
[Big-O Cheat Sheet](http://bigocheatsheet.com/).
To generate only 10 letters of permutation, 3628800 times repetition
must be done.


#### How to effectively find permutation ####

This is a famous problem, so it's easy to find the solution for "how to
effectively find/generate permutation." As far as I googled, these
three were the best.

- [Next lexicographical permutation algorithm](https://www.nayuki.io/page/next-lexicographical-permutation-algorithm)
- [Print all permutations in sorted (lexicograpic) order](http://www.geeksforgeeks.org/lexicographic-permutations-of-string/)
- the answer by Michal Forišek
  [How would you explain an algorithm that generates permutations using loxicographic ordering?](https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering)

Overall, above three take the same approach. The trick is
*lexicographical order*. The lexicographical order is not the goal
but is the way to effectively generates permutations.
Above three *use* the lexicographical order to find next permutations
one by one. When there's no next permutation, all permutations are
generated.


#### Permutation generation code ####

Steps of the algorithm are:

1. (optional) sort given string or array
2. find longest non-increasing suffix such that `array[index] <= array[index+1]`
3. identify the pivot index such that the first `array[index] > array[index+1]`
4. find the ceil (successor), the right most index such that `array[pivot] < array[succ]`
5. swap the pivot and successor, array[pivot] and array[succ]
6. reverse the suffix from array[pivot+1] to array[array.length-1]
   if the array has been sorted at step 1, sort suffix instead of reversing

The sorted version of permutation in Java will be something like this:

{% highlight java linenos %}
import java.util.Arrays;

public class AllPermutations {
    static void sortedPermutations(char[] array) {
        Arrays.parallelSort(array);
        boolean isFinished = false;
        int count = 0;
        while (!isFinished) {
            if (count !=0 && count % 10 == 0) System.out.println();
            System.out.print((new String(array)) + " "); count++;

            int index = array.length-2;
            // find non-increasing suffix
            while(index >= 0) {
                if (array[index] <= array[index+1]) break;
                index--;
            }
            if (index == -1) {
                isFinished = true;
            } else {
                // the pivot is array[index]
                // find the rightmost successor to the pivot in suffix
                int succ = array.length-1;
                while(array[succ] <= array[index]) succ--;
                // swap the pivot and successor
                char tmp = array[index];
                array[index] = array[succ];
                array[succ] = tmp;
                // sort suffix
                Arrays.parallelSort(array, index+1, array.length);
            }
        }
    }

    public static void main(String[] args) {
      sortedPermutations("ABCDE".toCharArray());
    }
}
{% endhighlight %}

The above code prints:

<pre>
ABCDE ABCED ABDCE ABDEC ABECD ABEDC ACBDE ACBED ACDBE ACDEB
ACEBD ACEDB ADBCE ADBEC ADCBE ADCEB ADEBC ADECB AEBCD AEBDC
AECBD AECDB AEDBC AEDCB BACDE BACED BADCE BADEC BAECD BAEDC
BCADE BCAED BCDAE BCDEA BCEAD BCEDA BDACE BDAEC BDCAE BDCEA
BDEAC BDECA BEACD BEADC BECAD BECDA BEDAC BEDCA CABDE CABED
CADBE CADEB CAEBD CAEDB CBADE CBAED CBDAE CBDEA CBEAD CBEDA
CDABE CDAEB CDBAE CDBEA CDEAB CDEBA CEABD CEADB CEBAD CEBDA
CEDAB CEDBA DABCE DABEC DACBE DACEB DAEBC DAECB DBACE DBAEC
DBCAE DBCEA DBEAC DBECA DCABE DCAEB DCBAE DCBEA DCEAB DCEBA
DEABC DEACB DEBAC DEBCA DECAB DECBA EABCD EABDC EACBD EACDB
EADBC EADCB EBACD EBADC EBCAD EBCDA EBDAC EBDCA ECABD ECADB
ECBAD ECBDA ECDAB ECDBA EDABC EDACB EDBAC EDBCA EDCAB EDCBA 
</pre>
