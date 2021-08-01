---
layout: post
title: Custom Dialog
date: 2014-01-21 23:57
author: trinh_le
comments: true
share: true
tags: [Custom View, Android UI]
---

You are developing an Android app and you don't want to use the default dialog like this:

<img class="aligncenter" src="http://developer.android.com/images/ui/dialog_buttons.png" alt="Custom Dialog" />

You want something is unique and customizable like this:

<img class="aligncenter" src="http://developer.android.com/images/ui/dialog_custom.png" alt="Custom Dialog" />

This post will guide you how to create a custom dialog in Android!

<!--more-->

Firstly, create an XML layout for your custom dialog:
<pre class="lang:default decode:true ">&lt;RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent" &gt;

    &lt;TextView
        android:id="@+id/lbMessage"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/webView"
        android:layout_centerHorizontal="true"
        android:text="Message"
        android:textAppearance="?android:attr/textAppearanceMedium" /&gt;

    &lt;ImageView
        android:id="@+id/imageView1"
        android:layout_width="75dp"
        android:layout_height="75dp"
        android:layout_below="@+id/lbMessage"
        android:layout_centerHorizontal="true"
        android:src="@drawable/ic_launcher" /&gt;

    &lt;Button
        android:id="@+id/btnOK"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView1"
        android:layout_centerInParent="true"
        android:text="OK" /&gt;

&lt;/RelativeLayout&gt;</pre>
&nbsp;

With those upper XML, we will have a dialog like this:

<img class="aligncenter" src="https://lh4.googleusercontent.com/Aw4YDwjtyI_t2e4OzNYoMioU9xDKCSJ7kDmpEEes6io=w417-h302" alt="Custom Dialog" />

Next, In the code, you need to create a Dialog object using custom layout which we just created:
<pre class="lang:default decode:true ">Dialog dialog = new Dialog(MainActivity.this);
dialog.setContentView(R.layout.custom_dialog_layout);</pre>
&nbsp;

You can set the title for dialog, and handle all the controls in custom layout:
<pre class="lang:default decode:true ">dialog.setTitle("Confirm");

TextView lbMessage = (TextView)dialog.findViewById(id.lbMessage);
Button btnOK = (Button)dialog.findViewById(id.btnOK);

lbMessage.setText("This is the message of dialog!");

btnOK.setOnClickListener(new OnClickListener() {

    @Override
    public void onClick(View v) {
        dialog.dismiss();
    }
});</pre>
&nbsp;

Finally, don't forget to show the dialog:
<pre class="lang:default decode:true ">dialog.show();</pre>
&nbsp;

And this is the result:

<img class="aligncenter" src="https://lh4.googleusercontent.com/5Ww40DgCky4XhQXKSCVVAxYroRDlNEE3XStVLdqpstU=w370-h583-no" alt="" />

The example this post provided is very simple. You can customize it to whatever you want! <img id="smilie_224" title="Beauty" src="http://vozforums.com/images/smilies/Off/beauty.gif" alt=":beauty:" />

Source Code:

<a href="https://drive.google.com/file/d/0BzvV1wN-WHWwd1ZSM0h3eDFLWFk/edit?usp=sharing">https://drive.google.com/file/d/0BzvV1wN-WHWwd1ZSM0h3eDFLWFk/edit?usp=sharing</a>
