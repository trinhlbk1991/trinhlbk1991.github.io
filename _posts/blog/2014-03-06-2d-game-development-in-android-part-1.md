---
layout: post
title: 2D Game Development in Android - Part 1
date: 2014-03-06 11:40
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---

<h2>A - Forewords</h2>
In the 3rd year in university, I had an project about "2D Game Development on Android" and I made a tower defense game called "The Secret of Spiral Fortress".

<img class="alignnone size-medium wp-image-1148 aligncenter" src="http://icetea09.com/wp-content/uploads/2013/01/1-300x180.png" alt="2D Game Development on Android" width="500" />

So I decided to write a series about this topic to share to all you guys.

All the post in this series will provide the very common and general knowledge about 2D game programming in Android. If you want to study more about advance skills, you should take a look at some other sites or books. :)

And below is the book which I referred for my project and this series

<a href="http://www.mediafire.com/view/?un85wn2ujmc8m5m">Beginning  Android 4 Game Development</a>

Now, let's get it started!

<!--more-->
<h1 style="text-align: center;">PART 1: 2D GAME DEVELOPMENT IN ANDROID OVERVIEW</h1>
<h2 style="text-align: left;">A - Game loop</h2>
Game loop is a "must-known" term in game development. It's the backbone of a game and take responsibility for update game logic, update game graphics and handle every other things.

Game loop flowchart:
<p style="text-align: center;"><img class="alignnone size-medium wp-image-1149" src="http://icetea09.com/wp-content/uploads/2013/01/vonglapgae-300x289.png" alt="2D Game Development in Android" width="500" /></p>
<strong>Init</strong>: allocate memories for game

<strong>Load resources:</strong> load all needed resources for game (ex. sprites, textures, sounds,...)

<b>Read user's input: </b>detect and handle all user's interaction (ex. touch, tilt, button press,...)

<b>Update: </b>update game logic base on game state (ex. user's input, game time,...)

<b>Draw: </b>display all game elements to the screen

<b>Dispose resources: </b>dispose all game resources when not use anymore.
<h2>B - Surface View</h2>
To understand more about Surface View, please read 2 posts below:
<ul>
	<li><a title="[Android] 2D Graphic in Android" href="http://icetea09.com/blog/2014/01/28/2d-graphic-in-android/">2D Graphics in Android</a></li>
	<li><a title="[Android] 2D Graphic in Android" href="http://icetea09.com/blog/2014/01/28/2d-graphic-in-android/">2D Graphics using Multi-threading</a></li>
</ul>
<h2>C - Deal with multi-size and multi-resolution screen Android devices</h2>
In Android game development, we have to deal with a very big problem!

That is Android devices have so many screen size and screen resolution from 320 x 480 to  960 x 720 and more than that!

That means the UI can be broken if you're not good and careful at designing!

To me, I used below technique to resolve this problem:
<blockquote>Firstly, create a buffer with desired size (ex. 800x480). Then, draw everything you want (actually, your game wants!) on this buffer.

Finally, draw that buffer on the Surface View via calling <strong>canvas.drawBitmap()</strong> method. From now on, the Surface View will take care everything about scaling bitmap for you!<span style="font-size: 14px; line-height: 1.5em;"> </span></blockquote>
<h2>D - Texture and Sprite</h2>
<h3>1. Texture Atlas</h3>
In game development, we usually combine all separated images into one bigger file (like the image below). When you want to draw an image, just specify its location in the big image. This way will help save a lot of costs in loading images. Ant that "big image file" called<strong> Texture Atlas</strong>.
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/fireemblemrekkanoken_dart_sheet.png" alt="fireemblemrekkanoken_dart_sheet" width="284" height="216" /></p>

<h3>2. Texture regions</h3>
<strong>Texture regions</strong> is a rectangle location on the Texture Atlas. It's used to specify the location you want to draw.
<h3>3. Sprite</h3>
There're a lot of definition about <b>sprite. </b>You can understand that <strong>sprite </strong>is a sequence of images that was drawn and update continuously. That will make you feel that the image is moving.

&nbsp;

The very first part ends with tons of theory about game development!

Next part, I will go straight to the main topic: "How to build a game framework" to reuse :)
<h2>2D Game Development in Android Series<em>
</em></h2>
<blockquote><a title="[Android] 2D Game Development in Android – Part 1" href="http://icetea09.com/blog/2014/03/06/2d-game-development-in-android-part-1/">Part 1</a>

<a title="[Android] 2D Game Development in Android – Part 2" href="http://icetea09.com/blog/2014/03/07/android-2d-game-development-in-android-part-2/">Part 2</a>

<a title="[Android] 2D Game Development in Android – Part 3" href="http://icetea09.com/blog/2014/03/10/android-lap-trinh-game-2d-tren-android-phan-3/">Part 3</a></blockquote>
