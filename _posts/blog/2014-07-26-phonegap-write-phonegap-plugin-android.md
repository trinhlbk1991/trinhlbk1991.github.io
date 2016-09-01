---
layout: post
title:  Write PhoneGap Plugin for Android
date: 2014-07-26 00:37
author: admin
comments: true
categories: [blog]
tags: [Android, PhoneGap, Hybrid]
---

<h2>A – Overview</h2>
As you know, PhoneGap provide you some native functionality (plugins) like camera, compass, contacts…

Those plugins are able to communicate between the native code (Java/ Object C) and the JavaScript code so that they allow you to extend the limit of PhoneGap functionality, to add your own custom feature via exposing native code.

In this post, I’ll show you how to write PhoneGap plugin for Android specifically.

<!--more-->
<h2>B – Write the native Java interface</h2>
Firstly, create a Java class that extends <strong>CordovaPlugin</strong>:

<pre>
public class ToastPlugin extends CordovaPlugin {

}
</pre>

Then, create a constant to define plugin action. This will help you to decide which function will be operated if your plugin provides more than one action.

<pre>
public static final String ACTION_SHOW_TOAST=&quot;ShowToast&quot;;
</pre>

Last but not least, override the <strong>execute()</strong> method:
<ul>
	<li>First, check if the action is one of provided actions</li>
	<li>Get the arguments value from JSONArray</li>
	<li>Show toast</li>
	<li>Finally inform back a success callback</li>
</ul>

<pre>
@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		try {
			if(action.equals(ACTION_SHOW_TOAST)){
				// Get arguments values
				JSONObject argsObj = args.getJSONObject(0);
				String message = argsObj.getString(&quot;message&quot;);
				int length = (argsObj.getInt(&quot;length&quot;) == 1) ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;

				// Show Toast
				Toast.makeText((Context) this.cordova, message, length).show();

				// Inform a success callback function
				callbackContext.success();
				return true;
			}

			callbackContext.error(&quot;Invalid action!&quot;);
			return false;

		} catch (Exception e) {
			callbackContext.error(e.getMessage());
			return false;
		}
	}
</pre>

&nbsp;
<h2>C – Write the JavaScript interface</h2>
This JavaScript interface will be the bridge that allows you to call the Java function from JavaScript.

Create a <strong>showToast</strong> function, which call <strong>cordova.exec()</strong> inside of it.
<ul>
	<li>Success Callback Function</li>
	<li>Error Callback Function</li>
	<li>Service Name</li>
	<li>Action Name</li>
	<li>Array of arguments</li>
</ul>

[javascript]
var toastPlugin = {
    showToast: function(message, length, successCallback, errorCallback) {
    	cordova.exec(
	        successCallback, // Success callback function
	        errorCallback,   // Error callback function
	        'ToastPlugin',   // ToastPlugin java class name
	        'ShowToast', 	 // Action name
	        [{               // Arguments JSON array
	            &quot;message&quot;: message,
	            &quot;length&quot;: length
	        }]
	    );
    }
}
[/javascript]


</pre>
<h2>D – Update config.xml file</h2>
<pre>
Add the following mapping to the end of the features list in your <strong>config.xml</strong> file:

<pre>
&lt;feature name=&quot;ToastPlugin&quot;&gt;
       &lt;param name=&quot;android-package&quot; value=&quot;ice.tea.democordovaplugin.ToastPlugin&quot; /&gt;
&lt;/feature&gt;
</pre></pre>
<h2>E – Use it ;)</h2>
<pre>
Simply, Just call the function in JavaScript interface:

[javascript]
function showToast(){
	var msg = $(&quot;#txtInput&quot;).val();
	var length = 0;
	toastPlugin.showToast(msg, length, showToastSuccessCallback, showToastErrorCallback);
}

function showToastSuccessCallback(){

}

function showToastErrorCallback(){

}
[/javascript]


</pre>
<h2>D – Full Demo</h2>
<pre>
<strong>Index.html</strong>

[html]
&lt;html&gt;
&lt;head&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0&quot; /&gt;
	&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=ISO-8859-1&quot;&gt;
	&lt;meta name=&quot;format-detection&quot; content=&quot;telephone=no&quot;&gt;

    &lt;link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;../css/jquery.mobile-1.4.2.min.css&quot; /&gt;
    &lt;link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;../css/app.css&quot; /&gt;

	&lt;script type=&quot;text/javascript&quot; src=&quot;../js/jquery-2.0.0.min.js&quot;&gt;&lt;/script&gt;
	&lt;script type=&quot;text/javascript&quot; charset=&quot;utf-8&quot; src=&quot;../js/cordova.js&quot;&gt;&lt;/script&gt;
	&lt;script type=&quot;text/javascript&quot; charset=&quot;utf-8&quot; src=&quot;../js/jquery.mobile-1.4.2.min.js&quot;&gt;&lt;/script&gt;
	&lt;script type=&quot;text/javascript&quot; charset=&quot;utf-8&quot; src=&quot;../js/app.js&quot;&gt;&lt;/script&gt;    

	&lt;title&gt;Cordova Plugin&lt;/title&gt;

&lt;/head&gt;

&lt;body&gt;

    &lt;!-- LOGIN PAGE --&gt;
    &lt;div data-role=&quot;page&quot; id=&quot;page_login&quot;&gt;

        &lt;div data-role=&quot;header&quot;&gt;
            &lt;h1&gt;Cordova Plugin&lt;/h1&gt;
        &lt;/div&gt;

        &lt;div data-role=&quot;content&quot;&gt;
            &lt;input id=&quot;txtInput&quot; type=&quot;text&quot;&gt;
            &lt;a data-role=&quot;button&quot; onclick=&quot;showToast()&quot;&gt;Show Toast&lt;/a&gt;
		&lt;/div&gt;

        &lt;div data-role=&quot;footer&quot;&gt;

        &lt;/div&gt;

    &lt;/div&gt;
    &lt;!-- LOGIN PAGE --&gt;
&lt;/body&gt;

&lt;/html&gt;
[/html]

<strong> App.js</strong>

[javascript]
var toastPlugin = {
    showToast: function(message, length, successCallback, errorCallback) {
    	cordova.exec(
	        successCallback, // Success callback function
	        errorCallback,   // Error callback function
	        'ToastPlugin',   // ToastPlugin java class name
	        'ShowToast', 	 // Action name
	        [{               // Arguments JSON array
	            &quot;message&quot;: message,
	            &quot;length&quot;: length
	        }]
	    );
    }
}

function showToast(){
	var msg = $(&quot;#txtInput&quot;).val();
	var length = 0;
	toastPlugin.showToast(msg, length, showToastSuccessCallback, showToastErrorCallback);
}

function showToastSuccessCallback(){

}

function showToastErrorCallback(){

}
[/javascript]

<strong> ToastPlugin.java</strong>
<pre>
public class ToastPlugin extends CordovaPlugin {
	public static final String ACTION_SHOW_TOAST=&quot;ShowToast&quot;;

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		try {
			if(action.equals(ACTION_SHOW_TOAST)){
				// Get arguments values
				JSONObject argsObj = args.getJSONObject(0);
				String message = argsObj.getString(&quot;message&quot;);
				int length = (argsObj.getInt(&quot;length&quot;) == 1) ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT;

				// Show Toast
				Toast.makeText((Context) this.cordova, message, length).show();

				// Inform a success callback function
				callbackContext.success();
				return true;
			}

			callbackContext.error(&quot;Invalid action!&quot;);
			return false;

		} catch (Exception e) {
			callbackContext.error(e.getMessage());
			return false;
		}
	}

}
</pre>

Demo Screenshot:

<img class="size-full wp-image-1848 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/07/toastpluginphonegap.png" alt="toastpluginphonegap" width="324" height="487" />
<h2><span lang="EN-GB">E – Source Code</span></h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fMmZBWGJYb1ZNMmc/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fMmZBWGJYb1ZNMmc/edit?usp=sharing</a>
