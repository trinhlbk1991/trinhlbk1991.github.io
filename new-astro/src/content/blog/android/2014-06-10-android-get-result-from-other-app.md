---
title: "Get Result From Other App"
date: 2014-06-10
categories: ["android"]
tags: ["Intent"]
toc: true
comments: true
---

<h2>A - Preface</h2>
In previous post, I show you how to <a title="Use Implicit Intent to Call Another App" href="http://icetea09.com/blog/2014/05/06/android-use-implicit-intent-call-another-app/" target="_blank">use Implicit Intent to call another app</a>.

But calling another app doesn't have only one-way. You can also can recieve the result from calling app.

Some scenerios that you need to use this technique:
<ul>
	<li>Start the camera app and get the photo as a result</li>
	<li>Start the contacts app and get the contact info as result</li>
</ul>
That's the main content of this post also - Get Result From Other App.

<!--more-->
<h2>B - Start another app</h2>
Please prefer this <a title="Use Implicit Intent to Call Another App" href="http://icetea09.com/blog/2014/05/06/android-use-implicit-intent-call-another-app/" target="_blank">post </a>for details
<h2>C - Get Result From Other App</h2>
To get result from other app, we have to implement the <strong>onActivityResult()</strong> method. This method include 3 args:
<ul>
	<li>
<p class="prettyprint" style="color: #006600;"><span class="pln" style="color: #000000;"><strong>requestCode</strong>: the code you use to call other app</span></p>
</li>
	<li>
<p class="prettyprint" style="color: #006600;"><span class="pln" style="color: #000000;"><strong>resultCode</strong>: use to specify the result back</span></p>

<ul>
	<li><strong>RESULT_OK</strong>: successful operation</li>
	<li><strong>RESULT_CANCELED</strong>: failed operation or user backed out</li>
</ul>
</li>
	<li>
<p class="prettyprint" style="color: #006600;"><span class="pln" style="color: #000000;"><strong>data</strong>: the Intent that contain the result data</span></p>
</li>
</ul>
<h2>D - Demo Read contact data</h2>
Firstly, create a simple layout for the demo app

<pre>
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;fill_parent&quot;
    android:layout_height=&quot;fill_parent&quot; &gt;

    &lt;Button
        android:id=&quot;@+id/btnPickContact&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:text=&quot;Pick Contact&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/tvContact&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_below=&quot;@+id/btnPickContact&quot;
        android:text=&quot;Contact&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceLarge&quot; /&gt;

&lt;/RelativeLayout&gt;
</pre>

Then, implemnt on click event for btnPickContact to start People app:

<pre>
btnPickContact.setOnClickListener(new OnClickListener() {
	@Override
	public void onClick(View arg0) {
		Intent intent = new Intent(Intent.ACTION_PICK,  ContactsContract.Contacts.CONTENT_URI);
	        startActivityForResult(intent, PICK_CONTACT_REQUEST);
	}
});
</pre>

Finally, handle the Intent result to have desired data:

<pre>
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	// Check which request we're responding to
	if (requestCode == PICK_CONTACT_REQUEST) {
		// Make sure the request was successful
		if (resultCode == RESULT_OK) {
			// Get the URI that points to the selected contact
			Uri contactUri = data.getData();

			// Perform the query on the contact to get the NUMBER column
			// We don't need a selection or sort order (there's only one result for the given URI)
			// CAUTION: The query() method should be called from a separate thread to avoid blocking
			// your app's UI thread. (For simplicity of the sample, this code doesn't do that.)
			// Consider using CursorLoader to perform the query.
			Cursor cursor = getContentResolver()
					.query(contactUri, null, null, null, null);
			cursor.moveToFirst();

			// Retrieve the contact display name from the DISPLAY_NAME column
			int columnName = cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME);
			String name = cursor.getString(columnName);

			// Display the result on the TextView
			tvContact.setText(name);
		}
	}
}
</pre>

After run the demo app, you can have the result like below:

<img class="size-full wp-image-1698 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/06/demo_recieve_rÃ©ult_from_other_app1.png" alt="demo_recieve_rÃ©ult_from_other_app[1]" width="750" height="412" />
<h2>E - Download Souce Code for Get Result From Other App demo</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fN241a3AyRDd1bGc/edit?usp=sharing" target="_blank"> https://drive.google.com/file/d/0Bw3dwdSezn6fN241a3AyRDd1bGc/edit?usp=sharing</a>