---
layout: post
title: Save Data To File
date: 2014-03-04 09:34
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---


Storing application data is one of the most important part in Android development. And the easiest way to do that is saving data to a file.

In this post, I will show you how to save and read data to/ from a file in Android.
<h2>A - Save data to file</h2>
1. First of all, call the <strong>FileOutputStream openFileOutput(String name, int mode)</strong> method to create a <strong>FileOutputStream</strong> object. This object will take responsibility to write data to a file.
<ul>
	<li>name: The name of file</li>
	<li>mode: Writting mode
<ul>
	<li><strong>MODE_PRIVATE</strong> : That file only  can be accessed by the application which created it</li>
	<li><strong>MODE_WORLD_READALBE</strong> : That file can be read by any application</li>
	<li><strong>MODE_WORLD_WRITEABLE</strong> : That file can be read and written by any application</li>
</ul>
</li>
</ul>
<!--more-->

2. To write data file, call the <strong>FileOutputStream.write()</strong> method.

3. After you saving all data to file, call <strong>FileOutputStream.close()</strong> method to close the output stream and finish the task.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/1-10.jpg" alt="" />
<h2>B - Read data from file</h2>
Reading data from a file is very similar to writing data.

1. First, call the FileInputStream openFileInput(String name) method to create a FileInputStream object. This one will handle all tasks that related to reading data from a file.
<ul>
	<li>name: The file name you want to read data from</li>
</ul>
2. Call the FileInputStream.read() method to read all data from that file.

3. Finally, call the FileInputStream.close() method to close the input stream after the reading task completed.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/2-12.jpg" alt="" />

Below is the demo application for this post:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/3-11.jpg" alt="" />

When user hit the Save button, the application will save the text in EditText to file in device.

And when the Load button was hit, it will load all data from file to TextView on the screen.
<h2>C - Download source code</h2>
<a href="http://www.mediafire.com/?mb6amzm2kta8s4w">http://www.mediafire.com/?mb6amzm2kta8s4w</a>
