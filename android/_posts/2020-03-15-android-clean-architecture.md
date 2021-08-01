---
layout: post
title: Clean Architecture for Android
description: An overview of Clean Architecture and how to adapt it to your Android project
date: 2020-03-15 14:42
author: Trinh Le
avatar: trinhle.png
comments: true

tags: [Clean Architecture, MVVM, Design Patterns]
image: assets/images/android/clean-code.jpg
---


## Clean Architecture for Android

## What is Clean Architecture?

Clean Architecture is a software design philosophy that separates the software into many ring levels:

![The Clean Architecture by Robert C. Martin (Uncle Bob)](https://cdn-images-1.medium.com/max/2000/0*7LU1LPAC2QP4aQol.jpg)

Each of the circle represents different layers of your software and must follow 2 important rules:

* **Dependency Rule**: Dependencies can only go **inwards**. Basically, nothing in the inner circle can know any things of the outer circles.

* **Abstraction Rule**: The more inward you go, the more abstraction the source code is. In another word, inner circles are business logic while outer circles are concrete implementation.

## What is the purpose of Clean Architecture?

Like many other architecture patterns, the main purpose of Clean Architecture is separating concerns. So that:

* The software will be independent of UI, frameworks, databases or any external dependencies

* The source code is testable painlessly

## Adapts Clean Architecture to Android

The Clean Architecture can be applied to any type of software, based on the need, the number of circles can be varied as long as you still follow 2 important rules above.

The below figure showing my prefer layers for Android applications:

![Android Clean Architecture](https://cdn-images-1.medium.com/max/2016/1*_9ZG19eW2jUdprxLLfePbg.png)

As you can see, we have 5 layers:

* **Entity**: contains enterprise business logic or application business logic.

* **Data**: provides the abstract interaction with data sources. Recommend using the Repository pattern in this layer.

* **Use Case**: define all the use cases, interactions of users with the application.

* **Presentation**: presents data to the UI, handle user interactions

* **Framework**: implements the interactions with Android SDK and provides the detail implementation for the Data layer.

## Demo application using Clean Architecture

All right, we have enough bland boring theory 😂 It’s time to show you the code!

![Source: GIPHY](https://cdn-images-1.medium.com/max/2000/0*-zb6YNGuvWK7-EAb.gif)

We’re gonna craft an application to show the public repositories on Github.

Below is the project structure that I will implement for the demo:

![Project Structure](https://cdn-images-1.medium.com/max/2000/1*lq9-UCJkBPSpHboWPBEKVg.png)

We’ll have 2 modules:

* **core**: contains code for 2 layers **Entity** and **Usecases, Data **which is pure Kotlin, independent from Android SDK.

* **app**: contains code for **Presentation, Framework** layer which depends on Android SDK and other external frameworks/libraries.

The relationship between 2 modules is visualized roughly as the diagram below:

![](https://cdn-images-1.medium.com/max/2496/1*kP94EDI1blCtAGyFrwTkLQ.png)

I decided not to write every single class of the demo in this blog post (cause I’m lazy 😴).

So I’ll leave the link to Github repo with full implementation below and hope it can be descriptive enough for demo purpose 🤷‍♂️

[**trinhlbk1991/github-public-repos**
*An Android app showing list of public Github repositories - a demo for Clean Architecture + MVVM in Android …*github.com](https://github.com/trinhlbk1991/github-public-repos)

## Conclusion

Some important points of Clean Architecture:

* Only outer layers can depend on inner layers

* The inner layers are more abstract than outer layers

* Numbers of layers should be varied base on the need of the project

Pros of using Clean Architecture:

* Testable

* Independent from UI and external framework (database, network,…)

* Easy to add new features or maintain code

Cons of using Clean Architecture:

* Extra code classes (but worth it!)

* Not so shallow learning curve

Any feedback or comments are welcome as usual.

Thanks for reading and happy coding! 👨‍💻
