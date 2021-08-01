---
layout: post
title:  Support Multiple Languages in Android
date: 2014-05-04 14:05
author: trinh_le
comments: true

tags: []
---

<h2>A - Introduction</h2>
In Android development, you can keep the UI strings seperately with app code by storing all the strings in external files.

You can find the <strong>res</strong> folder in Android project structure. <span style="color: #222222;">Within this <strong>res</strong> </span><span style="color: #222222;">directory are subdirectories for various resource types.</span>

There're some default xml files in <strong>res</strong> folder such as <strong><span style="color: #000000;">r</span></strong><span style="color: #006600;"><strong><span style="color: #000000;">es/values/strings.xml</span></strong> </span>which contails all application's strings.

To support multiple languages in Android, simply, we have to provide different <strong>string.xml</strong> files for each language.

<!--more-->
<h2>B - Create Locale Directories and String Files</h2>
To support multiple languages in Android, firstly you have to create different <strong>res/values</strong> folders for each language. The <strong>res/values</strong> folder must include the <span style="color: #222222;">ISO country code at the end of the its name. For example:<strong> res/values-fr</strong> will contains all values for French apps.</span>

Inside each <strong>res/values</strong> folder, you must define the <strong>string.xml</strong> file with appropriate supported language.

<img class="size-full wp-image-1611 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/05/multiple-languages.png" alt="multiple languages" width="484" height="552" />

The content of <strong>string.xml</strong> files:
<ul>
	<li>Default:</li>
</ul>
<pre style="padding-left: 30px;"><span style="color: blue;">&lt;?</span><span style="color: maroon;">xml</span> <span style="color: red;">version</span>="<span style="color: blue;">1.0</span>" <span style="color: red;">encoding</span>="<span style="color: blue;">utf-8</span>"<span style="color: blue;">?&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">resources</span><span style="color: blue;">&gt;</span> 

    <span style="color: blue;">&lt;</span><span style="color: maroon;">string</span> <span style="color: red;">name</span>="<span style="color: blue;">app_name</span>"<span style="color: blue;">&gt;</span>DemoMultipleLanguages<span style="color: blue;">&lt;</span>/<span style="color: maroon;">string</span><span style="color: blue;">&gt;</span> 
    <span style="color: blue;">&lt;</span><span style="color: maroon;">string</span> <span style="color: red;">name</span>="<span style="color: blue;">hello_world</span>"<span style="color: blue;">&gt;</span>Hello world!<span style="color: blue;">&lt;</span>/<span style="color: maroon;">string</span><span style="color: blue;">&gt;</span> 
    <span style="color: blue;">&lt;</span><span style="color: maroon;">string</span> <span style="color: red;">name</span>="<span style="color: blue;">action_settings</span>"<span style="color: blue;">&gt;</span>Settings<span style="color: blue;">&lt;</span>/<span style="color: maroon;">string</span><span style="color: blue;">&gt;</span> 

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">resources</span><span style="color: blue;">&gt;</span> 
</pre>
<ul>
	<li>Spanish:</li>
</ul>
<pre style="padding-left: 30px;"><span style="color: blue;">&lt;?</span><span style="color: maroon;">xml</span> <span style="color: red;">version</span>="<span style="color: blue;">1.0</span>" <span style="color: red;">encoding</span>="<span style="color: blue;">utf-8</span>"<span style="color: blue;">?&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">resources</span><span style="color: blue;">&gt;</span> 

    <span style="color: blue;">&lt;</span><span style="color: maroon;">string</span> <span style="color: red;">name</span>="<span style="color: blue;">app_name</span>"<span style="color: blue;">&gt;</span>Demostración Múltiples idiomas<span style="color: blue;">&lt;</span>/<span style="color: maroon;">string</span><span style="color: blue;">&gt;</span> 
    <span style="color: blue;">&lt;</span><span style="color: maroon;">string</span> <span style="color: red;">name</span>="<span style="color: blue;">hello_world</span>"<span style="color: blue;">&gt;</span>¡Hola, mundo <span style="color: blue;">&lt;</span>/<span style="color: maroon;">string</span><span style="color: blue;">&gt;</span> 

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">resources</span><span style="color: blue;">&gt;</span> 
</pre>
<ul>
	<li>French:</li>
</ul>
<pre style="padding-left: 30px;"><span style="color: blue;">&lt;?</span><span style="color: maroon;">xml</span> <span style="color: red;">version</span>="<span style="color: blue;">1.0</span>" <span style="color: red;">encoding</span>="<span style="color: blue;">utf-8</span>"<span style="color: blue;">?&gt;</span> 
<span style="color: blue;">&lt;</span><span style="color: maroon;">resources</span><span style="color: blue;">&gt;</span> 

    <span style="color: blue;">&lt;</span><span style="color: maroon;">string</span> <span style="color: red;">name</span>="<span style="color: blue;">app_name</span>"<span style="color: blue;">&gt;</span>Demo plusieurs langues<span style="color: blue;">&lt;</span>/<span style="color: maroon;">string</span><span style="color: blue;">&gt;</span> 
    <span style="color: blue;">&lt;</span><span style="color: maroon;">string</span> <span style="color: red;">name</span>="<span style="color: blue;">hello_world</span>"<span style="color: blue;">&gt;</span>Bonjour tout le monde <span style="color: blue;">&lt;</span>/<span style="color: maroon;">string</span><span style="color: blue;">&gt;</span> 

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">resources</span><span style="color: blue;">&gt;</span> 
</pre>
P/S: I used Google Translate for Spanish and French so please don't mind if there're any rediculous mistakes about translations.
<h2>C - Use String Resources</h2>
It's super easy to get the String resource value:
<ul>
	<li>Using in app code:</li>
</ul>
<pre style="padding-left: 30px;"><span style="color: green;">// Get a string resource from your app's Resources</span> 
String hello = getResources().getString(R.string.hello_world); 

<span style="color: green;">// Or supply a string resource to a method that requires a string</span>
TextView textView = <span style="color: blue;">new</span> TextView(<span style="color: blue;">this</span>);
textView.setText(R.string.hello_world);</pre>
<ul>
	<li>Using in XML layout:</li>
</ul>
<pre style="padding-left: 30px;"><span style="color: blue;">&lt;</span><span style="color: maroon;">RelativeLayout</span> <span style="color: red;">xmlns:android</span>="<span style="color: blue;">http://schemas.android.com/apk/res/android</span>" 
    <span style="color: red;">xmlns:tools</span>="<span style="color: blue;">http://schemas.android.com/tools</span>" 
    <span style="color: red;">android:layout_width</span>="<span style="color: blue;">match_parent</span>" 
    <span style="color: red;">android:layout_height</span>="<span style="color: blue;">match_parent</span>" 
    <span style="color: red;">android:paddingBottom</span>="<span style="color: blue;">@dimen/activity_vertical_margin</span>" 
    <span style="color: red;">android:paddingLeft</span>="<span style="color: blue;">@dimen/activity_horizontal_margin</span>" 
    <span style="color: red;">android:paddingRight</span>="<span style="color: blue;">@dimen/activity_horizontal_margin</span>" 
    <span style="color: red;">android:paddingTop</span>="<span style="color: blue;">@dimen/activity_vertical_margin</span>" 
    <span style="color: red;">tools:context</span>="<span style="color: blue;">ice.tea09.demomultiplelanguages.MainActivity$PlaceholderFragment</span>" <span style="color: blue;">&gt;</span> 

    <span style="color: blue;">&lt;</span><span style="color: maroon;">TextView</span> 
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">wrap_content</span>" 
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>" 
       <span style="text-decoration: underline;"><strong> <span style="color: red; text-decoration: underline;">android:text</span>="<span style="color: blue; text-decoration: underline;">@string/hello_world</span>"</strong></span> /<span style="color: blue;">&gt;</span> 

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">RelativeLayout</span><span style="color: blue;">&gt;</span> 
</pre>
And the result for this demo:
<ul>
	<li>Default:</li>
</ul>
<img class="size-full wp-image-1612 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/05/dèault.png" alt="dèault" width="482" height="185" />
<ul>
	<li>French:</li>
</ul>
<img class="size-full wp-image-1613 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/05/france.png" alt="france" width="486" height="164" />
<ul>
	<li>Spanish:</li>
</ul>
<img class="size-full wp-image-1614 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/05/spanish.png" alt="spanish" width="486" height="158" />
<h2>D - Download Source Code Support Multiple Languages in Android</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fNGVoVDh0dXNORFE/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fNGVoVDh0dXNORFE/edit?usp=sharing</a>
