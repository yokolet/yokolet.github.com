---
layout: post
title: HackerRank Code Testing by Clojure
date: 2019-08-28 16:20 -0700
hero_height: is-small
---

Recently, I decided to give Clojure a try.
This post is about testing HackerRank problems on a local env. 

I used to write Clojure code for my day job, however, no Clojure at all for two years.
Instead, almost all were done by Python.
I became familiar with Python's functional programming world now.
Aside of ML/DL projects, I did bunch at HackerRank, leetcode or sort.
After a while, I thought, "maybe I can solve problems by Clojure like Python..."

Luckily, HackerRank supports Clojure. So, I started.

Soon, I hit the wall. I wanted to test a code. Okay, writing test is not hard.
Something quite hard was the HackerRank platform.
Test data comes in from `STDIN`. Something output to `STDOUT` is tested.
For many problems, it's effective to have `read-line` and `println` in the code side.

I did quite a lot of research and trials so that the code can be tested
without any modification on HackerRank platform.
This experience, setting up a testing environment was a good Clojure study.
That's why I wrote the blog post.
This post may help other Clojure newbies to figure out how.

#### Binding `STDIN`

Clojure has [`clojure.core/binding`](https://clojuredocs.org/clojure.core/binding) function.
This function is used to create new bindings, which is like, replacing the current bindings.
In Clojure, `STDIN` is bind to `*in*`.
So, what should be done is to bind `*in*` to something else.

Next question is what should be "something else."

HackerRank test case is provided by a file.
People can get the test data file if they pay 5 Hackos.
The "Hackos" are points people can get when their solutions successfully pass all tests.
Unless the problem is a very entry level, the test case file tends to pretty big.
It's unable to write the test data in the code often.
For this reason, I wanted to get the test data from a file and bind it to `*in*`.

What I did was:
1. create a file under `resource` directory
2. read it as a resource
3. convert it to a reader
3. bind the reader to `*in*`

```clojure
(require '[clojure.java.io :as io])
(with-open [rdr (io/reader (io/resource n))]
    (binding [*in* rdr]
      (f)))
```

Since the project was created by the [`leningen`](https://leiningen.org/),
the `resources` directory is already on the path. Just to give a relative file path
as `n`, the file is read. The `f` is a function which consumes data from `STDIN`.

 
#### Catching `STDOUT`

Now, reading from `STDIN` was cleared. Next will be to catch `STDOUT`.
Clojure has a convenient function [`clojure.core/with-out-str`](https://clojuredocs.org/clojure.core/with-out-str).
Compared to a reading part, catching `STDOU` was much easier.
For example:

```clojure
;; define function which prints to stdout
> (defn say-it []
    (println "seriously?")
    (println "can't believe"))

;; assign STDOUT to "out"
> (def out (with-out-str (say-it)))

;; what's in the "out"
> out
"seriously?\ncan't believe\n" 
```

The same idea for the reading can be applied to `STDOUT` -- printing out to a file under `resources` directory.
However, in general, the expected output is simple for the HackerRank problems.
At this moment, `with-out-str` function satisfies my needs.


#### Wrapping Tests

So far, `STDIN` and `STDOUT` work well to fit with the HackerRank platform.
However, to bind resource reader to `STDIN`, I should write `with-open ...` in every test case. 
I want to avoid writing the same lines again and again.
After searching online, I found [`clojure.test/use-fixtures`](https://clojuredocs.org/clojure.test/use-fixtures) function.
This function works like Unit test's `setUp()/tearDown()` methods.
As the Clojure API document explains:

```clojure
(defn my-test-fixture [f]
        (create-db)   ;; setUp
        (f)           ;; test
        (destroy-db)) ;; tearDown
(use-fixtures :once my-test-fixture
```
Define the fixture function, then call `use-fixture` function.
The tests in the same namespace are all wrapped by the fixture.

Below is an example test by the `use-fixture` function.

{% gist yokolet/efad0031c483bcc77ea9ada37e708db2 %}

#### Gotchas

The function `use-fixture` made my test code simple. It's good.
However, it has a downside.
Some problems provide multiple test cases, which means multiple resource files on my test environment.
Since only one `use-fixture` is applied to all tests in the same namespace,
my `wrap-test` and fixture design don't work nicely.
There should be a way to cope with this problem.
It will be my next challenge.

If you are interested, my solution and test code for [30 Days of Code](https://www.hackerrank.com/domains/tutorials/30-days-of-code)
are in my repository, [thirty-day-code](https://github.com/yokolet/thirty-day-code). 
