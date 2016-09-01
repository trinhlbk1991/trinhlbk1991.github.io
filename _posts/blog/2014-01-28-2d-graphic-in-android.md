---
layout: post
title:  2D Graphic in Android
date: 2014-01-28 13:21
author: trinh_le
comments: true
categories: [blog]
tags: [Android]
---


<h2>I - Introduction 2D Graphic in Android</h2>
In Android, to draw anything you always need 4 basic components:
<ul>
	<li>An object type Bitmap to hold all the pixels you need to draw</li>
	<li>An object hold all the drawing stroke (Rect, Path, Bitmap,...)</li>
	<li>An object type Paint to define the color, style for your result</li>
	<li>An object type Canvas to operate drawing command</li>
</ul>
<!--more-->
<h2>II - Demo using CustomView</h2>
The demo below will show you how to implement 2D graphic in Android.

Firstly, create new a <strong>CustomView</strong> class that extends from <strong>View</strong> class.

We re-implement the constructor and override <strong>onDraw()</strong> method of <strong>View</strong> class, this method will take responsibility to draw the UI for <strong>CustomView</strong>.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/1-12.png" alt="2D Graphic in Android" />

As you can see in the code above, in <strong>onDraw()</strong> method, we create an <strong>Paint</strong> object and define the color property by <strong>setColor()</strong> method. After that, we add a circle in to the <strong>Path</strong> object using <strong>addCircle()</strong> method and finally we use the <strong>Canvas</strong> object to draw it on the view.

In the <strong>MainActivity</strong>, we update the content of <strong>setContentView()</strong> method with the input paramether is an <strong>CustomView </strong>object.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/2-14.png" alt="2D Graphic in Android" />

Note:

Beside adding <strong>CustomView</strong> programmatically, we can do that by updating <strong>main.xml</strong> file. We can using <strong>CustomView</strong> as an normal control in Android.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/3-13.png" alt="2D Graphic in Android" />

Don't forget to update <strong>setContentView()</strong> method in the <strong>MainActivity
</strong>class:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/4-11.png" alt="2D Graphic in Android" />

The final result after running the application:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/5-10.png" alt="2D Graphic in Android" />

Finally, You get the expected <strong>CustomView</strong>!

Beside drawing some simple shapes like circle, rectangle, oval, line,... we can draw the custom images.

To do that, firstly, we need to create an <strong>Bitmap</strong> object to hold all the pixels:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/6-9.png" alt="2D Graphic in Android" />

The Bitmap object is a kind of memory manager or file type format to save digital images. It's a 2 dimensions array which each its item will hold a RGB color value - equals to a pixel of the image.

We can use <strong>BitmapFactory.decodeResource()</strong> method to create a <strong>Bitmap</strong> object from a image file in <strong>drawable</strong> folder.

Below is the result after running the application:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/8-7.png" alt="2D Graphic in Android" />

So... It's done for basic 2D graphic in Android! :D
<h2>III - Download Source Code</h2>
<a href="http://www.mediafire.com/download.php?5828zpzp49i9q9a">http://www.mediafire.com/download.php?5828zpzp49i9q9a</a>
