---
title: "Organizing code with namespace in JavaScript"
date: 2014-07-16
categories: ["javascript"]
tags: [""]
toc: true
comments: true
---

<h2>A. Preface:</h2>
Sometime, we want to use functions or properties globally. But when there are too much global variables, they may be bring a lot of trouble - <b>naming collisions</b>. We can use <b>namespace</b> to minimize number of variables.
There are many solution to implement namespace, we’ll cover some simple approaches which are easy to use and understand :D

<!--more-->
<h2>B. Namespace:</h2>
<h3>B.1. Use an object as a namespace:</h3>
<pre class="lang:default decode:true ">// Create global namespace MYAPP
var MYAPP = MYAPP || {};

// Put function into namespace
MYAPP.sayHello = function () {
    alert("Hello!");
}</pre>
&nbsp;
<h4>Why var MYAPP = MYAPP || {} ?</h4>
Let take a look at line 2 : why we use var MYAPP = MYAPP || {} instead of var MYAPP = {} ?

We may write many javascript files, and then combine them or not. There is a good chance that a namespace is defined in many files. So we must ensure that the namespace object in the other javascript files is not damaged.

<b>Example:</b>

In <b>english.js</b>:
<pre class="lang:default decode:true ">// Create global namespace MYAPP
var MYAPP = {};

// Put function into namespace
MYAPP.english = {};
MYAPP.english.sayHello = function () {
    alert("[english namespace] Hello!");
}</pre>
&nbsp;

In <b>vietnamese.js</b>:
<pre class="lang:default decode:true ">// Create global namespace MYAPP
var MYAPP = {};

// Put function into namespace
MYAPP.vietnamese = {};
MYAPP.vietnamese.sayHello = function () {
alert("[vietnamese namespace] Xin chao!");
}</pre>
&nbsp;

And then combine them in <b>NameSpaceExample.html</b>
<pre class="lang:default decode:true ">&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
&lt;title&gt;Namespace Example&lt;/title&gt;
&lt;script src="english.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="vietnamese.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script&gt;
MYAPP.english.sayHello();
MYAPP.vietnamese.sayHello();
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
&nbsp;

We’ll get error at line 7 MYAPP.english.sayHello();
Now we just need to change small code
<pre class="lang:default decode:true ">var MYAPP = {}; &gt;&gt;&gt; var MYAPP = MYAPP || {};
MYAPP.english = {}; &gt;&gt;&gt; MYAPP.english = MYAPP.english || {};
MYAPP.vietnamese = {}; &gt;&gt;&gt; MYAPP.vietnamese = MYAPP.vietnamese || {};</pre>
&nbsp;
<h3>B.2. Private/ Public method property and self-executing method</h3>
In C#, Java,... we alway have property modifier such as: public, private, protected. Now let’s implement it in javascript.
<pre class="lang:default decode:true ">var MYAPP = MYAPP || {}

MYAPP.publicMethodExample = function () {

//private property
var userName = "Dang";

//private method
function toUpperName() {
return userName.toUpperCase();
};

//public method
return { sayHello: function () {
alert("Hello, " + toUpperName());
}
}
} (); // insert () to make self-executing function

MYAPP.publicMethodExample.sayHello();</pre>
&nbsp;

The properties, methods in return will be public variable.
One important thing to remember is putting () right after we define a function. It’ll make our function become a self-executing function (function execute immediately).
<h4>How our code works?</h4>
<pre class="lang:default decode:true ">var MYAPP = function(){...} ();</pre>
&nbsp;

First, the function is executed and return sayHello. Then sayHello will be assigned to MYAPP.