---
title: "Facebook SDK Integration in Android"
date: 2014-10-07
tags: ["Facebook"]
toc: true
comments: true
---

You must know that social media has a very important position in modern life - every thing can be shared on social network.

One of the largest and most famous social network is Facebook. Integrate with Facebook to help you build engaging social apps and get more installs.

In this post, I'll show you every steps in Facebook SDK integration in Android to let user login, post a status or a photo to his timeline.

<!--more-->
<h2>A - Create Facebook App</h2>
Firstly, go to <a href="https://developers.facebook.com/" target="_blank">Facebook Developer Console</a> page, select Apps --&gt; Add New App to create a new Facebook app.

Pick desired platform and enter your app name, pick app category.

Then, enter the package name and default Activity class name of your Android app:

<img class="aligncenter" src="https://farm3.staticflickr.com/2949/15467497875_08fb49719e_b.jpg" alt="" />

Next, enter your key hashes for the development and release version.

I'll show you how to get development key hash in the next section.

<img class="aligncenter" src="https://farm4.staticflickr.com/3930/15464357021_e7235df3dd_b.jpg" alt="" />

After finished all those steps, you're done with creating new Facebook app and can view the <strong>App ID</strong> and <strong>App</strong> <strong>Secret</strong> key also.

<img class="aligncenter" src="https://farm4.staticflickr.com/3933/15280796690_a7c89d2a94_b.jpg" alt="" />
<h2>B - Generate Key Hash for Facebook settings</h2>
For the "original" way, you can prefer this <a href="http://stackoverflow.com/questions/7506392/how-to-create-android-facebook-key-hash" target="_blank">link</a> and follow all the steps to get the key hash.

If you're not a huge fan of cmd (like me <img id="smilie_215" title="Shame" src="http://vozforums.com/images/smilies/Off/shame.gif" alt=":shame:" />), just put the following code snipet in your Main Activity and get the key hash from log cat:

<pre>
private void getKeyHash(){
	PackageInfo info;
	try {
		info = getPackageManager().getPackageInfo(&quot;ice.tea09.demofacebooksdk&quot;, PackageManager.GET_SIGNATURES);
		for (Signature signature : info.signatures) {
			MessageDigest md;
			md = MessageDigest.getInstance(&quot;SHA&quot;);
			md.update(signature.toByteArray());
			String something = new String(Base64.encode(md.digest(), 0));
			Log.e(&quot;hash key&quot;, something);
		}
	} catch (NameNotFoundException e1) {
		Log.e(&quot;name not found&quot;, e1.toString());
	} catch (NoSuchAlgorithmException e) {
		Log.e(&quot;no such an algorithm&quot;, e.toString());
	} catch (Exception e) {
		Log.e(&quot;exception&quot;, e.toString());
	}
}
</pre>

<h2> C - Import Facebook SDK</h2>
You can download Facebook SDK from the <a href="https://developers.facebook.com/docs/android/" target="_blank">Facebook Developer</a> page.

After that, extract and import the SDK to eclipse.

Select <strong>File</strong> --&gt; <strong>Import</strong> and pick <strong>General</strong> --&gt; <strong>Existing Projects into Workspace</strong>

<img class="aligncenter" src="https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xpa1/t39.2178-6/851585_532369743468895_1397874742_n.png" alt="" />

After that, browse to the Facebook SDK folder and selected disired projects:

<img class="aligncenter" src="https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xpa1/t39.2178-6/10333109_670654639663063_475665340_n.png" alt="" />

To add Facebook SDK to your project, right click on your project, select <strong>Properties</strong>.

Pick <strong>Android</strong> and on the right side in <strong>Library</strong> section, click on Add button to select Facebook SDK project.

Finally, click OK and build your project.

<img class="aligncenter" src="https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xpa1/t39.2178-6/851576_527513617291891_2119098295_n.png" alt="" />
<h2>D - Facebook SDK Integration in Android Demo</h2>
Now, every required settings is done. We can start on creating a demo project that integrated with Facebook SDK and allow user to login, post status, photos to his time line.
<h3>1 - Demo app layout</h3>
Firstly, we made a very simple layout with 3 buttons:
<ul>
	<li>Login</li>
	<li>Update Status</li>
	<li>Post Image</li>
</ul>
<strong>activity_main.xml</strong>

<pre>
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    xmlns:facebook=&quot;http://schemas.android.com/apk/res-auto&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:orientation=&quot;vertical&quot;
    android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
    android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
    tools:context=&quot;ice.tea09.demofacebooksdk.MainActivity&quot; &gt;

    &lt;com.facebook.widget.LoginButton
        android:id=&quot;@+id/fb_login_button&quot;
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_marginTop=&quot;5dp&quot;
        facebook:confirm_logout=&quot;false&quot;
        facebook:fetch_user_info=&quot;true&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/tv_username&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_gravity=&quot;center&quot;
        android:layout_margin=&quot;10dp&quot;
        android:textSize=&quot;18sp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/btn_post_status&quot;
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;Update Status&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/btn_post_photo&quot;
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;Post Image&quot; /&gt;

&lt;/LinearLayout&gt;
</pre>

As you can see, we use the <strong>LoginButton</strong> of Facebook SDK.
<blockquote>A Log In/Log Out button that maintains session state and logs in/out for the app.

This control will create and use the active session upon construction if it has the available data (if the app ID is specified in the manifest).

It will also open the active session if it does not require user interaction (i.e. if the session is in the SessionState.CREATED_TOKEN_LOADED state. Developers can override the use of the active session by calling the LoginButton.setSession(com.facebook.Session) method.</blockquote>
<h3>2 - Demo app implementation</h3>
Firstly, declare all inneed variables:

<pre>
private LoginButton btnLogin;
private Button btnPostPhoto;
private Button btnPostStatus;

private TextView tvUsername;

private UiLifecycleHelper uiHelper;
GraphUser user;
private static final List&lt;String&gt; FACEBOOK_PERMISSIONS = Arrays.asList(&quot;publish_actions&quot;);

private static String testStatus = &quot;Test status from Ice Tea 09.&quot;;
</pre>

The <strong>UiLifecycleHelper </strong>object used to to create, automatically open (if applicable), save, and restore the Active Session in a way that is similar to Android UI lifecycles.

<pre>
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);

	uiHelper = new UiLifecycleHelper(this, statusCallback);
	uiHelper.onCreate(savedInstanceState);

	setContentView(R.layout.activity_main);

}

private Session.StatusCallback statusCallback = new Session.StatusCallback() {
	@Override
	public void call(Session session, SessionState state,
			Exception exception) {
		if (state.isOpened()) {
			Log.d(&quot;MainActivity&quot;, &quot;Facebook session opened&quot;);
		} else if (state.isClosed()) {
			Log.d(&quot;MainActivity&quot;, &quot;Facebook session closed&quot;);
		}
	}
};

@Override
public void onResume() {
	super.onResume();
	uiHelper.onResume();
}

@Override
public void onPause() {
	super.onPause();
	uiHelper.onPause();
}

@Override
public void onDestroy() {
	super.onDestroy();
	uiHelper.onDestroy();
}

@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
	super.onActivityResult(requestCode, resultCode, data);
	uiHelper.onActivityResult(requestCode, resultCode, data);
}

@Override
public void onSaveInstanceState(Bundle savedState) {
	super.onSaveInstanceState(savedState);
	uiHelper.onSaveInstanceState(savedState);
}
</pre>

Next, we implement some functions like <strong>postPhoto(), postStatus(), checkPermissions() </strong>and <strong>requestPermissions()</strong>:

<pre>
public void postPhoto() {
	if(this.user != null){
		if (checkPermissions()) {
			Bitmap img = BitmapFactory.decodeResource(getResources(),
					R.drawable.ic_launcher);
			Request uploadRequest = Request.newUploadPhotoRequest(
					Session.getActiveSession(), img, new Request.Callback() {
						@Override
						public void onCompleted(Response response) {
							Toast.makeText(MainActivity.this,
									&quot;Photo uploaded successfully&quot;,
									Toast.LENGTH_LONG).show();
						}
					});
			uploadRequest.executeAsync();
		} else {
			requestPermissions();
		}
	}
	else{
		Toast.makeText(MainActivity.this,
				&quot;Please login first!&quot;,
				Toast.LENGTH_LONG).show();
	}
}

public void postStatus() {
	if(this.user != null){
		if (checkPermissions()) {
			Request request = Request.newStatusUpdateRequest(
					Session.getActiveSession(), testStatus,
					new Request.Callback() {
						@Override
						public void onCompleted(Response response) {
							if (response.getError() == null)
								Toast.makeText(MainActivity.this,
										&quot;Status updated successfully&quot;,
										Toast.LENGTH_LONG).show();
						}
					});
			request.executeAsync();
		} else {
			requestPermissions();
		}
	}
	else{
		Toast.makeText(MainActivity.this,
				&quot;Please login first!&quot;,
				Toast.LENGTH_LONG).show();
	}
}

public boolean checkPermissions() {
	Session s = Session.getActiveSession();
	if (s != null) {
		return s.getPermissions().contains(&quot;publish_actions&quot;);
	} else
		return false;
}

public void requestPermissions() {
	Session s = Session.getActiveSession();
	if (s != null)
		s.requestNewPublishPermissions(new Session.NewPermissionsRequest(
				this, FACEBOOK_PERMISSIONS));
}
</pre>

Finally, update <strong>onCreate()</strong> method to call the desired functions properly:

<pre>
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	uiHelper = new UiLifecycleHelper(this, statusCallback);
	uiHelper.onCreate(savedInstanceState);

	setContentView(R.layout.activity_main);

	tvUsername = (TextView) findViewById(R.id.tv_username);
	btnLogin = (LoginButton) findViewById(R.id.fb_login_button);
	btnLogin.setUserInfoChangedCallback(new UserInfoChangedCallback() {
		@Override
		public void onUserInfoFetched(GraphUser user) {
			MainActivity.this.user = user;
			if (user != null) {
				tvUsername.setText(&quot;Hello, &quot; + user.getName());
			} else {
				tvUsername.setText(&quot;You are not logged&quot;);
			}
		}
	});

	btnPostPhoto = (Button) findViewById(R.id.btn_post_photo);
	btnPostPhoto.setOnClickListener(new OnClickListener() {

		@Override
		public void onClick(View view) {
			postPhoto();
		}
	});

	btnPostStatus = (Button) findViewById(R.id.btn_post_status);
	btnPostStatus.setOnClickListener(new OnClickListener() {

		@Override
		public void onClick(View v) {
			postStatus();
		}
	});

	getKeyHash();
}
</pre>

Run the demo app and enjoy the result :)

<img src="https://farm4.staticflickr.com/3935/15280866928_30ac4b568b_n.jpg" alt="" /> <img src="https://farm6.staticflickr.com/5601/15444409836_5f5ff5e750_n.jpg" alt="" />

<img src="https://farm4.staticflickr.com/3933/15464356941_47cf9fe97e_n.jpg" alt="" /> <img src="https://farm4.staticflickr.com/3933/15467497855_cfe9de69d5_n.jpg" alt="" />

<img class="aligncenter" src="https://farm3.staticflickr.com/2946/15280932737_e5ff019b95_o.png" alt="" />
<h2>E - Download Source Code Facebook SDK Integration in Android</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fSkxSbnhMcmd4UW8/view?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fSkxSbnhMcmd4UW8/view?usp=sharing</a>

<a href="http://www.mediafire.com/download/lf90hvgyha9f7q2/DemoFacebookSDK.zip" target="_blank">http://www.mediafire.com/download/lf90hvgyha9f7q2/DemoFacebookSDK.zip</a>