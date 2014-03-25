---
layout: page
title: Yokolet's Notelets
tagline: Recent Posts
---
{% include JB/setup %}

{% for post in site.posts %}
  <div class="posts">
    <h2 class="title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <div id="aside"><span>{{ post.date | date:"%m/%d/%Y" }}</span></div>
    {{ post.excerpt }}
  </div>
{% endfor %}
