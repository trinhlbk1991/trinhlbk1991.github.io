---
layout: post
title: Drawer Navigation Menu with Material Design Style
date: 2015-01-02 15:01
author: trinh_le
comments: true

tags: []
image: https://c2.staticflickr.com/2/1477/24165316263_b46eadf1ed_h.jpg
---

In previous post, I showed you how to use <a title="Android Sliding Menu using Navigation Drawer" href="http://icetea09.com/blog/2014/03/17/android-android-sliding-menu-using-navigation-drawer/" target="_blank">Drawer Navigation Menu</a> in your Android application.
<br/>
In this post, I’ll show you how to implement it with <a title="Apply Material Design to Pre-Lollipop Devices using AppCompat v21" href="http://icetea09.com/blog/2014/12/09/android-apply-material-design-pre-lollipop-devices-using-appcompat-v21/" target="_blank">Material Design</a> style.
<br/>
All the steps are quite similar to the pre-Lollipop version, but I still go through every single steps to help you feel easier.

<!--more-->

Before started, you can watch the demo for this post to have an overview about what we will achieve:
<iframe width="560" height="315" src="//www.youtube.com/embed/o3xqjIdGAo0" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
Let’s get start it!
<h2>1 – Include Appcompat v21 in your graddle file</h2>
Add following dependencies to Graddle build file to be able to use Material Design style in your app:
{% highlight java %}
dependencies {
    compile 'com.android.support:appcompat-v7:21.0.+'
}
{% endhighlight %}
2 – Create Toobar

Firstly, you need to create <strong>toolbar.xml</strong> layout. This will contain the new style toolbar only and can be reused through your application:
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.Toolbar xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="?attr/colorPrimary"
    android:minHeight="?attr/actionBarSize"
    app:theme="@style/AppTheme"
    app:popupTheme="@style/Theme.AppCompat.Light"/>
{% endhighlight %}
&nbsp;

Then, you can include it in any activity. Here I embed it into the <strong>main_activity.xml</strong>:
{% highlight java %}
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:orientation="vertical"
	tools:context=".MainActivity">

	<include
		android:id="@+id/toolbar"
		layout="@layout/toolbar" />
	
</LinearLayout>
{% endhighlight %}
&nbsp;
<h2>3 – Drawer Menu</h2>
Next, move to the Drawer Navigation part. As you know, the Drawer Navigation has 2 essential parts are the sliding menu and the frame container. And these 2 parts need to be placed inside the <strong>DrawerLayout</strong>. Like this:

{% highlight java %}

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:orientation="vertical"
	tools:context=".MainActivity">

	<include
		android:id="@+id/toolbar"
		layout="@layout/toolbar" />

	<android.support.v4.widget.DrawerLayout
		android:id="@+id/drawer_layout"
		android:layout_width="match_parent"
		android:layout_height="match_parent">

		<!-- The main content view -->
		<FrameLayout
			android:id="@+id/frame_container"
			android:layout_width="match_parent"
			android:layout_height="match_parent" />

		<!-- The navigation drawer (sliding menu) -->
		<ListView
			android:id="@+id/lv_drawer_menu"
			android:layout_width="240dp"
			android:layout_height="match_parent"
			android:layout_gravity="start"
			android:choiceMode="singleChoice"
			android:background="#fff"
			android:divider="@null"
			android:dividerHeight="0dp" />
	</android.support.v4.widget.DrawerLayout>
</LinearLayout>

{% endhighlight %}

Like you can see in the layout above, we are using ListView to display all items of Drawer Navigation menu. To layout and position all components in each menu item, we also need to create layout for them:

{% highlight java %}

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:padding="@dimen/activity_horizontal_margin"
	android:orientation="horizontal">

	<ImageView
		android:id="@+id/img_drawer_menu_item_icon"
		android:layout_width="24dp"
		android:layout_height="24dp"
		android:layout_gravity="center_vertical"/>

	<TextView
		android:id="@+id/tv_drawer_menu_item_text"
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		android:layout_marginLeft="@dimen/activity_horizontal_margin"
		android:textColor="#000"
		android:layout_gravity="center_vertical"/>

</LinearLayout>

{% endhighlight %}

After created the layout for Drawer Menu, we also need to create the <strong>DrawerMenuItem</strong> entity and <strong>DrawerMenuAdapter</strong> that used to manipulate data into Drawer Menu:

<strong>DrawerMenuItem.java</strong>

{% highlight java %}

public class DrawerMenuItem {
	private String mText;
	private int mIcon;

	public String getText() {
		return mText;
	}

	public void setText(String mText) {
	this.mText = mText;
	}

	public int getIcon() {
		return mIcon;
	}

	public void setIcon(int mIcon) {
		this.mIcon = mIcon;
	}
}

{% endhighlight %}

<strong>DrawerMenuAdapter.java</strong>

{% highlight java %}

public class DrawerMenuItemAdapter extends BaseAdapter{

	List<DrawerMenuItem> mItems;
	Context mContext;

	public DrawerMenuItemAdapter(Context context,List<DrawerMenuItem> mItems) {
		this.mItems = mItems;
		this.mContext = context;
	}

	@Override
	public int getCount() {
		return mItems.size();
	}

	@Override
	public Object getItem(int position) {
		return mItems.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		if (convertView == null) {
			LayoutInflater mInflater = (LayoutInflater)
			mContext.getSystemService(Activity.LAYOUT_INFLATER_SERVICE);
			convertView = mInflater.inflate(R.layout.layout_drawer_menu_item, null);
		}

		ImageView imgIcon = (ImageView) convertView.findViewById(R.id.img_drawer_menu_item_icon);
		TextView tvTitle = (TextView) convertView.findViewById(R.id.tv_drawer_menu_item_text);

		DrawerMenuItem item = mItems.get(position);

		imgIcon.setImageResource(item.getIcon());
		tvTitle.setText(item.getText());

		return convertView;
	}
}

{% endhighlight %}

If you reached here and still don’t know what is the responsibility of entity and adapter class or how to implement <strong>ListView</strong> in Android, you should read this <a href="http://icetea09.com/blog/2014/02/07/android-custom-list-view/" target="_blank">post </a>to have a clear idea.
<h2>4 – Drawer Navigation Implementation</h2>
Get back to <strong>MainActivity</strong>, firstly you have to declare all need variables:

{% highlight java %}

private Toolbar mToolbar;
private DrawerLayout mDrawerLayout;
private ActionBarDrawerToggle mDrawerToggle;
private ListView mLvDrawerMenu;
private DrawerMenuItemAdapter mDrawerMenuAdapter;

{% endhighlight %}

Then, in onCreate method, retrieve them from the layout or create new instance if needed. In other words, you do on initialization here:

{% highlight java %}

mToolbar = (Toolbar) findViewById(R.id.toolbar);
mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
mLvDrawerMenu = (ListView) findViewById(R.id.lv_drawer_menu);

List<DrawerMenuItem> menuItems = generateDrawerMenuItems();
mDrawerMenuAdapter = new DrawerMenuItemAdapter(getApplicationContext(), menuItems);
mLvDrawerMenu.setAdapter(mDrawerMenuAdapter);

mLvDrawerMenu.setOnItemClickListener(this);

mDrawerToggle = new ActionBarDrawerToggle(this, mDrawerLayout, mToolbar, R.string.app_name, R.string.app_name) {
	public void onDrawerClosed(View view) {
		invalidateOptionsMenu();
	}

	public void onDrawerOpened(View drawerView) {
		invalidateOptionsMenu();
	}
};

mDrawerLayout.setDrawerListener(mDrawerToggle);

if(savedInstanceState == null){
	setFragment(0, BikeFragment.class);
}

{% endhighlight %}

The <strong>generateDrawerMenuItems()</strong>  methods used to create a list of Drawer Menu items:

{% highlight java %}

private List<DrawerMenuItem> generateDrawerMenuItems() {
	String[] itemsText = getResources().getStringArray(R.array.nav_drawer_items);
	TypedArray itemsIcon = getResources().obtainTypedArray(R.array.nav_drawer_icons);
	List<DrawerMenuItem> result = new ArrayList<DrawerMenuItem>();

	for (int i = 0; i < itemsText.length; i++) {
		DrawerMenuItem item = new DrawerMenuItem();
		item.setText(itemsText[i]);
		item.setIcon(itemsIcon.getResourceId(i, -1));
		result.add(item);
	}

	return result;
}

{% endhighlight %}

Implement the <strong>AdapterView.OnItemClickListener</strong> interface to handle click event for Drawer Menu items:

{% highlight java %}

public class MainActivity extends ActionBarActivity implements AdapterView.OnItemClickListener {
	…
	@Override
	public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
		switch (position){
		case 0:
			setFragment(0, BikeFragment.class);
			break;
		case 1:
			setFragment(1, BusFragment.class);
			break;
		case 2:
			setFragment(2, CarFragment.class);
			break;		
		case 3:
			mDrawerLayout.closeDrawer(mLvDrawerMenu);
			mLvDrawerMenu.invalidateViews();
			break;
		case 4:
			mDrawerLayout.closeDrawer(mLvDrawerMenu);
			mLvDrawerMenu.invalidateViews();
			break;
		case 5:
			mDrawerLayout.closeDrawer(mLvDrawerMenu);
			mLvDrawerMenu.invalidateViews();
			break;
		}
	}
	…
}

{% endhighlight %}

One more important methods that you need to implement is <strong>setFragment(), </strong>this methods use the set the proper <strong>Fragment</strong> to container when user select any Drawer Menu item:

{% highlight java %}

public void setFragment(int position, Class<? extends Fragment> fragmentClass) {
	try {
		Fragment fragment = fragmentClass.newInstance();
		android.support.v4.app.FragmentManager fragmentManager = getSupportFragmentManager();
		FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
		fragmentTransaction.replace(R.id.frame_container, fragment, fragmentClass.getSimpleName());
		fragmentTransaction.commit();

		mLvDrawerMenu.setItemChecked(position, true);
		mDrawerLayout.closeDrawer(mLvDrawerMenu);
		mLvDrawerMenu.invalidateViews();
	}
	catch (Exception ex){
		Log.e("setFragment", ex.getMessage());
	}
}

{% endhighlight %}

Last but not least, override all needed methods to make sure that the Drawer Menu will work properly:

{% highlight java %}

@Override
public void onBackPressed() {
	if (mDrawerLayout.isDrawerOpen(mLvDrawerMenu)) {
		mDrawerLayout.closeDrawer(mLvDrawerMenu);
	} else {
		super.onBackPressed();
	}
}

/**
* When using the ActionBarDrawerToggle, you must call it during
* onPostCreate() and onConfigurationChanged()...
*/
@Override
protected void onPostCreate(Bundle savedInstanceState) {
	super.onPostCreate(savedInstanceState);
	mDrawerToggle.syncState();
}

@Override
public void onConfigurationChanged(Configuration newConfig) {
	super.onConfigurationChanged(newConfig);
	// Pass any configuration change to the drawer toggls
	mDrawerToggle.onConfigurationChanged(newConfig);
}

{% endhighlight %}

The whole <strong>MainActivity.java</strong> content:

{% highlight java %}

public class MainActivity extends ActionBarActivity implements AdapterView.OnItemClickListener {

	private Toolbar mToolbar;
	private DrawerLayout mDrawerLayout;
	private ActionBarDrawerToggle mDrawerToggle;
	private ListView mLvDrawerMenu;
	private DrawerMenuItemAdapter mDrawerMenuAdapter;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		mToolbar = (Toolbar) findViewById(R.id.toolbar);
		mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
		mLvDrawerMenu = (ListView) findViewById(R.id.lv_drawer_menu);

		List<DrawerMenuItem> menuItems = generateDrawerMenuItems();
		mDrawerMenuAdapter = new DrawerMenuItemAdapter(getApplicationContext(), menuItems);
		mLvDrawerMenu.setAdapter(mDrawerMenuAdapter);

		mLvDrawerMenu.setOnItemClickListener(this);

		mDrawerToggle = new ActionBarDrawerToggle(this, mDrawerLayout, mToolbar, R.string.app_name, R.string.app_name) {
			public void onDrawerClosed(View view) {
				invalidateOptionsMenu();
			}

			public void onDrawerOpened(View drawerView) {
				invalidateOptionsMenu();
			}
		};
		mDrawerLayout.setDrawerListener(mDrawerToggle);

		if(savedInstanceState == null){
			setFragment(0, BikeFragment.class);
		}
	}

	@Override
	public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
		switch (position){
			case 0:
				setFragment(0, BikeFragment.class);
				break;
			case 1:
				setFragment(1, BusFragment.class);
				break;
			case 2:
				setFragment(2, CarFragment.class);
				break;
			case 3:
				mDrawerLayout.closeDrawer(mLvDrawerMenu);
				mLvDrawerMenu.invalidateViews();
				break;
			case 4:
				mDrawerLayout.closeDrawer(mLvDrawerMenu);
				mLvDrawerMenu.invalidateViews();
				break;
			case 5:
				mDrawerLayout.closeDrawer(mLvDrawerMenu);
				mLvDrawerMenu.invalidateViews();
				break;
		}
	}

	@Override
	public void onBackPressed() {
		if (mDrawerLayout.isDrawerOpen(mLvDrawerMenu)) {
			mDrawerLayout.closeDrawer(mLvDrawerMenu);
		} else {
			super.onBackPressed();
		}
	}

	/**
	* When using the ActionBarDrawerToggle, you must call it during
	* onPostCreate() and onConfigurationChanged()...
	*/
	@Override
	protected void onPostCreate(Bundle savedInstanceState) {
		super.onPostCreate(savedInstanceState);
		mDrawerToggle.syncState();
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		// Pass any configuration change to the drawer toggls
		mDrawerToggle.onConfigurationChanged(newConfig);
	}

	public void setFragment(int position, Class<? extends Fragment> fragmentClass) {
		try {
			Fragment fragment = fragmentClass.newInstance();
			android.support.v4.app.FragmentManager fragmentManager = getSupportFragmentManager();
			FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
			fragmentTransaction.replace(R.id.frame_container, fragment, fragmentClass.getSimpleName());
			fragmentTransaction.commit();

			mLvDrawerMenu.setItemChecked(position, true);
			mDrawerLayout.closeDrawer(mLvDrawerMenu);
			mLvDrawerMenu.invalidateViews();
		}
		catch (Exception ex){
			Log.e("setFragment", ex.getMessage());
		}
	}

	private List<DrawerMenuItem> generateDrawerMenuItems() {
		String[] itemsText = getResources().getStringArray(R.array.nav_drawer_items);
		TypedArray itemsIcon = getResources().obtainTypedArray(R.array.nav_drawer_icons);
		List<DrawerMenuItem> result = new ArrayList<DrawerMenuItem>();
		for (int i = 0; i < itemsText.length; i++) {
			DrawerMenuItem item = new DrawerMenuItem();
			item.setText(itemsText[i]);
			item.setIcon(itemsIcon.getResourceId(i, -1));
			result.add(item);
		}
		return result;
	}
}

{% endhighlight %}

&nbsp;

About <strong>BikeFragment</strong>, <strong>CarFragment</strong>, <strong>BusFragment</strong>, they are just dummy fragment with only one <strong>TextView</strong> to specify <strong>Fragment</strong> name.

Run the demo and enjoy Drawer Navigation Menu with Material Design style:

<img class="aligncenter" title="Drawer Navigation Menu with Material Design Style" src="https://farm9.staticflickr.com/8573/16170261501_9b7ce86ca7_b.jpg" alt="Drawer Navigation Menu with Material Design Style"/>

&nbsp;
<h2>5 - Download Source Code Drawer Navigation Menu with Material Design Style</h2>


<a href="http://www.mediafire.com/download/4lariz1mt7w5j5y/DemoMaterialDesignDrawerMenu.zip" target="_blank">http://www.mediafire.com/download/4lariz1mt7w5j5y/DemoMaterialDesignDrawerMenu.zip</a>

<a href="https://github.com/trinhlbk1991/DemoDrawerMenuMaterialDesign" target="_blank">https://github.com/trinhlbk1991/DemoDrawerMenuMaterialDesign</a>

