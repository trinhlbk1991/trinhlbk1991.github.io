---
layout: post
title: Notification
date: 2014-03-05 06:19
author: trinh_le
comments: true

tags: [Notification]
---

<h2>A - Introduction</h2>
In Android, an application can push a message to user called <strong>Notification </strong>outside its normal UI.

First, the notification will appear on the <strong>Notification Bar</strong>

<img class="aligncenter" src="http://developer.android.com/images/ui/notifications/iconic_notification.png" alt="" />

User can see all the detail of a notification by opening the <strong>Notification Drawer</strong>

<img class="aligncenter" src="http://developer.android.com/images/ui/notifications/normal_notification.png" alt="" />

<!--more-->
<h2>B - Notification Display Elements</h2>
Android Notification has 2 views: Normal View and Big View. In this post, I only focus on Normal View. Big View will have its own entry later :)

<img class="aligncenter" src="http://developer.android.com/images/ui/notifications/normal_notification_callouts.png" alt="" />
<ol>
	<li>Content title</li>
	<li>Large icon</li>
	<li>Content text</li>
	<li>Content info</li>
	<li>Small icon</li>
	<li>Time that the notification was issued</li>
</ol>
<h2>C - Demo</h2>
To push a notification, first of all, you need to create a <strong>NotificationManager</strong> object:

<img src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/1-11.png" alt="" />

Then, create a <strong>Notification</strong> object:

<img src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/2-13.png" alt="" width="580" />

The constructor of Notification has 3 arguments:
<ul>
	<li>The large icon (2) in Normal View</li>
	<li>Notification content title</li>
	<li>Notification time</li>
</ul>
After that, create a <strong>PendingIntent</strong> instance by calling <strong>PendingIntent.getActivity()</strong> method. This instance will start an activity when user tap on the notification.

<img src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/3-12.png" alt="" width="600" />

* The 3rd argument is the Activity you want to start

Assign the latest notification by <strong>setLatestEventInfo()</strong> method:

<img src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/4-10.png" alt="" />

Push the notification:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/5-9.png" alt="" />

The <strong>notify() </strong>method has 2 arguments:
<ul>
	<li>ID : to distinguish notifications. If there're 2 notifications with same ID, only notify the latest one.</li>
	<li>A Notification instance.</li>
</ul>
The result of this demo application:

<img class="alignleft" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/6-8.png" alt="Notification" width="200" /><img class="alignleft" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/8-6.png" alt="" width="204" />
&nbsp;
<h2>D - Download Source Code</h2>
<a href="http://www.mediafire.com/download.php?uh37y8qmtiwr65c">http://www.mediafire.com/download.php?uh37y8qmtiwr65c</a>
