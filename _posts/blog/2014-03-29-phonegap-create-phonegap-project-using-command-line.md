---
layout: post
title:  Create PhoneGap Project using Command Line
date: 2014-03-29 18:23
author: admin
comments: true
categories: [blog]
tags: [Hybrid, PhoneGap]
---

In the previous <a title="[PhoneGap] Create Android Phone Gap Project" href="http://icetea09.com/blog/2014/03/01/phonegap-tao-project-phonegap-android/" target="_blank">post</a>, I showed you how to create a PhoneGap project in Eclipse.

As you know, you have to do a lot of steps like copying files, add permissions,... It's quite complicated and easy to have mistake.

In this post, I'll show you how to create PhoneGap project using command line.

It's easier!

<!--more-->
<h2> 1. Install Cordova/ PhoneGap</h2>
First, make sure you update the latest version of <a href="http://nodejs.org/" target="_blank">Node.js</a>, if you haven't installed it yet, do it now!

Open Node.js cmd, and install the Cordova with following command:
<pre>npm install -g cordova</pre>
or
<pre>npm install -g phonegap</pre>
<h2>2. Create PhoneGap project using command line</h2>
Use <strong>cd</strong> command to navigate to the directory where you want to store your source code.

Create a project name HelloWorld using the following command:
<pre>cordova create HelloWorld ice.tea09.helloworld HelloWorld</pre>
With  <strong>ice.tea09.helloworld</strong> is your project's package name.
<h2>3. Add platforms</h2>
Navigate to the project folder using <strong>cd</strong> command:
<pre>cd HelloWorld</pre>
Use the following command to add the platforms you want to support:
<pre>cordova platforms add ios 
cordova platforms add android</pre>
<h2>4. Add plugins</h2>
Make sure that you're in the project folder.

Add the plugins you want to use with command:
<div>
<pre>cordova plugin add org.apache.cordova.device</pre>
</div>
<div>
<pre>cordova plugin add org.apache.cordova.console</pre>
</div>
<div>You can go to <a href="http://cordova.apache.org/docs/en/3.3.0/index.html" target="_blank">http://cordova.apache.org/docs/en/3.3.0/index.html</a> to know more about Cordova/ PhoneGap plugins.</div>
<h2>5. Build project</h2>
<div>To build an Android project, you must have the Android SDK installed in your computer.</div>
<div>To build a project and run it on a device connected to your computer:</div>
<pre>cordova run android</pre>
To build a project and run it on a emulator
<pre>cordova emulate android</pre>
Done! :)
