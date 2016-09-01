---
layout: post
title:  AngularJS Module
date: 2014-10-15 16:37
author: admin
comments: true
categories: [blog]
tags: [AngularJS, Web, JavaScript]
---

<h2>A - What is Module?</h2>
Module is a container of all your app's components - controllers, services, filters, directives, etc.

Like I mentioned before in <a title="[AngularJS] AngularJS Introduction" href="http://icetea09.com/blog/2014/10/14/angularjs-angularjs-introduction/" target="_blank">this</a> post, Module's role are:
<p style="padding-left: 30px;">-   Associate <strong>ng-app</strong> with a region of HTML file</p>
<p style="padding-left: 30px;">-   Organize the code and components, make your application more readable, and keep the global namespace clean</p>
<p style="padding-left: 30px;">-   Be a gateway to access key Angular features</p>
 <!--more-->
<h2>B - Create a Module object</h2>
As you know, Module associates an <strong>ng-app</strong> with a region of HTML file. So, to create a Module object, the very first prerequisite is creating an <strong>ng-app.</strong>

To do that, you just simply define

{% highlight html %}
ng-app="app_name"
{% endhighlight %}

attribute for the HTML region (head, body, div,...).

For example:

{% highlight html %}
<body ng-app="myApp">
{% endhighlight %}

Then, define your module:

{% highlight javascript %}
var myApp = angular.module("myApp",[]);
{% endhighlight %}

with:
<p style="padding-left: 30px;">+   "myApp" is your app name - the one you created above</p>
<p style="padding-left: 30px;">+   [] is a list of dependencies. Although there's no dependency, you should declare it explicitly.</p>
Now you've done creating an Module object :)

Below is a very simple about AngularJS Module and Controller, just to show you an overview about Module. About Controller, I'll have a detais post later.

HTML:

{% highlight html %}
<!DOCTYPE html>
<html <strong><em>ng-app="myApp"</em></strong> >
<head>
	<title>AngularJS Demo</title>
	<link href="bootstrap.css" rel="stylesheet" />
	<link href="bootstrap-theme.css" rel="stylesheet" />
	<script src="angular.js"></script>
</head>

<body>
	<div class="panel" ng-controller="dayCtrl">
		<div class="page-header">
			<h3>AngularJS App</h3>
		</div>
		<h4 highlight="Sunday">Today is {{day || "(unknown)"}}</h4>
		<h4>Tomorrow is {{tomorrow || "(unknown)"}}</h4>
	</div>
</body>
</html>
{% endhighlight %}

JavaScript:

{% highlight javascript %}
var myApp = angular.module("myApp", []);
myApp.controller("dayCtrl", function ($scope) {
	var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	$scope.day = dayNames[new Date().getDay()];
	$scope.tomorrow = dayNames[(new Date().getDay() + 1) % 7];
});
{% endhighlight %}

Result:

<img class="size-full wp-image-1901 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/10/module1.jpg" alt="module1" width="263" height="181" />
<h2>C - Module object's members</h2>
<table>
<thead>
<tr>
<td>Name</td>
<td>Description</td>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>Returns the name of the module.</td>
</tr>
<tr>
<td>value(name, value)</td>
<td>Defines a service that returns a constant value</td>
</tr>
<tr>
<td>constant(key, value)</td>
<td>Defines a service that returns a constant value.</td>
</tr>
<tr>
<td>config(callback)</td>
<td>Registers a function that can be used to configure a module when it is loaded.</td>
</tr>
<tr>
<td>run(callback)</td>
<td>Registers a function that is invoked after AngularJS has loaded and configured all of the modules.</td>
</tr>
<tr>
<td>controller(name, constructor)</td>
<td>Creates a controller. Will be discussed more details in later post.</td>
</tr>
<tr>
<td>directive(name, factory)</td>
<td>Creates a directive. Will be discussed more details in later post.</td>
</tr>
<tr>
<td>filter(name, factory)</td>
<td>Creates a filter that formats data for display to the user. Will be discussed more details in later post.</td>
</tr>
<tr>
<td>service(name, constructor)</td>
<td>Creates a service. Will be discussed more details in later post.</td>
</tr>
<tr>
<td>factory(name, provider)</td>
<td>Creates a service. Will be discussed more details in later post.</td>
</tr>
<tr>
<td>provider(name, type)</td>
<td>Creates a service. Will be discussed more details in later post.</td>
</tr>
<tr>
<td>animation(name, factory)</td>
<td>Supports the animation feature. Will be discussed more details in later post.</td>
</tr>
</tbody>
</table>
<h2>D - Organize code with Module</h2>
You must know that when creating a Module object, we have to pass a list of dependencies. Base on that, any AngularJS Module can rely on components defined in other modules. And this feature help you organize your code easier in a complex application.

This idea is demonstrated in the below figure:

<img class="size-full wp-image-1904 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/10/module3.jpg" alt="module3" width="683" height="356" />

About specific example, please move to next section.
<h2>E - Module Life Cycle</h2>
Two methods <strong>config(callback)</strong> and <strong>run(callback)</strong> will be invoked at key moments in the life cycle of AngularJS Module.

AngularJS always makes sure that modules on which there are dependencies have their callbacks invoked first.

Please look at below example for a clearer idea about what I'm saying LOL

I create another module that <strong>myApp</strong> depends on:

{% highlight javascript %}
var requiredApp = angular.module("requiredApp", []);
requiredApp.config(function(){
	console.log("requiredApp.config() run");
});

requiredApp.run(function(){
	console.log("requiredApp.run() run");
});
{% endhighlight %}

After that, I add <strong>requireApp</strong> to dependencies list of <strong>myApp. </strong>This is also the example for using module to organize your code :)

{% highlight javascript %}
var myApp = angular.module("myApp", ["requiredApp"]);
{% endhighlight %}

And implement 2 event methods of <strong>myApp</strong>:

{% highlight javascript %}
myApp.config(function(){
	console.log("myApp.config() run");
});

myApp.run(function(){
	console.log("myApp.run() run");
});
{% endhighlight %}

Run it and observe the result:

<img class="size-full wp-image-1903 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/10/module2.jpg" alt="module2" width="474" height="149" />
<h2>F - Source Code demo AngularJS Module</h2>
<a href="https://docs.google.com/file/d/0Bw3dwdSezn6fYzltLW5ncWtMc3c/edit?usp=docslist_api">https://docs.google.com/file/d/0Bw3dwdSezn6fYzltLW5ncWtMc3c/edit?usp=docslist_api</a>

That's all for AngularJS Module.

See you soon in the next post! :D
