---
title: "ListView Dialog"
date: 2014-02-11
categories: ["android"]
tags: ["Custom View","Android UI","Dialog"]
toc: true
comments: true
---

First of all, I'll show you the result of this post to give you some motivation <img title="Beauty" src="http://vozforums.com/images/smilies/Off/beauty.gif" alt=":beauty:" />

<img src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/2-11.png" alt="ListView Dialog" /> <img src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/1-9.png" alt="ListView Dialog" />

As usual, you need to create the layout in <strong>main.xml </strong>file

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/3-10.png" alt="ListView Dialog" />

<!--more-->

Create layout for your <a title="[Android] Custom List View" href="http://icetea09.com/blog/2014/02/07/android-custom-list-view/">List View</a> Dialog <strong>my_list.xml</strong>

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/4-9.png" alt="ListView Dialog" />

Coding time!<img title="Adore" src="http://vozforums.com/images/smilies/Off/adore.gif" alt=":adore:" />

In the  <strong>onCreate </strong>method, we need to:
<ul>
	<li>Load all the components and controls in the  <strong>main.xml</strong> layout.</li>
</ul>
<ul>
	<li>Create an <strong>AlertDialog</strong> object which has all the controls in <strong>my_list.xml  </strong>layout:</li>
</ul>
<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/5-8.png" alt="ListView Dialog" />
<ul>
	<li>Next, we create a List to store all items which will be shown in the List View Dialog</li>
	<li>Load the ListView object via <strong>my_list.xml</strong> file</li>
	<li>Create an adapter to hold all list items and set to the ListView</li>
	<li>Finally, handle <strong>OnItemClick</strong> of ListView:</li>
</ul>
<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/6-7.png" alt="" />

Last but not least, implement <strong>onClick </strong>method to show List View Dialog:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/7-6.png" alt="" />

Done! <img title="Adore" src="http://vozforums.com/images/smilies/Off/adore.gif" alt=":adore:" />
<h2>Download Source Code ListView Dialog</h2>
<a href="http://www.mediafire.com/download.php?ukabzztwsawfsw5">http://www.mediafire.com/download.php?ukabzztwsawfsw5</a>