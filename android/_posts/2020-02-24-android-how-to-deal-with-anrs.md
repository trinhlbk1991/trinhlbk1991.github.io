---
layout: post
title: How to deal with ANRs?
description: Application Not Responding 🤦‍♂️
date: 2020-02-24 14:59
author: Trinh Le
avatar: trinhle.png
comments: true

tags: [ANR, Android Performance]
image: assets/images/android/anr.jpg
---


## 1. What is ANR?

**ANR** stands for **Application Not Responding**, which is the state that your application cannot process user input events or even draw.

The root cause of ANR is when the application’s UI thread has been blocked for too long:

* Have a long-running task on the main thread with more than 5 seconds of execution

* Have a BroadcastReceiver that execute more than [5 seconds on foreground or 10 seconds in background](https://developer.android.com/reference/android/content/BroadcastReceiver)

## 2. Some common cases that cause ANR

* Perform long-running tasks (IO, heavy computation,…) on main thread

* Main thread is blocked by a long execution task in another thread

* Main thread is doing asynchronous binder call with another process, which take a long time to return the result

* Too slow broadcast receiver

## 3. How to detect and diagnose ANRs?

### Strict Mode

Enable Strict Mode allows you to detect accident network/IO calls on main thread.

```kotlin
    if (BuildConfig.DEBUG) {
        StrictMode.setThreadPolicy(
            StrictMode.ThreadPolicy.Builder()
                .detectNetwork()
                .detectDiskReads()
                .detectDiskWrites()
                .penaltyLog()
                .build()
        )
    }
```

### ANR dialog

Enable Show all ANRs dialog from Developer Options to visually alerting you whenever has ANR even for background apps.

![](https://cdn-images-1.medium.com/max/2000/1*xAED8qYdxAc4-OA0PEQHzg.png)

### Android Studio Profiler

The Profiler is available on Android Studio 3.0 and above.

Using the Profiler, you can observe the threads along the app’s timeline. Base on that you can analyze and identify ANRs.

### Bug Report

Another way to diagnose ANR is to use the bug report feature.

To generate a bug report, you can either:

* Select from the developer options

![](https://cdn-images-1.medium.com/max/2000/1*Aqlcf-GhHUkzPKSOR0Pbjw.png)

* Or, use the following commands:

`adb bugreport target-location`

## 4. How to fix ANRs?

### Long-running task on the main thread

```kotlin
    btn_execute.setOnClickListener {
        LongRunningTask().execute()
    }
```

You can easily detect those long-running task by observing the timeline of main thread in the Profiler:

![](https://cdn-images-1.medium.com/max/2558/1*tNyxvaLpZkjcXJ1UW4hMXQ.png)

To resolve this, we simply just move the long-running task to another thread:

```kotlin
    btn_execute.setOnClickListener {
        Thread {
            LongRunningTask().execute()
        }.start()
    }
```

And the main thread won’t be blocked anymore 🎉

![](https://cdn-images-1.medium.com/max/3016/1*m2eOeEZTjo1gOndbLYCHJA.png)

### Lock contention

In some cases, even your long-running task executes off the main thread, your app still may face ANRs due to lock contention.
```
    btn_execute.setOnClickListener {
        Thread {
            LongRunningTask().execute()
        }.start()

        synchronized(lockObject) {
            tv_status.text = "Finished Execution"
        }
    }

    inner class LongRunningTask {
        fun execute(): String {
            synchronized(lockObject) {
                var result = ""
                for (i in 0..Int.MAX_VALUE) {
                    result = "$i"
                }
                return result
            }
        }
    }
```

Those lock contention can be detected by analyzing the trace/bug report file:

```log
    ------ **VM TRACES AT LAST ANR** (/data/anr/anr_2020-02-24-11-39-05-971: 2020-02-24 11:39:08) ------

    **"main" prio=5 tid=1 Blocked**
      | group="main" sCount=2 dsCount=0 flags=1 obj=0x714c91f0 self=0xee537800
      | sysTid=32337 nice=-10 cgrp=default sched=0/0 handle=0xeebb8dc8
      | state=S schedstat=( 1084437004 741209249 935 ) utm=38 stm=69 core=0 HZ=100
      | stack=0xff086000-0xff088000 stackSize=8192KB
      | held mutexes=
      at **com.icedtealabs.anrdemo.MainActivity$onCreate$1.onClick(MainActivity.kt:20)**
      **- waiting to lock <0x0a1b1d2e> (a java.lang.Object) held by thread 22**

    **......**

    "Thread-8" prio=5 **tid=22** Native
      | group="main" sCount=2 dsCount=0 flags=1 obj=0x12d80000 self=0xe34f3c00
      | sysTid=32553 nice=0 cgrp=default sched=0/0 handle=0xbfaab230
      | state=S schedstat=( 211312896032 78218568213 176791 ) utm=3214 stm=17916 core=1 HZ=100
      | stack=0xbf9a8000-0xbf9aa000 stackSize=1040KB
      | held mutexes=
      at java.lang.Integer.toString(Integer.java:437)
      at java.lang.String.valueOf(String.java:3032)
      at **com.icedtealabs.anrdemo.MainActivity$LongRunningTask.execute(MainActivity.kt:32)**
      - locked <0x0a1b1d2e> (a java.lang.Object)
      at com.icedtealabs.anrdemo.MainActivity$onCreate$1$1.run(MainActivity.kt:17)
      at java.lang.Thread.run(Thread.java:919)
```

By reading the bug report, you can easily specify the lock detention root cause and resolve it! 🎉

### Slow BroadcastReceiver
```kotlin
    private val broadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            LongRunningTask().execute()
        }
    }

    btn_execute.setOnClickListener {
        broadcastManager.sendBroadcast(Intent("custom-action"))
        tv_status.text = "Finish Execution"
    }
```

In order to find the slow BroadcastReceiver, you can analyze the trace/bug report:
```log
    ------ **VM TRACES AT LAST ANR** (/data/anr/anr_2020-02-24-12-02-02-111: 2020-02-24 12:02:03) ------

    DALVIK THREADS (13):
    "main" prio=5 tid=1 Runnable
      | group="main" sCount=0 dsCount=0 flags=0 obj=0x714c91f0 self=0xee537800
      | sysTid=17793 nice=-10 cgrp=default sched=0/0 handle=0xeebb8dc8
      | state=R schedstat=( 11977233726 2817242624 14105 ) utm=871 stm=325 core=1 HZ=100
      | stack=0xff086000-0xff088000 stackSize=8192KB
      | held mutexes= "mutator lock"(shared held)
      at java.lang.Integer.stringSize(Integer.java:507)
      at java.lang.Integer.toString(Integer.java:431)
      at java.lang.String.valueOf(String.java:3032)
      at **com.icedtealabs.anrdemo.MainActivity$LongRunningTask.execute(MainActivity.kt:39)
      at com.icedtealabs.anrdemo.MainActivity$broadcastReceiver$1.onReceive(MainActivity.kt:18)
      at androidx.localbroadcastmanager.content.LocalBroadcastManager.execute**PendingBroadcasts(LocalBroadcastManager.java:313)
      at androidx.localbroadcastmanager.content.LocalBroadcastManager$1.handleMessage(LocalBroadcastManager.java:121)
      at android.os.Handler.dispatchMessage(Handler.java:107)
      at android.os.Looper.loop(Looper.java:214)
      at android.app.ActivityThread.main(ActivityThread.java:7356)
```

To resolve this, you can simply move all the heavy execution code in the BroadcastReceiver to an **IntentService**:
```kotlin
    private val broadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            startService(Intent(context, MyIntentService::class.java))
        }
    }

    btn_execute.setOnClickListener {
        broadcastManager.sendBroadcast(Intent("custom-action"))
        tv_status.text = "Finish Execution"
    }

    class MyIntentService : IntentService("MyIntentService") {
        override fun onHandleIntent(intent: Intent?) {
            LongRunningTask().execute()
        }
    }
```
If you have any feedback/corrections, please feel free to leave a comment below.

Thanks for reading and happy coding! 💻
