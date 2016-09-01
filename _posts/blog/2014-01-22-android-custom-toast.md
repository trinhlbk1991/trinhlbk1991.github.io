---
layout: post
title: Custom Toast
date: 2014-01-22 09:33
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---
A toast is a view containing a quick little message for the user. It will never receive focus and will be dismiss after a specific time.

By default, if you want to call a simple Toast, all you need is just one line of code:
<pre>Toast.makeText(context, text, duration).show();</pre>
And you will get the result like this:

<img class="aligncenter" src="http://developer.android.com/images/toast.png" alt="Custom Toast" />

More than that, this entry will show you how to customize a Toast with your own layout and style!

<!--more-->

Firstly, create your desired layout for the custom toast:
<pre><span style="color: blue;">&lt;?</span><span style="color: maroon;">xml</span> <span style="color: red;">version</span>="<span style="color: blue;">1.0</span>" <span style="color: red;">encoding</span>="<span style="color: blue;">utf-8</span>"<span style="color: blue;">?&gt;</span>
<span style="color: blue;">&lt;</span><span style="color: maroon;">RelativeLayout</span> <span style="color: red;">xmlns:android</span>="<span style="color: blue;">http://schemas.android.com/apk/res/android</span>"
    <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/custom_toast_layout</span>"
    <span style="color: red;">android:background</span>="<span style="color: blue;">#99CC00</span>"
    <span style="color: red;">android:layout_width</span>="<span style="color: blue;">match_parent</span>"
    <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>" <span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">ImageView</span>
        <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/imgIcon</span>"
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">50dp</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">50dp</span>"
        <span style="color: red;">android:layout_alignParentLeft</span>="<span style="color: blue;">true</span>"
        <span style="color: red;">android:layout_alignParentTop</span>="<span style="color: blue;">true</span>"
        <span style="color: red;">android:src</span>="<span style="color: blue;">@drawable/icon</span>" /<span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">TextView</span>
        <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/tvMessage</span>"
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:layout_centerVertical</span>="<span style="color: blue;">true</span>"
        <span style="color: red;">android:layout_toRightOf</span>="<span style="color: blue;">@+id/imgIcon</span>"
        <span style="color: red;">android:text</span>="<span style="color: blue;">Message</span>"
        <span style="color: red;">android:textColor</span>="<span style="color: blue;">#FFFFFF</span>"
        <span style="color: red;">android:layout_marginLeft</span>="<span style="color: blue;">5dp</span>"
        <span style="color: red;">android:textAppearance</span>="<span style="color: blue;">?android:attr/textAppearanceMedium</span>" /<span style="color: blue;">&gt;</span>

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">RelativeLayout</span><span style="color: blue;">&gt;</span></pre>
With those XML code, you will have a toast like this:

<img class="aligncenter" src="https://lh3.googleusercontent.com/-4NO7ahddZy8/UsYrzaCq8TI/AAAAAAAAFdA/HhzH9dtjsrE/w416-h199-no/custom+toast.PNG" alt="Custom Toast" />

In the code behind, we need to handle all the controls in custom layout:
<pre>LayoutInflater inflater = getLayoutInflater();
View layout = inflater.inflate(R.layout.custom_toast,
        (ViewGroup) findViewById(R.id.custom_toast_layout));
TextView tvMesage = (TextView)layout.findViewById(R.id.tvMessage);
tvMesage.setText(<span style="color: maroon;">"OMG! This custom toast is awsome!"</span>);</pre>
Next, create a new Toast object, set the custom View for it and do some settings like gravity, duration:
<pre>Toast toast = <span style="color: blue;">new</span> Toast(getApplicationContext());
toast.setGravity(Gravity.BOTTOM, <span style="color: maroon;">10</span>, <span style="color: maroon;">10</span>);
toast.setDuration(Toast.LENGTH_SHORT);
toast.setView(layout);</pre>
Finally, do not forget to show it!
<pre>toast.show();</pre>
And, tada! Show time!

<img class="aligncenter" src="https://lh6.googleusercontent.com/-U_AWw5YCqc8/UsYrzvDsEgI/AAAAAAAAFdE/miH4cRAUpwE/w348-h582-no/custom+toast+result.png" alt="" />

Source code:

<a href="https://drive.google.com/file/d/0BzvV1wN-WHWwdmphRUJHTHdndXM/edit?usp=sharing">https://drive.google.com/file/d/0BzvV1wN-WHWwdmphRUJHTHdndXM/edit?usp=sharing</a>
