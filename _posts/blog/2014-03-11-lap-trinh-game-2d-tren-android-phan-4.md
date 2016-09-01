---
layout: post
title: 2D Game Development in Android - Part 4
date: 2014-03-11 09:24
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---


<h1 style="text-align: center;">PART 4: GAME FRAMEWORK (cont.)</h1>
<h2>IV. Graphics</h2>
<h3>1. Function</h3>
The Graphics module can handle all functions like:
<ul>
	<li>Load images from game resources and store in memory for drawing later</li>
	<li>Clear frame buffer by any color</li>
	<li>Set any color to any pixel in the frame buffer</li>
	<li>Draw lines, rectangles, triangles, circles on the frame buffer</li>
	<li>Draw all or a part of a loaded image</li>
	<li>Return the frame buffer's size</li>
</ul>
<h3><!--more--></h3>
<h3>2. Define Graphics interface</h3>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/02/1.png"><img class="aligncenter size-full wp-image-1016" src="http://trinhle.icetea09.com/wp-content/uploads/2013/02/1.png" alt="1" width="465" height="253" /></a>

In the <strong>Graphics</strong> interface, there's an enum called <strong>PixmapFormat</strong>. This enum will define, specify all supported pixel format (ARGB4444, ARGB8888, RGB565).

Some methods:
<ul>
	<li><strong>newPixmap():</strong> get images from disk with supported formats (JPEG, PNG)</li>
	<li><strong>clear():</strong> clear the frame buffer with specified color</li>
	<li><strong>drawPixel():</strong> set color for an specific pixel</li>
	<li><strong>drawLine():</strong> draw a line connected 2 specific points with a specific color</li>
	<li><strong>drawPixmap():</strong> draw a Pixmap on the frame buffer at a specific location</li>
	<li><strong>drawText():</strong> draw a text string</li>
	<li><strong>drawCircle():</strong> draw a circle with specific radius, color and location</li>
	<li><strong>getWidth(), getHeight():</strong> return the width and height of the frame buffer</li>
</ul>
Some methods in the <strong>Pixmap</strong> interface:
<ul>
	<li><strong>getWidth(), getHeight():</strong> return width and height of the Pixmap</li>
	<li><strong>getFormat()</strong>: return Pixmap format (<strong>PixmapFormat</strong> enum)</li>
	<li><strong>dispose()</strong>: destroy a Pixmap instance, release memory</li>
</ul>
<h3>3. Implement Graphics interface</h3>
The <strong>AndroidGraphics</strong> class implements <strong>Graphics</strong> interface and the <strong>AndroidPixmap</strong> class implements the <strong>Pixmap</strong> interface:

<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/02/2.png"><img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/02/2.png" alt="2" width="600" height="512" /></a>

As you can see on the class diagram, AndroidFastRenderView  class extends SurfaceView and implements Runnable interface.

The main functions of AndroidFastRenderView are:
<ul>
	<li>Hold a reference to Game interface instance to get the current game screen.</li>
	<li>Have a thread to handle game loop: call <strong>Screen.update()</strong> and <strong>Screen.present()</strong> in every loop.</li>
	<li>Track the actual interval time between 2 frames  and pass it to the current screen.</li>
</ul>
<h2>V. Game Framework</h2>
<h3>1. Function</h3>
After finish all the previous modules, now it's time to make your game come real! :))

First of all, list all the task your game have to do:
<ul>
	<li>Game has several screens. All the screens have some common tasks: read user interactions, update game state base on user input, change the screen presentation...</li>
	<li>All the game screens mus be managed by some how! It means the screen must be trackable and can navigate to another screen easily!</li>
	<li>Game screens can access to other modules (audio, graphics, input,...) for demand</li>
	<li>Everything in your game will change continuously and must be updated instantly. It can be done in game loop. The game loop will stop when the game is over.  A iteration called a "<em>frame</em>". The number of frames in a second (FPS) called "<em>frame rate</em>"</li>
	<li>About time frame, read a later part for  more detail.</li>
	<li>Game must manage the current state of all screens and inform for the current screen about those states</li>
</ul>
<h3>2. Define Game and Screen interfaces</h3>
<p style="text-align: center;"><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/02/3.png"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/02/3.png" alt="3" width="371" height="166" /></a></p>
An instance of a Game interface must have capability to:
<ul>
	<li>Starts the game loop</li>
	<li>Tracks the current screen state and update game state in every game loop iteraction</li>
	<li>Handles all the window events (pause, resume,...) appropriately</li>
	<li>Has the permission to access all other modules (input, fileIO, graphics, audio,...)</li>
</ul>
With those required tasks, beside some methods that return instance of modules, we have some additional methods:
<ul>
	<li><strong>setScreen()</strong>: set the current screen</li>
	<li><strong>getCurrenScreen():</strong> return the current screen</li>
	<li><strong>getStartScreen()</strong>: return the start game screen</li>
</ul>
<strong>Screen</strong> interface's constructor has an argument is an <strong>Game</strong> instance. That can do some critical tasks like:
<ul>
	<li>Get the permission to access all modules</li>
	<li>Set any screen to current screen on demand</li>
</ul>
Screen interface has 2 important methods:
<ul>
	<li><strong>update()</strong>: handle all game logic</li>
	<li><strong>present()</strong>: draw all game elements to the screen</li>
</ul>
<h3>3. Movement that not depend on frame</h3>
For example, our game update is:
<div>
<pre><span style="color: blue;">public</span> <span style="color: blue;">void</span> update(<span style="color: blue;">float</span> deltaTime) {

    x += <span style="color: maroon;">1</span>; 

    <span style="color: blue;">if</span> (x &gt; <span style="color: maroon;">100</span>) 

        x = <span style="color: maroon;">0</span>; 

}</pre>
</div>
With a device can run game with 60 FPS, it takes 1 second to reach the (60,0) point. Meanwhile, with a lower device can only run game with 30 FPS, it takes 2 seconds to read that point! As you can see, the 60 FPS device run the game twice faster than the 30 FPS device. And it's not good!

The resolution for this problem is "<em>movement that not depend on frame</em>" technique.

Instead of adding 1 more pixel in every game loop iteration. We add the velocity of the object in every second. For example, if you want to move the object 50 pixel per second, the update will be:
<div>
<pre><span style="color: blue;">public</span> <span style="color: blue;">void</span> update(<span style="color: blue;">float</span> deltaTime) {

    x += <span style="color: maroon;">50</span> * deltaTime; 

    <span style="color: blue;">if</span> (x &gt; <span style="color: maroon;">100</span>) 

        x = <span style="color: maroon;">0</span>; 

}</pre>
</div>
Explanation:
<ul>
	<li>With 60 FPS device: deltaTime = 1/60(s), every update iteration: 50*1/60=5/6(pixel). Hence, in a second we have 5/6*60=50px</li>
	<li>With 30FPS device: deltaTime = 1/30(s), every update iteraction: 50*1/30 =5/3(pixel). Hence, in a second we have 5/3*30=50px</li>
</ul>

<h3>4. Implement Game interface</h3>
The <strong>AndroidGame</strong> class implements <strong>Game</strong> interface:
<p style="text-align: center;"><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/02/4.png"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/02/4.png" alt="4" width="508" height="388" /></a></p>
The main purpose of <strong>AndroidGame</strong> class:
<ul>
	<li>Do all the tasks of Windows Management (setting for Activity and instance of AndroidFastRenderView, handle Activity life cycle clearly)</li>
	<li>Setting WAKELOCK to prevent device from sleeping state</li>
	<li>Create and provide references to other modules</li>
</ul>
When use, you must create a class extends AndroidGame and override the  Game.getStartScreen() method to start the game!
<h2>VI. Source code 2D Game Development in Android game framework</h2>
Finally, we have the completed game frame work to make and 2D game on Android.

You can download the full source code with the link below:

<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fc2RXZFhuWU5kQ1E/edit?usp=sharing">https://drive.google.com/file/d/0Bw3dwdSezn6fc2RXZFhuWU5kQ1E/edit?usp=sharing</a>
<h2></h2>
<h2>Series 2D Game Development in Android</h2>
<blockquote><a title="[Android] 2D Game Development in Android – Part 1" href="http://icetea09.com/blog/2014/03/06/2d-game-development-in-android-part-1/">Part 1</a>

<a title="[Android] 2D Game Development in Android – Part 2" href="http://icetea09.com/blog/2014/03/07/android-2d-game-development-in-android-part-2/">Part 2</a>

<a title="[Android] 2D Game Development in Android – Part 3" href="http://icetea09.com/blog/2014/03/10/android-lap-trinh-game-2d-tren-android-phan-3/">Part 3</a>

<a title="[Android] 2D Game Development in Android – Part 4" href="http://icetea09.com/blog/2014/03/11/lap-trinh-game-2d-tren-android-phan-4/">Part 4</a></blockquote>
