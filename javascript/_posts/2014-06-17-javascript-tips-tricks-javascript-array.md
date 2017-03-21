---
layout: post
title:  Tips and Tricks for JavaScript Array
date: 2014-06-17 18:59
author: trinh_le
comments: true

tags: [JavaScript]
---

At the very first sight, I don't like JavaScript!

And till now, I still don't like it LOL

But because of my job, I have to deal with this it :)

In this post, I'll show you guys some tips and tricks for JavaScript Array. Of course, I found them while wanderring on the Internet, searching for my ******* problem :)

<!--more-->
<h2>1. Do not use new Array()</h2>
Please use <strong>[]</strong> instead of the built-in constructor<strong> new Array()</strong>.

The two statements below both create an empty array:

{% highlight javascript %}
var test = new Array(); // AVOID THIS WAY
var test = []; // USE THIS WAY
{% endhighlight %}

The two  statements below both create an array that contains 5 numbers:

{% highlight javascript %}
var test = new Array(5, 9, 4, 3, 2); // AVOID THIS WAY
var test = [5, 9, 4, 3, 2]; // USE THIS WAY
{% endhighlight %}

The reason we abandon the built-in constructor new Array() is that It makes your code complex and can cause nasty side effects.

{% highlight javascript %}
var test = new Array(11, 6);    // Creates an array with two elements (11 and 6)
var test = new Array(11);	// Creates an array with 11 undefined elements!!!!!!
{% endhighlight %}

<h2> 2. Convert JavaScript Array to CSV</h2>
JavaScript provides <strong>valueOf()</strong> method to convert an array to a CSV (Comma Seperated Value) string.

{% highlight javascript %}
var cities = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Hai Phong'];
var str = cities.valueOf();
//print str: Hanoi,Ho Chi Minh,Da Nang,Hai Phong
{% endhighlight %}

If you want to change the comma to any other character like *, |, -,... use <strong>join()</strong> method:

{% highlight javascript %}
var cities = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Hai Phong'];
var str = cities.join(&quot;|&quot;);
//print str: Hanoi|Ho Chi Minh|Da Nang|Hai Phong
{% endhighlight %}

<h2> 3. Remove Array Element by Index</h2>
To remove an Array Element by index, we use <strong>splice()</strong> method:

{% highlight javascript %}
var cities = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Hai Phong'];
//print cities: Hanoi,Ho Chi Minh,Da Nang,Hai Phong
var index = 2;
cities.splice(index, 1);
// print cities: Hanoi,Ho Chi Minh,Hai Phong
{% endhighlight %}

<h2> 4. Remove Array Element by Value</h2>
The below code snippet describe a function within Array class that allows you to remove an array element by an input value:

{% highlight javascript %}
Array.prototype.removeByValue = function(val) {
    for(var i=0; i&lt;this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

var cities = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Hai Phong'];

cities.removeByValue(&quot;Hanoi&quot;);
// print cities: Ho Chi Minh,Da Nang,Hai Phong
{% endhighlight %}

<h2> 5. Empty a JavaScript Array</h2>
By default, JavaScript does not provide any method to empty an array.

The most common way we use to empty an arry is:

{% highlight javascript %}
var cities = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Hai Phong'];
cities = [];
{% endhighlight %}

This way can clear all data of <strong>cities</strong> array but it can lead to some reference problems!

For example:

{% highlight javascript %}
var cities = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Hai Phong'];
var myCities = cities;
cities = [];

//print cities: ''
//print myCities: Hanoi,Ho Chi Minh,Da Nang,Hai Phong
{% endhighlight %}

So, to empty an array correctly withou causing any side effects, just set the<strong> array length</strong> to <strong>0</strong>! Simple, huh? :)

{% highlight javascript %}
var cities = ['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Hai Phong'];
var myCities = cities;
cities.length = 0;

//print cities: Hanoi,Ho Chi Minh,Da Nang,Hai Phong
//print myCities: Hanoi,Ho Chi Minh,Da Nang,Hai Phong
{% endhighlight %}

Done :D

If you have any tips and tricks for JavaScript Array, don't hesitate to post a comment below! Thanks :)
