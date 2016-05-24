---
layout: post
title: "AngularJS on Hoplon"
description: ""
category: 
tags: [AngularJS, Hoplon, ClojureScript]
---

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

<img width="500" src="{{ site.url }}/images/hello-angular-html.png" alt="generated html code">

As you can see `class="ng-binding"` on the line which has Angular's double curly braces,
AngularJS on Hoplon worked without any special effort.
<br/><br/>

#### AngularJS controller written by ClojureScript

Writing AngularJS's controller in ClojureScript is nothing new.
Already, people have tried this, and libraries/blog posts are out there.
The difference here is I tried that on Hoplon.

This simple application has buttons which has 1 to 4 on it.
When one of button is clicked, the image name will be changed to corresponding one.
For example, when button 2 is clicked, picture2.png will show up.

Now, the directory structure becomes below:

    .
    ├── README.md
    ├── assets
    │   ├── css
    │   │   └── main.css
    │   └── img
    │       ├── picture1.png
    │       ├── picture2.png
    │       ├── picture3.png
    │       └── picture4.png
    ├── build.boot
    ├── resources
    │   └── public
    │       ├── angular-buttons.html
    │       ├── css
    │       │   └── main.css
    │       ├── hello-angular.html
    │       ├── img
    │       │   ├── picture1.png
    │       │   ├── picture2.png
    │       │   ├── picture3.png
    │       │   └── picture4.png
    │       └── main.js
    └── src
        ├── angular.inc.js
        ├── angular_buttons.cljs.hl
        ├── controllers
        │   └── buttons.cljs.hl
        └── hello_angular.cljs.hl

    9 directories, 19 files

I put images under `assets/img` directory, then Hoplon's boot copies those to `resources/public/img` directory.

For this button application, I created `src/angular_buttons.cljs.hl` below:

{% highlight clojure linenos %}
{% raw %}
(page "angular-buttons.html")

(html :ng-app "buttonApp"
      (head
       (title "Buttons by AngularJS on Hoplon"))
      (body
       (div "Buttons by AngularJS on Hoplon")
       (div :ng-controller "ButtonsCtrl" :ng-model "myngmodel", :ng-init "myngmodel=1"
            (button :ng-repeat "index in ['1', '2', '3', '4']" :ng-click "update(index)" "{{index}}")
            (div (img :src "img/picture{{myngmodel}}.png")))))
{% endraw %}
{% endhighlight %}

Angular's controller code is `src/controllers/buttons.cljs.hl`, which is:

{% highlight clojure linenos %}
(ns controllers.buttons)

(def buttonApp
  (.module js/angular "buttonApp" (array)))

(defn buttonsCtrl [$scope]
  (aset $scope "update" (ƒ [index] (aset $scope "myngmodel" index))))

(.controller buttonApp "ButtonsCtrl" buttonsCtrl)
{% endhighlight %}

That's it. Hoplon compiles and puts all together.
When the button is clicked, `update(index)` method gets run.
The method is defined in line 7 of `buttons.cljs.hl`.

Again, if you use browser's inspection feature, you'll see the generated code below.
Also, you'll see picture name will be changed to picture3.png or picture4.png.

<img width="700" src="{{ site.url }}/images/angular-buttons-html.png" alt="generated html code">
<br/><br/>

#### It worked!

As I tried, AngularJS worked on Hoplon.
Thinking of what Hoplon can do, probably, people who are willing to write ClojureScript code
don't need AngularJS.
However, AngularJS has a lot of handy directives.
In some cases, AngularJS may be a choice.
<br/><br/>
