---
layout: post
title:  Parse JSON in JavaScript
date: 2014-04-30 14:25
author: trinh_le
comments: true
categories: [blog]
tags: [JavaScript]
---

In the previous post ( <a title="[Android] Parse JSON in Android" href="http://icetea09.com/blog/2014/04/02/android-parse-json-android/">[Android] Parse JSON in Android</a> ), I showed how to get the JSON string from server and parse it into desired object using Java. This time, in this tutorial, I'll parse JSON in JavaScript. This can be applied when you develop an mobile application using PhoneGap.

<!--more-->
<h2 class="entry-title">A - jQuery.getJSON() method</h2>
JQuery provides a method call <strong>getJSON()</strong> to load the JSON encoded data from server using GET method.

Syntax:
<pre>jQuery.getJSON( url [, data ] [, success( data, textStatus, jqXHR ) ] )</pre>
<ul>
	<li> <strong>url</strong>: the string contains URL to call web service</li>
	<li><strong>data</strong>: the data you want to send to server (plain object or string format)</li>
	<li><strong>success</strong>: the callback function that will execute when request succeeds</li>
</ul>
The getJSON() method above is equivalent to below ajax method:
<pre>$.ajax({ 
  dataType: <span style="color: maroon;">"json"</span>, 
  url: url, 
  data: data, 
  success: success 
});</pre>
<strong> Remember to enconde all the data before submit to server side. Because they will be appended to the URL string.</strong>
<h2>B - Parse JSON in JavaScript demo</h2>
About the appearance, this demo is one HTML page with only one button - <strong>Demo getJSON()</strong>

When you click on the button, it'll show the result. Simple, right?
<pre class="lang:default decode:true ">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt; 
&lt;html&gt; 
&lt;head&gt; 
    &lt;meta content="text/html;charset=utf-8" http-equiv="Content-Type"&gt; 
    &lt;meta content="utf-8" http-equiv="encoding"&gt; 
     
    &lt;script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"&gt;&lt;/script&gt; 
    &lt;title&gt;Demo JSON&lt;/title&gt; 
     
    &lt;script type="text/javascript"&gt; 
        function demoClick(){             
            var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; 
              $.getJSON( flickerAPI, { 
                tags: "mount rainier", 
                tagmode: "any", 
                format: "json" 
              }, function( data ) { 
                  $.each( data.items, function( i, item ) { 
                    $( "&lt;img&gt;" ).attr( "src", item.media.m ).appendTo( "#images" ); 
                    if ( i === 3 ) { 
                      return false; 
                    } 
                  }) 
            }); 
        }     
    &lt;/script&gt; 
     
&lt;/head&gt; 

&lt;body&gt; 
    &lt;button id='btn_get' onclick='demoClick();' type="button"&gt;Demo getJSON()&lt;/button&gt; 
    &lt;div id="images"&gt;&lt;/div&gt; 
&lt;/body&gt; 

&lt;/html&gt;</pre>
&nbsp;

In this demo, I use a web service of Flickr that will return a list of public content matching some criteria.

This post has no images LOL =))

Done for today!

The whole source code is already in this post so I won't upload it :)

&nbsp;
