---
layout: post
title: Custom Radio Button & Custom Checkbox
date: 2014-01-22 10:47
author: trinh_le
comments: true
tags: [Android]
---

In previous post "<a href="http://icetea09.com/blog/2014/01/22/android-custom-button/">Custom Button</a>" we know how to customize a default Button of Android.

Similarly, in this post, I will show you the way to customize default Radio Button and Checkbox using XML file and desired images.

Copy these images to res/drawable folder:

<img src="https://lh4.googleusercontent.com/-EhYTLGJZF4Q/UqbuDqvO49I/AAAAAAAAFYk/6SjvpPPxtI4/s50-no/checkedradiobutton.png" alt="Custom Radio Button" /><img src="https://lh6.googleusercontent.com/-K2iahzp0YtI/UqbuEMtKpwI/AAAAAAAAFYw/a9iEn-4VWIk/s50-no/unchekedradiobutton.png" alt="" />

Define an XML file to specify desired appearance for each state of Radio Button:
{% highlight java %}<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android" >
    <item android:state_checked="true" android:drawable="@drawable/checkedradiobutton"></item>
    <item android:state_checked="false" android:drawable="@drawable/unchekedradiobutton"></item>
</selector>
{% endhighlight %}
&nbsp;

<!--more-->

Declare Radio Buttons in main activity layout:
{% highlight java %}
<RadioGroup
        android:id="@+id/radGroup"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/btnCustom" >

        <RadioButton android:id="@+id/radDefault"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="This is the default radio button"
        android:checked="true"/>

        <RadioButton android:id="@+id/radCustom"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="This is the custom radio button"
        android:button="@drawable/custom_radio_button"/>
</RadioGroup>
{% endhighlight %}
&nbsp;

Remember to assign <em><strong>button</strong></em> attribute to the XML file we defined before.

Do the similar steps with Checkboxes:

Firstly is custom images:

<img src="https://lh6.googleusercontent.com/-4eD5HKNoTNU/UqbuDqXfdTI/AAAAAAAAFYg/0lL1z-EJo40/w45-h57-no/checked.png" alt="Custom Radio Button" /><img src="https://lh5.googleusercontent.com/-8CVXliTIlgc/UqbuDpWo3RI/AAAAAAAAFYs/X5QBAYnWnbE/w45-h57-no/unchecked.png" alt="" />

XML file:
{% highlight java %}<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android" >
    <item android:state_checked="true" android:drawable="@drawable/checked"></item>
    <item android:state_checked="false" android:drawable="@drawable/unchecked"></item>
</selector>
{% endhighlight %}
&nbsp;

Assign value to Checkbox <em><strong>button</strong></em> attribute:
{% highlight java %}
<CheckBox
        android:id="@+id/checkCustom"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/checkDefault"
        android:checked="true"
        android:text="This is custom checkbox"
        android:button="@drawable/custom_check_box">
        This is custom check box
</CheckBox>
{% endhighlight %}
&nbsp;

And the result is so ... fabulous:

<img class="aligncenter" src="https://lh4.googleusercontent.com/-3Hb60mJNg1E/UqbwOh4A5lI/AAAAAAAAFZA/XfMZbKCiY6o/w242-h383-no/custom+rad.png" alt="Custom Radio Button" />

Source code:

<a href="https://drive.google.com/file/d/0BzvV1wN-WHWwaW1NLTVMZGl1X2M/edit?usp=sharing">https://drive.google.com/file/d/0BzvV1wN-WHWwaW1NLTVMZGl1X2M/edit?usp=sharing</a>
