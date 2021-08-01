---
layout: post
title: Use Implicit Intent to Call Another App
date: 2014-05-06 18:54
author: trinh_le
comments: true

tags: [Intent]
---

<h2>A - Preface</h2>
In Android development, we usually use <strong>Intent</strong> to navigate between <strong>Activities</strong> in one application. It's called <em><strong>explicit intent</strong></em> because you have to pass the exactly class name of the destination <strong>Activity</strong>.

Intent can not only start another <strong>Activity</strong> inside the app but also call another application for user to perform an <strong>Action</strong>.

For example, instead of develop a module to send email, you can call Gmail app to do that for you! This kind of implementation can be found in a lot of application. And it saves you tons of time!

In this post, I'll show you how to use<em><strong> implicit intent</strong> </em>to call another app.

<!--more-->
<h2>B - Create Implicit Intent</h2>
Unlike <em><strong>explicit intent,</strong> <strong>implecit intent</strong></em> does not declare the exactly class name of an <strong>Activity</strong>. It specifies the <em><strong>action</strong> </em>that user want to do like <em><strong>view</strong></em>, <em><strong>edit</strong></em>, <em><strong>send</strong> </em>or <em><strong>get</strong> </em>something.

<span style="color: #222222;"><em><strong>Implicit intents</strong> </em>often also include data associated with user <em><strong>action</strong></em>, such as the map location you want to view, or the email message you want to send. Depend on user action, the data can be very simple like an URI, or complex and have many extra data like reciever, subject, message,..., or have no data required!</span>
<h3>1. Implicit Intent with URI data</h3>
If your data is a URI, you can use a simple constructor to create an <em><strong>implicit intent</strong></em>.

For examples:
<ul>
	<li>Intent to dial a phone number:</li>
</ul>

<pre>
Uri number = Uri.parse(&quot;tel:11061991&quot;);
Intent callIntent = new Intent(Intent.ACTION_DIAL, number);
</pre>

<ul>
	<li> Intent to view a map:</li>
</ul>

<pre>
// Map point based on latitude/longitude
Uri location = Uri.parse(&quot;geo:37.422219,-122.08364?z=14&quot;); // z param is zoom level
Intent mapIntent = new Intent(Intent.ACTION_VIEW, location);
</pre>

<ul>
	<li> Intent to view a web page:</li>
</ul>

<pre>
Uri webpage = Uri.parse(&quot;http://www.icetea09.com&quot;);
Intent webIntent = new Intent(Intent.ACTION_VIEW, webpage);
</pre>

<h3> 2. Implicit Intent with Extra Data</h3>
Other kinds of implicit intents require "extra" data that provide different data types, such as a string.

By default, the system determines the appropriate MIME type required by an intent based on the Uri data that's included.

If your intent doesn't include an URI, you shoud specify the type of data associated with the in then by calling <strong>setType()</strong> method.

For examples:

Intent to send an email:

<pre>
Intent emailIntent = new Intent(Intent.ACTION_SEND);

emailIntent.setType(HTTP.PLAIN_TEXT_TYPE);
emailIntent.putExtra(Intent.EXTRA_EMAIL, new String[] {&quot;trinhlbk1991@gmail.com&quot;});
emailIntent.putExtra(Intent.EXTRA_SUBJECT, &quot;Email subject&quot;);
emailIntent.putExtra(Intent.EXTRA_TEXT, &quot;Email message text&quot;);
emailIntent.putExtra(Intent.EXTRA_STREAM, Uri.parse(&quot;content://this/is/attachment/path&quot;));
</pre>

Intent to create a new calendar event:

<pre>
Intent calendarIntent = new Intent(Intent.ACTION_INSERT, Events.CONTENT_URI);

Calendar beginTime = Calendar.getInstance();
beginTime.set(2012, 0, 19, 7, 30);
Calendar endTime = Calendar.getInstance();
endTime.set(2012, 0, 19, 10, 30);

calendarIntent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, beginTime.getTimeInMillis());
calendarIntent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endTime.getTimeInMillis());
calendarIntent.putExtra(Events.TITLE, &quot;Ice Tea 09 new post!&quot;);
calendarIntent.putExtra(Events.EVENT_LOCATION, &quot;An interesting post about Android&quot;);
</pre>

<h2>C - Check If There is an App to Recieve the Intent</h2>
Although Android OS has some default application to recieve basic Intents such as Phone, Calendar, Email,... we should <span style="color: #222222;">always perform a verification step before invoking an intent.</span>

Because, if there're no app recieve your intent, your app will be crashed!

The verification step is quite simple:

<pre>
private boolean isIntentSafe(Intent intent){

	// Verify it resolves
	PackageManager packageManager = getPackageManager();
	List&lt;ResolveInfo&gt; activities = packageManager.queryIntentActivities(intent, 0);
	return activities.size() &gt; 0;

}
</pre>

Usage:

<pre>
if(isIntentSafe(callIntent))
	startActivity(callIntent);
else
	Toast.makeText(getApplicationContext(), &quot;Your phone have no app can dial!&quot;, Toast.LENGTH_SHORT).show();
</pre>

<h2> D - Demo Result</h2>
<img class="alignnone size-full wp-image-1673" src="http://icetea09.com/wp-content/uploads/2014/05/intent.png" alt="intent" width="1972" height="774" />
<h2>E - Source code Use Implicit Intent to Call Another App</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fMmppU0p5UmJCbGM/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fMmppU0p5UmJCbGM/edit?usp=sharing</a>
