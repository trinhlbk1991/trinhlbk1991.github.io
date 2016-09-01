---
layout: post
title: Tab Layout
date: 2014-02-06 11:44
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---

<h2>A - Introduction about Tab Layout</h2>
<span style="font-size: 14px; line-height: 1.5em;">To implement the content of a tab, we have 2 ways:</span>
<ul>
	<li>Using tab to navigate among views in a same activity</li>
	<li>Using tab to navigate among activities</li>
</ul>
In this post, I'll show you the second way.

<!--more-->
<h2>B - Step by step demo</h2>
Firstly, create a new project named TabLayout

Next, create 3 different activities: <em><strong>ArtistActivity, SongActivity, AlbumActivity.</strong></em> Each of these classes will represent for each tab.

In each class, we add a <strong>TextView</strong> to display the name of selected tab.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/1-7.png" alt="" />

<!--more-->

Don't forget to add &lt;activity&gt; tags into <strong>AndroidManifest.xml</strong> file for every new activity that you added into the project

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/7-3.png" alt="" />

Each tab will have a icon image. Those images will be stored in <strong>res/drawable/ </strong>folder. The tab's icon will have 2 images for 2 status: selected and non-selected - it will be defined in an selector xml file (stored in <strong>res/drawable/ </strong>folder too):

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/2-8.png" alt="" />

Move on to the <em><strong> main.xml</strong></em><strong> </strong>file with simple layout and components:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/3-7.png" alt="" />

The xml file above describes the common structure of a Tab Layout.

Every <strong>TabHost</strong> requires <strong>TabWidget</strong> and <strong>FrameLayout</strong> inside.
<h2><span style="color: #ff0000;">NOTE:</span></h2>
<blockquote>The id of  <strong>TabWidget</strong> and <strong>FrameLayout</strong> must be <em><strong>tabs</strong> </em>and <em><strong>tabcontent</strong></em>. Those are default id that TabHost will reference to.</blockquote>
&nbsp;

Next, let each activity class extends the <strong>TabActivity</strong> super class:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/4-6.png" alt="Tab Layout" />

Implement the <em><strong>onCreate()</strong></em><strong> </strong>method:

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/5-5.png" alt="Tab Layout" />

The <em><strong>getTabHost()</strong></em><strong> </strong>was used to reference to the TabHost layout.

Next, the <em><strong>TabHost.TabSpec</strong></em><strong> </strong>object was created to define the properties of each tabs via <em><strong>newTabSpec(String)</strong></em><strong> </strong>method.

To set the text and icon for each tabs, we use <em><strong>setIndicator(CharSequence, Drawable)</strong></em><strong> </strong>method.

Finally, to set the content, the activity for each tabs, we called <em><strong>setContent(Intent)</strong></em><strong> </strong>method.

At the bottom of the method, <em><strong>setCurrentTab(int)</strong></em> method was called to set the default tab.

Last but not least, set the theme for activity is <strong>Theme.NoTitleBar</strong>.

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/6-4.png" alt="Tab Layout" />

Run time!!!

<img class="aligncenter" src="http://i1189.photobucket.com/albums/z427/khanhtrinhspk/Image%20Source%20Code/8-3.png" alt="Tab Layout" />
<h2 style="text-align: left;">C - Download Source Code Tab Layout</h2>
<p style="text-align: left;"><a href="http://www.mediafire.com/?x9h5b8t8koy75eq" target="_blank">http://www.mediafire.com/?x9h5b8t8koy75eq</a></p>
