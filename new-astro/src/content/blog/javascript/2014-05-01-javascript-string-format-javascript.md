---
title: "String.Format in JavaScript"
date: 2014-05-01
tags: [""]
toc: true
comments: true
---

<h2>A - Introduction</h2>
As you know,  C# and VB.NET provide a very convenient method called <strong>Format().</strong>

That method allows us to format a string easily by passing the template string ( the string contains some the placeholders) and the parameters.

Unfortunately, JavaScript doesn't support that type of function.

Don't worry :) In this post,  We'll create the String.Format in JavaScript.

<!--more-->
<h2>B - String.Format in JavaScript</h2>
Here is the full demo source code for String.Format in JavaScript:
<pre>&lt;html&gt; 
&lt;head&gt; 
    &lt;title&gt;JavaScript String.Format&lt;/title&gt; 
    &lt;script type=<span style="color: maroon;">"text/javascript"</span>&gt; 
         
        <span style="color: green;">// String.Format function</span> 
        String.prototype.format = <span style="color: blue;">function</span> (args) { 
            <span style="color: blue;">var</span> str = <span style="color: blue;">this</span>;
            <span style="color: blue;">return</span> str.replace(String.prototype.format.regex, <span style="color: blue;">function</span>(item) { 
                <span style="color: blue;">var</span> index = parseInt(item.substring(<span style="color: maroon;">1</span>, item.length - <span style="color: maroon;">1</span>));
                <span style="color: blue;">var</span> replace; 
                <span style="color: blue;">if</span> (index &gt;= <span style="color: maroon;">0</span>) {
                    replace = args[index]; 
                } <span style="color: blue;">else</span> <span style="color: blue;">if</span> (index === -<span style="color: maroon;">1</span>) { 
                    replace = <span style="color: maroon;">"{"</span>; 
                } <span style="color: blue;">else</span> <span style="color: blue;">if</span> (index === -<span style="color: maroon;">2</span>) { 
                    replace = <span style="color: maroon;">"}"</span>; 
                } <span style="color: blue;">else</span> { 
                    replace = <span style="color: maroon;">""</span>; 
                } 
                <span style="color: blue;">return</span> replace; 
            }); 
        }; 
        String.prototype.format.regex = <span style="color: blue;">new</span> RegExp(<span style="color: maroon;">"{-?[0-9]+}"</span>, <span style="color: maroon;">"g"</span>); 
         
        <span style="color: green;">// Sample usage</span> 
        <span style="color: blue;">var</span> str = <span style="color: maroon;">"{0} {1} {0}. {-1}^_^{-2}"</span>; 
        str = str.format([<span style="color: maroon;">"Hello"</span>, <span style="color: maroon;">"World"</span>]); 
        alert(str); 
         
    &lt;/script&gt; 
&lt;/head&gt; 
&lt;/html&gt;</pre>
<h2>C - Explanation</h2>
First, I used the regular expression to find all the number wrapped in curly braces.

The number in curly brace will be the index to look up value in parameters array.

And the value in parameters array will replace the corresponding placeholder.

For convenience, I also created 2 special placeholders:
<ul>
	<li>{-1} for { character</li>
	<li>{-2} for } character</li>
</ul>
Done! :)