---
layout: post
title: Markdown not working in Jekyll
categories:
  - Jekyll
tags:
  - Jekyll
  - Wordpress
  - Blog
  - Markdown
---

I just converted my blog from [Wordpress](http://wordpress.org/) to [Jekyll](https://github.com/mojombo/jekyll/).
The process was fairly straightforward, although it took a lot of reading, and viewing other people's
example [sites](https://github.com/mojombo/jekyll/wiki/sites).

One issue that took a while for me to figure out, was a small typo.

In **\_layouts/post.html**, I was using the following syntax to include my post content:

```plaintext
{% raw %}{{ page.content }}{% endraw %}
```

As I was converting my posts to use markdown syntax, the posts weren't "markifying". It turns out, all I needed to do was use this syntax:

```plaintext
{% raw %}{{ content }}{% endraw %}
```
