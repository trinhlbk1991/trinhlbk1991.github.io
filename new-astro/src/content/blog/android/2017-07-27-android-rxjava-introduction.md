---
title: "RxJava Introduction"
date: 2017-07-27
description: "RxJava is cool! 😎"
tags: ["RxJava","Design Pattern"]
image: "assets/images/android/rxjava.jpg"
toc: true
comments: true
---

## What is RxJava?

Quoted from RxJava home page:

>RxJava is a Java VM implementation of Reactive Extensions: a library for composing asynchronous and event-based programs by using observable sequences.

With:
- **Asynchronous**: multiple parts of the code execute simultaneously
- **Event-based**: the code will be executed base on the event generated


Two basic components in RxJava are **Observable** and **Observer**:
- **Observable** emits items
- **Observer** consumes those items

Basically, RxJava looks a lot like <a href="https://en.wikipedia.org/wiki/Observer_pattern" target="_blank">Observer Pattern</a> but there's one different point: When there's no **Observer** listen (subscribe) to the **Observable**, the code block won't execute.

That's enough for theory, I'll show you some simple sample code using RxJava:

```
Observable<String> observable = Observable.just("Captain America", "Iron Man", "Black Widow", "Hulk", "Thor");
Observer<String> observer = new Observer<String>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {

    }

    @Override
    public void onNext(String item) {
        Log.i("Avengers", "Hello, " + item);
    }

    @Override
    public void onError(Throwable t) {
        Log.e("Avengers", t.getMessage());
    }

    @Override
    public void onComplete() {
        Log.i("Avengers", "Complete");
    }
};
observable.subscribe(observer);
```

Basically, the `observable` will emit Avengers hero names to the `observer` where will print the hello sentence.

The result should be:

```
Avengers: Hello, Captain America
Avengers: Hello, Iron Man
Avengers: Hello, Black Widow
Avengers: Hello, Hulk
Avengers: Hello, Thor
Avengers: Complete
```

## Types of Observable

RxJava provides 5 types of **Observable**:

- **Observable**: emits from 0 to N elements and complete successfully or failed with error
- **Flowable**: similar to **Observable** but it has backpressure strategy
- **Single**: emits only **1** element or failed with error. **Single** doesn't have `onComplete()` callback
- **Maybe**: **may** emit elements or not and complete successfully or failed with error
- **Completable**: does not emit any elements, just complete successfully or failed with error

Depends on your need and usecases, you can pick the most suitable one.

## Multithreading and Schedulers

My favourite part when using RxJava is that I can execute the code on multiple threads easily!

RxJava supports writting asynchronous and concorrent code pretty well.

Because of that, many new Rx developers think that **RxJava is multi-threaded by default**!

**NO, it's not!**

### RxJava is single-threaded by default

For example:

```
final String[] avengers = new String[]{"Captain America", "Iron Man"};
Observable<String> observable = Observable.create(new ObservableOnSubscribe<String>() {
    @Override
    public void subscribe(@NonNull ObservableEmitter<String> emitter) throws Exception {
        Log.i("Avengers", "Observable Thread: " + Thread.currentThread().getName());
        for (String name : avengers) {
            emitter.onNext(name);
        }
        emitter.onComplete();
    }
});

Observer<String> observer = new Observer<String>() {
    @Override
    public void onSubscribe(@NonNull Disposable d) {
    }

    @Override
    public void onNext(String item) {
        Log.i("Avengers", "Hello, " + item);
    }

    @Override
    public void onError(Throwable t) {
        Log.e("Avengers", t.getMessage());
    }

    @Override
    public void onComplete() {
        Log.i("Avengers", "Done");
        Log.i("Avengers", "Observer Thread: " + Thread.currentThread().getName());
    }
};

observable.subscribe(observer);
```

The result should be:

```
Avengers: Observable Thread: main
Avengers: Hello, Captain America
Avengers: Hello, Iron Man
Avengers: Done
Avengers: Observer Thread: main
```

As you can see, If we simply just subscribe directly, the code will execute in the same thread.

To execute the code asynchronously, you must explicitly specify the thread by using `subscribeOn()`, `observeOn()` and `Scheduler`.

### Scheduler

**Scheduler** in RxJava will define the thread to execute your code.

By default, RxJava provides plenty types of **Scheduler**:
- `Schedulers.newThread()`: Start a new thread every time requested. Because of the latency involved when starting a new thread, plus this thread won't be reused at all, `Schedulers.newThread()` wasn't really a good choice.
- `Schedulers.io()`: Creates and returns a Scheduler intended for IO-bound work - can be used for asynchronously performing blocking IO.
- `Schedulers.computation()`: Creates and returns a Scheduler intended for computational work - can be used for event-loops, processing callbacks and other computational work.
- `Schedulers.immediate()`: executes the scheduled action immediately and synchronously. This is kinda useless to me 😅.
- `Schedulers.trampoline()`: queues work on the current thread to be executed after the current work completes.
- `Schedulers.from(Executor executor)`: Convert a Executor to Scheduler.

Depends on the use case, you can easily pick the right **Scheduler**.

Also, to make it more convinient switching between threads, RxJava provides 2 methods: `subscribeOn()` and `observeOn()`.

### subscribeOn()

`subscribeOn()` specifies which Scheduler to excecute the code block inside Observable.create() method.

By changing from
```
observable.subscribe(observer);
```
to
```
observable
    .subscribeOn(Schedulers.io())
    .subscribe(observer);
```

You can see that now the code from **Observable** was executed on new thread rather than on main thread privously. 

```
Avengers: Observable Thread: RxCachedThreadScheduler-1
Avengers: Hello, Captain America
Avengers: Hello, Iron Man
Avengers: Done
Avengers: Observer Thread: RxCachedThreadScheduler-1
```

More than that, the **Observer** also execute its code block on the same Scheduler which was defined in `subscribeOn()`. What if you want to execute **Observer** in the main thread again?

This is where `observeOn()` jumps into the picture.

### observeOn()

`observeOn()` specifies which Scheduler to execute the code block in downstream operators.

By changing from
```
observable
    .subscribeOn(Schedulers.io())
    .subscribe(observer);
```
to
```
observable
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(observer);
```

You can see that now the code from **Observable** was executed on new thread and **Observer** code was run on main thread again. 

```
Avengers: Observable Thread: RxCachedThreadScheduler-1
Avengers: Hello, Captain America
Avengers: Hello, Iron Man
Avengers: Done
Avengers: Observer Thread: main
```

I think this is enough for a introduction to RxJava post. Next post will be the RxJava operators' spotlight!