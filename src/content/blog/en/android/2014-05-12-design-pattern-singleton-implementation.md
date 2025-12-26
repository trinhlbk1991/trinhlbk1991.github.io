---
title: "Singleton Implementation"
date: 2014-05-12
categories: ["android"]
tags: ["Design Pattern","Singleton"]
toc: true
comments: true
---

<h2>A - Intent</h2>
<ul>
	<li>Ensure only ONE instance of the class is created</li>
	<li>Provide global access to that instance</li>
</ul>
<h2>B - Usage</h2>
Singleton will be applied when you want to have exactly ONE instance of a class, no less, no more. And that object can be access anywhere in your code.

Some cases that Singleton is usually used:
<ul>
	<li>Logger class</li>
	<li>Configuration class</li>
	<li>Access resources in shared mode</li>
	<li>Factory design pattern that implemented as Singleton</li>
</ul>
<!--more-->
<h2>C - Singleton Structure</h2>
<img class="size-full wp-image-1686 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/05/java-singleton-design-pattern.png" alt="java-singleton-design-pattern" width="317" height="211" />

Singleton is the simplest design pattern (that's why I wrote an entry about it LOL).

As you can see in the firgure above, a Singleton class consists of:
<ul>
	<li>a private <strong>instance</strong> that contains the Singleton object</li>
	<li>a private <strong>contructor</strong> that prevent creating more than one instance</li>
	<li>a public static method <strong>getInstance()</strong> to provide global access to the Singleton object</li>
</ul>
That's all. Only one class :)))
<h2>D - Singleton Implementation</h2>
<h3>1. Lazy initialization</h3>
This way is a classical Singleton implementation.

<pre>
public static getInstance(){
	if(instance == null){
		instance = new Singleton();
	}
	return instance
}
</pre>

Pros:
<ul>
	<li>The instance will be created only when client application need to use it - lazy initialization</li>
</ul>
Cons:
<ul>
	<li>When there're more than 1 thread try to access the Singleton object at the same time. It might create more than 1 instance! So this implementation is not <strong>thread safe</strong>!</li>
</ul>
To prevent multi-thread concurrency, let's take a look at the second way!
<h3>2. Eager initialization</h3>
The easiest way to prevent multi-thread concurrency is eager initialization.

<pre>
private Singleton instance = new Singleton();

public static getInstance(){
	return instance
}
</pre>

Pros:
<ul>
	<li>Easy to implement</li>
	<li>Prevent multi-thread concurrency</li>
</ul>
Cons:
<ul>
	<li>The Singleton instance was created even the client app might not be using it</li>
	<li>Client app cannot pass any arguments to the constructor</li>
</ul>
<h3>3. Thread safe with lazy initialization</h3>
If you want to resolve all the disadvantages of eager initialization, try this way:

<pre>
public static getInstance(){
	if (instance == null){
		synchronized(Singleton.class) {
			if (instance == null) {
				instance = new Singleton();
			}
		}
	}

	return instance
}
</pre>

With the synchronized keyword, you can handle multi-thread concurrency case but it will be very costly. That's why I use the <strong>double check locking</strong> <span style="color: #222222;">mechanism</span>(<span style="color: #222222;"> cehck in an unsynchronized block if the object is null and if not to check again and create it in an syncronized block</span>). <span style="color: #222222;">If we see that the singleton object is already created we just have to return it without using any syncronized block.</span>

Pros:
<ul>
	<li>Thread safe</li>
	<li>Lazy initialization</li>
	<li>Client app can pass arguments to constructor</li>
	<li>Reduce costly of synchronized block code</li>
</ul>
Cons:
<ul>
	<li>Extra if condition</li>
</ul>
<h3>4. Enum Singleton</h3>
You also can using Enum to implement Singleton:

<pre>
public enum Singleton {
	Singleton instance;
	public void doStuff(){
		return instance;
	}

}
</pre>

Pros:
<ul>
	<li>Prevent multi-thread concurrency</li>
	<li>Easy to implement</li>
</ul>
Cons:
<ul>
	<li>Cannot lazy initialization</li>
</ul>
<h2>E - Singleton vs Static Class</h2>
<ul>
	<li>Singleton can implement interfaces and extends classes but Static Class cannot</li>
	<li>Static Class can only have static members, methods</li>
	<li>Static Class cannot load lazily like Singleton</li>
	<li>Singleton is stored in Heap and Static Class is stored in Stack</li>
</ul>
Anything else? Just comment below! :)

&nbsp;