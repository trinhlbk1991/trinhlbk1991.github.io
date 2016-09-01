---
layout: post
title:  Create Android Phone Gap Project
date: 2014-03-01 08:10
author: admin
comments: true
categories: [blog]
tags: [Hybrid, PhoneGap]
---

<h2>A - Brief Introduction</h2>
From phonegap.com
<blockquote>PhoneGap is an open source solution for building cross-platform mobile apps with standards-based Web technologies like HTML, JavaScript, CSS</blockquote>
To install PhoneGap, just follow all the instruction in below link:

<a href="http://phonegap.com/">http://phonegap.com</a>/

If you want to know more detail about Phone Gap? Just ask Mr.Google <img src="http://vozforums.com/images/smilies/Off/sexy_girl.gif" alt=":sexy:" />

<!--more-->
<h2>B - Create Android Phone Gap Project</h2>
I don't know if I was too stupid or not <img id="smilie_216" title="Beat Shot" src="http://vozforums.com/images/smilies/Off/beat_shot.gif" alt=":shot:" /> Cause I struggled almost a day on phonegap.com and I still didn't know how to create a Android Phone Gap project in eclipse <img id="smilie_216" title="Beat Shot" src="http://vozforums.com/images/smilies/Off/beat_shot.gif" alt=":shot:" />

I tried a little more and finally, I know how to create a project using command line <img id="smilie_251" title="Nosebleed" src="http://vozforums.com/images/smilies/Off/nosebleed.gif" alt=":nosebleed:" />

Not satisfy with that! Keep calm and ask Google! Tada!

I found it! And I decided to wrote this post to keep it in my blog for after use!<img id="smilie_206" title="Sweet Kiss" src="http://vozforums.com/images/smilies/Off/sweet_kiss.gif" alt=":*" />
<h3>1 - Create an Android project in Eclipse as normal</h3>
<img class="aligncenter" src="http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/html5/articles/getting-started-with-phonegap-in-eclipse-for-android/gs_pg_android_fig01.jpg" alt="Figure 1. Creating a new Android project." />
<h3>2 - Config project to use PhoneGap</h3>
First of all, create a folder named <strong>www</strong> in <strong>asserts</strong> - it will contains all html and javascipt files.

Copy the  PhoneGap library to the project:
<ul>
	<li>Copy<strong> cordova-2.3.0.js</strong> to <strong><kbd>assets/www</kbd> </strong>folder</li>
	<li>Copy <strong>cordova-2.3.0.jar</strong> to <strong><kbd>libs folder</kbd>
</strong></li>
	<li>Copy  <strong><kbd>xml</kbd> </strong>folder<strong> </strong>to <strong><kbd>res</kbd> </strong>folder</li>
</ul>
<img class="aligncenter" src="http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/html5/articles/getting-started-with-phonegap-in-eclipse-for-android/gs_pg_android_fig07.jpg" alt="Figure 7. Copied resources." />

<span style="line-height: 1.5em;">Add new an</span><strong style="line-height: 1.5em;"> index.html</strong><span style="line-height: 1.5em;"> file with the content like below to </span><strong style="line-height: 1.5em;">www</strong><span style="line-height: 1.5em;"> folder:</span>
<pre>&lt;!DOCTYPE HTML&gt; 
&lt;html&gt; 
  &lt;head&gt; 
    &lt;title&gt; 
      PhoneGap 
    &lt;/title&gt; 
    &lt;script type=<span style="color: maroon;">"text/javascript"</span> charset=<span style="color: maroon;">"utf-8"</span> src=<span style="color: maroon;">"cordova-1.5.0.js"</span>&gt; 
    &lt;/script&gt; 
  &lt;/head&gt; 
  &lt;body&gt; 
    &lt;h1&gt; 
      Hello PhoneGap 
    &lt;/h1&gt; 
  &lt;/body&gt; 
&lt;/html&gt;</pre>
<h3>3 - Update Activity class</h3>
Update the main Activity class like the instructions below:
<ul>
	<li>Extends <strong>DroidGap</strong></li>
	<li>Replace method <strong>setContentView()</strong> by <strong>super.loadUrl()</strong></li>
</ul>
<pre><span style="color: blue;">import</span> org.apache.cordova.DroidGap; 

<span style="color: blue;">public</span> <span style="color: blue;">class</span> MainMenu <span style="text-decoration: underline;"><strong><span style="color: blue; text-decoration: underline;">extends</span> DroidGap</strong></span> {

    @Override 
    <span style="color: blue;">public</span> <span style="color: blue;">void</span> onCreate(Bundle savedInstanceState) {
        <span style="color: blue;">super</span>.onCreate(savedInstanceState); 
        <span style="text-decoration: underline;"><strong><span style="color: blue; text-decoration: underline;">super</span>.loadUrl(<span style="color: maroon; text-decoration: underline;">"file:///android_asset/www/index.html"</span>);</strong></span> 
    } 

    @Override 
    <span style="color: blue;">public</span> <span style="color: blue;">boolean</span> onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main_menu, menu); 
        <span style="color: blue;">return</span> <span style="color: maroon;">true</span>; 
    } 
}</pre>
<h2>4 - Config AndroidManifest.xml</h2>
Add some lines to describe the supported screends:
<pre><span style="color: blue;">&lt;</span><span style="color: maroon;">supports-screens</span>
    <span style="color: red;">android:largeScreens</span>="<span style="color: blue;">true</span>" 
    <span style="color: red;">android:normalScreens</span>="<span style="color: blue;">true</span>" 
    <span style="color: red;">android:smallScreens</span>="<span style="color: blue;">true</span>" 
    <span style="color: red;">android:resizeable</span>="<span style="color: blue;">true</span>" 
    <span style="color: red;">android:anyDensity</span>="<span style="color: blue;">true</span>" 
    /<span style="color: blue;">&gt;</span></pre>
Add new some permissions (too much permissions<img id="smilie_251" style="line-height: 1.5em;" title="Nosebleed" src="http://vozforums.com/images/smilies/Off/nosebleed.gif" alt=":nosebleed:" /><span style="line-height: 1.5em;"> ):</span>
<pre><span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.CAMERA</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.VIBRATE</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.ACCESS_COARSE_LOCATION</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.ACCESS_FINE_LOCATION</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.ACCESS_LOCATION_EXTRA_COMMANDS</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.READ_PHONE_STATE</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.INTERNET</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.RECEIVE_SMS</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.RECORD_AUDIO</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.MODIFY_AUDIO_SETTINGS</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.READ_CONTACTS</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.WRITE_CONTACTS</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.WRITE_EXTERNAL_STORAGE</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.ACCESS_NETWORK_STATE</span>" /<span style="color: blue;">&gt;</span>  
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.GET_ACCOUNTS</span>" /<span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">uses-permission</span> <span style="color: red;">android:name</span>="<span style="color: blue;">android.permission.BROADCAST_STICKY</span>" /<span style="color: blue;">&gt;</span></pre>
Add the below attribute to the main activity tag:
<pre><span style="color: red;">android:configChanges</span>="<span style="color: blue;">orientation|keyboardHidden</span>"</pre>
Finally, add new an <strong>&lt;activity&gt;</strong> tag for <strong>org.apache.cordova.DroidGap</strong> class:<code>
</code>
<pre><span style="color: blue;">&lt;</span><span style="color: maroon;">activity</span>  
    <span style="color: red;">android:name</span>="<span style="color: blue;">org.apache.cordova.DroidGap</span>"  
    <span style="color: red;">android:label</span>="<span style="color: blue;">@string/app_name</span>"  
    <span style="color: red;">android:configChanges</span>="<span style="color: blue;">orientation|keyboardHidden</span>"<span style="color: blue;">&gt;</span>  
    <span style="color: blue;">&lt;</span><span style="color: maroon;">intent-filter</span><span style="color: blue;">&gt;</span><span style="color: blue;">&lt;</span>/<span style="color: maroon;">intent-filter</span><span style="color: blue;">&gt;</span>  
<span style="color: blue;">&lt;</span>/<span style="color: maroon;">activity</span><span style="color: blue;">&gt;</span></pre>
<h2>C - Enjoy the result</h2>
If you run the project and you got the below screen, Congrats! <img id="smilie_253" title="Byebye" src="http://vozforums.com/images/smilies/Off/byebye.gif" alt=":byebye:" />

<img class="aligncenter" src="http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/html5/articles/getting-started-with-phonegap-in-eclipse-for-android/gs_pg_android_fig12.jpg" alt="Figure 12. The application in the Android emulator." />The very first step to "play" with PhoneGap is done!

See ya!
