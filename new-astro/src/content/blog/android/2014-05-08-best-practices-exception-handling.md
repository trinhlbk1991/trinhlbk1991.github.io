---
title: "Best Practices for Exception Handling"
date: 2014-05-08
tags: ["Exception Handling"]
toc: true
comments: true
---

Exception handling is an important part of developing robust application.

It's a process to response to a erroneous situation like invalid input value, not found resource,...

Here are some best practices  for Exception Handling that I collected from my working experience and the Internet.

<!--more-->
<h2>1. Don't overuse Exceptions</h2>
Remember that Exception is costly and can slow down your code!

Try to minimize unnecessary exceptions. Don't just throw and catch exceptions any where you like in your code.

Only use exception in "exceptional" conditions, do not use it to manage your business logic, try if-else statement instead.
<h2>2. Avoid empty catch block</h2>
Using empty catch block will not only hide your app's errors but also leave your objects in unused and corrupt state.

Ignore a error can save you at this time but will kill you at mantainance :))

If you use exception, remember to log all error details:
<ul>
	<li>with unique name/ message (This will help you identify exception location easier)</li>
	<li>with meaningful message (Ex. Use <code>"Illegal value for ${argument}: ${value}"</code> instead of <code>"Incorrect argument for method"</code> )</li>
	<li>with proper exception type:
<ul>
	<li><strong>Fatal</strong>: can cause system crash</li>
	<li><strong>Error</strong>: lack of requirement</li>
	<li><strong>Warn</strong>: not an error but can be in the future</li>
	<li><strong>Infor</strong>: information for user</li>
	<li><strong>Debug</strong>: information for developer</li>
</ul>
</li>
</ul>
<h2>3. Close or release resources in finally block</h2>
This is a must-know best practice - Always clean up all resources in finally block! :)
<h2>4. Catch specific exceptions instead of the top Exception class</h2>
This will increase the performance, help your code more understandable and more specific.
<h2>5. Try not to re-throw the exception</h2>
The reason is costly price!

But if you mus re-throw the exception, re-throw the same exception object instead of creating  a new one!
<h2>6. Use exception outside the loop</h2>
Exception handling inside a loop is not recommended for most cases.

Surround the loop with exception block instead.

P/S: A co-worker share this to me :"&gt;
<h2>7. Use your own exception hierarchy</h2>
By extending current Exception class (e.g. UserException, SystemException and their sub types), you can define your own exception hierarchy and use them.

By doing this you can specialize your exceptions and define a reusable module/layer of exceptions.

&nbsp;

That's all the best practices for exception handling in this post!

If you think this is not enough, please comment below :)

&nbsp;