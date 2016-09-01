---
layout: post
title:  Call Java Function from JavaScript
date: 2014-07-18 20:36
author: admin
comments: true
categories: [blog]
tags: [Android, PhoneGap, Hybrid]
---

Building a PhoneGap app is not only using HTML, JavaScript and CSS. Sometime, you have to use native code (Java, Objective C, C#) to develop some functions that cannot be implemented by JavaScript. After that, use JavaScript to call that native function.

In this post, I’ll show you how to call Java function from JavaScript in a PhoneGap app.

A – Create Java Class

Firstly, create a normal Java class to do whatever you want but you cannot implement it using JavaScript:

<pre>
public class StaffId {
	private String staffId;

	public StaffId() {
		staffId = "";
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
}
</pre>

<!--more-->
<h2>B – Add Java class to JavaScript Interface</h2>
In <strong>onCreate()</strong> method, before command <em><strong>super.loadUrl(Config.getStartUrl(), 10000);</strong></em>, call the following lines of code to add Java class to JavaScript interface:

<pre>
staffId = new StaffId();
appView.addJavascriptInterface(staffId, "StaffId");
</pre>

<h2>C – Call Java function from JavaScript</h2>
With a very simple line of code, you can easily call the native function:

<pre>
window.StaffId.setStaffId(staffId);
</pre>

<h2>D – Full Demo</h2>
In this demo app, users have to input the Staff ID and EPIN number to login. After login, the app will display a Toast to show the staff ID.

Please find the full source code for the demo to understand more about this post:

<strong>StaffId.java</strong>

<pre>
public class StaffId {
	private String staffId;

	public StaffId() {
		staffId = "";
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
}
</pre>

<strong>Index.html</strong>

{% highlight html %}
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="format-detection" content="telephone=no">

	<link type="text/css" rel="stylesheet" href="../css/jquery.mobile-1.4.2.min.css" />
	<script type="text/javascript" src="../js/jquery-2.0.0.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="../js/cordova.js"></script>
	<script type="text/javascript" charset="utf-8" src="../js/jquery.mobile-1.4.2.min.js"></script>

	<title>Demo call Java function from JavaScript</title>

    <script type="text/javascript">
         $(document).ready(function(){
        	 $("#btn_login").on( "click", function(){
        		 var staffId = $("#txtStaffId").val().trim();
                 window.StaffId.setStaffId(staffId);
                 $.mobile.navigate("#page_result");
        	 });
         });
     </script>
</head>

<body>

    <!-- LOGIN PAGE -->
    <div data-role="page" id="page_login">

		<div data-role="header">
            <h1>Login</h1>
        </div>

        <div data-role="content">
            <input name="staffId" id="txtStaffId" maxlength="6" placeholder="Employee Number" type="tel" value="" />
            <input name="epin" id="txtEPIN" maxlength="4" placeholder="EPIN" type="tel" value="" />

			<div id="loginbtn">
				<a data-role="button" id="btn_login" href="#">Login</a>
			</div>
		</div>

        <div data-role="footer">

        </div>

    </div>
    <!-- LOGIN PAGE -->

    <div data-role="page" id="page_result">

        <div data-role="header">
            <h1>Result</h1>
        </div>

        <div data-role="content">
            <h2>Login Success</h2>
        </div>

        <div data-role="footer">

        </div>

    </div>

</body>

</html>
{% endhighlight %}

<strong> MainActivity.java</strong>

<pre>
public class MainActivity extends DroidGap {

	public StaffId staffId;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();

		staffId = new StaffId();
		appView.addJavascriptInterface(staffId, "StaffId");

		super.setIntegerProperty("splashscreen", R.drawable.splash);
		super.loadUrl(Config.getStartUrl(), 10000);

		new Thread(new Runnable() {

			@Override
			public void run() {
				while (true) {
					if (!staffId.getStaffId().equals("")) {
						runOnUiThread(new Runnable() {
							public void run() {
								Toast.makeText(getApplicationContext(),
										"Staff ID: " + staffId.getStaffId(),
										Toast.LENGTH_SHORT).show();
							}
						});
						break;
					}
				}
			}
		}).start();

	}
}
</pre>

Demo result:

<img class="size-full wp-image-1810 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/07/democalljavafunctionfromjavascript.png" alt="democalljavafunctionfromjavascript" width="327" height="487" />
<h2>E - Source Code</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fOUxtTE1BZzNwR3pma1dGWnRTM3R5MEM1MFlj/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fOUxtTE1BZzNwR3pma1dGWnRTM3R5MEM1MFlj/edit?usp=sharing</a>

&nbsp;
