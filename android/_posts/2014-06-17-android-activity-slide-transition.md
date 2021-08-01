---
layout: post
title: Activity Slide Transition
date: 2014-06-17 22:18
author: trinh_le
comments: true

tags: []
---

<h2>A - Introduction</h2>
In previous post - Activity Fade Transition - I show you the pros of using transition animation in Android application.

Today, I'll show you another type of animation - slide transition.

<!--more-->
<h2>B - Create Slide Animation</h2>
First, check if the <strong>res/anim</strong> folder does exist or not. If not, create new one.

This folder will contain all your app animation xml files.

Next, create 2 new xml file with the content like below:

<strong>slide_in_left.xml</strong>

<pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
    &lt;translate android:fromXDelta=&quot;-100%p&quot; android:toXDelta=&quot;0&quot; android:duration=&quot;500&quot; /&gt;
    &lt;alpha android:fromAlpha=&quot;0.0&quot; android:toAlpha=&quot;1.0&quot; android:duration=&quot;200&quot; android:startOffset=&quot;200&quot; /&gt;
&lt;/set&gt;
</pre>

<strong>slide_out_left.xml</strong>

<pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
    &lt;translate android:fromXDelta=&quot;0&quot; android:toXDelta=&quot;-100%p&quot; android:duration=&quot;500&quot; /&gt;
    &lt;alpha android:fromAlpha=&quot;1.0&quot; android:toAlpha=&quot;0.0&quot; android:duration=&quot;200&quot; android:startOffset=&quot;200&quot; /&gt;
&lt;/set&gt;
</pre>

As you can see in each xml file, we have a set of two kind of animation: alpha and translate. These two animations will occur at the same time of the transition and combine to make the slide animation.
<h2>C - Implement Activity Slide Transition</h2>
To call the slide animation, you just need to write one line of code:

<pre>
overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_left);
</pre>

<h2>D - Demo Activity SlideTransition</h2>
This is a small demo about activity slide transition.

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

<a href="http://icetea09.com/wp-content/uploads/2014/06/slide_transition.png"><img class="size-full wp-image-1735 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/06/slide_transition.png" alt="slide_transition" width="248" height="410" /></a>
<h2>E - Download Source Code</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fN0ZXTnJORUpXZm8/edit?usp=sharing">https://drive.google.com/file/d/0Bw3dwdSezn6fN0ZXTnJORUpXZm8/edit?usp=sharing</a>
