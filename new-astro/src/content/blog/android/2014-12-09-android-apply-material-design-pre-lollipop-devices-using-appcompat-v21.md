---
title: "Apply Material Design to Pre-Lollipop Devices using AppCompat v21"
date: 2014-12-09
tags: ["Android UI","Material Design"]
image: "/images/posts/24164029984_b3f2200484_h.jpg"
toc: true
comments: true
---

As you know, the Android 5.0 Lollipop was released featuring with new UI style called Material Design.
<br/>
Material design is a comprehensive guide for visual, motion, and interaction design across platforms and devices. You can find more information, design guidelines about Material Design here: <a href="http://www.google.com/design/spec/material-design/introduction.html#introduction-principles" target="_blank">http://www.google.com/design/spec/material-design/introduction.html#introduction-principles</a>

Luckily, Google also provides support library – AppCompat v21 – to allow us to apply Material Design on older Android versions.

<!--more-->
<h2>A – AppCompat v21 Library</h2>
AppCompat v21 library supports following material design features:
<p style="padding-left: 30px;">-   Provide Material Design style for some system widgets (EditText, Spinner, CheckBox, RadioButton, SwitchCompat, CheckedTextView) when using AppCompat theme</p>
<p style="padding-left: 30px;">-   Customize theme colour palette</p>
<p style="padding-left: 30px;">-   <strong>CardView</strong> – a new View in Android 5.0</p>
<p style="padding-left: 30px;">-   <strong>RecyclerView</strong> – a new View in Android 5.0 used to display data collection</p>
<p style="padding-left: 30px;">-   <strong>Palette</strong> – and utility class to extract prominent colours from image</p>

<h2>B – Apply Material Design to Pre-Lollipop Devices using AppCompat v21</h2>
<h3>1 – Set Up</h3>
Add following dependencies to Graddle build file:

{% highlight java %}

dependencies {
	compile 'com.android.support:appcompat-v7:21.0.+'
	compile 'com.android.support:cardview-v7:21.0.+'
	compile 'com.android.support:recyclerview-v7:21.0.+'
}

{% endhighlight %}
<h3>2 – Apply Material Theme</h3>
Opent<strong> styles.xml</strong> and make your AppTheme inherit from<strong> Theme.AppCompat</strong>.

You can also customize theme colour palette here

{% highlight java %}

<style name="AppTheme" parent="Theme.AppCompat">
	<item name="colorPrimary">@color/colorPrimary</item>
	<item name="colorPrimaryDark">@color/colorPrimaryDark</item>
	<item name="colorAccent">@color/colorAccent</item>
	<item name="android:windowNoTitle">true</item>
</style>

{% endhighlight %}

Parallelly, you should create a specific <strong>styles.xml</strong> file for Android 5.0 (in <strong>values-v21</strong> folder), to be able to use all the Material Design features:

{% highlight java %}

<style name="AppTheme" parent="android:Theme.Material.Light">
	<item name="android:colorPrimary">@color/colorPrimary</item>
	<item name="android:colorPrimaryDark">@color/colorPrimaryDark</item>
	<item name="android:colorAccent">@color/colorAccent</item>
	<item name="android:windowNoTitle">true</item>
</style>

{% endhighlight %}

FYI about the colour attributes:
<p style="padding-left: 30px;"><strong>-   colorPrimary</strong>: the primary colour of your app, will be applied to the app bar</p>
<p style="padding-left: 30px;"><strong>-   colorPrimaryDark</strong>: will be applied to the status bar and contextual app bars</p>
<p style="padding-left: 30px;"><strong>-   colorAccent</strong>: will be applied to some theme UI controls like Checkboxes, RadioButton, EditText,…</p>

<h3>3 – Demo using supported system widgets</h3>
Now, your project is ready to use Material Design theme.

Here, I added some common views to the activity for a visual demo only:

{% highlight java %}

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:paddingBottom="@dimen/activity_vertical_margin"
	android:paddingLeft="@dimen/activity_horizontal_margin"
	android:paddingRight="@dimen/activity_horizontal_margin"
	android:paddingTop="@dimen/activity_vertical_margin"
	android:orientation="vertical"
	tools:context=".MainActivity">

	<TextView
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"
		android:text="@string/hello_world" />

	<EditText
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		android:layout_marginTop="@dimen/activity_vertical_margin"
		android:hint="Edit Text" />

	<Button
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		android:layout_marginTop="@dimen/activity_vertical_margin"
		android:text="Button"/>

	<CheckBox
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		android:layout_marginTop="@dimen/activity_vertical_margin"
		android:text="Checkbox"/>

	<RadioButton
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		android:layout_marginTop="@dimen/activity_vertical_margin"
		android:text="Radio Button"/>

</LinearLayout>


{% endhighlight %}

Demo result:
<iframe width="560" height="315" src="//www.youtube.com/embed/QrOCk7eJLxE" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
<h2>C – Download Source Code for Apply Material Design to Pre-Lollipop Devices using AppCompat v21</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fWFZvaDJTY21wcEk/view?usp=sharing" target="_blank"> https://drive.google.com/file/d/0Bw3dwdSezn6fWFZvaDJTY21wcEk/view?usp=sharing</a>
<br/>
<a href="http://www.mediafire.com/download/gc918np2et81do8/DemoMaterialDesignBasic.zip" target="_blank">http://www.mediafire.com/download/gc918np2et81do8/DemoMaterialDesignBasic.zip</a> 
<br/>
In next post, I’ll introduce about 2 new Views in Android 5.0: <strong>CardView</strong> and <strong>RecyclerView</strong>.