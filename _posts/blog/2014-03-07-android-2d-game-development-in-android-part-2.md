---
layout: post
title: 2D Game Development in Android – Part 2
date: 2014-03-07 10:04
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---

<h1 style="text-align: center;">PART 2: GAME FRAMEWORK - INTERFACE INPUT</h1>
<img class="aligncenter" src="http://pathfindersoftware.com/wp-content/uploads/Touch_screen.jpg" alt="" />
<h2>A - Introduction 2D Game Development in Android game framework</h2>
In 2D Game Development in Android, we are recommended to build a framework to simpleize the programming aspect and reuse in the next game projects.

Typically, a game framework consists of some common modules like:
<ul>
	<li><b>Window Management</b>: take responsibility for creating a window and handle all events like closing, pausing and resuming game</li>
	<li><b>Input</b>:  detect and handle all user's interaction like touch, key press, button press, accelerator,...</li>
	<li><b>File I/O</b>: allow game read/write data from resources</li>
	<li><b>Graphics</b>: init, load and draw all graphical elements on the screen</li>
	<li><b>Audio</b>: handle sound and music in game</li>
	<li><b>Game framework</b>: connect all above modules and provide a easy-to-use mechanism for implementation</li>
</ul>
<!--more-->
<h2>B - Game Framework module detail</h2>
<h3>I. Window Management</h3>
Window Management module takes responsibility for managing game state:
<ul>
	<li><b style="font-size: 14px; line-height: 1.5em;">Create</b><span style="font-size: 14px; line-height: 1.5em;">: called once when the game start (when the window created)</span></li>
	<li><b>Pause</b>: called when the game suspend because of some reasons (ex.income call, phone sleep...)</li>
	<li><b>Resume</b>: called when the game resume after suspend.</li>
</ul>
This module is not a specific class. It's in the same class with Game class (will be more detail later).
<h2>II. Input</h2>
<h3>1. Function</h3>
Input module will detect and handle all user's interaction to the game. All the information of user's interaction will be recorded in 2 ways:
<ul>
	<li><b>Polling</b>: Using this way, we can only check the current state of input devices. All the previous state will be not recorded. So <strong>Polling</strong> is usually used to check a single event (ex. touching a button) not for a sequence event (ex. user input text string).</li>
	<li><b>Event-based handling</b>: Record all the user's interaction state from the latest checking time. <strong>Event-based handling</strong> is usually used for checking a sequence event.</li>
</ul>
In Android, There're 3 main input ways: touchscreen, keyboard/ trackball and accelerometer.

We usually use <strong>Polling</strong> for checking accelerometer events and <strong>Event-based handling</strong> for 2 remaining input ways.
<h3>2. Touchscreen:</h3>
In <strong>Touchscreen </strong>handling, there're 3 main events:
<ul>
	<li><b>Touch down</b>: occurred when user touch the screen</li>
	<li><b>Touch drag</b>: occurred when user drag his finger/pen on the screen. <strong>Touch down </strong>event always occurred befor <strong>Touch drag</strong></li>
	<li><b>Touch up</b>: occurred when user lift his finger/pen off the screen</li>
</ul>
Each event has those information
<ul>
	<li>Touch location</li>
	<li>Touch index for identifying and tracking in multi-touch handling</li>
</ul>
<h3>3. Keyboard</h3>
With <strong>Keyboard</strong> event handling, there're 2 events you have to know:
<ul>
	<li><b>Key down</b>: occurred when a key was pressed</li>
	<li><b>Key up</b>: occurred when a key was released. It means that a <strong>Key up</strong> events is always followed by<strong> Key down</strong> event.</li>
</ul>
Both 2 above events contains the information about pressed Key code. However, the <strong>Key up</strong> event contains the value of actual return key code. In case of user pressing combining keys.
<h3>4. Accelerometer:</h3>
Last but not least is handling Accelerometer events. The value of this events contains 3 arguments {x, y, z} representing for the below 3D-dimension:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/acce.png" alt="acce" width="333" height="182" /></p>
The value of {x, y, z} is limited in the range from -max to max with max is the  maximum acceleration at current location (usually 9.8m/s if on the Earth).

The value of {x, y, z} can be calculated from the projection of gravity perpendicular to the axis system. For example, with the below figure, we have {x, y, z} = {0, 0, 9.8}.
<h3>5. Define Input interface</h3>
Define 2 classes:
<ul>
	<li><b>KeyEvent</b>: record type, keycode and Unicode code in case of <strong>KEY_UP</strong> type event</li>
	<li><b>TouchEvent</b>: record type, touch location and pointer for handling multi-touch event</li>
</ul>
Provide some methods to:
<ul>
	<li>Check what type of input event: <strong>isKeyPressed(), isTouchDown()</strong></li>
	<li>Get information of event: <strong>getTouchX(), getTouchY(), getAccelX(), getAccelY(), getAccelZ().</strong></li>
</ul>
<strong>KeyEvent</strong> class:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/1635846.png" alt="1635846" width="428" height="354" /></p>
<strong>TouchEvent </strong>class:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/54646.png" alt="54646" width="439" height="434" /></p>
<strong>Input</strong> interface:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/68468431.png" alt="68468431" width="385" height="329" /></p>

<h3>6. Implement Input interface</h3>
In this game framework, I want to handle multi-touch events so creating <strong>TouchHandler</strong> interface is necessary.

<img class="aligncenter size-full wp-image-976" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/686486.png" alt="686486" width="462" height="173" />

Code to handle single touch event <strong>SingleTouchHandler </strong>class:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/84846.png" alt="84846" width="600" height="1282" /></p>
Code to handle multi-touch event - <strong>MultiTouchHandler</strong> class:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/7542.png" alt="7542" width="600" height="1790" /></p>
<strong>KeyboardListener</strong>  class will take responsibility for handling keyboard input:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/9653.png" alt="9653" width="600" height="921" /></p>
<strong>AccelerometerHandler</strong> class will handle user's input with accelerometer:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/12456.png" alt="12456+" width="600" height="842" /></p>
Finally,  <strong>AndroidInput</strong> class  implements <strong>Input </strong>interface:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/1423.png" alt="1423" width="600" height="837" /></p>
<strong>Pool</strong> class takes responsibility for managing memories more effective than the Java's garbage collector:
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/35986.png" alt="35986" width="600" height="494" /></p>
The class diagram describing the relationships among all classes in <strong>Input</strong> module:

<img class="aligncenter size-full wp-image-988" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/aa.png" alt="aa" width="600" height="457" />

&nbsp;

This is the end for the second part of 2D Game Development in Android series.

In the final post of this series, I'll upload all the code of the game framework for anyone who needs.
<h2>2D Game Development in Android</h2>
<blockquote><a title="[Android] 2D Game Development in Android – Part 1" href="http://icetea09.com/blog/2014/03/06/2d-game-development-in-android-part-1/">Part 1</a>

<a title="[Android] 2D Game Development in Android – Part 2" href="http://icetea09.com/blog/2014/03/07/android-2d-game-development-in-android-part-2/">Part 2</a>

<a title="[Android] 2D Game Development in Android – Part 3" href="http://icetea09.com/blog/2014/03/10/android-lap-trinh-game-2d-tren-android-phan-3/">Part 3</a></blockquote>
&nbsp;
