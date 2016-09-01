---
layout: post
title: SQLite
date: 2014-03-03 10:43
author: trinh_le
comments: true
categories: [blog]
tags: [Java, Android]
---

<h2>A - Brief introduction</h2>
In mobility development, we usually use SQLite to store a small and light local relational database.

Because of its light weight, the system will take only small time to handle data retrieval process and small storage to store the database file.
<h2>B - Some basic of SQLite</h2>
There're 2 important class you must know if you want to use SQLite in Android application:
<ul>
	<li><strong>SQLiteOpenHelper</strong>: Handle all tasks related to creating, upgrading, opening/closing connections of a database</li>
	<li><strong>SQLiteDatabase</strong>: Take responsibility for executing SQL statements</li>
</ul>
<!--more-->

To create a new SQLite database, Firstly, create a new class that extends <strong>SQLiteOpenHelper </strong>class:
<ul>
	<li><strong>Constructor</strong>: provide all necessary arguments for creating database and retrieving data</li>
	<li><strong>onCreate()</strong>: create a file to store database, create all the needed table and input some initial data</li>
	<li><strong>onUpgrade()</strong>: upgrade all table in the database</li>
</ul>
<h2>C - Demo Application</h2>
To understand clearer about how to use SQLite, let's take a tour with this demo application.

Description:
<blockquote>This demo application allows user input ID, Name and Phone to store in the local database.

The SQLite database has only one table with 3 columns:</blockquote>
<ul>
	<li>
<blockquote>id - primary key</blockquote>
</li>
	<li>
<blockquote>name</blockquote>
</li>
	<li>
<blockquote>phone</blockquote>
</li>
</ul>
First of all, create all the constant string to store database name, table name, key names,...

<a href="http://trinhle.icetea09.com/wp-content/uploads/2012/08/3.png"><img class="aligncenter" title="3" alt="" src="http://trinhle.icetea09.com/wp-content/uploads/2012/08/3.png" width="435" height="131" /></a>

<a href="http://trinhle.icetea09.com/wp-content/uploads/2012/08/4.png"><img class="aligncenter" title="4" alt="" src="http://trinhle.icetea09.com/wp-content/uploads/2012/08/4.png" width="543" height="90" /></a>

Implement the constructors and override all the extended methods like <strong>onCreate</strong>, <strong>onUpgrade</strong>:

<a href="http://trinhle.icetea09.com/wp-content/uploads/2012/08/5.png"><img class="aligncenter" title="5" alt="" src="http://trinhle.icetea09.com/wp-content/uploads/2012/08/5.png" width="530" height="221" /></a>

Create some methods for retrieving data from database:

<a href="http://trinhle.icetea09.com/wp-content/uploads/2012/08/6.png"><img class="aligncenter" title="6" alt="" src="http://trinhle.icetea09.com/wp-content/uploads/2012/08/6.png" width="750" height="922" /></a>

The result when running application:

<a href="http://trinhle.icetea09.com/wp-content/uploads/2012/08/1.png"><img class="aligncenter size-full wp-image-785" title="1" alt="" src="http://trinhle.icetea09.com/wp-content/uploads/2012/08/1.png" width="216" height="348" /></a>

<a href="http://trinhle.icetea09.com/wp-content/uploads/2012/08/2.png"><img class="aligncenter size-full wp-image-786" title="2" alt="" src="http://trinhle.icetea09.com/wp-content/uploads/2012/08/2.png" width="773" height="175" /></a>
<h2>D - Source code</h2>
<a href="http://www.mediafire.com/download.php?7wb82122d4znkib">http://www.mediafire.com/download.php?7wb82122d4znkib</a>
