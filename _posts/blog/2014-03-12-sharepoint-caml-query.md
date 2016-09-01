---
layout: post
title:  CAML Query
date: 2014-03-12 10:07
author: admin
comments: true
categories: [blog]
tags: [C Sharp, SharePoint]
---
<h2>A - What is CAML Query?</h2>
CAML stands for <b>Collaborative Application Markup Language </b>(too long to remember <img id="smilie_242" style="font-size: 14px; line-height: 1.5em;" title="Sweat" alt=":sweat:" src="http://vozforums.com/images/smilies/Off/sweat.gif" />)

CAML Query is used to retrieve data from SharePoint List like using SQL statement to retrieve data from MSSQL.
<h2>B - How to retrieve data using CAML Query</h2>
<ul>
	<li><strong>SharePoint Object Model</strong>: used when your code run at server side</li>
	<li><strong>SharePoint List</strong> <strong>web service</strong>: used when your code run at client side</li>
	<li><strong>Powershell</strong>: used when you want to quick retrieve some items in list</li>
</ul>
<h1><!--more--></h1>
<h2>C - CAML Query schema</h2>
CAML Query is a markup language based on XML, so it's a collection of tags with the root tag is <strong>&lt;Query&gt;</strong>.

In <strong>&lt;Query&gt;</strong> tag, there're 2 main tags:
<ul>
	<li><strong>Where</strong>: describe the condition for data retrieving</li>
	<li><strong>Order</strong>: describe the order of return result</li>
</ul>
For example:
<pre><span style="color: blue;">&lt;</span><span style="color: maroon;">Query</span><span style="color: blue;">&gt;</span> 
   <span style="color: blue;">&lt;</span><span style="color: maroon;">Where</span><span style="color: blue;">&gt;</span> 
      <span style="color: blue;">&lt;</span><span style="color: maroon;">Or</span><span style="color: blue;">&gt;</span> 
         <span style="color: blue;">&lt;</span><span style="color: maroon;">Gt</span><span style="color: blue;">&gt;</span> 
            <span style="color: blue;">&lt;</span><span style="color: maroon;">FieldRef</span> <span style="color: red;">Name</span>="<span style="color: blue;">Price</span>" /<span style="color: blue;">&gt;</span> 
            <span style="color: blue;">&lt;</span><span style="color: maroon;">Value</span> <span style="color: red;">Type</span>="<span style="color: blue;">Number</span>"<span style="color: blue;">&gt;</span>4<span style="color: blue;">&lt;</span>/<span style="color: maroon;">Value</span><span style="color: blue;">&gt;</span> 
         <span style="color: blue;">&lt;</span>/<span style="color: maroon;">Gt</span><span style="color: blue;">&gt;</span> 
         <span style="color: blue;">&lt;</span><span style="color: maroon;">Eq</span><span style="color: blue;">&gt;</span> 
            <span style="color: blue;">&lt;</span><span style="color: maroon;">FieldRef</span> <span style="color: red;">Name</span>="<span style="color: blue;">ID</span>" /<span style="color: blue;">&gt;</span> 
            <span style="color: blue;">&lt;</span><span style="color: maroon;">Value</span> <span style="color: red;">Type</span>="<span style="color: blue;">Counter</span>"<span style="color: blue;">&gt;</span>2<span style="color: blue;">&lt;</span>/<span style="color: maroon;">Value</span><span style="color: blue;">&gt;</span> 
         <span style="color: blue;">&lt;</span>/<span style="color: maroon;">Eq</span><span style="color: blue;">&gt;</span> 
      <span style="color: blue;">&lt;</span>/<span style="color: maroon;">Or</span><span style="color: blue;">&gt;</span> 
   <span style="color: blue;">&lt;</span>/<span style="color: maroon;">Where</span><span style="color: blue;">&gt;</span> 
   <span style="color: blue;">&lt;</span><span style="color: maroon;">OrderBy</span><span style="color: blue;">&gt;</span> 
      <span style="color: blue;">&lt;</span><span style="color: maroon;">FieldRef</span> <span style="color: red;">Name</span>='Producer'/<span style="color: blue;">&gt;</span> 
   <span style="color: blue;">&lt;</span>/<span style="color: maroon;">OrderBy</span><span style="color: blue;">&gt;</span> 
<span style="color: blue;">&lt;</span>/<span style="color: maroon;">Query</span><span style="color: blue;">&gt;</span></pre>
The above query will return all the items which has <strong>Price</strong> greater than 4 and <strong>ID</strong> equals to 2. The return result will be sorted ascending by <strong>Producer</strong>.
<h2>D - Where tag</h2>
<strong>&lt;Where&gt;</strong> tag provides 2 type of operator for describe the retrieving condition.
<ul>
	<li>Logical operator: AND &amp; OR</li>
	<li>Comparison operator:</li>
</ul>
<table>
<tbody>
<tr>
<td>CAML Tag</td>
<td>Usage</td>
</tr>
<tr>
<td>Eq</td>
<td>=</td>
</tr>
<tr>
<td>Gt</td>
<td>&gt;</td>
</tr>
<tr>
<td>Lt</td>
<td>&lt;</td>
</tr>
<tr>
<td>Geq</td>
<td>&gt;=</td>
</tr>
<tr>
<td>Geq</td>
<td>&gt;=</td>
</tr>
<tr>
<td>Leq</td>
<td>&lt;=</td>
</tr>
<tr>
<td>Neq</td>
<td>&lt;&gt;</td>
</tr>
<tr>
<td>Contains</td>
<td>Like</td>
</tr>
<tr>
<td>IsNull</td>
<td>Null</td>
</tr>
<tr>
<td>IsNotNull</td>
<td>Not Null</td>
</tr>
<tr>
<td>BeginsWith</td>
<td>Start with word like...</td>
</tr>
<tr>
<td>DateRangeOverlap</td>
<td>Compared Date overlap or not</td>
</tr>
</tbody>
</table>
<h2>E - Order tag</h2>
Used to sort the return result ascending or descending by a specific field.
<h2>F - GroupBy tag</h2>
Used to group data by a specific field.
<h2>G - Using CAML Query via SharePoint Object Model</h2>
In this demo, I'll write a method to return all "hot" movies <img alt=":beauty:" src="http://vozforums.com/images/smilies/Off/beauty.gif" /> which has the <strong>Price</strong> greater than the input value.

Firstly, get the current SPSite object. Remember to use <strong>using</strong> keyword to dispose object after used.

<code><strong> <img class="aligncenter size-full wp-image-1076" alt="1" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/1.jpg" width="503" height="161" /> <a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/2.jpg">
</a></strong></code>

Get the current <strong>SPWeb</strong> object:
<div><strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/2.jpg"><img class="aligncenter" alt="2" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/2.jpg" width="489" height="212" /></a></strong></div>
Get the <strong>SPList</strong> object of the source data list:

<strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/3.jpg"><img class="aligncenter" alt="3" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/3.jpg" width="495" height="217" /></a></strong>

Check if the <strong>Movie</strong> list exists, try to retrieve data. Unless, return null value.

<strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/4.jpg"><img class="aligncenter" alt="4" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/4.jpg" width="492" height="328" /></a></strong>

To retrieve data using CAML Query, we need to:
<ul>
	<li>Create an instance of <strong>SPQuery</strong></li>
	<li>Set <strong>SPQuery.Query</strong> by the CAML query statement. <span style="color: #ff0000;"><strong>Note that you must exclude the &lt;Query&gt; tag, unless your query never run!!!</strong></span><img alt=":sweat:" src="http://vozforums.com/images/smilies/Off/sweat.gif" /></li>
	<li>Call the<strong> SPList.GetItems()</strong> method:</li>
</ul>
<strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/5.jpg"><img class="aligncenter" alt="5" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/5.jpg" width="611" height="307" /></a></strong>

When you have the return result, parse them into desired entity:

<strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/6.jpg"><img class="aligncenter" alt="6" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/6.jpg" width="611" height="430" /></a></strong>

Here's the dummy data in <strong>Movie</strong> list:

<strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/7.jpg"><img class="aligncenter" alt="7" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/7.jpg" width="611" height="139" /></a></strong>

Demo result:

<strong><a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/8.jpg"><img class="aligncenter" alt="8" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/8.jpg" width="611" height="459" /></a></strong>
<h2>H - Summary</h2>
Typically, no one write CAML query manually <img id="smilie_208" title="Adore" alt=":adore:" src="http://vozforums.com/images/smilies/Off/adore.gif" /> We're recommended to use CAML Builder for minimum effort and most accurate result <img id="smilie_224" title="Beauty" alt=":beauty:" src="http://vozforums.com/images/smilies/Off/beauty.gif" />

You can download CAML Builder with below link:

<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/u2u-caml-query-builder-v2-1-0-0_query-caml-zip.png">http://trinhle.icetea09.com/wp-content/uploads/2013/08/u2u-caml-query-builder-v2-1-0-0_query-caml-zip.png</a>

Instruction:
<blockquote>Right click ---&gt; Save As Image ---&gt;  Rename to "u2u-caml-query-builder-v2-1-0-0_query-caml.<span style="color: #ff0000;"><strong>zip</strong></span>" ---&gt; Extract it!</blockquote>
<h1>I - Source code</h1>
<a href="http://trinhle.icetea09.com/wp-content/uploads/2013/08/moviedemo-zip.key">http://trinhle.icetea09.com/wp-content/uploads/2013/08/moviedemo-zip.key</a>

After downloaded, change the file extension to <span style="color: #ff0000;"><strong>zip</strong> </span>and extract it.
