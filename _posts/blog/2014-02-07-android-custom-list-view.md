---
layout: post
title: Custom List View
date: 2014-02-07 10:29
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---

<h2>A - Introduction</h2>
<a title="[Android] ListView Dialog" href="http://icetea09.com/blog/2014/02/11/listview-dialog/">ListView</a> is a very important control in Android programming. Almost every apps has ListView.

ListView doesn't only contain text but also other controls like ImageView, Button, Checkbox...

This post will show you how to customize a ListView.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/1-8.png" alt="" />
<h2>B - Step by step demo</h2>
First of all, we must add a ListView into main layout (<strong>main.xml</strong> file)

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/2-10.png" alt="" />

<!--more-->

Next, create a <strong>list_item.xml</strong> file - this file will define all the components, controls of EACH ITEM in ListView.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/3-9.png" alt="" />

&nbsp;

Create a <strong>SongInfo</strong> class to define all the information of a song object like song, singer, isCheck, rate:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/4-8.png" alt="" />

Now, it's time to play with Custom <a title="[Android] ListView Dialog" href="http://icetea09.com/blog/2014/02/11/listview-dialog/">List View</a> <img title="Byebye" src="http://vozforums.com/images/smilies/Off/byebye.gif" alt=":byebye:" />

Create new  <strong>ListItem</strong> class that extends the <strong>LinearLayout </strong>super class.

This class will declare all the components and controls in  <strong>list_item.xml </strong>file:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/5-7.png" alt="Custom List View" />

Create new <strong>ListAdapter</strong> class extends <strong>ArrayAdapter&lt;SongInfo&gt;</strong> super class:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/6-6.png" alt="Custom List View" />

Override the <strong>getView</strong> method to assign values of SongInfo to the appropriate components, controls in a ListView item.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/7-5.png" alt="Custom List View" />

In the <strong>ListViewDemoActivity </strong>class, <strong>onCreate()</strong> method, we need to init and push some dummy data to  <strong>ListAdapter</strong>, after that <strong>setAdapter </strong>for ListView:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/8-5.png" alt="Custom List View" />

Done! <img src="http://vozforums.com/images/smilies/Off/adore.gif" alt=":adore:" />

Enjoy!<img src="http://vozforums.com/images/smilies/Off/beauty.gif" alt=":beauty:" />
<h2>C - Download Source Code Custom List View</h2>
<a href="http://www.mediafire.com/download.php?ktzucwzunnndbsh">http://www.mediafire.com/download.php?ktzucwzunnndbsh</a>
