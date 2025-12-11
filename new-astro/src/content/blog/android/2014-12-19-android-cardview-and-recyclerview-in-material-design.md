---
title: "CardView and RecyclerView in Material Design"
date: 2014-12-19
tags: ["Android UI","Material Design"]
toc: true
comments: true
---

Firstly, to have some visual view about this post, you can take a look at this demo video:
<iframe width="560" height="315" src="//www.youtube.com/embed/0mf5Pipe6ew" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
<h2>A - CardView</h2>
<h2>1 – What is CardView?</h2>
<strong>CardView</strong> was brought along with Android 5.0 Lollipop. It extends <strong>FrameLayout</strong> and has rounded background with shadow by default.

<strong>CardView</strong> is convenient for displaying complex content that has multiple heterogeneous data type like images, text, videos…

<!--more-->

<img class="aligncenter" src="https://developer.android.com/design/material/images/card_travel.png" alt="CardView and RecyclerView in Material Design"/>
<h2>2 – How to use CardView</h2>
To be able to use <strong>CardView</strong> in your application, you have to declare the required dependencies like below:
{% highlight java %}
dependencies {
	compile 'com.android.support:appcompat-v7:21.0.0'
	compile 'com.android.support:cardview-v7:21.0.+'
}
{% endhighlight %}
&nbsp;

After that, in you layout XML file, you also need to declare the <strong>card_view</strong> namespace:

{% highlight java %}

xmlns:card_view=http://schemas.android.com/apk/res-auto

{% endhighlight %}

Now you can play with <strong>CardView</strong> :D

Like other controls, you can add <strong>CardView</strong> to the layout using XML.

You can add not only <strong>TextView</strong> into <strong>CardView</strong>:
{% highlight java %}
<android.support.v7.widget.CardView
	android:layout_width="fill_parent"
	android:layout_height="wrap_content"
	card_view:contentPadding="16dp"
	card_view:cardElevation="2dp"
	card_view:cardCornerRadius="5dp">

	<LinearLayout
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		android:orientation="vertical">

		<TextView
			style="@style/Base.TextAppearance.AppCompat.Headline"
			android:layout_width="fill_parent"
			android:layout_height="wrap_content"
			android:text="Title" />

		<TextView
			style="@style/Base.TextAppearance.AppCompat.Body1"
			android:layout_width="fill_parent"
			android:layout_height="wrap_content"
			android:text="Content here" />
			
	</LinearLayout>

</android.support.v7.widget.CardView>
{% endhighlight %}
&nbsp;

But also other kind of controls like <strong>ImageView</strong>, <strong>Button</strong>…
{% highlight java %}
<android.support.v7.widget.CardView
	android:layout_width="fill_parent"
	android:layout_height="wrap_content"
	card_view:contentPadding="16dp"
	card_view:cardElevation="2dp"
	card_view:cardCornerRadius="5dp">

	<LinearLayout
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		android:orientation="vertical">

		<ImageView
			android:layout_width="fill_parent"
			android:layout_height="150dp"
			android:src="@drawable/sample"
			android:scaleType="fitXY"/>

		<TextView
			style="@style/Base.TextAppearance.AppCompat.Body1"
			android:layout_width="fill_parent"
			android:layout_height="wrap_content"
			android:layout_marginTop="8dp"
			android:text="Material Design is stunning!!!" />

	</LinearLayout>

</android.support.v7.widget.CardView>
{% endhighlight %}
&nbsp;

As you can see on above XML code, <strong>CardView</strong> provides some properties like
<p style="padding-left: 30px;">-   <strong>contentPadding</strong>: setting padding for <strong>CardView</strong></p>
<p style="padding-left: 30px;">-   <strong>cardElevation</strong>: new concept in Material Design that represents for z axis</p>
<p style="padding-left: 30px;">-   <strong>cardCornerRadius</strong>: setting radius for card rounded corner</p>
Demo result:

<img class="aligncenter" src="https://farm8.staticflickr.com/7506/15428801864_5b4a709e38_b.jpg" alt="CardView and RecyclerView in Material Design"/>
<h2>B – RecyclerView</h2>
<h2>1 – What is RecyclerView?</h2>
<strong>RecyclerView</strong> is an “upgraded” version of <strong>ListView</strong> which is more advance and flexible.

<strong>RecyclerView</strong> is a container for displaying large data sets that can be scrolled efficiently by maintaining a limited number of views.

<strong>RecyclerView</strong> also provides some default animations for common item operations like inserting or removing an item.
<h2>2 – How to use RecyclerView?</h2>
To be able to use <strong>RecyclerView</strong> in your application, you have to declare the required dependencies like below:

{% highlight java %}

dependencies {
compile 'com.android.support:appcompat-v7:21.0.0'
compile 'com.android.support:recyclerview-v7:21.0.+'
}

{% endhighlight %}

To use <strong>RecyclerView</strong>, you have to create 2 essential components:
<p style="padding-left: 30px;">-   <strong>LayoutManager</strong>: positions items in <strong>RecyclerView</strong> and determines when to reuse item views that are no longer visible to the user.</p>
<p style="padding-left: 30px;">-   <strong>RecyclerView.Adapter</strong>: provides access to data sets items, creates views for items and binds items info to item view.</p>

<h2>2.1 – LayoutManager</h2>
<strong>RecyclerView</strong> provides some built-in <strong>LayoutManager</strong> that you can use immediately:
<p style="padding-left: 30px;"><strong>-   LinearLayoutManager</strong>: provides similar functions to <strong>ListView</strong></p>
<p style="padding-left: 30px;"><strong>-   GridLayoutManager</strong>: lays out all items in a grid</p>
<p style="padding-left: 30px;"><strong>-   StaggeredGridLayoutManager</strong>: lays out all items in a staggered grid formation, supports horizontal and vertical layouts and is able to lay out items in reverse.</p>

<h2>2.2 – RecyclerView.Adapter</h2>
<strong>Adapter</strong> provides access to all the items in dataset.

<strong>Adapter</strong> also takes responsibility to create view for each item and replace new content for the view whenever the original item is no longer visible.
<h2>3 – Demo simple RecyclerView</h2>
In this demo, we will create a simple demo to show you how to use <strong>RecyclerView</strong> in your Android application. Actually, it’s quite similar to <strong>ListView</strong> implementation.

First, place <strong>RecyclerView</strong> into your layout:
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:orientation="vertical">

	<android.support.v7.widget.RecyclerView
		android:id="@+id/recycler_view"
		android:layout_width="match_parent"
		android:layout_height="match_parent"/>
		
</LinearLayout>
{% endhighlight %}
&nbsp;

Retrieve it in your code:
{% highlight java %}
RecyclerView mRecyclerView;

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_recycler_view);
	mRecyclerView = (RecyclerView)findViewById(R.id.recycler_view);
}
{% endhighlight %}
&nbsp;

If you’re 100% sure that the item layout size will not change in future, call <strong>setHasFixedSize()</strong> method with true value. This will help <strong>RecyclerView</strong> improve its performance significantly.

{% highlight java %}

mRecyclerView.setHasFixedSize(true);

{% endhighlight %}

Next, create a LayoutManager and set it to the RecyclerView. Here, I use the built-in LayoutManager – LinearLayoutManager this simple demo. In next post, I’ll show you how to customize LayoutManager.

{% highlight java %}

mLayoutManager = new LinearLayoutManager(this);
mRecyclerView.setLayoutManager(mLayoutManager);

{% endhighlight %}

Then, we need to create the third essential component – the Adapter.

Before touching the Adapter, we need to create a layout for RecyclerView item:
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	android:orientation="vertical" android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:padding="@dimen/activity_horizontal_margin">

	<TextView
		android:id="@+id/tv_recycler_view_item"
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"
		style="@style/Base.TextAppearance.AppCompat.Large"/>

	<LinearLayout
		android:layout_width="fill_parent"
		android:layout_height="1dp"
		android:background="#000"></LinearLayout>

</LinearLayout>
{% endhighlight %}
&nbsp;

Then, create <strong>SimpleAdapter </strong>class with below content:
{% highlight java %}
public class SimpleAdapter extends RecyclerView.Adapter<SimpleAdapter.ViewHolder> {

	List<String> mItems;

	public SimpleAdapter() {
		super();
		mItems = new ArrayList<String>();
		mItems.add("Amazing Spiderman 2");
		mItems.add("The Guardians of Galaxy");
		mItems.add("What If");
		mItems.add("Big Hero 6");
		mItems.add("The Hunger Game");
		mItems.add("X-men: Days of Future Past");
		mItems.add("The Lego Movie");
		mItems.add("How to Train Your Dragon 2");
		mItems.add("Maleficent");
		mItems.add("22 Jump Street");
		mItems.add("The Maze Runner");
		mItems.add("Horrible Bosses 2");
		mItems.add("Night at the Museum 3");
	}

	@Override
	public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
		View v = LayoutInflater.from(viewGroup.getContext())
		.inflate(R.layout.recycler_view_simple_item, viewGroup, false);
		ViewHolder viewHolder = new ViewHolder(v);
		return viewHolder;
	}

	@Override
	public void onBindViewHolder(ViewHolder viewHolder, int i) {
		viewHolder.itemView.setText(mItems.get(i));
	}

	@Override
	public int getItemCount() {
		return mItems.size();
	}

	class ViewHolder extends RecyclerView.ViewHolder{
		public TextView itemView;
		public ViewHolder(View itemView) {
			super(itemView);
			this.itemView = (TextView)itemView.findViewById(R.id.tv_recycler_view_item);
		}
	}
}
{% endhighlight %}
&nbsp;

As you can see in the <strong>SimpleAdapter</strong> class:
<p style="padding-left: 30px;">-   Constructor: where we get the dataset that can be passed from parameter or created inside the constructor</p>
<p style="padding-left: 30px;"><strong>-   ViewHolder</strong> class: extends <strong>ViewHolde</strong>r and contains all components, controls of item view</p>
<p style="padding-left: 30px;"><strong>-   onCreateViewHolder():</strong> where we inflate the item layout and create <strong>ViewHolder</strong></p>
<p style="padding-left: 30px;"><strong>-   onBindViewHolder()</strong>: where we manipulate item info into <strong>ViewHolder’s</strong> components and controls</p>
<p style="padding-left: 30px;"><strong>-   getItemCount():</strong> return the dataset size</p>
After that, we need to create an instance of the Adapter and assign to <strong>RecyclerView</strong>:

{% highlight java %}

RecyclerView.Adapter mAdapter;
mAdapter = new SimpleAdapter();
mRecyclerView.setAdapter(mAdapter);

{% endhighlight %}

Run the application and enjoy the result:

<img class="aligncenter" src="https://farm8.staticflickr.com/7571/15431433063_c1d570726b_b.jpg" alt="CardView and RecyclerView in Material Design" />
<h2>C – Combine CardView and RecyclerView</h2>
After 2 sections above, we all know that <strong>CardView</strong> and <strong>RecyclerView</strong> are very powerful and flawless components.

In this section, I’ll show you how to combine <strong>CardView</strong> and <strong>RecyclerView</strong> to create stunning view displaying a dataset.

Firstly, create the layout for each item using <strong>CardView</strong>:

{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:card_view="http://schemas.android.com/apk/res-auto"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	android:orientation="vertical">

	<android.support.v7.widget.CardView
		android:layout_width="fill_parent"
		android:layout_height="wrap_content"
		card_view:contentPadding="@dimen/activity_horizontal_margin"
		card_view:cardCornerRadius="3dp">
		
		<ImageView
			android:id="@+id/img_thumbnail"
			android:layout_width="fill_parent"
			android:layout_height="150dp" />

		<TextView
			android:id="@+id/tv_movie"
			android:layout_width="fill_parent"
			android:layout_height="50dp"
			android:paddingLeft="@dimen/activity_horizontal_margin"
			android:paddingRight="@dimen/activity_horizontal_margin"
			android:layout_gravity="bottom"
			android:gravity="center_vertical"
			android:background="#757575"
			android:alpha="0.8"
			android:textSize="@dimen/abc_text_size_headline_material"
			android:text="Test"/>

	</android.support.v7.widget.CardView>

</LinearLayout>
{% endhighlight %}

&nbsp;

This demo will display a list of <strong>Movie</strong> info with name and thumbnail. So that we also need to create an entity class for <strong>Movie</strong>:

{% highlight java %}
public class Movie {
	private String mName;
	private int mThumbnail;

	public String getName() {
		return mName;
	}

	public void setName(String name) {
		this.mName = name;
	}

	public int getThumbnail() {
		return mThumbnail;
	}

	public void setThumbnail(int thumbnail) {
		this.mThumbnail = thumbnail;
	}
}
{% endhighlight %}

&nbsp;

Then, create CardAdapter class that similar to SimpleAdapter above. Instead only one TextView, now the ViewHolder will have the ImageView to display the movie thumbnail as well.

{% highlight java %}
public class CardAdapter extends RecyclerView.Adapter<CardAdapter.ViewHolder>{
	List<Movie> mItems;

	public CardAdapter() {
		super();
		mItems = new ArrayList<Movie>();
		Movie movie = new Movie();
		movie.setName("The Amazing Spider-Man 2");
		movie.setThumbnail(R.drawable.spiderman);
		mItems.add(movie);

		movie = new Movie();
		movie.setName("X-men: Days of Future Past");
		movie.setThumbnail(R.drawable.xmen);
		mItems.add(movie);

		movie = new Movie();
		movie.setName("The Hunger Game");
		movie.setThumbnail(R.drawable.hungergame);
		mItems.add(movie);

		movie = new Movie();
		movie.setName("Guardians of the Galaxy");
		movie.setThumbnail(R.drawable.guardians_of_the_galaxy);
		mItems.add(movie);

		movie = new Movie();
		movie.setName("Maleficent");
		movie.setThumbnail(R.drawable.maleficent);
		mItems.add(movie);

		movie = new Movie();
		movie.setName("How to Train Your Dragon 2");
		movie.setThumbnail(R.drawable.howtotrainyourdragon);
		mItems.add(movie);

		movie = new Movie();
		movie.setName("What If");
		movie.setThumbnail(R.drawable.whatif);
		mItems.add(movie);
	}

	@Override
	public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
		View v = LayoutInflater.from(viewGroup.getContext())
		.inflate(R.layout.recycler_view_card_item, viewGroup, false);
		ViewHolder viewHolder = new ViewHolder(v);
		return viewHolder;
	}

	@Override
	public void onBindViewHolder(ViewHolder viewHolder, int i) {
		Movie movie = mItems.get(i);
		viewHolder.tvMovie.setText(movie.getName());
		viewHolder.imgThumbnail.setImageResource(movie.getThumbnail());
	}

	@Override
	public int getItemCount() {
		return mItems.size();
	}

	class ViewHolder extends RecyclerView.ViewHolder{

		public ImageView imgThumbnail;
		public TextView tvMovie;

		public ViewHolder(View itemView) {
			super(itemView);
			imgThumbnail = (ImageView)itemView.findViewById(R.id.img_thumbnail);
			tvMovie = (TextView)itemView.findViewById(R.id.tv_movie);
		}
	}
}
{% endhighlight %}

&nbsp;

Finally, invoke an instance of <strong>CardAdapter</strong> and set it to <strong>RecyclerView</strong>:

{% highlight java %}

 mAdapter = new CardAdapter();
 mRecyclerView.setAdapter(mAdapter);
 
{% endhighlight %}

Now you can run and enjoy the result when combine CardView and RecyclerView:

<img class="aligncenter" src="/images/posts/device-2016-05-14-174223.png" alt="CardView and RecyclerView in Material Design" />

<h2>D - Download Source Code CardView and RecyclerView in Material Design</h2>


<a href="https://github.com/trinhlbk1991/DemoCardViewRecyclerView" target="_blank">https://github.com/trinhlbk1991/DemoCardViewRecyclerView</a>

<h2>Big Note</h2>

I saw a lot of you asking about handling on item clicked listener in Recycler View, so I decided to implement it.

Please checkout the code on github for implementation details.

&nbsp;