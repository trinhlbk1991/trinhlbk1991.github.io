---
layout: post
title:  Create Webpart
date: 2014-03-13 09:53
author: admin
comments: true
categories: [blog]
tags: [C Sharp, SharePoint]
---

<h2>A - What is Webpart?</h2>
Webpart is a server-side control which placed in special pages called Webpart Page.

In a Webpart Page, there're many Webpart zone to contain Webpart.

&nbsp;
<h2>B - Webpart Item</h2>
<table style="border: 1px solid #bbb;">
<tbody style="border: 1px solid #bbb;">
<tr>
<th>File</th>
<th>Description</th>
</tr>
<tr>
<td>Elements.xml</td>
<td>   Contains all the information to define the Feature in project, used to deploy Webparts</td>
</tr>
<tr>
<td>.webpart file</td>
<td>   Provides all necessary information for SharePoint to display Webpart in the Webpart Gallery</td>
</tr>
<tr>
<td>Code File</td>
<td>   Contains all the methods to add User Control into Webpart and generate all content of Webpart</td>
</tr>
</tbody>
</table>
<h2><!--more--></h2>
<h2>C - How to create Webpart</h2>
In this post, I'll show you a simple example about creating a Webpart.

The demo final result is a simple Webpart that display all basic information of a movie when user click on a Dropdown list item.

Firstly, create a Movie entity class to store the movie information:

<img class="aligncenter" alt="movie" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/movie.jpg" width="377" height="247" />

In the SharePoint project, add new a Visual Webpart and name it "MovieInfo":

<img alt="visual wp" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/visual-wp.jpg" width="690" height="483" />

After created, you can see the structure of a Visual Webpart:

<img class="aligncenter" alt="wp explorer" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/wp-explorer.png" width="300" height="422" />

Open MovieInforUserControl.ascx and edit like below. This file will define the UI of webpart.

<img alt="ui" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/ui.jpg" width="690" height="555" />

Then, open MovieInforUserControl.ascx.cs to implement the code behind of webpart:
<ul>
	<li>Bind Movie list to the ListBox</li>
	<li>Handle <strong>SelectedIndexChange</strong> event</li>
</ul>
<img class="aligncenter size-full wp-image-1041" alt="codebehind" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/codebehind.jpg" width="690" height="566" />

Done!

Now you got a simple webpart!

To deploy the project, you have to enter the value for <strong>SiteURL</strong> property.

<img class="aligncenter" alt="property" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/property.jpg" width="297" height="603" />

Right click on the project ---&gt; Select Deploy ---&gt; Wait and enjoy the result:

<img class="aligncenter" alt="wp1" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/wp1.jpg" width="484" height="367" />

<img class="aligncenter size-full wp-image-1042" alt="final" src="http://trinhle.icetea09.com/wp-content/uploads/2013/07/final.jpg" width="441" height="622" />In conclusion,  create Webpart in Sharepoint is very similar to create UserControl in ASP.Net right?
