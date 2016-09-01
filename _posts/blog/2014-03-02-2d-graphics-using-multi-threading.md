---
layout: post
title:  2D Graphics using Multi-threading
date: 2014-03-02 09:51
author: trinh_le
comments: true
categories: [blog]
tags: [Android]
---

<h2>A - Introduction Multi-threading</h2>
To a game developer, Multi-threading is a must-know term.

Multi-threading is used when your application needs to do a lot tasks parallely. By this way, all the tasks will run parallely and don't have to wait for the others finished.
<h2>B - <a title="[Android] 2D Graphic in Android" href="http://icetea09.com/blog/2014/01/28/2d-graphic-in-android/">2D Graphics</a> using Multi-threading Demo description</h2>
The application will draw a moving green ball on the screen.

When user tap on the ball when it's moving, It'll stop and vice versa.

In this demo, there're 2 thread run parallely:
<ul>
	<li>One will calculate the position and draw to canvas</li>
	<li>One will detect the tap event and handle it</li>
</ul>
<!--more-->
<h2>C - Demo implementation</h2>
Firstly, create <strong>GameView</strong> class:
<ul>
	<li>Extends from  <a title="[Android] 2D Graphic in Android" href="http://icetea09.com/blog/2014/01/28/2d-graphic-in-android/"><strong>SurfaceView</strong> </a>class</li>
	<li>Implements <strong>SurfaceHolder.Callback </strong>method</li>
	<li>Override all the methods <strong>surfaceChanged()</strong>, <strong>surfaceCreated()</strong>, <strong>surfaceDestroyed()</strong></li>
	<li>Override  <strong>onTouchEvent()</strong> method to "catch" the event then call the <strong>doTouch()</strong> method of <strong>GameThread</strong> to handle it.</li>
</ul>
<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/2-6.png" alt="" />

As you can see, <strong>GameView</strong> is the screen where the "green ball" moving. <strong>GameView</strong> will also catch all the user interactions event.

Hence, we cannot let the <strong>GameView</strong> take responsibility for calculating and drawing the green ball --&gt; We need to create a new Thread to handle it!

&nbsp;

Create  <strong>GameThread</strong> class:
<ul>
	<li>Extends <strong>Thread</strong>.</li>
	<li>private SurfaceHolder holder : this variable reference to <strong>GameView, </strong>used to display the green ball.</li>
	<li>run(): used to draw the green ball on the <strong>GameView</strong>.</li>
	<li>doTouch(): do some logical calculation when user touch the ball.</li>
</ul>
<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/3-5.png" alt="" />

Finally, in MainActivity, call <strong> setContentView(new GameView(this, null))</strong>

Enjoy the result:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/1-5.png" alt="" />
<h2>D - Download Source Code</h2>
<a href="http://www.mediafire.com/download.php?8nca1ra07nwp554">http://www.mediafire.com/download.php?8nca1ra07nwp554</a>
