---
layout: post
title:  Create SharePoint List
date: 2014-03-13 10:30
author: admin
comments: true
categories: [blog]
tags: [C Sharp, SharePoint]
---

<h2>A - What is SharePoint List</h2>
List is an important part in Windows SharePoint Services structure, is the main way to display data for users to input or retrieve.

We have many ways to create SharePoint List

In this post, I'll show you 2 common way that I usually use to create SharePoint List.

<!--more-->
<h2>B - Create SharePoint List using XML</h2>
Using this way, you have to be meticulous. Cause there're no place for mistake in an XML file! :)
<ul>
	<li>Create a List Definition</li>
</ul>
<img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/1.png" alt="1" width="690" height="475" />

<img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/2.jpg" alt="2" width="690" height="494" />
<p style="padding-left: 60px;"><em>(1): List Definition name</em></p>
<p style="padding-left: 60px;"><em>(2): Type of List Definition which created List inherited from (aka Parent List)</em></p>
<p style="padding-left: 60px;"><em>(3): Tick if you want to create a list instance for this list definition</em></p>
<p style="padding-left: 60px;">After follow all above steps, you will have this result:</p>
<img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/3.jpg" alt="3" width="219" height="461" />
<ul>
	<li>Update Element.xml file to define the content type of SharePoint List:</li>
</ul>
<img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/4.jpg" alt="4" width="485" height="679" />
<p style="padding-left: 60px;"><em>(1): Fields in the content type</em></p>
<p style="padding-left: 60px;"><em>(2): List content type definition</em></p>

<ul>
	<li>Update Schema.xml file to define all content type and the columns in List views.</li>
</ul>
<p style="padding-left: 60px;">Reference to the content type ID:</p>
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/5.jpg" alt="5" width="517" height="127" /></p>
<p style="text-align: left; padding-left: 60px;">Copy and paste the fields list of content type:</p>
<p style="text-align: center;"><img src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/6.jpg" alt="6" width="513" height="367" /></p>
<p style="text-align: left; padding-left: 60px;">At the View which has BaseViewID = 1, add &lt;ViewFields&gt; to declare all the fields you want to show on default view.</p>
<p style="text-align: left;"><img class="aligncenter" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/8.jpg" alt="8" width="690" height="221" /></p>

<ul>
	<li>Update Element.xml file to init some dummy data for List</li>
</ul>
<img class="aligncenter size-full wp-image-1060" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/7.jpg" alt="7" width="465" height="483" />
<ul>
	<li>The result after deployed:</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/71.jpg"><img class="aligncenter size-full wp-image-1062" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/71.jpg" alt="7" width="385" height="151" /></a>
<h2>C - Create SharePoint list programmatically using Event Reciever</h2>
<ul>
	<li>Open Feature Event Reciever code file (add new one if does not exist)</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/81.jpg"><img class="aligncenter size-full wp-image-1063" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/81.jpg" alt="8" width="288" height="345" /></a>
<ul>
	<li>Uncomment <strong>FeatureActivated</strong> method. This method will run when the feature activated. Add some code to check if the Movies list exists or not.</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/9.jpg"><img class="aligncenter size-full wp-image-1064" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/9.jpg" alt="9" width="680" height="224" /></a>
<ul>
	<li>Create Movies list inherited from <strong>CustomList</strong> (<strong>GenericList</strong>)</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/10.jpg"><img class="aligncenter size-full wp-image-1065" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/10.jpg" alt="10" width="690" height="42" /></a>

&nbsp;
<ul>
	<li>Add fields to Movies list. Remember to call <strong>Update()</strong> method after adding</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/11.jpg"><img class="aligncenter size-full wp-image-1066" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/11.jpg" alt="11" width="690" height="108" /></a>
<ul>
	<li>Define <strong>View</strong> for SharePoint list:</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/12.jpg"><img class="aligncenter size-full wp-image-1067" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/12.jpg" alt="12" width="648" height="115" /></a>
<ul>
	<li>Add some dummy data:</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/13.jpg"><img class="aligncenter size-full wp-image-1068" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/13.jpg" alt="13" width="312" height="87" /></a>
<ul>
	<li>Final result:</li>
</ul>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/07/14.jpg"><img class="aligncenter size-full wp-image-1069" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/14.jpg" alt="14" width="690" height="159" /></a>
<h2>D - Summary</h2>
I usually use the second way to create SharePoint List. Because of some following reasons:
<ol>
	<li>I'm not used to with the XML.</li>
	<li>Creating SharePoint List programmatically is very clear! And you know what you're doing!</li>
	<li>The most important reason: You cannot debug when using XML!</li>
</ol>
