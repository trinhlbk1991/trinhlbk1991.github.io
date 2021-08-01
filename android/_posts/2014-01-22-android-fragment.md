---
layout: post
title: Fragment
date: 2014-01-22 10:33
author: admin
comments: true
tags: [Fragment]
---
<h2>A - Introduction</h2>
Fragment is some kind of "small Activity". It can be embed into an Activity and reused in others.

With Fragment, It's easier for you to design multi-GUI for handset, tablet...

<img class=" aligncenter" src="http://developer.android.com/images/fundamentals/fragments.png" alt="Fragment" />

Fragment has its own sets of views, life cycle and can interact with the parent Activity.

<!--more-->
<h2>B - Fragment life cycle</h2>
Fragment life cycle is affected directly by Activity life cycle. Ex: When parent Activity was Paused, all the children Fragment was Paused too.

This is Fragment life cycle diagram:

<img src="http://developer.android.com/images/fragment_lifecycle.png" alt="Fragment" />

You usually implement 3 methods of Fragment life cycle:
<ul>
	<li>onCreate(): called when the Fragment was created. In this method, you should initialize all the essential components</li>
	<li>onCreateView(): called when the Fragment create its view. This method must return a view or null if there's no layout on the Fragment</li>
	<li>onPause(): called when the user leave Fragment. This is where you should implement to save data or information of current user session.</li>
</ul>
<h2>C - Demo</h2>
First, create a layout to load in Fragment.

We need 2 layouts: list_fragment and detail_fragment
<table>
<tbody>
<tr>
<td><img src="https://lh5.googleusercontent.com/-qTgSjp0_us4/UqlZNbCimLI/AAAAAAAAFZ0/WbObCR-4xXo/w212-h352-no/list+fragment+layout.PNG" alt="Fragment" /></td>
<td>
<pre><span style="color: blue;">&lt;?</span><span style="color: maroon;">xml</span> <span style="color: red;">version</span>="<span style="color: blue;">1.0</span>" <span style="color: red;">encoding</span>="<span style="color: blue;">utf-8</span>"<span style="color: blue;">?&gt;</span>
<span style="color: blue;">&lt;</span><span style="color: maroon;">LinearLayout</span> <span style="color: red;">xmlns:android</span>="<span style="color: blue;">http://schemas.android.com/apk/res/android</span>"
    <span style="color: red;">android:layout_width</span>="<span style="color: blue;">match_parent</span>"
    <span style="color: red;">android:layout_height</span>="<span style="color: blue;">match_parent</span>"
    <span style="color: red;">android:orientation</span>="<span style="color: blue;">vertical</span>" <span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">TextView</span>
        <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/textView1</span>"
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">fill_parent</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:gravity</span>="<span style="color: blue;">center_horizontal</span>"
        <span style="color: red;">android:text</span>="<span style="color: blue;">Detail</span>"
        <span style="color: red;">android:textAppearance</span>="<span style="color: blue;">?android:attr/textAppearanceLarge</span>" /<span style="color: blue;">&gt;</span>

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">LinearLayout</span><span style="color: blue;">&gt;</span></pre>
</td>
</tr>
<tr>
<td><img src="https://lh6.googleusercontent.com/-86qYf7z0gDY/UqlZNmRsiMI/AAAAAAAAFaE/3-nIx-lSiJE/w213-h355-no/detail+fragment.PNG" alt="Fragment" /></td>
<td>
<pre><span style="color: blue;">&lt;?</span><span style="color: maroon;">xml</span> <span style="color: red;">version</span>="<span style="color: blue;">1.0</span>" <span style="color: red;">encoding</span>="<span style="color: blue;">utf-8</span>"<span style="color: blue;">?&gt;</span>
<span style="color: blue;">&lt;</span><span style="color: maroon;">LinearLayout</span> <span style="color: red;">xmlns:android</span>="<span style="color: blue;">http://schemas.android.com/apk/res/android</span>"
    <span style="color: red;">android:layout_width</span>="<span style="color: blue;">match_parent</span>"
    <span style="color: red;">android:layout_height</span>="<span style="color: blue;">match_parent</span>"
    <span style="color: red;">android:orientation</span>="<span style="color: blue;">vertical</span>" <span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">Button</span>
        <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/button1</span>"
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">fill_parent</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:text</span>="<span style="color: blue;">First Button</span>" /<span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">Button</span>
        <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/button2</span>"
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">fill_parent</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:text</span>="<span style="color: blue;">Second Button</span>" /<span style="color: blue;">&gt;</span>

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">LinearLayout</span><span style="color: blue;">&gt;</span></pre>
</td>
</tr>
</tbody>
</table>
After that, create classes to inflate Fragment layouts:

ListFragment class:
<pre><span style="color: blue;">public</span> <span style="color: blue;">class</span> ListFragment <span style="color: blue;">extends</span> Fragment {

    @Override
    <span style="color: blue;">public</span> <span style="color: blue;">void</span> onCreate(Bundle arg0) {
        <span style="color: blue;">super</span>.onCreate(arg0);
    }

    @Override
    <span style="color: blue;">public</span> View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        <strong>View v = inflater.inflate(R.layout.list_fragment, container, <span style="color: maroon;">false</span>);</strong>
        <span style="color: blue;">return</span> v;
    }

}</pre>
DetailFragment class:
<pre><span style="color: blue;">public</span> <span style="color: blue;">class</span> DetailFragment <span style="color: blue;">extends</span> Fragment {

    @Override
    <span style="color: blue;">public</span> <span style="color: blue;">void</span> onCreate(Bundle arg0) {
        <span style="color: blue;">super</span>.onCreate(arg0);
    }

    @Override
    <span style="color: blue;">public</span> View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
       <strong> View v = inflater.inflate(R.layout.detail_fragment, container, <span style="color: maroon;">false</span>);</strong>
        <span style="color: blue;">return</span> v;
    }

}</pre>
Adding Fragment to an Activity
<pre><span style="color: blue;">&lt;</span><span style="color: maroon;">LinearLayout</span> <span style="color: red;">xmlns:android</span>="<span style="color: blue;">http://schemas.android.com/apk/res/android</span>"
    <span style="color: red;">android:layout_width</span>="<span style="color: blue;">fill_parent</span>"
    <span style="color: red;">android:layout_height</span>="<span style="color: blue;">fill_parent</span>"
    <span style="color: red;">android:orientation</span>="<span style="color: blue;">vertical</span>" <span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">fragment</span>
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/fragmentList</span>"
        <span style="color: red;">android:name</span>="<span style="color: blue;">ice.tea09.androiddemo.ListFragment</span>" /<span style="color: blue;">&gt;</span>

    <span style="color: blue;">&lt;</span><span style="color: maroon;">fragment</span>
        <span style="color: red;">android:layout_width</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:layout_height</span>="<span style="color: blue;">wrap_content</span>"
        <span style="color: red;">android:id</span>="<span style="color: blue;">@+id/fragmentDetail</span>"
        <span style="color: red;">android:name</span>="<span style="color: blue;">ice.tea09.androiddemo.DetailFragment</span>" /<span style="color: blue;">&gt;</span>

<span style="color: blue;">&lt;</span>/<span style="color: maroon;">LinearLayout</span><span style="color: blue;">&gt;</span></pre>
In parent Activity, we can interact with each Fragment and controls in it:
<ul>
	<li>Get the fragment by its id:</li>
</ul>
<pre>fragmentList =(ListFragment) getFragmentManager().findFragmentById(id.fragmentList);
fragmentDetail =(DetailFragment) getFragmentManager().findFragmentById(id.fragmentDetail);</pre>
<ul>
	<li>Get the controls in a Fragment:</li>
</ul>
<pre>btnFirst = (Button)fragmentList.getView().findViewById(id.button1);
btnSecond = (Button)fragmentList.getView().findViewById(id.button2);</pre>
Below is all the code in FragmentActivity:
<pre><span style="color: blue;">public</span> <span style="color: blue;">class</span> FragmentActivity <span style="color: blue;">extends</span> Activity {

    ListFragment fragmentList;
    DetailFragment fragmentDetail;
    Button btnFirst;
    Button btnSecond;
    TextView lbDetail;

    @Override
    <span style="color: blue;">protected</span> <span style="color: blue;">void</span> onCreate(Bundle savedInstanceState) {
        <span style="color: blue;">super</span>.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fragment);

        fragmentList =(ListFragment) getFragmentManager().findFragmentById(id.fragmentList);
        fragmentDetail =(DetailFragment) getFragmentManager().findFragmentById(id.fragmentDetail);

        btnFirst = (Button)fragmentList.getView().findViewById(id.button1);
        btnSecond = (Button)fragmentList.getView().findViewById(id.button2);
        lbDetail = (TextView)fragmentDetail.getView().findViewById(id.textView1);

        btnFirst.setOnClickListener(<span style="color: blue;">new</span> OnClickListener() {

            @Override
            <span style="color: blue;">public</span> <span style="color: blue;">void</span> onClick(View v) {
                lbDetail.setText(<span style="color: maroon;">"Button First was clicked!"</span>);
            }
        });

        btnSecond.setOnClickListener(<span style="color: blue;">new</span> OnClickListener() {

            @Override
            <span style="color: blue;">public</span> <span style="color: blue;">void</span> onClick(View v) {
                lbDetail.setText(<span style="color: maroon;">"Button Second was clicked!"</span>);
            }
        });
    }

    @Override
    <span style="color: blue;">public</span> <span style="color: blue;">boolean</span> onCreateOptionsMenu(Menu menu) {
        <span style="color: green;">// Inflate the menu; this adds items to the action bar if it is present.</span>
        getMenuInflater().inflate(R.menu.main, menu);
        <span style="color: blue;">return</span> <span style="color: maroon;">true</span>;
    }
}</pre>
The result of this demo:

<img src="https://lh5.googleusercontent.com/-zHi-HiQIqoU/UqlZNRuniDI/AAAAAAAAFZ4/DZCadmlA2Pk/w240-h383-no/fragment+demo.png" alt="" />

Source code:

<a href="https://drive.google.com/file/d/0BzvV1wN-WHWwZUZQeG1BODhRSnM/edit?usp=sharing">https://drive.google.com/file/d/0BzvV1wN-WHWwZUZQeG1BODhRSnM/edit?usp=sharing</a>
