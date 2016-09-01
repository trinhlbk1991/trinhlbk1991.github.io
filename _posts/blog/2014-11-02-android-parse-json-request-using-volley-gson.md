---
layout: post
title: Parse JSON Request using Volley and GSON
date: 2014-11-02 17:38
author: trinh_le
comments: true
categories: [blog]
tags: [Android]
---

In previous <a title="Simple Request Using Volley" href="http://icetea09.com/blog/2014/10/22/android-simple-request-using-volley/" target="_blank">post</a>,  I showed you how to use Volley to make a simple request in Android application.

This time, I'll show you the recommended way to make a JSON request using Volley and how to customize Volley request to take advantage of the GSON library.
<h2>A - Setting up a RequestQueue</h2>
Firstly, create the VolleyHelper class. This will be a singleton class where we store and init all core Volley objects:

{% highlight java %}

public class VolleyHelper {
    private static VolleyHelper INSTANCE;
    private RequestQueue requestQueue;
    private Context context;

    private VolleyHelper(Context context){
        this.context = context;
        requestQueue = getRequestQueue();
    }

    public static synchronized VolleyHelper getInstance(Context context){
        if(INSTANCE == null){
            INSTANCE = new VolleyHelper(context);
        }
        return INSTANCE;
    }

    public RequestQueue getRequestQueue(){
        if(requestQueue == null){
            requestQueue = Volley.newRequestQueue(context.getApplicationContext());
        }
        return requestQueue;
    }

    public <T> void addToRequestQueue(Request<T> req) {
        getRequestQueue().add(req);
    }
}

{% endhighlight %}

<!--more-->
<h2>B - Make a JSON Request</h2>
Firstly, create the layout for our simple demo with one Button and one TextView to display the result:

{% highlight java %}

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context=".MainActivity">

    <Button android:id="@+id/btnJSONRequest"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="JSON Request"/>

    <TextView android:id="@+id/tvResult"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/btnJSONRequest"/>

</RelativeLayout>

{% endhighlight %}

In the <strong>MainActivity.java</strong>, we declare all indeed variables for all the controls and the JSON url:

{% highlight java %}

Button btnJSONRequest;
Button btnGSONRequest;
TextView tvResult;

String url="http://icetea09.com/blog-files/demo_json";

{% endhighlight %}

Make sure that you remember to inject all the variables to the proper controls in the layout:

{% highlight java %}

btnJSONRequest = (Button)findViewById(R.id.btnJSONRequest);
btnGSONRequest = (Button)findViewById(R.id.btnGSONRequest);
tvResult = (TextView)findViewById(R.id.tvResult);

{% endhighlight %}

Then, the most important step is creating a <strong>JsonObjectRequest</strong>:

{% highlight java %}

final JsonObjectRequest jsObjRequest = new JsonObjectRequest
	(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

		@Override
		public void onResponse(JSONObject response) {
			tvResult.setText("Response: " + response.toString());
			String textResult = "";
			try {
				JSONArray arrProducts = response.getJSONArray("products");
				for(int i=0; i<arrProducts.length(); i++){
					JSONObject productItem = (JSONObject)arrProducts.get(i);
					textResult += "Name: " + productItem.getString("name") + "\n";
					textResult += "Description: " + productItem.getString("description") + "\n";
					textResult += "Price: $" + productItem.getString("price") + "\n\n";
				}
				tvResult.setText(textResult);
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}

	}, new Response.ErrorListener() {

		@Override
		public void onErrorResponse(VolleyError error) {
			if(error != null) Log.e("MainActivity", error.getMessage());

		}
	});

{% endhighlight %}

And add that <strong>JsonObjectRequest</strong> to <strong>RequestQueue</strong> in the Button click event:

{% highlight java %}

btnJSONRequest.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		VolleyHelper.getInstance(getApplicationContext()).addToRequestQueue(jsObjRequest);
	}
});

{% endhighlight %}

Run the project and enjoy the result:

<img class="size-full wp-image-1927 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/Screenshot_2014-11-02-13-28-52.png" alt="Screenshot_2014-11-02-13-28-52" width="270" height="480" />
<h2>C - Custom the Request with GSON</h2>
In this section, I'll describe how to implement a custom request types, for types that don't have out-of-the-box Volley support - GSON Request.

As you know that GSON is a very famous and effective library used for JSON converting. Follow this <a href="http://code.google.com/p/google-gson/" target="_blank">link </a>if you want to learn more about GSON.

If you want to implement a custom request, you have to do 2 steps:
<p style="padding-left: 30px;">-     Extend the Request<T> class, where <T> represents the type of parsed response the request expects</p>
<p style="padding-left: 30px;">-     Implement the abstract methods parseNetworkResponse() and deliverResponse()</p>

Now apply all those steps to the GSONRequest class:

{% highlight java %}

public class GsonRequest<T> extends Request<T> {
    private final Gson gson = new Gson();
    private final Class<T> clazz;
    private final Map<String, String> headers;
    private final Response.Listener<T> listener;

    public GsonRequest(String url, Class<T> clazz, Map<String, String> headers,
                       Response.Listener<T> listener, Response.ErrorListener errorListener) {
        super(Method.GET, url, errorListener);
        this.clazz = clazz;
        this.headers = headers;
        this.listener = listener;
    }

    @Override
    public Map<String, String> getHeaders() throws AuthFailureError {
        return headers != null ? headers : super.getHeaders();
    }

    @Override
    protected Response<T> parseNetworkResponse(NetworkResponse response) {
        try {
            String json = new String(response.data, HttpHeaderParser.parseCharset(response.headers));
            return Response.success(gson.fromJson(json, clazz),
                    HttpHeaderParser.parseCacheHeaders(response));
        } catch (UnsupportedEncodingException e) {
            return Response.error(new ParseError(e));
        } catch (JsonSyntaxException e) {
            return Response.error(new ParseError(e));
        }
    }

    @Override
    protected void deliverResponse(T response) {
        listener.onResponse(response);
    }
}

{% endhighlight %}



The way to use GSONRequest is very familiar to normal requests.

First, we need to create all the models class that equivalent to the JSON response:

Product.java

{% highlight java %}

public class Product {
    private String id;
    private String name;
    private String description;
    private String price;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}

{% endhighlight %}

Products.java

{% highlight java %}

public class Products {
    private List<Product> products;

    public List<Product> getProducts() {
        return products;
    }
}

{% endhighlight %}

In MainActivity.java, we create a <strong>GSONRequest</strong> object:

{% highlight java %}

final GsonRequest gsonRequest = new GsonRequest(url, Products.class, null, new Response.Listener<Products>() {

	@Override
	public void onResponse(Products products) {
		String textResult = "";
		for(int i=0; i<products.getProducts().size(); i++){
			Product productItem = products.getProducts().get(i);
			textResult += "Name: " + productItem.getName() + "\n";
			textResult += "Description: " + productItem.getDescription() + "\n";
			textResult += "Price: $" + productItem.getPrice() + "\n\n";
		}
		tvResult.setText(textResult);
	}
}, new Response.ErrorListener() {
	@Override
	public void onErrorResponse(VolleyError volleyError) {
		if(volleyError != null) Log.e("MainActivity", volleyError.getMessage());
	}
});

{% endhighlight %}

Then, add that GSONRequest object to the RequestQueue:

{% highlight java %}

btnGSONRequest.setOnClickListener(new View.OnClickListener() {
	@Override
	public void onClick(View v) {
		VolleyHelper.getInstance(getApplicationContext()).addToRequestQueue(gsonRequest);
	}
});

{% endhighlight %}

Finally, run the project and enjoy the result:

<a href="http://icetea09.com/wp-content/uploads/2014/11/Screenshot_2014-11-02-14-01-16.png"><img class="size-full wp-image-1928 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/Screenshot_2014-11-02-14-01-16.png" alt="Screenshot_2014-11-02-14-01-16" width="270" height="480" /></a>
As you can see, I added one more button called GSON Request.

That's all for this post, hope you enjoy this! :D
