---
title: "Android Action Bar"
date: 2014-03-18
tags: ["Android UI"]
toc: true
comments: true
---

<h2>A - Android Action Bar introduction</h2>
Android Action Bar provides a consistent navigation across your application that can adapt for different screen configurations.

<img class="size-full wp-image-1225 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/actionbar@2x.png" alt="Android Action Bar" width="500" />

As you can see, the above figure describe all the components of the Action Bar:
<ol>
	<li>App icon</li>
	<li>Action items</li>
	<li>Action overflow</li>
</ol>
The Action Bar has the powerful capabilities like:
<ul>
	<li>Adapting to screen configurations (landscape &amp; portrait)</li>
	<li>Prioritizing important actions</li>
	<li>Adding widgets to action bar (search, sharing etc.)</li>
	<li>Providing navigation between screens (drop-down &amp; tabbed navigation) and much more...</li>
</ul>
In this post, I'll show you how to set up, add and response to user actions in the Action Bar.

Next post is about customizing it!

<!--more-->
<h2>B - Set up the Android Action Bar</h2>
The Action Bar is default supported for Android 3.0 (API level 11). If you want to use Action Bar in Android 2.1 and above, you must include the Android Support Library in your application.
<h3>1. Android 3.0 and above only</h3>
To add Action Bar to your app activities, open <strong>AndroidManifest</strong> file and update <strong>minSdkVersion</strong> attribute to 11:
<pre class="lang:default decode:true ">&lt;uses-sdk 
        android:minSdkVersion="11" 
        android:targetSdkVersion="18" /&gt;</pre>
&nbsp;

Easy as pie!
<h3>2. Android 2.1 and above</h3>
To get started, please read this <a href="http://developer.android.com/tools/support-library/setup.html">post </a>to know how to setup Support Library (in this case, we need the  <strong>v7 appcompat </strong>library).

After setting up Support Library, do the following steps to add the <strong>v7 appcompat</strong> library:
<ul>
	<li>Select File --&gt; Import</li>
	<li>Select <strong>Existing Android Code Into Workspace</strong> and click <strong>Next</strong></li>
	<li>Browse to Android SDK folder and select <strong>v7 appcompat</strong> library project</li>
</ul>
<img class="size-full wp-image-1226 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/11.png" alt="1" width="522" height="619" />
<ul>
	<li>In the <strong>libs</strong> folder, add all <strong>jar</strong> files to Build Path:</li>
</ul>
<img class="size-full wp-image-1227 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/8542.png" alt="8542" width="627" height="387" />
<ul>
	<li>Right-click the library project folder and select <strong>Build Path &gt; Configure Build Path </strong>and check like the following figure</li>
</ul>
<img class="size-full wp-image-1228 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/84646.png" alt="84646" width="719" height="347" />

After importing the library project, add the library project to your own project:
<ul>
	<li>Right-click your project and select <strong>Properties</strong></li>
	<li>On the left side, select <strong>Android</strong></li>
	<li>In the Library pane, click the <strong>Add</strong> button</li>
	<li>Select the library project and click <strong>OK</strong></li>
</ul>
<a href="http://icetea09.com/wp-content/uploads/2014/03/86436264.png"><img class="size-full wp-image-1229 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/86436264.png" alt="86436264" width="729" height="617" /></a>

&nbsp;

Once you had your project integrated with the library, update all the activities to extends <strong>ActionBarActivity</strong>:
<pre class="lang:default decode:true ">public class MainActivity extends ActionBarActivity {

    ... 

}</pre>
&nbsp;

In <strong>AndroidManifest</strong> file, update <strong>theme</strong> attribute for<strong> &lt;application&gt;</strong> and <strong>&lt;activity&gt;</strong> tags using one of them <strong>Theme.AppCompat</strong> themes:
<pre class="lang:default decode:true ">&lt;application 
    android:allowBackup="true" 
    android:icon="@drawable/ic_launcher" 
    android:label="@string/app_name" 
    android:theme="@style/Theme.AppCompat.Light" &gt; 
    &lt;activity 
        android:name="ice.tea09.demoactionbar.MainActivity" 
        android:label="@string/app_name" 
        android:theme="@style/Theme.AppCompat.Light" &gt; 

        &lt;intent-filter&gt; 
            &lt;action android:name="android.intent.action.MAIN" /&gt; 

            &lt;category android:name="android.intent.category.LAUNCHER" /&gt; 
        &lt;/intent-filter&gt; 

    &lt;/activity&gt; 
&lt;/application&gt;</pre>
&nbsp;

Done setting up the Action Bar!
<h2>C - Adding Action Buttons</h2>
<h3>1. Declare Actions in XML file</h3>
Open <strong>main.xml</strong> file under <strong>res/menu</strong> directory. This file defines all the action buttons and other items available in the action overflow.
<pre class="lang:default decode:true ">&lt;menu xmlns:android="http://schemas.android.com/apk/res/android" &gt; 

    &lt;!-- Search, should appear as action button --&gt; 
    &lt;item android:id="@+id/action_search" 
          android:icon="@drawable/search" 
          android:title="@string/action_search" 
          android:showAsAction="ifRoom" /&gt; 

     &lt;!-- Settings, should always be in the overflow --&gt; 
    &lt;item 
        android:id="@+id/action_settings" 
        android:orderInCategory="100" 
        android:showAsAction="never" 
        android:title="@string/action_settings"/&gt; 

&lt;/menu&gt;</pre>
&nbsp;

By default, all the action buttons appear in the overflow.

With the <strong>android:showAsAction="ifRoom"</strong> attribute, the Search action will appear as an Action Button if there're any available rooms.

For supporting Android 2.1 and above, the xml file has some minor differences:
<pre class="lang:default decode:true ">&lt;menu xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:ice.tea09.demoactionbar="http://schemas.android.com/apk/res-auto"&gt; 

    &lt;!-- Search, should appear as action button --&gt; 
    &lt;item android:id="@+id/action_search" 
          android:icon="@drawable/ic_action_search" 
          android:title="@string/action_search" 
         ice.tea09.demoactionbar:showAsAction="ifRoom" /&gt; 

     &lt;!-- Settings, should always be in the overflow --&gt; 
    &lt;item 
        android:id="@+id/action_settings" 
        android:orderInCategory="100" 
        android:title="@string/action_settings"/&gt; 

&lt;/menu&gt;</pre>
&nbsp;

Note: <strong>ice.tea09.demoactionbar</strong> is your app package.
<h3>2. Add Actions to the Action Bar</h3>
In MainActivity, update the  <strong>onCreateOptionsMenu()</strong> method to call the desired xml file:
<pre class="lang:default decode:true ">@Override 
public boolean onCreateOptionsMenu(Menu menu) {
    // Inflate the menu; this adds items to the action bar if it is present. 
    getMenuInflater().inflate(R.menu.main, menu); 
    return true; 
}</pre>
&nbsp;
<h3>3. Handle user interactions to Action Buttons</h3>
To handle when user press any Action Buttons, we need to implement  <strong>onOptionsItemSelected()</strong> method:
<pre class="lang:default decode:true ">@Override 
public boolean onOptionsItemSelected(MenuItem item) {
    // Handle presses on the action bar items 
    switch (item.getItemId()) { 
        case R.id.action_search: 
            Toast.makeText(getApplicationContext(), "You hit the Search Action!", Toast.LENGTH_SHORT).show(); 
            return true; 
        case R.id.action_settings: 
            Toast.makeText(getApplicationContext(), "You hit the Settings Action!", Toast.LENGTH_SHORT).show(); 
            return true; 
        default: 
            return super.onOptionsItemSelected(item);
    } 
}</pre>
&nbsp;

Result when you run the project:

<img class="alignnone size-full wp-image-1230" src="http://icetea09.com/wp-content/uploads/2014/03/384137245.png" alt="Android Action Bar" width="303" height="403" /> <img class="alignnone size-full wp-image-1231" src="http://icetea09.com/wp-content/uploads/2014/03/asdfwr.png" alt="asdfwr" height="403" />

Note: The left figure show result of devices that have MENU button, an the right one show the result of devices that don't have MENU button. It's the default setting of Google.
<h2>D - Add Up-button for low level activities</h2>
To perform an Up navigation, first of all, you have to declare the parent activity in <strong>AndroidManifest</strong>:
<pre class="lang:default decode:true ">&lt;activity 
     android:name="ice.tea09.demoandroidactionbar.ChildActivity" 
     android:label="@string/title_activity_child" &gt; 

     &lt;meta-data 
            android:name="android.support.PARENT_ACTIVITY" 
            android:value="ice.tea09.demoandroidactionbar.MainActivity" /&gt; 

&lt;/activity&gt;</pre>
&nbsp;

Then enable the app icon as the <em>Up</em> button by calling <strong><code>setDisplayHomeAsUpEnabled()</code></strong>:
<pre class="lang:default decode:true ">@Override 
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState); 
    setContentView(R.layout.activity_child); 

    getSupportActionBar().setDisplayHomeAsUpEnabled(true); 
    // If your minSdkVersion is 11 or higher, instead use: 
    // getActionBar().setDisplayHomeAsUpEnabled(true); 
}</pre>
&nbsp;

Result when enable Up navigation:

<a href="http://icetea09.com/wp-content/uploads/2014/03/asef25456.png"><img class="alignnone size-full wp-image-1232 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/asef25456.png" alt="asef25456" width="486" height="192" /></a>
<h2>E - Download demo source code</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fdWNhVm9hdlp5MDQ/edit?usp=sharing">https://drive.google.com/file/d/0Bw3dwdSezn6fdWNhVm9hdlp5MDQ/edit?usp=sharing</a>

So, that's all about this post. As I mentioned before, the next post about Action Bar will show you how to customize it!