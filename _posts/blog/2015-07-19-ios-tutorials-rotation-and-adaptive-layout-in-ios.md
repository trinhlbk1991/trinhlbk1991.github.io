---
layout: post
title: iOS Tutorials - Rotation and Adaptive Layout in iOS
date: 2015-07-19 11:58
author: Trinh Le
comments: true
categories: [blog]
tags: [iOS, Swift]
image: https://c2.staticflickr.com/2/1590/24165316373_4ec804dd37_o.jpg
---

In this post, you will learn:
<ul>
	<li>An overview of autorotation in iOS</li>
	<li>How to support rotation in your application</li>
	<li>How to create multiple layouts to handle different screen sizes and device rotation</li>
</ul>

&nbsp;
<h2><b>A - Overview of Autorotation</b></h2>
Supporting both portrait and landscape mode is not always a good idea for every apps.

We recommend that:
<ul>
	<li>With iPhone application: enable autorotation if it enhances user experience</li>
	<li>With iPad: disable autorotation only if you have compelling reasons</li>
</ul>
When device rotates, the horizontal and vertical dimensions switch around.

On iPad, if your app shows status bar, the vertical dimension will be deducted 20 points.

On iPhone, because of iOS 8, the status bar is hidden in landscape orientation.

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Image2.png" alt="Rotation and Adaptive Layout in iOS" />

<h3>Point and Pixel</h3>
Like you can see, I mentioned about <b>point </b>when specify dimensions or distances.

In iOS development, we use <b>point </b>instead of <b>pixel</b>.

The reason is <b>Retina display</b> (high-resolution screen).
<table>
<tbody>
<tr>
<td>Older iPhone, iPad, iPad 2, and iPad Mini 1</td>
<td>1 point = 1 pixel</td>
</tr>
<tr>
<td>From iPhone 4, iPads, and iPod touches</td>
<td>1 point = 4 pixels square (2 pixels width x 2 pixels height)</td>
</tr>
<tr>
<td>iPhone 6 Plus</td>
<td>1 point = 9 pixels square (3 pixels width x 3 pixels height)</td>
</tr>
</tbody>
</table>
&nbsp;
<h2><b>B - Choose Your View Orientation</b></h2>
There're 2 ways to set the view supports interface rotation:
<ul>
	<li>App level settings that apply to all views</li>
	<li>View level setting which apply to selected view only</li>
</ul>
<h3>1. Supported Orientations at the App Level</h3>
Select <b>General </b>tab of <b>Project Navigator</b>:

Look at <b>Deployment Info </b>section.

In <b>Device Orientation</b> section, you have to select all orientations that your app will support.

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-06-26%20at%206.24.34%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="683" height="626" />

You can see that <b>Upside Down</b> was unchecked by default. That's because, if the phone rings while it is being held upside down, the phone is not likely to remain upside down when you answer it.

If you select <b>iPad </b>in <b>Devices</b>, four checkboxes will be selected because iPad supports every orientations.
<h3>2. Supported Orientations at the View Controller Level</h3>
View Controller can only enable the orientations that was included in App settings above.

For example, if the app doesn't support Landscape Left, there's no way you can force an individual view to rotate the display to landscape left!

To set the supporting orientation in View Controller, we need to implement the <strong>supportedInterfaceOrientations()</strong> function which is defined in <strong>UIViewController</strong> superclass:

&nbsp;
<pre class="lang:default decode:true">override func supportedInterfaceOrientations() -&gt; Int {

	return Int(UIInterfaceOrientationMask.Portrait.rawValue)
	| Int(UIInterfaceOrientationMask.LandscapeLeft.rawValue)

}</pre>
All the available orientations value that UIKit defines are:
<ul>
	<li>UIInterfaceOrientationMask.Portrait</li>
	<li>UIInterfaceOrientationMask.LandscapeLeft</li>
	<li>UIInterfaceOrientationMask.LandscapeRight</li>
	<li>UIInterfaceOrientationMask.PortraitUpsideDown</li>
	<li>UIInterfaceOrientationMask.Landscape</li>
	<li>UIInterfaceOrientationMask.All</li>
	<li>UIInterfaceOrientationMask.AllButUpsideDown</li>
</ul>
Now, we'll apply these orientation settings to the demo app in previous post:

To rotate the emulator, press # + arrow keys:

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-06-26%20at%206.26.52%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="1012" height="596" />

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-06-26%20at%206.27.02%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="1009" height="592" />

If you noticed, all the controls were located pretty good thanks to all the constraints that we defined for each control.

But, personally, I feel this layout is not well-designed enough. I want something like this, to use all the blank spaces:

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-06-26%20at%206.58.37%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="1010" height="595" />

How can I achieve that? Let's move to next section and find out!
<h2><b>C - Create Adaptive Layout</b></h2>
If you look at bottom of the Storyboard Editor, you'll see the label w<b>Any</b> x h<b>Any</b>.

Click on that label and a pop-up will appear - that is <b>Size Classes</b> control:

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-06-26%20at%206.22.22%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="266" height="329" />

A <b>size class</b> is a loose classification of the width or the height of a device. There're 2 value of size class:
<ul>
	<li>Compact</li>
	<li>Regular</li>
</ul>
The table below demonstrates the mapping between size classes and devices' orientation:
<table>
<tbody>
<tr>
<td>Width</td>
<td>Height</td>
<td>Devices' orientation</td>
</tr>
<tr>
<td>Compact</td>
<td>Compact</td>
<td>All iPhones, except iPhone 6 Plus, in landscape</td>
</tr>
<tr>
<td>Compact</td>
<td>Regular</td>
<td>All iPhones in portrait</td>
</tr>
<tr>
<td>Regular</td>
<td>Compact</td>
<td>iPhone 6 Plus in landscape</td>
</tr>
<tr>
<td>Regular</td>
<td>Regular</td>
<td>All iPads in both landscape and portrait</td>
</tr>
</tbody>
</table>
Now, let's use Size Classes control to modify layout for iPhone in landscape.

Based on the table above, size class height must be <b>Compact</b>. The width can be <b>Regular </b>(for iPhone 6 Plus) or <b>Compact </b>(for other iPhones), so size class width will be <b>Any</b>.

After changed size class value, the Storyboard Editor will update to look more like iPhones in landscape:

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-06-26%20at%206.28.54%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="1306" height="607" />

When switching to other size class, to update the View layout, you can;
<ul>
	<li>Add, modify or remove constraints</li>
	<li>Add, modify or remove views</li>
	<li>Change fonts style of some UI Kit controls (in iOS 8, UILabel, UITextField, UITextView, and UIButton support this)</li>
</ul>
In our case, we only need to update constraints to achieve desired layout like this:

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-06-26%20at%206.59.06%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="1242" height="579" />

You can run the application on different emulators and observe the final result. Or easier, you can look at the Preview mode.
<h2><b>D - Adaptive Font</b></h2>
Now I'm ok with the adaptive layout. But I feel that the font size in iPad is quite small and I want to increase it without affecting other layouts.

To achieve that, you need to:
<ol>
	<li>Switch back to base layout (any width, any height)</li>
	<li>Select the label you want to increase the font size</li>
	<li>In the <strong>Attributes Inspector</strong> → Click on the <strong>+ </strong>sign beside the<strong> Font</strong> property.</li>
	<li>Pick the size class that you want to change Font size and update the current value.</li>
</ol>
<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-07-19%20at%2011.55.34%20AM.png" alt="Rotation and Adaptive Layout in iOS" width="273" height="205" />

Observe the changes in preview mode:

<img class="aligncenter" src="https://raw.githubusercontent.com/trinhlbk1991/DemoBasiciOSControls/develop/images/Screen%20Shot%202015-07-19%20at%2010.38.38%20AM.png" alt="" width="789" height="348" />
<h2><b>E - Source Code:</b></h2>
<a href="https://github.com/trinhlbk1991/DemoBasiciOSControls" target="_blank">https://github.com/trinhlbk1991/DemoBasiciOSControls</a>

So, that's it for this post :)

I know this post is very simple but I hope you enjoy this series.

If you have any concerns or questions, please leave a comment below.
