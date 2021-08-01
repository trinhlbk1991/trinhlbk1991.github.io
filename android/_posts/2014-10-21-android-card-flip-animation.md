---
layout: post
title: Card Flip Animation
date: 2014-10-21 14:36
author: trinh_le
comments: true

tags: []
---

In previous posts, I showed you how to apply animation (<a title="Activity Fade Transition" href="http://icetea09.com/blog/2014/06/15/android-activity-fade-transition/">fade</a>, <a title="Activity Slide Transition" href="http://icetea09.com/blog/2014/06/17/android-activity-slide-transition/">slide</a>) to activity transaction.

In this post, I'll show you how to do a card flip animation applied for any View or Layout objects.
<h2>A - Create the Animator</h2>
Firstly, we need to create Animator for the card flip animation.

<strong>flight_left_in.xml</strong> defines the animation when the front card comes out and the back card comes in from the left.

<!--more-->

{% highlight java %}

<set xmlns:android="http://schemas.android.com/apk/res/android">
	<!-- Rotate. -->
	<objectAnimator
		android:valueFrom="-180"
		android:valueTo="0"
		android:propertyName="rotationY"
		android:interpolator="@android:interpolator/accelerate_decelerate"
		android:duration="500" />

	<!-- When the roration reach half of animation, show the card -->
	<objectAnimator
		android:valueFrom="0.0"
		android:valueTo="1.0"
		android:propertyName="alpha"
		android:duration="1"
		android:startOffset="250"/>

</set>

{% endhighlight %}

<strong>flight_right_out.xml</strong> defines the animation for the front card comes out to the right:

{% highlight java %}

<set xmlns:android="http://schemas.android.com/apk/res/android">

	<!-- Rotate. -->
	<objectAnimator
		android:valueFrom="0"
		android:valueTo="180"
		android:propertyName="rotationY"
		android:interpolator="@android:interpolator/accelerate_decelerate"
		android:duration="500" />

	<!-- Half-way through the rotation, hide the front card -->
	<objectAnimator
		android:valueFrom="1.0"
		android:valueTo="0.0"
		android:propertyName="alpha"
		android:startOffset="250"
		android:duration="1" />
</set>

{% endhighlight %}
<h2> B - Create the View for demo application</h2>
In card flip animation demo application, we will create a simple view with 2 ImageView and one Flip button:

{% highlight java %}

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:paddingLeft="@dimen/activity_horizontal_margin"
	android:paddingRight="@dimen/activity_horizontal_margin"
	android:paddingTop="@dimen/activity_vertical_margin"
	android:paddingBottom="@dimen/activity_vertical_margin"
	tools:context=".MainActivity">
	<ImageView
		android:id="@+id/imgBack"
		android:layout_width="300dp"
		android:layout_height="300dp"
		android:layout_centerHorizontal="true"
		android:alpha="0"
		android:src="@drawable/back"/>

	<ImageView
		android:id="@+id/imgFront"
		android:layout_width="300dp"
		android:layout_height="300dp"
		android:layout_centerHorizontal="true"
		android:src="@drawable/front"/>

	<Button
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"
		android:text="Flip!"
		android:id="@+id/btnFlip"
		android:layout_below="@+id/imgFront"
		android:layout_centerHorizontal="true"/>
</RelativeLayout>

{% endhighlight %}

The preview UI will be like this:

<a href="http://icetea09.com/wp-content/uploads/2014/10/layout-2014-10-20-162628.png"><img class="size-full wp-image-1909 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/10/layout-2014-10-20-162628.png" alt="layout-2014-10-20-162628" width="303" height="594" /></a>
<h2>C - Apply Card Flip Animation</h2>
Before apply card flip animation to the ImageView, we need to create some indeed variables:

{% highlight java %}

ImageView imgFront;
ImageView imgBack;
Button btnFlip;

boolean isBackVisible = false; // Boolean variable to check if the back image is visible currently

{% endhighlight %}

After that, init them in <strong>onCreate</strong> method:

{% highlight java %}

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);

	imgFront = (ImageView)findViewById(R.id.imgFront);
	imgBack = (ImageView)findViewById(R.id.imgBack);
	btnFlip = (Button)findViewById(R.id.btnFlip);

	final AnimatorSet setRightOut = (AnimatorSet) AnimatorInflater.loadAnimator(getApplicationContext(),
		R.animator.flip_right_out);

	final AnimatorSet setLeftIn = (AnimatorSet) AnimatorInflater.loadAnimator(getApplicationContext(),
		R.animator.flight_left_in);
}

{% endhighlight %}

Implement the onClickListener for Flip button:

{% highlight java %}

btnFlip.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		if(!isBackVisible){
			setRightOut.setTarget(imgFront);
			setLeftIn.setTarget(imgBack);
			setRightOut.start();
			setLeftIn.start();
			isBackVisible = true;
		}
		else{
			setRightOut.setTarget(imgBack);
			setLeftIn.setTarget(imgFront);
			setRightOut.start();
			setLeftIn.start();
			isBackVisible = false;
		}
	}
});

{% endhighlight %}

Finally, run the demo application and enjoy the result:

<a href="http://icetea09.com/wp-content/uploads/2014/10/cardflip1.png"><img class="size-full wp-image-1911 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/10/cardflip1.png" alt="cardflip1" width="335" height="491" /></a> <a href="http://icetea09.com/wp-content/uploads/2014/10/cardflip2.png"><img class="size-full wp-image-1912 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/10/cardflip2.png" alt="cardflip2" width="329" height="491" /></a>
<h2>D - Source code Card Flip Animation</h2>
<span style="color: #ff0000;">Note: I build this project using Android Studio.</span>

 <a href="http://www.mediafire.com/?j6cq5qqj64806xk">http://www.mediafire.com/?j6cq5qqj64806xk</a>

<a href="https://docs.google.com/file/d/0Bw3dwdSezn6fMHo0TkN2SXFfQTg/edit?usp=docslist_api">https://docs.google.com/file/d/0Bw3dwdSezn6fMHo0TkN2SXFfQTg/edit?usp=docslist_api</a>

 

