---
layout: post
title: Basic Regular Expression in Java
date: 2014-11-24 17:32
author: trinh_le
comments: true

tags: [Regex, Regular Expression]
---

<h2>A - Regular Expression Overview</h2>
Regular expression (Regex) is a sequence of characters that define a search pattern for strings. Regular expression can be used to search, edit and manipulate text and data.
<br/>
The pattern defined by regular expression can match zero, one or several times in a string. The regular expression pattern will be applied to the string from left to right. Any character that has been used in a match cannot be reused.

For example: regular expression <strong>121 </strong>will match string <strong><span style="color: #008000;">121</span>2<span style="color: #008000;">121</span>2</strong> only twice.
<h2>B - Regular Expression in Java</h2>
In Java, the<em> java.util.regex</em> package consists of 3 classes to work with regular expression:
<p style="padding-left: 30px;">-   <strong>Pattern</strong>: represents a regular expression. To create a <strong>Pattern</strong> object, you have to invoke a static method that accept regular expression string as an argument .</p>


[java]Pattern mPattern = Pattern.compile(pattern);[/java]

<p style="padding-left: 30px;">-   <strong>Matcher</strong>: interprets the pattern and performs match operations against an input string. <strong>Matcher</strong> object can be obtained by invoking <strong>Matcher</strong> method on <strong>Pattern</strong> object ().</p>


[java]Matcher mMatcher = mPattern.matcher(EXAMPLE_TEST);[/java]

<p style="padding-left: 30px;">-   <b>PatternSyntaxException: </b>unchecked exception that indicates a syntax error in a regular expression pattern.</p>
<!--more-->
<h2>C - Regular Expression syntax</h2>
<h3>1 - Common matching symbols</h3>
<table>
<tbody>
<tr>
<td>Regular Expression</td>
<td>Descriptions</td>
</tr>
<tr>
<td>.</td>
<td>Matches any character</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex1.png"><img class="size-full wp-image-1947 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex1.png" alt="regex1" width="399" height="208" /></a></td>
</tr>
<tr>
<td>^kai</td>
<td>Matches any text that <strong>start</strong> with <strong><em>kai</em></strong></td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex2.png"><img class="size-full wp-image-1948 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex2.png" alt="regex2" width="455" height="199" /></a></td>
</tr>
<tr>
<td>kai$</td>
<td>Matches any text that <strong>end </strong>with <strong><em>kai</em></strong></td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex3.png"><img class="size-full wp-image-1949 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex3.png" alt="regex3" width="492" height="188" /></a></td>
</tr>
<tr>
<td>[xyz]</td>
<td>Matches the letter x <strong>or </strong>y <strong>or </strong>z</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex4.png"><img class="size-full wp-image-1950 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex4.png" alt="regex4" width="447" height="186" /></a></td>
</tr>
<tr>
<td>[abc][xyz]</td>
<td>Matches a <strong>or </strong> b <strong>or </strong> c <strong>followed by</strong> x <strong>or </strong> y <strong>or </strong> z</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex5.png"><img class="size-full wp-image-1951 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex5.png" alt="regex5" width="488" height="188" /></a></td>
</tr>
<tr>
<td>[^xyz]</td>
<td>Matches any text <strong>except </strong>x <strong>or </strong> y <strong>or </strong> z. The ^ in [] negates the regex.</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex6.png"><img class="size-full wp-image-1952 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex6.png" alt="regex6" width="484" height="179" /></a></td>
</tr>
<tr>
<td>[a-z0-9]</td>
<td>Matches letter from a to z <strong>or </strong>digit from 0 to 9</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex7.png"><img class="size-full wp-image-1953 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex7.png" alt="regex7" width="477" height="193" /></a></td>
</tr>
<tr>
<td>x|y</td>
<td>Matches letter x or y</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex8.png"><img class="size-full wp-image-1954 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex8.png" alt="regex8" width="446" height="186" /></a></td>
</tr>
<tr>
<td>xy</td>
<td>Matches letter x followed by y</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex9.png"><img class="size-full wp-image-1955 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex9.png" alt="regex9" width="474" height="190" /></a></td>
</tr>
</tbody>
</table>
<h3> 2 - Metacharacters</h3>
<table>
<tbody>
<tr>
<td> Regular Expression</td>
<td>Descriptions</td>
</tr>
<tr>
<td> \d</td>
<td> Matches any digit, short for [0-9]</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex10.png"><img class="size-full wp-image-1957 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex10.png" alt="regex10" width="472" height="186" /></a></td>
</tr>
<tr>
<td> \D</td>
<td> Matches any non-digit</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1958 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex11.png" alt="regex11" width="476" height="189" /></td>
</tr>
<tr>
<td> \s</td>
<td> Matches any whitespace character, short for [ \t\n\x0b\r\f]</td>
</tr>
<tr>
<td colspan="2"> <img class="size-full wp-image-1959 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex12.png" alt="regex12" width="469" height="185" /></td>
</tr>
<tr>
<td> \S</td>
<td> Matches any non-whitespace character</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1960 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex13.png" alt="regex13" width="472" height="187" /></td>
</tr>
<tr>
<td> \s+</td>
<td> Matches several white space characters</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1961 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex14.png" alt="regex14" width="540" height="182" /></td>
</tr>
<tr>
<td> \w</td>
<td> Matches any word character, short for[a-zA-Z0-9]</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1962 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex15.png" alt="regex15" width="539" height="190" /></td>
</tr>
<tr>
<td> \W</td>
<td>Matches any non-word character</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1963 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex16.png" alt="regex16" width="520" height="185" /></td>
</tr>
</tbody>
</table>
<h3> 3 - Quantifier</h3>
<table>
<tbody>
<tr>
<td> Regular Expression</td>
<td> Descriptions</td>
</tr>
<tr>
<td> *</td>
<td> Repeats 0 or many times</td>
</tr>
<tr>
<td colspan="2"><a href="http://icetea09.com/wp-content/uploads/2014/11/regex17.png"><img class="size-full wp-image-1964 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex17.png" alt="regex17" width="500" height="194" /></a></td>
</tr>
<tr>
<td> +</td>
<td>Repeats 1 or many times</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1965 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex18.png" alt="regex18" width="495" height="188" /></td>
</tr>
<tr>
<td> ?</td>
<td>Repeats 0 or 1 time</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1966 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex19.png" alt="regex19" width="492" height="182" /></td>
</tr>
<tr>
<td> {x}</td>
<td>Repeats x times</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1967 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex20.png" alt="regex20" width="487" height="188" /></td>
</tr>
<tr>
<td> {x,y}</td>
<td>Repeats from x to y times</td>
</tr>
<tr>
<td colspan="2"><img class="size-full wp-image-1968 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/regex21.png" alt="regex21" width="504" height="190" /></td>
</tr>
</tbody>
</table>
<h3> 4 - Grouping in Regular Expression</h3>
You can group a part of regular expression and refer to it later using <strong>$</strong> character.

For example: Regular expression to remove all odd white spaces between 2 words:

[java]
String pattern = "(\\S)(\\s+)(\\S)";
System.out.println(myString.replaceAll(pattern, "$1 $3"));
[/java]

<h3> 5 - Negative lookahead</h3>
Negative lookahead provides the possibility to exclude a pattern. With this you can say that a string should not be followed by another string.

Negative Lookaheads are defined via <code class="code">(?!pattern)</code>.

For example, the following will match "kai" if "kai" is not followed by "other".

[java]kai(?!other)[/java]

<h2> C - Some examples about Regular Expression in Java</h2>
Check if the input text is 24 or 32 bit hex color, with an optional leading # or ox:

[java]
public void checkValid24or32bitColorFormat(){
	Pattern pattern;
	Matcher matcher;
	String TEXT;

	pattern = Pattern.compile("(?:#|0x)?(?:[0-9A-F]{2}){3,4}");

	TEXT = "0xF0F73611";
	matcher = pattern.matcher(TEXT);
	System.out.println(TEXT + " : " + String.valueOf(matcher.matches()));

	TEXT = "#FF006C";
	matcher = pattern.matcher(TEXT);
	System.out.println(TEXT + " : " + String.valueOf(matcher.matches()));

	TEXT = "99AAB7FF";
	matcher = pattern.matcher(TEXT);
	System.out.println(TEXT + " : " + String.valueOf(matcher.matches()));

	TEXT = "FFZZ08";
	matcher = pattern.matcher(TEXT);
	System.out.println(TEXT + " : " + String.valueOf(matcher.matches()));
}
[/java]

Check if the input text is a "slug" text or not:

[java]
public void checkSlugText(){
	Pattern pattern;
	Matcher matcher;
	String TEXT;

	pattern = Pattern.compile("^[a-z0-9-]+$");

	TEXT = "a_b_123";
	matcher = pattern.matcher(TEXT);
	System.out.println(TEXT + " : " + String.valueOf(matcher.matches()));

	TEXT = "a-b-123";
	matcher = pattern.matcher(TEXT);
	System.out.println(TEXT + " : " + String.valueOf(matcher.matches()));
}
[/java]

So, that's all for the basic regular expression in Java. I'm a newbie to regular expression so please don't mind telling me if I have something wrong in this post!

Thanks :)

&nbsp;
