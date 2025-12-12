---
title: "Property Animation in Android"
date: 2015-07-31
categories: ["android"]
tags: ["Android UI","Animation"]
image: "assets/images/android/animation.jpg"
toc: true
comments: true
---

<h2><b>A - Property Animation in Android Overview</b></h2>
Property animation in Android is very powerful, allows you to animate almost anything!
<br/>
Basically, the property animation changes object’s properties value over a specified duration.

Using property animation, you can define following characteristics of the animation:
<ul>
	<li><b>Duration</b>: By default, the animation duration is 300ms.</li>
	<li><b>Repeat count and behaviour</b>: You can specify the number of animation repeat and whether the animation playback in reverse.</li>
	<li><b>Animation interpolation</b>:  You can define how the values for property are calculated over the time</li>
	<li><b>Animators set</b>: You can group different animator and animators set to execute them together, in sequence or after some delay.</li>
	<li><b>Frame refresh delay</b>: By default, the frames will be refreshed after 10ms.</li>
</ul>

<!--more-->
<h2><b>B - Compare Property Animation and View Animation</b></h2>
&nbsp;
<table>
<tbody>
<tr>
<td style="background-color: #8bc34a; text-align: center;"><b>View Animation</b></td>
<td style="background-color: #8bc34a; text-align: center;"><b>Property Animation</b></td>
</tr>
<tr>
<td>Only apply to View</td>
<td>Be able to apply to any object</td>
</tr>
<tr>
<td>Only animate some properties of View like scaling and rotation</td>
<td>Can animate any properties of object</td>
</tr>
<tr>
<td>Only modify where the View was drawn, not the actual View itself. For example, if you animate a View to move across the screen, the View was drawn correctly but the actual View which you can interact with is still at the old location.</td>
<td>Modify where the object was drawn and the actual object itself</td>
</tr>
<tr>
<td>Easy to set up and write code</td>
<td>Require more effort to implement</td>
</tr>
</tbody>
</table>
<h2><b>C - Use ValueAnimator</b></h2>
The <b>ValueAnimator </b>class lets you animate values of some type for the duration of an animation by specifying a set of <b>int</b>, <b>float</b>, or <b>color </b>values to animate through.

You obtain a <b>ValueAnimator </b>by calling one of its factory methods: <b>ofInt()</b>, <b>ofFloat()</b>, or <b>ofObject()</b>.
{% highlight java %}
private void executeAnimation() {
    ValueAnimator valueAnimator = ValueAnimator.ofFloat(0, 1);
    valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
        @Override
        public void onAnimationUpdate(ValueAnimator animation) {
            mImgSample.setAlpha(animation.getAnimatedFraction());
        }
    });
    valueAnimator.setDuration(1500);
    valueAnimator.setRepeatCount(ValueAnimator.INFINITE);
    valueAnimator.setRepeatMode(ValueAnimator.REVERSE);
    valueAnimator.start();
}
{% endhighlight %}
&nbsp;

As you can see, in order to make real animation effect to the object, we also need to define the listener for <strong>ValueAnimator</strong>.

In that listener, you can obtain the calculated value for that specific frame and apply changes to your object.
<h2><b>D - Use ObjectAnimator</b></h2>
The <b>ObjectAnimator </b>is a subclass of the <b>ValueAnimator</b> and it allows you to specify the property name of the target object.

Using ObjectAnimator, you don’t need to implement the listener implicitly because the property’s value will be updated automatically.

To create a correct ObjectAnimator, you have to define:
<ul>
	<li><b>Target object</b>: The object you want to animate its property.</li>
	<li><b>Animated property</b>: The property you want to animate. This property must have a setter with format set&lt;property name&gt;. If your property doesn’t have a setter, you can:
<ul>
	<li>Add a setter for it</li>
	<li>Or use a wrapper that has right to change its values and apply <b>ObjectAnimator </b>to that wrapper. Make sure the wrapper class have valid setter.</li>
	<li>Or use <b>ValueAnimator </b>instead</li>
</ul>
</li>
	<li><b>Values</b>: This define the property value range during animation duration. If you only define 1 value, it will be the end value. In this case, the start value will be the default value when you call the getter. Because of that, your object must have the getter with format get&lt;property name&gt;.</li>
</ul>
Example:

{% highlight java %}
private void executeAnimation() {
    ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(mImgSample, "rotation", 0, 360);

    objectAnimator.addListener(new Animator.AnimatorListener() {
        @Override
        public void onAnimationStart(Animator animation) {
            Toast.makeText(ObjectAnimatorActivity.this, "onAnimationStart", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onAnimationEnd(Animator animation) {
            Toast.makeText(ObjectAnimatorActivity.this, "onAnimationEnd", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onAnimationCancel(Animator animation) {
            Toast.makeText(ObjectAnimatorActivity.this, "onAnimationCancel", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onAnimationRepeat(Animator animation) {
            Toast.makeText(ObjectAnimatorActivity.this, "onAnimationRepeat", Toast.LENGTH_SHORT).show();
        }
    });

    objectAnimator.setDuration(1500);
    objectAnimator.setRepeatCount(ValueAnimator.INFINITE);
    objectAnimator.setRepeatMode(ValueAnimator.REVERSE);
    objectAnimator.start();
}
{% endhighlight %}

<h2><b>E - Use AnimatorSet</b></h2>
In case you want to group some animator together to animate it at the same time or in sequence, you can use <b>AnimatorSet </b>to achieve that.

{% highlight java %}
private void executeAnimation() {
    ObjectAnimator fadeAnim = ObjectAnimator.ofFloat(mImgSample, "alpha", 0, 1);
    fadeAnim.setDuration(1000);
    ObjectAnimator rotateAnim = ObjectAnimator.ofFloat(mImgSample, "rotation", 0, 360);
    rotateAnim.setDuration(1000);

    AnimatorSet animatorSet = new AnimatorSet();
    animatorSet.play(fadeAnim).before(rotateAnim);

    ObjectAnimator fadeOutAnim = ObjectAnimator.ofFloat(mImgSample, "alpha", 0);
    AnimatorSet secondAnimatorSet = new AnimatorSet();
    secondAnimatorSet.play(fadeOutAnim).after(animatorSet);
    secondAnimatorSet.start();
}
{% endhighlight %}

&nbsp;
<h2><b>F - Use Interpolator</b></h2>
An Interpolator define the calculation of animation value over the animating time. Interpolator allows animation has a non-linear motion like acceleration and deceleration.

Android system provides some default interpolator like:
<ul>
	<li><b>AccelerateInterpolator</b>: The rate of change starts out slowly and and then accelerates</li>
	<li><b>DecelerateInterpolator</b>: The rate of change starts out quickly and and then decelerates</li>
	<li><b>AccelerateDecelerateInterpolator</b>: The rate of change starts and ends slowly but accelerates through the middle</li>
	<li><b>AnticipateInterpolator</b>: The change starts backward then flings forward</li>
	<li><b>AnticipateOvershootInterpolator</b>: The change starts backward then flings forward and overshoots the target value and finally goes back to the final value</li>
</ul>
You can find out more about default Interpolator in <a href="http://developer.android.com/reference/android/view/animation/package-summary.html" target="_blank">android.view.animation</a> package.

If you don’t like any default interpolator, you can create your own by implement <a href="http://developer.android.com/reference/android/animation/TimeInterpolator.html"><b>TimeInterpolator </b></a>interface.

{% highlight java %}
private void executeAnimation() {
    ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(mImgSample, "rotation", 0, 360);
    objectAnimator.setDuration(5000);
    objectAnimator.setInterpolator(new AccelerateInterpolator());
    objectAnimator.start();
}
{% endhighlight %}

<h2><b>G - Declare Animation in XML resources</b></h2>
Instead of implementing the animation programmatically like above, you can declare the animation details in XML resources. This way allows you to reuse the animation and modify the animation sequence easily.

The animation XML resources are stored in <b>res/animator/</b> folder.

Syntax details:

{% highlight xml %}
<set // Represent an AnimatorSet
  android:ordering=["together" | "sequentially"] // The order of animations in this set
  android:interpolator="@android:anim/[default_interpolator]" //The interpolator for animations in this set
  >

    <objectAnimator //Represents an ObjectAnimator
        android:propertyName="string" // The object's property to animate
        android:duration="int" // The animation duration
        android:valueFrom="float | int | color" // The property’s start value of animation
        android:valueTo="float | int | color" // The property’s end value of animation
        android:startOffset="int" // The amount of milliseconds the animation delays after animation starts
        android:repeatCount="int" // The number that animation have to repeat
        android:repeatMode=["repeat" | "reverse"] // The animation’s behaviour after reached the end of animation
        android:valueType=["intType" | "floatType"]/> //Do not specify this attribute if the value is a color

    <animator //Represents an ValueAnimator
        android:duration="int"
        android:valueFrom="float | int | color"
        android:valueTo="float | int | color"
        android:startOffset="int"
        android:repeatCount="int"
        android:repeatMode=["repeat" | "reverse"]
        android:valueType=["intType" | "floatType"]/>

    <set>
        ...
    </set>
</set>
{% endhighlight %}

Example:

{% highlight xml %}
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="sequentially">
    <set>
        <objectAnimator
            android:duration="1500"
            android:propertyName="x"
            android:valueFrom="50"
            android:valueTo="500"
            android:valueType="floatType" />
        <objectAnimator
            android:duration="1500"
            android:propertyName="y"
            android:valueFrom="50"
            android:valueTo="800"
            android:valueType="floatType" />
    </set>
    <objectAnimator
        android:duration="1500"
        android:propertyName="alpha"
        android:valueTo="0f" />
</set>
{% endhighlight %}

{% highlight java %}
private void executeAnimation() {
    AnimatorSet set = (AnimatorSet) AnimatorInflater.loadAnimator(this, R.animator.custom_animation);
    set.setTarget(mImgSample);
    set.start();
}
{% endhighlight %}

<h2> H - Demo application and Source code</h2>
Please find the complete source code of this tutorial at Github:

<a href="https://github.com/trinhlbk1991/DemoPropertyAnimation" target="_blank">https://github.com/trinhlbk1991/DemoPropertyAnimation</a>