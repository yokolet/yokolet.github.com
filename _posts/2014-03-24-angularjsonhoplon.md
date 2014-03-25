---
layout: post
title: "AngularJS on Hoplon"
description: ""
category: 
tags: [AngularJS, Hoplon, ClojureScript]
---
{% include JB/setup %}

#### Hoplon presentation at Triangle Clojure Users Meetup

About a month ago, [Alan Dipert](https://github.com/alandipert) and [Micha Niskin](https://github.com/micha) gave a presentation at Triangle Clojure Users Meetup.
Their topic was about Hoplon, [hoplon.io](hoplon.io), ClojureScript Framework.
It was impressive one.

Hoplon made easy to get started ClojureScript coding by its boot 
(if you have tried ClojureScript, you should know it is really cumbersome to just start it).
Also, Hoplon has a simple state machine and a feature to render HTML tags.
Except boot, everything works on ClojureScript, not Clojure.

After their presentation, one attendee asked a question, "What about AngularJS? Does Angular work on Hoplon?"

<!--more-->

Recently, this question would be one of FAQs for all client side frameworks.
There's no doubt AngularJS is becoming an industry standard.
Although Hoplon has an ability to do the same thing as AngularJS,
my curiosity pushed me to try it out.

Whether AngularJS works on Hoplon or not?
The answer is yes.
Besides, it was effortless than I expected.
<br/><br/>

#### The first very simple AngularJS on Hoplon

Following Hoplon's [Gettting Started](http://hoplon.io/#/getting-started/) documment,
I created the directories and files below:

    .
    ├── README.md
    ├── assets
    │   └── css
    │       └── main.css
    ├── build.boot
    ├── resources
    │   └── public
    │       ├── css
    │       │   └── main.css
    │       ├── hello-angular.html
    │       └── main.js
    └── src
        ├── angular.inc.js
        └── hello_angular.cljs.hl

    6 directories, 8 files

Hoplon compiles and puts everyting under src together to `resource/public/main.js`.
The extension, `inc.js`, is for external JavaScript file.
I downloaded Angular's minified JavaScript file and put it under src directory with the extension, inc.js.

Below is a whole code of `hello_angular.cljs.hl`.
{% highlight clojure linenos %}
{% raw %}
(page "hello-angular.html")

(html :ng-app ""
      (head
       (title "AngularJS on Hoplon"))
      (body
       (p "Next line uses angular's double curly braces")
       (div "Nothing here {{'yet' + '!'}}")))
{% endraw %}
{% endhighlight %}

That's it. Hoplon generates `resrouces/public/hello-angular.html`, which is on the first line.
On browser, open the hello-angular.html file.
If you use html code inspection feature, you'll see the output as in below:

<img width="500" src="{{ site.url }}/assets/images/hello-angular-html.png" alt="generated html code">

As you can see `class="ng-binding"` on the line which has Angular's double curly braces,
AngularJS on Hoplon worked without any special effort.
<br/><br/>

#### AngularJS controller written by ClojureScript

