---
layout: post
title: Custom Button
date: 2014-01-22 23:57
author: trinh_le
comments: true
share: true
tags: [Android]
---

Sometime, you don't want to use provided buttons style of Android like this:

<img class=" aligncenter" src="http://developer.android.com/images/ui/button-types.png" alt="Custom Button" />

You want something's special, an GUI in your own and unique style.

In this post, we will create a custom button using basic Button control and XML file that defines 3 different states of the button: normal, focused and pressed.

First, copy 3 images below into <em><strong>res/drawable</strong></em> folder. These images will be the custom button's background in 3 different states:

<img src="https://lh3.googleusercontent.com/-z1PSDLzE5wM/UqaTAfBAUmI/AAAAAAAAFXc/IZs4x_XEMRk/w50-h58-no/android_normal.png" alt="Custom Button" /><img src="https://lh5.googleusercontent.com/-Pz0KpAubto8/UqaTAbWgidI/AAAAAAAAFXU/MYHPEpFaZ9s/w50-h58-no/android_focused.png" alt="" /><img src="https://lh3.googleusercontent.com/-vYJOmRnfppg/UqaTAZYQVHI/AAAAAAAAFXg/5kdmqEtp-js/w50-h58-no/android_pressed.png" alt="" />

<!--more-->

Next, add new an xml file with below content:
<pre><span style="color: blue;">&lt;?</span><span style="color: maroon;">xml</span> <span style="color: red;">version</span>="<span style="color: blue;">1.0</span>" <span style="color: red;">encoding</span>="<span style="color: blue;">utf-8</span>"<span style="color: blue;">?&gt;</span>
<span style="color: blue;">&lt;</span><span style="color: maroon;">selector</span> <span style="color: red;">xmlns:android</span>="<span style="color: blue;">http://schemas.android.com/apk/res/android</span>" <span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">item</span> <span style="color: red;">android:drawable</span>="<span style="color: blue;">@drawable/android_pressed</span>"
        <span style="color: red;">android:state_pressed</span>="<span style="color: blue;">true</span>"<span style="color: blue;">&gt;</span><span style="color: blue;">&lt;</span>/<span style="color: maroon;">item</span><span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">item</span> <span style="color: red;">android:drawable</span>="<span style="color: blue;">@drawable/android_focused</span>"
        <span style="color: red;">android:state_focused</span>="<span style="color: blue;">true</span>"<span style="color: blue;">&gt;</span><span style="color: blue;">&lt;</span>/<span style="color: maroon;">item</span><span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">item</span> <span style="color: red;">android:drawable</span>="<span style="color: blue;">@drawable/android_normal</span>"<span style="color: blue;">&gt;</span><span style="color: blue;">&lt;</span>/<span style="color: maroon;">item</span><span style="color: blue;">&gt;</span>

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">selector</span><span style="color: blue;">&gt;</span></pre>
This xml file will define the background of custom button base on its state (pressed, focused or normal).

Please note that the order of <em><strong>&lt;item&gt;</strong></em> tags is very important. Like this above xml file, the button will be marked as <em><strong>normal</strong></em> if it was not in <em><strong>pressed</strong></em> and <em><strong>focused</strong></em> state.

Move to the next step - add a new Button to the main activity layout:
<pre><span style="color: blue;">&lt;</span><span style="color: maroon;">RelativeLayout</span> <span style="color: red;">xmlns:android</span>="<span style="color: blue;">http://schemas.android.com/apk/res/android</span>"
    <span style="color: red;">xmlns:tools</span>="<span style="color: blue;">http://schemas.android.com/tools</span>"
    <span style="color: red;">android:layout_width</span>="<span style="color: blue;">match_parent</span>"
    <span style="color: red;">android:layout_height</span>="<span style="color: blue;">match_parent</span>"
    <span style="color: red;">android:paddingBottom</span>="<span style="color: blue;">@dimen/activity_vertical_margin</span>"
    <span style="color: red;">android:paddingLeft</span>="<span style="color: blue;">@dimen/activity_horizontal_margin</span>"
    <span style="color: red;">android:paddingRight</span>="<span style="color: blue;">@dimen/activity_horizontal_margin</span>"
    <span style="color: red;">android:paddingTop</span>="<span style="color: blue;">@dimen/activity_vertical_margin</span>"
    <span style="color: red;">tools:context</span>="<span style="color: blue;">.MainActivity</span>" <span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">Button</span> <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/btnCustom</span>"
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:padding</span>="<span style="color: blue;">10dp</span>"
        <span style="color: red;">android:background</span>="<span style="color: blue;">@drawable/custom_android_button</span>"/<span style="color: blue;">&gt;</span>

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">RelativeLayout</span><span style="color: blue;">&gt;</span></pre>
You can easily see that beside usual attributes like id, width, height, padding, we assign <em><strong>background</strong> </em>attribute to the <em><strong>custom_android_button</strong></em> style which we defined before.

Finally, to implement something when the button was pressed, we override the OnClickListener in code behind:
<pre><span style="color: blue;">public</span> <span style="color: blue;">class</span> MainActivity <span style="color: blue;">extends</span> Activity {

    @Override
    <span style="color: blue;">protected</span> <span style="color: blue;">void</span> onCreate(Bundle savedInstanceState) {
        <span style="color: blue;">super</span>.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnCustom = (Button)findViewById(id.btnCustom);
        btnCustom.setOnClickListener(<span style="color: blue;">new</span> OnClickListener() {

            @Override
            <span style="color: blue;">public</span> <span style="color: blue;">void</span> onClick(View v) {
                Toast.makeText(getApplicationContext(), <span style="color: maroon;">"You clicked custom button!"</span>, Toast.LENGTH_SHORT).show();
            }
        });

    }    
}</pre>
As a result of those above code, there will be a message when you click the custom button:

<img src="https://lh3.googleusercontent.com/-4svBdOvzdcc/UqaXCme6mbI/AAAAAAAAFX4/HNoZTvo5DNs/w240-h380-no/custom+button+1.png" alt="Custom Button" />

<img src="https://lh3.googleusercontent.com/-N_N8K1ZFzBo/UqaXCv6yv6I/AAAAAAAAFYA/86rsVimAPEI/w236-h381-no/custom+button+2.png" alt="Custom Button" />

<img src="https://lh6.googleusercontent.com/-Wd8uSf8z760/UqaXCvcYM4I/AAAAAAAAFX8/7gixYCU0uls/w238-h380-no/custom+button+3.png" alt="Custom Button" />

Source code:

<a href="https://drive.google.com/file/d/0BzvV1wN-WHWwSGhweUhabGlRRmM/edit?usp=sharing">https://drive.google.com/file/d/0BzvV1wN-WHWwSGhweUhabGlRRmM/edit?usp=sharing</a>
