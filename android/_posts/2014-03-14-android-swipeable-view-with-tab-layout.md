---
layout: post
title: Android Swipe View with Tab Layout
date: 2014-03-14 13:23
author: trinh_le
comments: true

tags: []
---

In my previous post <a style="font-size: 14px; line-height: 1.5em;" title="[Android] Tab Layout" href="http://icetea09.com/blog/2014/02/06/tab-layout/">"Android Tab Layout"</a><span style="font-size: 14px; line-height: 1.5em;">, I showed you how to use TabHost to display a Tab layout. Unfortunately, TabHost is deprecated by android in favor of fragments.</span>

Instead of using TabHost, you can create the Android Swipe View with Tab Layout. With Swipe View, user can navigate between sibling screens with a horizontal finger gesture.

This post will show you how to create a tab layout with swipe views for switching between tabs.

<!--more-->
<h2>A - Layout Overview of Android Swipe View with Tab Layout demo</h2>
As you can see in the picture below, Tab is a part of ActionBar. The main layout is a ViewPager and in each individual pager views, we use <a title="[Android] Fragment" href="http://icetea09.com/blog/2014/01/22/android-fragment/">Fragment</a>.

<img class="size-full wp-image-1189 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/layout_overview.png" alt="Android Swipe View with Tab Layout" width="495" height="611" />
<h2>B - Create new project</h2>
Firstly, create a new project. Remember to choose the Theme's value is Holo Light with Dark Action Bar.

<img class="size-full wp-image-1190 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/1.png" alt="1" width="665" height="561" />

&nbsp;

Cause we're going to use <strong>Fragment</strong> and<strong> ActionBar Tab</strong>, extend <strong>MainActivity</strong> from <strong>FragmentActivity</strong> and implement this class from the <strong>TabListener</strong> too.

When implement the <strong>TabListener</strong>, you have to add some parents methods: <strong>onTabReselected</strong>, <strong>onTabSelected</strong> and <strong>onTabUnselected</strong>.
<pre class="lang:default decode:true ">public class MainActivity extends FragmentActivity implements TabListener {

    @Override 
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState); 
        setContentView(R.layout.activity_main); 
    } 

    @Override 
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present. 
        getMenuInflater().inflate(R.menu.main, menu); 
        return true; 
    } 

    @Override 
    public void onTabReselected(Tab tab, FragmentTransaction ft) {
        // TODO Auto-generated method stub 

    } 

    @Override 
    public void onTabSelected(Tab tab, FragmentTransaction ft) {
        // TODO Auto-generated method stub 

    } 

    @Override 
    public void onTabUnselected(Tab tab, FragmentTransaction ft) {
        // TODO Auto-generated method stub 

    } 

}</pre>
&nbsp;
<h2>C - Implement Swipe View</h2>
Add the <strong>ViewPager</strong> control into main layout:
<pre class="lang:default decode:true ">&lt;?xml version="1.0" encoding="utf-8"?&gt; 
&lt;android.support.v4.view.ViewPager 
        xmlns:android="http://schemas.android.com/apk/res/android" 
        android:id="@+id/view_pager" 
        android:layout_width="match_parent" 
        android:layout_height="match_parent" &gt; 

&lt;/android.support.v4.view.ViewPager&gt;</pre>
&nbsp;

To bind child views that represent each page, you have to assign a <strong>PagerAdapter</strong> to this <strong>ViewPager</strong>.

There're 2 type of adapter you can use:
<ul>
	<li><strong>FragmentPageAdapter</strong>: best choice for a fixed, small number of pages</li>
	<li><strong>FragmentStatePagerAdapter</strong>: used for undetermined number of pages, minimize memory usage</li>
</ul>
In this case, I choose <strong>FragmentPageAdapter</strong>.

Create <strong>PagerViewAdapter</strong> class that extends from <strong>FragmentPageAdapter. </strong>

Implement derived methods:
<ul>
	<li><strong>getItem()</strong>: return the Fragment that associates with current tab</li>
	<li><strong>getCount()</strong>: return the total tabs</li>
</ul>
<pre class="lang:default decode:true ">public class PagerViewAdapter extends FragmentPagerAdapter {

    public PagerViewAdapter(FragmentManager fm) { 
        super(fm); 
    } 

    @Override 
    public Fragment getItem(int index) {
        switch (index) { 
        case 0: 
            return new FirstTabFragment();
        case 1: 
            return new SecondTabFragment();
        case 2: 
            return new ThirdTabFragment();
        default: 
            return new FirstTabFragment();
        } 
    } 

    @Override 
    public int getCount() {
        return 3; 
    } 

}</pre>

<h2>D - Create Fragments for each ViewPager item</h2>

Create 3 fragments for 3 tabs. Each fragment contains a <strong>TextView</strong> that describes content of current tab. I only show the layout and code of the <strong>FirstTabFragment</strong>. Two remained is almost the same, you can look at it in the source code (download link is at the end of this post). 

<blockquote><span style="text-decoration: underline;"><strong>Note:</strong></span> You need to be carefull with automatic imports.   Eclipse automaticly imported <strong>android.app.Fragment</strong> for me, while you need to have <strong>android.support.v4.app.Fragment</strong> if you don’t want to get errors in the getItem method in your adapter.</blockquote>

Layout -<strong> first_tab_fragment.xml:</strong> 

<pre class="lang:default decode:true ">&lt;?xml version="1.0" encoding="utf-8"?&gt; 
&lt;RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android" 
    android:layout_width="match_parent" 
    android:layout_height="match_parent"  
    android:background="#CCCC00"&gt; 

    &lt;TextView 
        android:id="@+id/textView1" 
        android:layout_width="wrap_content" 
        android:layout_height="wrap_content" 
        android:text="First Tab Content" 
        android:layout_centerHorizontal="true" 
        android:layout_centerVertical="true" 
        android:textAppearance="?android:attr/textAppearanceMedium" /&gt; 

&lt;/RelativeLayout&gt;</pre>

  Code - <strong>FirstTabFragment.java</strong>: 

<pre class="lang:default decode:true">public class FirstTabFragment extends Fragment {

    @Override 
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {         
        View view = inflater.inflate(R.layout.first_tab_fragment, container, false);        
        return view; 
    } 
}</pre>

&nbsp;

<h2>E - Add Tabs to ActionBar</h2>

To add Tabs to ActionBar, you must enable <strong>NAVIGATION_MODE_TABS </strong>in<strong> MainActivity </strong>first: 

<pre class="lang:default decode:true ">final ActionBar actionBar = getActionBar(); 
actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);</pre>

  Then, add tabs to <strong>ActionBar</strong>: 

<pre class="lang:default decode:true ">@Override 
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState); 
    setContentView(R.layout.activity_main); 

    final ActionBar actionBar = getActionBar(); 
    actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS); 

    // Add tabs to ActionBar and set tab title     
    for (int i = 0; i &lt; 3; i++) {
        actionBar.addTab(actionBar.newTab().setText("Tab " + (i + 1)).setTabListener(this)); 
    } 
}</pre>

  Next, create a ViewPagerAdapter instance and assign it to the ViewPager: 

<pre class="lang:default decode:true ">ViewPager viewPager = (ViewPager)findViewById(R.id.view_pager); 
PagerViewAdapter adapter = new PagerViewAdapter(getSupportFragmentManager());
viewPager.setAdapter(adapter);</pre>

  Finally, implement <strong>onTabSelected</strong> method to set the appropriate view base on tab index: 

<pre class="lang:default decode:true ">@Override 
public void onTabSelected(Tab tab, FragmentTransaction ft) {
    viewPager.setCurrentItem(tab.getPosition()); 
}</pre>

  Run project and enjoy the result <img class="size-full wp-image-1191 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/result.png" alt="Android Swipe View with Tab Layout" width="541" height="509" /> 

<h2>F - Download source code</h2>

<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fRlBvWHQ2TFlYcUE/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fRlBvWHQ2TFlYcUE/edit?usp=sharing</a>
