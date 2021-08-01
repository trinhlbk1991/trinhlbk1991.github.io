---
layout: post
title: Android Sliding Menu using Navigation Drawer
date: 2014-03-17 15:26
author: trinh_le
comments: true

tags: [Menu, Navigation Drawer, Android UI]
---

<h2>A - Introduction Android Sliding Menu</h2>
Nowadays, a lot of Android applications use Sliding Menu to navigate between app's modules/ screens. The Sliding Menu is hidden in the normal state and can be shown by swiping horizontally gesture or tapping on the app icon on the Action Bar.

<img class="size-full wp-image-1213 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/English-Slide-Out-Menu1.png" alt="Android Sliding Menu" width="743" height="397" />

Previously, if you want to create a Sliding Menu like this, the only way is using a third party library.

But now, Google support it with a newer concept called <a href="https://developer.android.com/design/patterns/navigation-drawer.html">Navigation Drawer</a>.

According to Google:
<blockquote>The navigation drawer is a panel that transitions in from the left edge of the screen and displays the app’s main navigation options.</blockquote>
In this post, we will learn how to create a Android Sliding Menu using Navigation Drawer.

<!--more-->
<h2>B - Demo Application</h2>
<h3>1. Prepare resources</h3>
First of all, you need to download some images for the Sliding Menu and add them to the <strong>drawable</strong> folder:
<ul>
	<li>Sliding menu icon: <a href="http://icetea09.com/wp-content/uploads/2014/03/ic_drawer.png"><img class="alignnone size-full wp-image-1214" src="http://icetea09.com/wp-content/uploads/2014/03/ic_drawer.png" alt="ic_drawer" width="32" height="32" /></a></li>
	<li>Home icon: <a href="http://icetea09.com/wp-content/uploads/2014/03/home.png"><img class="alignnone size-full wp-image-1215" src="http://icetea09.com/wp-content/uploads/2014/03/home.png" alt="home" width="32" height="32" /></a></li>
	<li>Settings icon: <a href="http://icetea09.com/wp-content/uploads/2014/03/settings.png"><img class="alignnone size-full wp-image-1216" src="http://icetea09.com/wp-content/uploads/2014/03/settings.png" alt="settings" width="32" height="32" /></a></li>
	<li>Notifications icon: <a href="http://icetea09.com/wp-content/uploads/2014/03/notifications.png"><img class="alignnone size-full wp-image-1217" src="http://icetea09.com/wp-content/uploads/2014/03/notifications.png" alt="notifications" width="32" height="32" /></a></li>
	<li>About icon: <a href="http://icetea09.com/wp-content/uploads/2014/03/about.png"><img class="alignnone size-full wp-image-1218" src="http://icetea09.com/wp-content/uploads/2014/03/about.png" alt="about" width="26" height="26" /></a></li>
</ul>
Open string.xml file, add some string variables for Sliding Menu items and icons name:
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<resources>

    <string name="app_name">Demo Sliding Menu</string>
    <string name="action_settings">Settings</string>
    <string name="hello_world">Hello world!</string>

    <!-- Sliding Menu items -->
    <string-array name="nav_drawer_items">
        <item >Home</item>
        <item >Notifications</item>
        <item >Settings</item>
        <item >About</item>
    </string-array>

    <!-- Sliding Menu item icons -->
    <array name="nav_drawer_icons">
        <item>@drawable/home</item>
        <item>@drawable/notifications</item>
        <item>@drawable/settings</item>
        <item>@drawable/about</item>
    </array>

</resources>
{% endhighlight %}
&nbsp;
<h3>2. Edit main layout</h3>
Open<strong> activity_main.xml</strong> file and type the following code:

{% highlight java %}
<android.support.v4.widget.DrawerLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- Framelayout to display Fragments -->
    <FrameLayout
        android:id="@+id/fragment_detail"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <!-- Listview to display Sliding Menu -->
    <ListView
        android:id="@+id/lv_sliding_menu"
        android:layout_width="240dp"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:choiceMode="singleChoice"
        android:divider="#000"
        android:dividerHeight="1dp"/>
        
</android.support.v4.widget.DrawerLayout>
{% endhighlight %}
&nbsp;

The <strong>FrameLayout</strong> will hold the appropriate <a title="[Android] Fragment" href="http://icetea09.com/blog/2014/01/22/android-fragment/"><strong>Fragment</strong> </a>(default is Home fragment).

The <strong>ListView</strong> will role the Sliding Menu.
<h3>3. Create Adapter for Sliding Menu ListView</h3>
As I mentioned in the <span style="text-decoration: underline;">Custom ListView</span> post, every Custom ListView need an Adapter. But before coding for the Adapter, We need to create some layouts for the Sliding Menu ListView.

Create a layout file under the res --> layouts folder and name it <strong>lv_item_sliding_menu.xml. </strong>This layout has a <strong>ImageView</strong> and <strong>TextView</strong> to display Sliding Menu item.
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingLeft="10dp"
    android:paddingRight="10dp"
    android:paddingTop="5dp" >

    <ImageView
        android:id="@+id/img_sliding_menu_item"
        android:layout_width="32dp"
        android:layout_height="32dp"
        android:layout_alignParentLeft="true"
        android:layout_alignParentTop="true"
        android:src="@drawable/home" />

    <TextView
        android:id="@+id/tv_sliding_menu_item"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/img_sliding_menu_item"
        android:layout_toRightOf="@+id/img_sliding_menu_item"
        android:text="Home"
        android:layout_marginLeft="10dp"
        android:textAppearance="?android:attr/textAppearanceMedium" />

</RelativeLayout>
{% endhighlight %}
&nbsp;

To bind items to a ListView. We need an entity to describe that item.

Create <strong>SlidingMenuItem</strong> class with following properties:
{% highlight java %}
public class SlidingMenuItem {
    String title;
    int icon;

    public SlidingMenuItem(String title, int icon) {
        this.title = title;
        this.icon = icon;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getIcon() {
        return icon;
    }

    public void setIcon(int icon) {
        this.icon = icon;
    }

}
{% endhighlight %}
&nbsp;

Now, everything is ready to code the adapter.

Create <strong>SlidingMenuAdapter</strong> class that extends <strong>BaseAdapter</strong>:
{% highlight java %}
public class SlidingMenuAdapter extends BaseAdapter {

    private Context context;
    private ArrayList<SlidingMenuItem> items;

    public SlidingMenuAdapter(Context context, ArrayList<SlidingMenuItem> items) {
        this.context = context;
        this.items = items;
    }

    @Override
    public int getCount() {
        return items.size();
    }

    @Override
    public Object getItem(int index) {
        return items.get(index);
    }

    @Override
    public long getItemId(int index) {
        return index;
    }

    @Override
    public View getView(int index, View view, ViewGroup arg2) {
        if (view == null) {
            LayoutInflater mInflater = (LayoutInflater)
            context.getSystemService(Activity.LAYOUT_INFLATER_SERVICE);
            view = mInflater.inflate(R.layout.lv_item_sliding_menu, null);
        }

        ImageView imgIcon = (ImageView) view.findViewById(R.id.img_sliding_menu_item);
        TextView txtTitle = (TextView) view.findViewById(R.id.tv_sliding_menu_item);

        SlidingMenuItem item = items.get(index);

        imgIcon.setImageResource(item.getIcon());
        txtTitle.setText(item.getTitle());

        return view;
    }

}
{% endhighlight %}
&nbsp;

Until now, we did every thing needed for the Sliding Menu ListView (the layout, the entity and the adapter).

Now, it's time to implement it in the <strong>MainActivity </strong>with the following major steps:
<ul>
	<li><span style="font-size: 14px; line-height: 1.5em;">Creating fragments for each Sliding Menu item</span></li>
	<li>Create an instance of <strong>SlidingMenuAdapter</strong> and adding initial data</li>
	<li>Assigning the adapter to Sliding Menu <strong>ListView</strong></li>
	<li>Handling on item click event to show the appropriate fragment for the clicked item</li>
</ul>
<h3>4. Create Fragments for each Sliding Menu items</h3>
Here, I only show to you the layout xml file and the code file of Home fragment. The others are similar and can be found in source code. Each fragment contains a <strong>TextView</strong> to describe the current screen. <strong>fragment_home.xml</strong>
{% highlight java %}

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#B8E62E">

    <TextView
        android:id="@+id/tv_home"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"
        android:text="Home"
        android:textAppearance="?android:attr/textAppearanceLarge" />

</RelativeLayout>
{% endhighlight %}
&nbsp;

<strong>HomeFragment.java</strong>
{% highlight java %}public class HomeFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_home, container, false);
        return rootView;
    }
}
{% endhighlight %}
&nbsp;
<h3>5. MainActivity</h3>
Open <strong>MainActivity.java</strong> and implement the remaining major steps. The following code is the completed code for <strong>MainActivity</strong>. I noted so many comments there so you guys can understand it easily:
{% highlight java %}public class MainActivity extends Activity {
    private DrawerLayout drawerLayout;
    private ListView lvSlidingMenu;
    private ActionBarDrawerToggle drawerToggle; // Navigation Drawer titles 
    private CharSequence drawerTitle;
    private CharSequence appTitle;

    // Sliding Menu items 
    private String[] titles;
    private TypedArray icons;
    private ArrayList slidingMenuItems;
    private SlidingMenuAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        appTitle = drawerTitle = getTitle();

        // Load resources 
        titles = getResources().getStringArray(R.array.nav_drawer_items);
        icons = getResources().obtainTypedArray(R.array.nav_drawer_icons);

        // Get Sliding Menu ListView istance 
        drawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        lvSlidingMenu = (ListView) findViewById(R.id.lv_sliding_menu);
        slidingMenuItems = new ArrayList();

        // Creating and Adding SlidingMenuItems 
        slidingMenuItems.add(new SlidingMenuItem(titles[0], icons.getResourceId(0, -1)));
        slidingMenuItems.add(new SlidingMenuItem(titles[1], icons.getResourceId(1, -1)));
        slidingMenuItems.add(new SlidingMenuItem(titles[2], icons.getResourceId(2, -1)));
        slidingMenuItems.add(new SlidingMenuItem(titles[3], icons.getResourceId(3, -1)));

        // Recycle the typed array 
        icons.recycle();
        lvSlidingMenu.setOnItemClickListener(new SlideMenuClickListener());

        // Assign adapter to listview 
        adapter = new SlidingMenuAdapter(getApplicationContext(), slidingMenuItems);
        lvSlidingMenu.setAdapter(adapter);

        // Enable action bar app icon and behaving it as toggle button 
        getActionBar().setDisplayHomeAsUpEnabled(true);
        getActionBar().setHomeButtonEnabled(true);
        drawerToggle = new ActionBarDrawerToggle(this, drawerLayout, R.drawable.ic_drawer,
                // Navigation Drawer 
                icon R.string.app_name,
                //Navigation Drawer open - description for accessibility 
                R.string.app_name
                // Navigation Drawer close - description for accessibility 
        ) {
            public void onDrawerClosed(View view) {
                getActionBar().setTitle(appTitle);
                invalidateOptionsMenu();
            }

            public void onDrawerOpened(View drawerView) {
                getActionBar().setTitle(drawerTitle);
                invalidateOptionsMenu();
            }
        }; drawerLayout.setDrawerListener(drawerToggle);
        if (savedInstanceState == null) {
            // On first time, show Home Fragment
            displayView(0);
        }
    }

    /**
     * Slide menu item click listener *
     */
    private class SlideMenuClickListener implements ListView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            // Display appropriate fragment for selected item 
            displayView(position);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Toggle Navigation Drawer on selecting action bar app icon/title 
        if (drawerToggle.onOptionsItemSelected(item)) {
            return true;
        }
        // Handle action bar actions click 
        switch (item.getItemId()) {
            case R.id.action_settings:
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    } /* * * Called when invalidateOptionsMenu() is triggered */

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        // If Navigation Drawer is opened, hide the action items 
        boolean drawerOpen = drawerLayout.isDrawerOpen(lvSlidingMenu);
        menu.findItem(R.id.action_settings).setVisible(!drawerOpen);
        return super.onPrepareOptionsMenu(menu);
    }

    /**
     * Display fragment view for selected Navigation Drawer list item *
     */
    private void displayView(int position) {
        Fragment fragment = null;
        switch (position) {
            case 0:
                fragment = new HomeFragment();
                break;
            case 1:
                fragment = new NotificationsFragment();
                break;
            case 2:
                fragment = new SettingsFragment();
                break;
            case 3:
                fragment = new AboutFragment();
                break;
            default:
                break;
        }
        if (fragment != null) {
            FragmentManager fragmentManager = getFragmentManager();
            fragmentManager.beginTransaction().replace(R.id.fragment_detail, fragment).commit();

            // Update selected item and title, then close the drawer 
            lvSlidingMenu.setItemChecked(position, true);
            lvSlidingMenu.setSelection(position);
            setTitle(titles[position]);
            drawerLayout.closeDrawer(lvSlidingMenu);
        } else {
            // Log error
            Log.e("MainActivity", "Error in creating fragment");
        }
    }

    @Override
    public void setTitle(CharSequence title) {
        appTitle = title;
        getActionBar().setTitle(appTitle);
    }

    /**
     * When using the ActionBarDrawerToggle, you must call it during * onPostCreate() and onConfigurationChanged()...
     */
    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        // Sync the toggle state after onRestoreInstanceState has occurred. 
        drawerToggle.syncState();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // Pass any configuration change to the drawer toggls 
        drawerToggle.onConfigurationChanged(newConfig);
    }
}

{% endhighlight %}
&nbsp;

Run the project and enjoy: <img class="size-full wp-image-1219 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/03/321.png" alt="Android Sliding Menu" width="350" />
<h2>C - Download source code</h2>

<a href="https://drive.google.com/file/d/0Bw3dwdSezn6faXJYQW5ibG5zWnM/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6faXJYQW5ibG5zWnM/edit?usp=sharing</a>
