---
layout: post
title: 2D Game Development in Android – Part 3
date: 2014-03-10 09:19
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---

<h1 style="text-align: center;">PART 3: GAME FRAMEWORK (cont.)</h1>
<h2>II. File I/O</h2>
<strong>1. Function</strong>

This module will help your game read data from/ save data to files. It's quite useful when you want to save game settings, game state or high scores,....

<strong>2. Define FileIO interface</strong>

The <strong>readAsset()</strong> method will read data from files in game's APK file.

The <strong>readFile()</strong> and <strong>writeFile()</strong> methods will read and write data from/ to files on phone storage.

<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/11.png"><img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/11.png" alt="1" width="576" height="125" /></a>

<!--more-->

<strong>3. Implement FileIO interface</strong>

Create <strong>AndroidFileIO</strong> class that implements <strong>FileIO</strong> interface:
<p style="text-align: center;"><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/2.png"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/2.png" alt="2" width="600" height="419" /></a></p>
<p style="text-align: left;"><strong>4. Class diagram</strong></p>
<p style="text-align: left;"><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/fileio.png"><img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/fileio.png" alt="fileio" width="444" height="193" /></a></p>

<h3 style="text-align: left;">III. Audio</h3>
<strong>1. Function</strong>

In 2D Game Development in Android,  The Audio module must have the ability to handle those tasks:
<ul>
	<li>Get sound/ music from the game resource</li>
	<li>Handle the using game sound</li>
</ul>
<strong>2. Define Audio interface</strong>
<p style="text-align: center;"><strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/13.png"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/13.png" alt="13" width="381" height="104" /></a></strong></p>
The <strong>Audio</strong> interface has the responsibility to create 2 instances of <strong>Music</strong> and <strong>Sound</strong>. Each instance of <strong>Music</strong> class represents for an sound file and each instance of <strong>Sound</strong> represents for a short effect sound file.
<p style="text-align: center;"><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/8946.png"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/8946.png" alt="8946" width="293" height="93" /></a></p>
<p style="text-align: center;">---</p>
<p style="text-align: center;"><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/12545.png"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/12545.png" alt="12545" width="369" height="326" /></a></p>
Both <strong>newMusic()</strong> and <strong>newSound()</strong> methods have the input argument is file name and will throw an <strong>IOException</strong> in case of fail loading file.

Music interface has some additional methods like <strong>play()</strong>, <strong>pause()</strong>, <strong>stop(), setLooping(), setVolume(),...</strong>

The Sound interface provides <strong>play()</strong> method with the input argument is the volume when play sound.

The<strong> dispose()</strong> methods in both classes is used when you want to destroy the unused audios.

<strong>3. Implement Audio interface</strong>

The <strong>AndroidAudio</strong> class implements <strong>Audio</strong> interface:

<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/89562.png"><img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/89562.png" alt="89562" width="600" height="456" /></a>

The <strong>AndroidMusic</strong> class implements <strong>Music</strong> interface

<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/8456.png"><img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/8456.png" alt="8456" width="600" height="988" /></a>

The <strong>AndroidSound</strong> class implements <strong>Sound</strong> interface

<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/124.png"><img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/124.png" alt="124" width="493" height="341" /></a>

<strong>4. Class diagram</strong>

<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/audio.png"><img class="aligncenter size-full wp-image-1010" src="http://trinhle.icetea09.com/wp-content/uploads/2013/01/audio.png" alt="audio" width="600" height="488" /></a> <a href="http://trinhle.icetea09.com/wp-content/uploads/2013/01/fileio.png">
</a>
<h2>2D Game Development in Android series</h2>
<blockquote><a title="[Android] 2D Game Development in Android – Part 1" href="http://icetea09.com/blog/2014/03/06/2d-game-development-in-android-part-1/">Part 1</a>

<a title="[Android] 2D Game Development in Android – Part 2" href="http://icetea09.com/blog/2014/03/07/android-2d-game-development-in-android-part-2/">Part 2</a></blockquote>
