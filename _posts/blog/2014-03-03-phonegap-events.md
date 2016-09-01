---
layout: post
title:  Events in PhoneGap
date: 2014-03-03 07:28
author: admin
comments: true
categories: [blog]
tags: [Hybrid, PhoneGap]
---

<h2>A. What is Events in PhoneGap?</h2>
Events are any kind of actions which can be detected by PhoneGap (ex. pressing Back button, Menu button, Home button,...)

Simple right? <img id="smilie_261" style="font-size: 14px; line-height: 1.5em;" title="Nose Bleedding" src="http://vozforums.com/images/smilies/Off/nosebleed.gif" alt=":chaymau:" />
<h2>B. Using Event Listener in PhoneGap</h2>
It's quite easy to use Event Listener in PhoneGap:
<ol>
	<li>Add Event Listener of the event you want to handle</li>
	<li>Implement the function method when the event was triggered</li>
</ol>
<!--more-->

&nbsp;
<pre>&lt;!DOCTYPE HTML&gt; 
&lt;html&gt; 
 &lt;head&gt; 
  &lt;title&gt;PhoneGap&lt;/title&gt; 
  &lt;script type=<span style="color: maroon;">"text/javascript"</span> charset=<span style="color: maroon;">"utf-8"</span> src=<span style="color: maroon;">"cordova-2.3.0.js"</span>&gt;&lt;/script&gt; 
  &lt;script type=<span style="color: maroon;">"text/javascript"</span> charset=<span style="color: maroon;">"utf-8"</span>&gt; 
    <strong><span style="text-decoration: underline;">document.addEventListener(<span style="color: maroon; text-decoration: underline;">"deviceready"</span>, onDeviceReady, <span style="color: maroon; text-decoration: underline;">false</span>);</span></strong> 

    <em><strong><span style="text-decoration: underline;">function onDeviceReady(){</span> 
         <span style="color: green;">//Implement the function method here    </span> 
    <span style="text-decoration: underline;">} </span></strong> </em>   
  &lt;/script&gt; 
 &lt;/head&gt; 

 &lt;body&gt; 
    &lt;h1&gt;Hello PhoneGap&lt;/h1&gt; 
 &lt;/body&gt; 
&lt;/html&gt;</pre>
Very easy, right? <img id="smilie_224" style="font-size: 14px; line-height: 1.5em;" title="Beauty" src="http://vozforums.com/images/smilies/Off/beauty.gif" alt=":beauty:" />
<h2>C. Types of Event in PhoneGap</h2>
<table>
<tbody>
<tr>
<td>deviceready</td>
<td>Used to detect when the device is ready. This is the most important event in PhoneGap (used to register other events)</td>
</tr>
<tr>
<td>pause</td>
<td>Used to detect when the application turn into Pause state</td>
</tr>
<tr>
<td>resume</td>
<td>Used to detect when the application resume from pause state</td>
</tr>
<tr>
<td>menubutton</td>
<td>Used to detect when user press the Menu button (only for Android devices)</td>
</tr>
<tr>
<td>searchbutton</td>
<td>Used to detect when user press the Search button (only for Android devices)</td>
</tr>
<tr>
<td>backbutton</td>
<td>Used to detect when user press the Back button (only for Android devices)</td>
</tr>
<tr>
<td>online</td>
<td>Used to detect when the device connected to the Internet</td>
</tr>
<tr>
<td>offline</td>
<td>Used to detect when the device has no Internet connection</td>
</tr>
</tbody>
</table>
&nbsp;
<h2>D. Demo</h2>
In this demo, I only code on ONE html file. In reality, you can slit your project into several files for easy management.

This demo application implements <strong>deviceready</strong>, <strong>pause</strong>, <strong>resume</strong>, <strong>searchbutton</strong>, <strong>menubutton</strong> and <strong>backbutton</strong> events by showing alert dialog for each event.
<pre>&lt;!DOCTYPE HTML&gt; 
&lt;html&gt; 
 &lt;head&gt; 
  &lt;title&gt;PhoneGap&lt;/title&gt; 
  &lt;script type=<span style="color: maroon;">"text/javascript"</span> charset=<span style="color: maroon;">"utf-8"</span> src=<span style="color: maroon;">"cordova-2.3.0.js"</span>&gt;&lt;/script&gt; 
  &lt;script type=<span style="color: maroon;">"text/javascript"</span> charset=<span style="color: maroon;">"utf-8"</span>&gt; 
    document.addEventListener(<span style="color: maroon;">"deviceready"</span>, onDeviceReady, <span style="color: maroon;">false</span>); 

    function onDeviceReady(){ 
        document.addEventListener(<span style="color: maroon;">"pause"</span>, onPause, <span style="color: maroon;">false</span>); 
        document.addEventListener(<span style="color: maroon;">"resume"</span>, onResume, <span style="color: maroon;">false</span>); 
        document.addEventListener(<span style="color: maroon;">"searchbutton"</span>, onSearch, <span style="color: maroon;">false</span>); 
        document.addEventListener(<span style="color: maroon;">"menubutton"</span>, onMenuButton, <span style="color: maroon;">false</span>); 
        document.addEventListener(<span style="color: maroon;">"backbutton"</span>, onBackButton, <span style="color: maroon;">false</span>); 
    } 

    function onPause(){ 
        alert(<span style="color: maroon;">"Paused!"</span>); 
    } 

    function onResume(){ 
        alert(<span style="color: maroon;">"Resumed!"</span>); 
    } 

    function onSearch(){ 
        alert(<span style="color: maroon;">"You hit search button!"</span>); 
    } 

    function onMenuButton(){ 
        alert(<span style="color: maroon;">"You hit menu button!"</span>); 
    } 

    function onBackButton(){ 
        alert(<span style="color: maroon;">"You hit back button!"</span>); 
    } 
  &lt;/script&gt; 
 &lt;/head&gt; 

 &lt;body&gt; 
    &lt;h1&gt;Hello PhoneGap&lt;/h1&gt; 
 &lt;/body&gt; 
&lt;/html&gt;</pre>
Final result :)
<h2><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/12.jpg"><img class="aligncenter size-full wp-image-1105" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/12.jpg" alt="1" width="333" height="503" /></a>E. Note</h2>
Recommend to register other events in <strong>deviceready</strong> event.
