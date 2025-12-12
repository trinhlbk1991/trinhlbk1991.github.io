---
title: "Simple Request Using Volley"
date: 2014-10-22
categories: ["android"]
tags: ["Netowrk","Volley"]
toc: true
comments: true
---

<h2>A – What is Volley?</h2>
Volley is a very powerful and easy to use library for Android that can be used to handle networking connection.

It manages the processing and caching of network requests and it saves developers valuable time from writing the same network call/cache code again and again.

Volley comes with lot of features. Some of them are:
<p style="padding-left: 30px;">-   Automatically schedule all network requests</p>
<p style="padding-left: 30px;">-   Provides transparent disk and memory caching</p>
<p style="padding-left: 30px;">-  Provides powerful cancellation request API</p>
<p style="padding-left: 30px;">-   Provides powerful customization abilities</p>
<p style="padding-left: 30px;">-   Provides debugging and tracing tools</p>
<!--more-->
<h2>B – Set up Volley</h2>
Firstly, we need to clone the Volley project from the address:

<pre>
git clone https://android.googlesource.com/platform/frameworks/volley
</pre>

Then import the downloaded source into your app project as an Android library project or make a .jar file and add to project build path.

There are 2 main classes in Volley library:
<p style="padding-left: 30px;">-   RequestQueue: handles all the requests, takes care of queuing the requests and handle the responses</p>
<p style="padding-left: 30px;">-   Request: contains all the necessary details for making web API call. For example: which method to Use (GET or POST), request data to pass, response listener, error listener</p>

<h2>C - Android Volley – Make Simple Request</h2>
<h3>1.      Add the INTERNET permission</h3>
Update AndroidManifest.xml file by adding INTERNET permission. As you know, without this permission your app won't be able to connect to the network.

<pre>
&lt;uses-permission android:name=&quot;android.permission.INTERNET&quot;/&gt;
</pre>

<h3>2.      Create an object of RequestQueue class</h3>

<pre>
RequestQueue requestQueue = Volley.newRequestQueue(this);
</pre>

<h3>3.      Create a simple request</h3>
In this tutorial, I’ll use Volley to send a simple String request to receive response from provided URL.

<pre>
StringRequest stringRequest;
String url = &quot;http://icetea09.com&quot;;
stringRequest = new StringRequest(Request.Method.GET, url, new Listener&lt;String&gt;() {

	@Override
	public void onResponse(String res) {
		tvResponse.setText(res);
	}

}, new ErrorListener() {

	@Override
	public void onErrorResponse(VolleyError err) {
		tvResponse.setText(err.getMessage());
	}
});
</pre>

<h3>4.      Add request into the RequestQueue</h3>

<pre>
requestQueue.add(stringRequest);
</pre>

<h2>D – Complete source code of Android Volley – Make Simple Request</h2>
Activity_main.xml

<pre>
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
    android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
    tools:context=&quot;ice.tea.volleysimplerequest.MainActivity&quot; &gt;

    &lt;Button
        android:id=&quot;@+id/btn_send_request&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:text=&quot;Request&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/txt_response&quot;
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;fill_parent&quot;
        android:layout_alignLeft=&quot;@+id/btn_send_request&quot;
        android:layout_below=&quot;@+id/btn_send_request&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot; /&gt;

&lt;/RelativeLayout&gt;

</pre>

MainActivity.java

<pre>
public class MainActivity extends Activity {

	TextView tvResponse;
	Button btnRequest;

	RequestQueue requestQueue;
	StringRequest stringRequest;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		tvResponse = (TextView)findViewById(R.id.txt_response);
		btnRequest = (Button)findViewById(R.id.btn_send_request);

		requestQueue = Volley.newRequestQueue(this);

		String url = &quot;http://icetea09.com&quot;;
		stringRequest = new StringRequest(Request.Method.GET, url, new Listener&lt;String&gt;() {

			@Override
			public void onResponse(String res) {
				tvResponse.setText(res);
			}

		}, new ErrorListener() {

			@Override
			public void onErrorResponse(VolleyError err) {
				tvResponse.setText(err.getMessage());
			}
		});

		btnRequest.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View view) {
				requestQueue.add(stringRequest);
			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
}

</pre>

Demo result:

<img class="size-full wp-image-1917 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/10/Screenshot_2014-08-10-14-14-51.png" alt="Screenshot_2014-08-10-14-14-51" width="303" height="538" />
<h2>E – Source Code</h2>
<a href="http://www.mediafire.com/?2ok5tjh2247sc2a">http://www.mediafire.com/?2ok5tjh2247sc2a</a>

<a href="https://docs.google.com/file/d/0Bw3dwdSezn6fUmdiazFZd2NjNms/edit?usp=docslist_api">https://docs.google.com/file/d/0Bw3dwdSezn6fUmdiazFZd2NjNms/edit?usp=docslist_api</a>