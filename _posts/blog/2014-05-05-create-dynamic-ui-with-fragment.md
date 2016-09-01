---
layout: post
title:  Create Dynamic UI with Fragment
date: 2014-05-05 17:50
author: admin
comments: true
categories: [blog]
tags: [Java, Android]
---

<h2>A - Preface</h2>
First of all, I just want to confirm that you know what Fragment was or not. If not, please read this <a title="[Android] Fragment" href="http://icetea09.com/blog/2014/01/22/android-fragment/">post </a>to know the basic knowledge about Fragment.

When developing application, you  create dynamic UI with Fragment to support many screen sizes.

For example:

<img class="aligncenter" src="http://developer.android.com/images/training/basics/fragments-screen-mock.png" alt="" />

On tablets, 2 fragments will be displayed side by side together.

On handsets, only one fragment will be displayed at a time, so the fragment must be replaced each other as the user navigates.

In this post, I'll show you how to create dynamic UI with Fragment in Android development :)

<!--more-->
<h2>B - Demo Explanation</h2>
<img class="alignnone size-full wp-image-1663" src="http://icetea09.com/wp-content/uploads/2014/05/dynamic_ui_explainations.png" alt="dynamic_ui_explainations" width="919" height="552" />

As you can see on the figure, we'll add the <strong>#list_blog</strong> layout into <strong>#container</strong> in MainActivity.

But with different screen sizes, we'll have diferrent layouts.

Now, We'll implement the demo :3
<h2>C - Create Fragments</h2>
Firstly, create 2 main fragments:
<ul>
	<li>ListBlogsFragment : takes responsibility to display a list of all blogs</li>
</ul>
<pre class="lang:default decode:true ">public class ListBlogsFragment extends ListFragment {

}</pre>
&nbsp;
<ul>
	<li>BlogDetailsFragment : takes responsibility to display a blog details</li>
</ul>
<pre class="lang:default decode:true ">public class BlogDetailsFragment extends Fragment {

}</pre>
&nbsp;

Now, we need to modify the <strong>activity_main.xml</strong> file:
<pre class="lang:default decode:true ">&lt;FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="ice.tea09.demodynamicuifragment.MainActivity"
    tools:ignore="MergeRootFrame" /&gt;</pre>
&nbsp;

After that, create the layout for each fragment.

Remember that we are developing an app that support multiple screen sizes. So we have to design different layouts for different screens.

First, we'll approach the layout for handsets.

Within <strong>res/layout folder</strong>, create <strong>blog_details.xml</strong> file for blog details fragment UI:
<pre class="lang:default decode:true ">&lt;?xml version="1.0" encoding="utf-8"?&gt;

&lt;TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/article"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    android:textSize="18sp" /&gt;</pre>
&nbsp;

And the layout for list blogs fragment - <strong>list_blogs.xml</strong>:
<pre class="lang:default decode:true ">&lt;?xml version="1.0" encoding="utf-8"?&gt;

&lt;FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/fragment_container"
    android:layout_width="match_parent"
    android:layout_height="match_parent" /&gt;</pre>
&nbsp;

Now, we'll create the layout for tablets.

Within <strong>res</strong> folder, create<strong> layout-large</strong> folder.
<blockquote>Note: At run time, base on the device's screen size, the application will pick the layouts from  appropriate folder to display. Ex: <strong>res/layout</strong> for handsets and <strong>res/layout-large</strong> for tablets.</blockquote>
Within <strong>res/layout-large</strong>, create <strong>list_blogs.xml</strong> file:
<pre class="lang:default decode:true ">&lt;?xml version="1.0" encoding="utf-8"?&gt;       
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"         
     android:orientation="horizontal"        
     android:layout_width="match_parent"         
     android:layout_height="match_parent"&gt;       
     &lt;fragment android:name="ice.tea09.demodynamicuifragment.ListBlogsFragment"      
         android:id="@+id/fragment_list_blogs"       
         android:layout_weight="1"       
         android:layout_width="0dp"      
         android:layout_height="match_parent" /&gt;         
     &lt;fragment android:name="ice.tea09.demodynamicuifragment.BlogDetailsFragment"        
         android:id="@+id/fragment_blog_details"         
         android:layout_weight="2"       
         android:layout_width="0dp"      
         android:layout_height="match_parent" /&gt;         
&lt;/LinearLayout&gt;</pre>
&nbsp;

&nbsp;
<h2>D - Implement Fragments</h2>
Now, you already had the fragments layouts. In this section, you must implement those fragments to let them display properly base on devices type.
<h3>1 - Implement ListBlogFragment</h3>
Firstly, create some dummy data an put it in <strong>Constants </strong>class:
<pre class="lang:default decode:true ">public class Constants {

    static String[] LIST_BLOGS = {
        "What is Fragment?",
        "Dynamic UI"
    };

    static String[] BLOG_DETAILS = {
        "What is Fragment?\n\nA Fragment represents a behavior or a portion of user interface in an Activity. You can combine multiple fragments in a single activity to build a multi-pane UI and reuse a fragment in multiple activities. You can think of a fragment as a modular section of an activity, which has its own lifecycle, receives its own input events, and which you can add or remove while the activity is running (sort of like a \"sub activity\" that you can reuse in different activities).",
        "Dynamic UI\n\nIn order to reuse the Fragment UI components, you should build each as a completely self-contained, modular component that defines its own layout and behavior. Once you have defined these reusable Fragments, you can associate them with an Activity and connect them with the application logic to realize the overall composite UI."
    };
}</pre>
&nbsp;

Now, in <strong>ListBlogFragment</strong>, override <strong>onCreate()</strong> method to add a simple ListView that contains all blogs item:
<pre class="lang:default decode:true ">@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // We need to use a different list item layout for devices older than Honeycomb
    int layout = Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.HONEYCOMB ?
    android.R.layout.simple_list_item_activated_1 : android.R.layout.simple_list_item_1;

    // Create an array adapter for the list view, using the Constants.LIST_BLOGS array
    setListAdapter(new ArrayAdapter&lt;String&gt;(getActivity(), layout, Constants.LIST_BLOGS));
}</pre>
&nbsp;

As you can see that, we have to check  Android version to pick the proper ListView layout and then populate the dummy data into it.

Next, override <strong>onStart()</strong> method, set the ListView choice mode to single:
<pre class="lang:default decode:true ">@Override
public void onStart() {
    super.onStart();

    // When in two-pane layout, set the listview to highlight the selected list item
    // (We do this during onStart because at the point the listview is available.)
    if (getFragmentManager().findFragmentById(R.id.fragment_blog_details) != null) {
        getListView().setChoiceMode(AbsListView.CHOICE_MODE_SINGLE);
    }
}</pre>
&nbsp;
<h3>2 - Implement BlogDetailsFragment</h3>
First, override <strong>onCreateView()</strong> method to return the proper layout - <strong>blog_details:</strong>
<pre class="lang:default decode:true ">@Override
public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    // Inflate the layout for this fragment
    return inflater.inflate(R.layout.blog_details, container, false);
}</pre>
&nbsp;
<h3>3 - Implement MainActivity</h3>
Override the <strong>onCreate()</strong> method to load the proper layout:
<pre class="lang:default decode:true ">public class MainActivity extends FragmentActivity{

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_blogs);

        // Check whether the activity is using the layout version with
        // the fragment_container FrameLayout.
        // If so, It means the device type is HANDSET.
        // We must add the ListBlogsFragment fragment into fragment_container
        if (findViewById(R.id.fragment_container) != null) {

            // Check if the app was restored from a previous state,
            // we don't need to do anything and should return
            if (savedInstanceState != null) {
                return;
            }

            // Create an instance of ListBlogsFragment
            ListBlogsFragment listBlogsFragment = new ListBlogsFragment();

            // Add the fragment to the 'fragment_container' FrameLayout
            getSupportFragmentManager().beginTransaction().add(R.id.fragment_container, listBlogsFragment).commit();
        }
    }
}</pre>
&nbsp;
<h2>E - Communicate between Fragments</h2>
<span style="color: #222222;"> All Fragment-to-Fragment communication is done through the associated Activity. </span>

<span style="color: #222222;">Two Fragments should never communicate directly.</span>
<h3>1. Define an Interface</h3>
To let the Fragment interact with its Activity, we can define an Interface within Fragment class and implement it with Activity class.
<pre class="lang:default decode:true ">public class ListBlogsFragment extends ListFragment {
     OnListBlogsItemSelected mCallback;
     // The container Activity must implement this interface so the frag can deliver messages
     public interface OnListBlogsItemSelected {
          // Called by ListBlogsFragment when a list item is selected
          public void onBlogItemSelected(int position);
     }
}</pre>
&nbsp;

The Fragment captures the interface implementation during its onAttach() lifecycle method and can then call the Interface methods in order to communicate with the Activity.

Try to check if the Fragment captures the interface yet. If not, throw an exception.
<pre class="lang:default decode:true ">@Override
public void onAttach(Activity activity) {
    super.onAttach(activity);

    // This makes sure that the container activity has implemented
    // the callback interface. If not, it throws an exception.
    try {
        mCallback = (OnListBlogsItemSelected) activity;
    } catch (ClassCastException e) {
        throw new ClassCastException(activity.toString() + " must implement OnHeadlineSelectedListener");
    }
}</pre>
&nbsp;

Then, override onListItemClick() method:
<pre class="lang:default decode:true ">@Override
public void onListItemClick(ListView l, View v, int position, long id) {
    // Notify the parent activity of selected item
    mCallback.onBlogItemSelected(position);

    // Set the item as checked to be highlighted when in two-pane layout
    getListView().setItemChecked(position, true);
}</pre>
&nbsp;
<h3>2. Implement the Interface</h3>
When implement the <strong>ListBlogsFragment.OnListBlogsItemSelected</strong> interface, we determine the current type of device to load layout properly.

Beside that, we use <strong>Bundle</strong> to send data to a <strong>Fragment</strong> when adding to a <strong>FragmentLayout</strong>.
<pre class="lang:default decode:true ">public class MainActivity extends FragmentActivity implements ListBlogsFragment.OnListBlogsItemSelected {
    @Override
        public void onBlogItemSelected(int position) {
        // The user selected one item in ListBlogsFragment

        // Capture the BlogDetails fragment from the activity layout
        BlogDetailsFragment blogDetailsFragment = (BlogDetailsFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_blog_details);

        if (blogDetailsFragment != null) {
            // If article frag is available, the current device is TABLET.
            // So We're in the multi-pane layout

            // Call a method in the blogDetailsFragmentment to update its content
            blogDetailsFragment.updateBlogDetails(position);

        } else {
            // If the frag is not available, the current device is HANDSET.
            // So we're in the one-pane layout and must swap frags...

            // Create fragment and give it an argument for the selected article
            BlogDetailsFragment newFragment = new BlogDetailsFragment();
            Bundle args = new Bundle();
            args.putInt(BlogDetailsFragment.ARG_POSITION, position);
            newFragment.setArguments(args);
            FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();

            // Replace whatever is in the fragment_container view with this fragment,
            // and add the transaction to the back stack so the user can navigate back
            transaction.replace(R.id.fragment_container, newFragment);
            transaction.addToBackStack(null);

            // Commit the transaction
            transaction.commit();
        }
    }
}</pre>
&nbsp;

Within <strong>BlogDetailsFragment</strong>:
<ul>
	<li>Create <strong>updateBlogDetails()</strong> method to display blog content base on input position</li>
	<li>Modify the <strong>onCreateView()</strong> method to get the blog index</li>
	<li>Override the <strong>onStart()</strong> method to check if there are arguments passed to the fragment and update the blog details content</li>
	<li>Override the <strong>onSaveInstanceState()</strong> method to save the current article selection in case we need to recreate the fragment</li>
</ul>
<pre class="lang:default decode:true ">    public class BlogDetailsFragment extends Fragment {
    final static String ARG_POSITION = "position";
    int mCurrentPosition = -1;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
        Bundle savedInstanceState) {

        // If activity recreated (such as from screen rotate), restore
        // the previous article selection set by onSaveInstanceState().
        // This is primarily necessary when in the two-pane layout.
        if (savedInstanceState != null) {
            mCurrentPosition = savedInstanceState.getInt(ARG_POSITION);
        }

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.blog_details, container, false);
    }

    @Override
        public void onStart() {
        super.onStart();

        // During startup, check if there are arguments passed to the fragment.
        // onStart is a good place to do this because the layout has already been
        // applied to the fragment at this point so we can safely call the method
        // below that sets the article text.
        Bundle args = getArguments();
        if (args != null) {
            // Set article based on argument passed in
            updateBlogDetails(args.getInt(ARG_POSITION));
        } else if (mCurrentPosition != -1) {
            // Set article based on saved instance state defined during onCreateView
            updateBlogDetails(mCurrentPosition);
        }
    }

    public void updateBlogDetails(int position) {
        TextView tvBlogDetails = (TextView) getActivity().findViewById(R.id.tv_blog_details);
        tvBlogDetails.setText(Constants.BLOG_DETAILS[position]);
        mCurrentPosition = position;
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        // Save the current article selection in case we need to recreate the fragment
        outState.putInt(ARG_POSITION, mCurrentPosition);
    }
}</pre>
&nbsp;
<h2> F - Demo Result</h2>
Tada!

On tablets:

<img class="size-full wp-image-1668 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/05/dynamic_ui_tablets.png" alt="dynamic_ui_tablets" width="1023" height="448" />

On handsets:

<img class="size-full wp-image-1667 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/05/dynamic_ui.png" alt="dynamic_ui" width="769" height="518" />

&nbsp;

&nbsp;
<h2>G - Download source code Create Dynamic UI with Fragment</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fRGxJNkpYUWlUVDQ/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fRGxJNkpYUWlUVDQ/edit?usp=sharing</a>

&nbsp;
