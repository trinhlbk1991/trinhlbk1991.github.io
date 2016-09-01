---
layout: post
title: Floating View like Facebook Chatheads
date: 2015-03-16 23:21
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
image: https://c2.staticflickr.com/2/1517/25279627219_998c657db3_b.jpg
---

In this post, I'll show you how to create a <em><strong>floating view like Facebook chatheads</strong></em> - the view that was drawn on top of other applications.
<br/>
So, the very first question is: How can we do that? An activity with transparent background?
<br/>
Actually, there's no <em><strong>activity</strong> </em>here. Instead, we'll user <em><strong>service</strong></em>!

As you know, <em><strong>activity</strong> </em>and <em><strong>dialog</strong> </em>have their own <a href="http://developer.android.com/reference/android/view/Window.html" target="_blank">Window </a>instance which provides standard UI policies such as a background, title area, default key processing, etc.

Even the <em><strong>service </strong></em>has Window! So, the solution here is that we will use the service's Window to draw our desired view (that can be overlay on other application!).

In order to do that, you have to follow below steps:
<h2>1 - Add permission</h2>
Open <strong>AndroidManifest.xml</strong> file and add the below permission:
{% highlight java %}
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
{% endhighlight %}
Regards to Android documents:
<blockquote>Allows an application to open windows using the type <code><a href="http://developer.android.com/reference/android/view/WindowManager.LayoutParams.html#TYPE_SYSTEM_ALERT">TYPE_SYSTEM_ALERT</a></code>, shown on top of all other applications. Very few applications should use this permission; these windows are intended for system-level interaction with the user.</blockquote>
<h2>2 - Create Floating View Service</h2>
Create a class called <strong>FloatingViewService</strong> that extends <strong>Service, </strong>contains Window instance and a <strong>FrameLayout</strong> object used to display your view:
{% highlight java %}
public class FloatingViewService extends Service {

    private WindowManager mWindowManager;
    private FrameLayout mFrameLayout;

    @Override
    public IBinder onBind(Intent intent) {
        //Not use this method
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
{% endhighlight %}
Inside <strong>onCreate</strong> method, we just need to set up the view with the corresponding layout params and finally call <strong>WindowManager.addView()</strong>:
{% highlight java %}
mWindowManager = (WindowManager) getSystemService(WINDOW_SERVICE);

final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.WRAP_CONTENT,
        WindowManager.LayoutParams.TYPE_PHONE,
        WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
        PixelFormat.TRANSLUCENT);

params.gravity = Gravity.TOP | Gravity.LEFT;

mFrameLayout = new FrameLayout(context);

mWindowManager.addView(mFrameLayout, params);

LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
// Here is the place where you can inject whatever layout you want.
layoutInflater.inflate(R.layout.head, mFrameLayout);
{% endhighlight %}
Please note that 3 attributes below are mandatory for floating view:
<ul>
	<li><a href="http://developer.android.com/reference/android/view/WindowManager.LayoutParams.html#TYPE_PHONE" target="_blank">WindowManager.LayoutParams.TYPE_PHONE</a></li>
	<li><a href="http://developer.android.com/reference/android/view/WindowManager.LayoutParams.html#FLAG_NOT_TOUCH_MODAL" target="_blank">WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL</a></li>
	<li><a href="http://developer.android.com/reference/android/graphics/PixelFormat.html#TRANSLUCENT" target="_blank">PixelFormat.TRANSLUCENT</a></li>
</ul>
Don't forget to declare <strong>FloatingViewService</strong> in the <strong>AndroidManifest.xml</strong> file:
{% highlight java %}
<service android:name=".FloatingViewService" />
{% endhighlight %}
Finally, start the service to trigger your floating view:
{% highlight java %}
startService(new Intent(getApplicationContext(), FloatingViewService.class));
{% endhighlight %}
<h2> 3 - Demo Floating View like Facebook Chatheads</h2>
The first two sections showed you how to implement floating view like Facebook Chatheads. In this section, I'll make a very simple application to demonstrate it.

The view in this application will be an <strong>ImageView</strong> that you can drag around.

Firstly, create an activity with a <strong>Button</strong> that allows you to turn on/off the floating view:
{% highlight java %}
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context="com.icetea09.demofloatingview.MainActivity">

    <Button
        android:id="@+id/btn_show_floating_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="Show Floating View"/>

</RelativeLayout>

{% endhighlight %}
Then, create <strong>FloatingViewService</strong>:
{% highlight java %}
package com.icetea09.demofloatingview;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.Toast;

public class FloatingViewService extends Service {

    private WindowManager mWindowManager;
    private ImageView mImgFloatingView;
    private boolean mIsFloatingViewAttached = false;

    @Override
    public IBinder onBind(Intent intent) {
        //Not use this method
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if(!mIsFloatingViewAttached){
            mWindowManager.addView(mImgFloatingView, mImgFloatingView.getLayoutParams());
        }
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onCreate() {
        super.onCreate();

        mWindowManager = (WindowManager) getSystemService(WINDOW_SERVICE);

        mImgFloatingView = new ImageView(this);
        mImgFloatingView.setImageResource(R.mipmap.ic_launcher);

        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.TOP | Gravity.LEFT;

        mWindowManager.addView(mImgFloatingView, params);

        mIsFloatingViewAttached = true;
    }

    public void removeView() {
        if (mImgFloatingView != null){
            mWindowManager.removeView(mImgFloatingView);
            mIsFloatingViewAttached = false;
        }
    }

    @Override
    public void onDestroy() {
        Toast.makeText(getApplicationContext(), "onDestroy", Toast.LENGTH_SHORT);
        super.onDestroy();
        removeView();
    }
}

{% endhighlight %}
To be able to drag the "chatheads" around, you need to handle the <strong>OnTouchListener</strong> of the <strong>ImageView</strong>:
{% highlight java %}
mImgFloatingView.setOnTouchListener(new View.OnTouchListener() {
            private int initialX;
            private int initialY;
            private float initialTouchX;
            private float initialTouchY;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        initialX = params.x;
                        initialY = params.y;
                        initialTouchX = event.getRawX();
                        initialTouchY = event.getRawY();
                        return true;
                    case MotionEvent.ACTION_UP:
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        params.x = initialX + (int) (event.getRawX() - initialTouchX);
                        params.y = initialY + (int) (event.getRawY() - initialTouchY);
                        mWindowManager.updateViewLayout(mImgFloatingView, params);
                        return true;
                }
                return false;
            }
        });
{% endhighlight %}
In the <strong>MainActivity</strong>, we handle the <strong>Button</strong> clicked event to show or hide floating view:
{% highlight java %}
public class MainActivity extends ActionBarActivity implements View.OnClickListener{

    private Button mBtnShowView;
    private boolean mIsFloatingViewShow; //Flag variable used to identify if the Floating View is visible or not

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mBtnShowView = (Button)findViewById(R.id.btn_show_floating_view);
        mBtnShowView.setOnClickListener(this);
        mIsFloatingViewShow = false;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btn_show_floating_view:
                if(mIsFloatingViewShow){
                    hideFloatingView();
                    mIsFloatingViewShow = false;
                    mBtnShowView.setText(R.string.show_floating_view);
                }
                else{
                    showFloatingView();
                    mIsFloatingViewShow = true;
                    mBtnShowView.setText(R.string.hide_floating_view);
                }
                break;
        }
    }

    private void showFloatingView() {
        startService(new Intent(getApplicationContext(), FloatingViewService.class));
    }

    private void hideFloatingView() {
        stopService(new Intent(getApplicationContext(), FloatingViewService.class));
    }

}

{% endhighlight %}
Finally, run the demo application and enjoy the result:
<iframe width="420" height="315" src="https://www.youtube.com/embed/Dfv0tsdyJmE" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
<h2>4 - Source Code Floating View like Facebook Chatheads</h2>
<a href="https://github.com/trinhlbk1991/DemoAndroidFloatingView" target="_blank">https://github.com/trinhlbk1991/DemoAndroidFloatingView</a>

&nbsp;

&nbsp;
