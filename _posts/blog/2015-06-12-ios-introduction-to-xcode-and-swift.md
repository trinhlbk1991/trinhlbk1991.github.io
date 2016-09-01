---
layout: post
title: iOS Tutorials - Introduction to Xcode and Swift
date: 2015-06-12 10:23
author: admin
comments: true
categories: [blog]
tags: [iOS, Swift]
image: https://c2.staticflickr.com/2/1568/24165316343_c8e59020f3_h.jpg
---
In this post, I'll show you a brief introduction to Xcode and Swift.
<h2>A - Create New Project using Xcode</h2>
The very first step is launching Xcode.
<br/>
On first time launching, Xcode will show you a welcome screen which can be disable on next time by unchecking the <strong>Show this window when Xcode launches</strong> checkbox.

<img id="yui_3_11_0_3_1434079225265_353" class="aligncenter" src="https://farm1.staticflickr.com/268/18710603751_dfc962245b_b.jpg" alt="Introduction to Xcode and Swift" />

Select <strong>Create a new Xcode project </strong>or choose <strong>File </strong>&gt;<strong> New </strong>&gt;<strong> Project</strong> if you already disabled the welcome screen.

<!--more-->

The project template dialog will pop up and provide some options like:
<ul>
	<li>Master-Detail Application</li>
	<li>Page-Based Application</li>
	<li>Single View Application</li>
	<li>Tabbed Application</li>
	<li>Game</li>
</ul>
<img id="yui_3_11_0_3_1434079221164_353" class="aligncenter" src="https://farm1.staticflickr.com/407/18710603741_f0582ba4e8_b.jpg" alt="Introduction to Xcode and Swift" />

Here, we will select the <strong>Single View Application</strong> template -  the simplest one. Other templates will be discussed in next several posts ;)

Then, another dialog appears and requires you to fill in all mandatory information:
<ul>
	<li>Product Name</li>
	<li>Organization Name</li>
	<li>Organization Identifier</li>
	<li>Bundle Identifier: will be generated base on product name and organization identifier</li>
	<li>Language: will be Swift</li>
	<li>Devices: you can select the target devices for the project is iPhone, iPad or Universal (compatible for both)</li>
	<li>Core Data: uncheck and will be discussed later</li>
</ul>
<img id="yui_3_11_0_3_1434079223124_370" class="aligncenter" src="https://farm1.staticflickr.com/307/18681926076_79960a2760_b.jpg" alt="Introduction to Xcode and Swift" />

Finally, you need to specify the project location:

<img id="yui_3_11_0_3_1434079230343_350" class="aligncenter" src="https://farm1.staticflickr.com/465/18708262915_4a76a55a7d_b.jpg" alt="Introduction to Xcode and Swift"  />And tada!
<h2><img id="yui_3_11_0_3_1434079227781_353" class="aligncenter" src="https://farm1.staticflickr.com/414/18522025609_5da357c183_b.jpg" alt="Introduction to Xcode and Swift"/></h2>
&nbsp;
<h2>B - Swift Introduction</h2>
What is Swift? Quoted from Apple Developer page:
<blockquote>Swift is a new programming language for iOS, OS X, and watchOS apps that builds on the best of C and Objective-C, without the constraints of C compatibility. Swift adopts safe programming patterns and adds modern features to make programming easier, more flexible, and more fun. Swift’s clean slate, backed by the mature and much-loved Cocoa and Cocoa Touch frameworks, is an opportunity to reimagine how software development works.</blockquote>
To understand more about Swift, please refer the Apple documentation <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/index.html#//apple_ref/doc/uid/TP40014097-CH3-ID0" target="_blank">here</a>.

But, I recommend that you should download the playground file and play with it.

Playground file allows you to edit the code and see the result immediately.

Link to download playground file: <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.playground.zip" target="_blank">https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.playground.zip</a>
<h2>C - Create First Hello World Project</h2>
After playing a little bit with Swift to get familiar with its syntax and structure, now we should follow the traditional step when started learning new language - create Hello World project!

Firstly, please follow <strong>A - Create New Project using Xcode</strong> to create a new project.

After created, let's take a look at the Project Navigator and expand to see all sub folders:

<img class=" aligncenter" src="https://farm4.staticflickr.com/3883/18211272633_394128586f_o.png" alt="" />
<ul>
	<li><strong>HelloWorld</strong>: contains most of your code to make up the application's user interface and implement its behavior. You can create sub folders to manage your code easier.
<ul>
	<li><strong>Main.storyboard</strong>: contains the user interface elements specific to your project’s
main view controller</li>
	<li><strong>SupportingFiles</strong>: contains files and resources that are necessary to your project</li>
</ul>
</li>
	<li><strong>HelloWorldTests</strong>: contains unit test files for the application</li>
	<li><strong>Products</strong>: contains the application that project produces when it is built</li>
</ul>
As you known, our task for this simple Hello World project is displaying "Hello World" on the phone screen.

To achieve that, we have to modify the app's user interface by updating <strong>Main.storyboard.</strong>

When you open <strong>Main.storyboard</strong>, you'll see a square on the screen. That square represents the screen of iOS device and is adaptive to screen size (iPhone or iPad).

To put a label on screen, drag and drop <strong>Label</strong> object from <strong>Object Library</strong> to the view.

<img class=" aligncenter" src="https://farm6.staticflickr.com/5574/18805671326_7e5969c228_b.jpg" alt="" />

Double click on Label to change text to "Hello World!!!".

Now we can run the application and observe the result.

We expect that the label will be aligned center of the screen but the actual result is quite not true.

<img class=" aligncenter" src="https://farm4.staticflickr.com/3815/18834598301_12eda29959_b.jpg" alt="" />

Like I said, the application's view supposes to be adaptive with screen sizes. In order to do that, you have to provide some rules, some constrains to guide the view how to react with different screen sizes.

To add constrains into view, firstly you have to select the view.

Then, look at the <strong>Auto Layout</strong> buttons at the bottom right of the storyboard editor, you'll see 3 buttons:

<img class=" aligncenter" src="https://farm6.staticflickr.com/5509/18645757529_bb0c85a2d8_o.png" alt="" />
<ul>
	<li><strong>Align</strong>: lets you align the selected view relative to another view
<ul>
	<li><strong>Leading Edges, Trailing Edges, Top Edges, Bottom Edges:</strong> these constrains are similar to Left, Right, Top and Bottom margins</li>
	<li><strong>Horizontal Centers, Vertical Centers</strong>: aligns center horizontally or vertically with other view</li>
	<li><strong>Baselines</strong>: only available when you select two or more items and all have baselines</li>
	<li><strong>Horizontal Center in Container, Vertical Center in Container</strong>: aligns center horizontally or vertically inside the view's container</li>
</ul>
</li>
	<li><strong>Pin</strong>: let you set the position of a view relative to other views and to apply size constraints
<ul>
	<li><strong>Width, Height</strong>: sets the width or height of the selected item</li>
	<li><strong>Equal Widths, Equal Heights</strong>: sets equal widths or heights for multiple selected items</li>
	<li><strong>Aspect Ratio</strong>: set an aspect ratio constraint for the selected item (or items). If you select Aspect Ratio for single item, the item's width will be used as the numerator for the ratio and the item's height will be used for the denominator. If you select Aspect Ratio for multiple items, Auto Layout chooses the width of one of the items for the numerator and the height of another item for the denominator.</li>
</ul>
</li>
	<li><strong>Resolve</strong> <strong>Auto Layout Issues</strong>: lets you correct all the layout problems</li>
</ul>
In this demo, we will select both <strong>Horizontal Center in Container </strong>and<strong> Vertical Center in Container </strong>for the Hello World label. Remember to select Add Constrains:

<img class=" aligncenter" src="https://farm6.staticflickr.com/5468/18834598241_a141ca1967_b.jpg" alt="" />

BTW, we can preview the layout on multiple devices without running the application.

To do that, open the <strong>Assistant Editor</strong>. At the left of the jump bar at the top of the <strong>Assistant Editor</strong>, you'll see that we currently select <strong>Automatic</strong> or <strong>Manual</strong>. Click on that and select <strong>Preview</strong>.

<img class=" aligncenter" src="https://farm4.staticflickr.com/3954/18211272713_f7980ce7fe_o.png" alt="" />

To add more devices into <strong>Preview</strong> mode, select the "+" button at bottom left of the <strong>Preview</strong> window.

<img class=" aligncenter" src="https://farm4.staticflickr.com/3856/18834598041_3bfd827e1b_b.jpg" alt="" />

Because this post's demo is very simple, I won't share the source code :D
