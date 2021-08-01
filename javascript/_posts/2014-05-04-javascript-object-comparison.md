---
layout: post
title:  Object Comparison
date: 2014-05-04 22:25
author: Dang Huynh
comments: true

tags: []
---

<h2>A. Preface:</h2>
We usually use "==" or "===" to compare variables in JavaScript. But sometimes, the result maybe not as expected. Let's take a look:

We have class Employee:
<pre class="lang:js decode:true ">function Employee(EmpID, Name, Birthday, Supervisor) {
    this.EmpID = EmpID;
    this.Name = Name;
    this.Birthday = Birthday;
    this.Supervisor = Supervisor;

    this.Age = function () {
        return new Date().getFullYear() - Birthday;
    }
}</pre>
&nbsp;

<!--more-->

And some instances of this class:
<pre class="lang:default decode:true ">var Supervisor = new Employee(0, "Marry", 1979);
var Employee1 = new Employee(1, "John", 1980, Supervisor);
var Employee2 = Employee1;
var Employee3 = new Employee(1, "John", 1980, Supervisor);</pre>
&nbsp;

Suppose we want to Employee1  and Employee3  are equal. We can't use "==" operator or "===" operator.
<pre class="lang:default decode:true ">alert(Employee1 == Employee2); // true. Employee1 and Employee2 are reference to ONE object in memory.
alert(Employee1 == Employee3); // false</pre>
&nbsp;
<h2>B. Equal method:</h2>
So we'll define new method to compare object.
<pre class="lang:default decode:true ">    function equals(firstObject, secondObject) {
    var property;

    //Check if current object's property doesn't exist in the second one.
        for (property in firstObject) {
        if (typeof (secondObject[property]) == 'undefined'
        &amp;&amp; typeof (firstObject[property]) != 'undefined') {
            return false;
        }
    }

    //Check if second object's property doesn't exist in the current one.
    for (property in secondObject) {
        if (typeof (firstObject[property]) == 'undefined'
        &amp;&amp; typeof (secondObject[property]) != 'undefined') {
            return false;
        }
    }

    //Compare properties value in two object
    for (property in firstObject) {
        {
            switch (typeof (firstObject[property])) {
                case 'object':
                //If property is object then call method equals to compare
                if (!equals(firstObject[property], secondObject[property])) {
                    return false;
                } 
                break;

                case 'function':
                    //If property is function then compare content in function
                    if (firstObject[property].toString() != secondObject[property].toString())
                        return false;
                    break;
                default:
                    //Compare value of property
                    if (typeof (firstObject[property]) != typeof (secondObject[property])
                    || firstObject[property] != secondObject[property])
                        return false;

            }
        }
    }
    return true;
}</pre>
&nbsp;
<h2>C. Try it</h2>
<pre class="lang:default decode:true ">var Supervisor = new Employee(0, "Marry", 1979);
var Employee1 = new Employee(1, "John", 1980, Supervisor);
var Employee2 = Employee1;
var Employee3 = new Employee(1, "John", 1980, Supervisor);

alert(Employee1 == Employee2); // true
alert(Employee1 == Employee3); // false
alert(equals(Employee1, Employee3)); // true</pre>
&nbsp;
<h2>D. Source code</h2>
<a href="https://dl.dropboxusercontent.com/u/12630059/ComparingObjects2.js">ComparingObject.js</a>
