---
layout: page
title: Hello World!
tagline: Supporting tagline
---
{% include JB/setup %}

{% for post in site.posts %}
  <div class="posts">
    <h2 class="title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <div id="aside"><span>{{ post.date | date:"%m/%d/%Y" }}</span></div>
    {{ post.excerpt }}
  </div>
{% endfor %}
