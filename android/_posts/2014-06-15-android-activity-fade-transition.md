---
layout: post
title: Activity Fade Transition
date: 2014-06-15 19:14
author: trinh_le
comments: true

tags: []
---

<h2>A - Introduction</h2>
Fade animations made the transition between 2 activities becomes smoothly and naturally. It will gradually fade out current activity while simultaneously fading in another.

Without fade animation, the transitions often feel abrupt or hurried.

In this post, I'll show you how to implement Activity Fade Transition.

<!--more-->
<h2>B - Create Fade Animation</h2>
First, check if the <strong>res/anim</strong> folder does exist or not. If not, create new one.

This folder will contain all your app animation xml files.

Next, create 2 new xml file with the content like below:

<strong>fadein.xml</strong>

<pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;alpha xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:duration=&quot;2000&quot;
    android:fromAlpha=&quot;0.0&quot;
    android:interpolator=&quot;@android:anim/accelerate_interpolator&quot;
    android:toAlpha=&quot;1.0&quot; &gt;

&lt;/alpha&gt;

</pre>

<strong> fadeout.xml</strong>

<pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;alpha xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:duration=&quot;2000&quot;
    android:fromAlpha=&quot;1.0&quot;
    android:interpolator=&quot;@android:anim/accelerate_interpolator&quot;
    android:toAlpha=&quot;0.0&quot; &gt;

&lt;/alpha&gt;
</pre>

As you cansee in each animation xml file, we have:
<ul>
	<li>duration: the length of animation time</li>
	<li>fromAlpha: init opacity</li>
	<li>toAlpha: final opacity</li>
	<li>interpolator: <span style="color: #222222;">An interpolator defines the rate of change of an animation. This allows the basic animation effects (alpha, scale, translate, rotate) to be accelerated, decelerated, repeated, etc. I will have a single post about interpolator in the future :)</span></li>
</ul>
<h2>C - Implement Activity Fade Transition</h2>
After having animation files, the implementation is very very simple!

Just put the below code into <strong>onCreate</strong> method after <strong>setContentView</strong>:

<pre>
// Override transition animation
overridePendingTransition(R.anim.fadein, R.anim.fadeout);
</pre>

<h2> D - Demo Activity Fade Transition</h2>
This is a small demo about activity fade transition.

We have 2 activity with the UI described below:

<strong>activity_main.xml</strong>

<pre>
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;fill_parent&quot;
    android:background=&quot;#EBEB99&quot;
    &gt;

    &lt;TextView
        android:id=&quot;@+id/tvMessage&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:text=&quot;When I was a student in University of Technical Education HCMC (UTE), me and my friends made up a team called Ice Tea 09.&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/btnSwitchView&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_below=&quot;@+id/tvMessage&quot;
        android:text=&quot;Switch View&quot; /&gt;

&lt;/RelativeLayout&gt;
</pre>

<strong>activity_second_view.xml</strong>

<pre>
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;fill_parent&quot;
    android:background=&quot;#CC99FF&quot; &gt;

    &lt;TextView
        android:id=&quot;@+id/tvMessage2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:text=&quot;We seek the opportunities in some competitions related to IT and achieved some awards. That’s the very first step for us to keep our head high, moving forward and chasing each other dreams.&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/btnSwitchView2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_below=&quot;@+id/tvMessage2&quot;
        android:text=&quot;Switch View&quot; /&gt;

&lt;/RelativeLayout&gt;
</pre>

In the code behind, handle on click event for each button to switch between 2 activities:

<strong>MainActivity.java</strong>

<pre>
Button btnSwitchView;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);

	// Override transition animation
	overridePendingTransition(R.anim.fadein, R.anim.fadeout);

	setContentView(R.layout.activity_main);

	btnSwitchView = (Button)findViewById(R.id.btnSwitchView);
	btnSwitchView.setOnClickListener(new OnClickListener() {

		@Override
		public void onClick(View arg0) {
			Intent intent = new Intent(getApplicationContext(), SecondViewActivity.class);
			startActivity(intent);
		}
	});
}
</pre>

<strong> SecondViewActivity.java</strong>

<pre>
Button btnSwitchView;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);

	// Override transition animation
	overridePendingTransition(R.anim.fadein, R.anim.fadeout);

	setContentView(R.layout.activity_second_view);

	btnSwitchView = (Button)findViewById(R.id.btnSwitchView2);
	btnSwitchView.setOnClickListener(new OnClickListener() {

		@Override
		public void onClick(View arg0) {
			Intent intent = new Intent(getApplicationContext(), MainActivity.class);
			startActivity(intent);
		}
	});
}
</pre>

Result:

<img class="size-full wp-image-1716 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/06/fade_result.png" alt="fade_result" width="250" height="409" />
<p style="text-align: center;"><em>It looks quite wierd - I know LOL. Cause I captured it at the middle of the transition :)</em></p>

<h2>E - Download Source Code</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fZ2VoWnJ1VDlkaDg/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fZ2VoWnJ1VDlkaDg/edit?usp=sharing</a>
