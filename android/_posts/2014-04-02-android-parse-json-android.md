---
layout: post
title: Parse JSON in Android
date: 2014-04-02 16:00
author: trinh_le
comments: true

tags: [Android]
---

<h2>A - Introduction</h2>
<a href="http://www.json.org/" target="_blank">JSON </a>is a light-weight data interchange format. It's easy for human to read and write, for machines to parse and generate.

JSON is the best choice to replace XML when you want to interchange data from server side.

In this post - Parse JSON in Android, I'll show you how to get JSON string from server and parse it in Android.

<!--more-->
<h2> B - Sample JSON</h2>
This is the sample JSON I use in this post.

This JSON string contains some products' information like: id, name, price, description,...

You can access this JSON string by the address: <a href="http://icetea09.com/blog-files/demo_json" target="_blank">http://icetea09.com/blog-files/demo_json</a>
<pre class="lang:default decode:true ">{ 
    "products": [ 
        { 
                "id": "p200", 
                "name": "Canon 600D", 
                "price": "25", 
                "description" : "The best camera of Canon!", 
                "store": { 
                    "store1": "xx xxxxx, yyy zzzz", 
                    "store2": "xx xxxxx, yyy zzzz", 
                    "store3": "xx xxxxx, yyy zzzz" 
                } 
        }, 
        { 
                "id": "p201", 
                "name": "iPhone 5S", 
                "price": "576", 
                "description" : "Great smart phone!", 
                "store": { 
                    "store1": "xx xxxxx, yyy zzzz", 
                    "store2": "xx xxxxx, yyy zzzz", 
                    "store3": "xx xxxxx, yyy zzzz" 
                } 
        }, 
        { 
                "id": "p202", 
                "name": "Aquafina", 
                "price": "1", 
                "description" : "Pure water", 
                "store": { 
                    "store1": "xx xxxxx, yyy zzzz", 
                    "store2": "xx xxxxx, yyy zzzz", 
                    "store3": "xx xxxxx, yyy zzzz" 
                } 
        }, 
        { 
                "id": "p203", 
                "name": "HP HDX T16", 
                "price": "765", 
                "description" : "Perfect choice for entertainment", 
                "store": { 
                    "store1": "xx xxxxx, yyy zzzz", 
                    "store2": "xx xxxxx, yyy zzzz", 
                    "store3": "xx xxxxx, yyy zzzz" 
                } 
        }, 
        { 
                "id": "p204", 
                "name": "HTC One", 
                "price": "623", 
                "description" : "HTC One", 
                "store": { 
                    "store1": "abc def", 
                    "store2": "abc def", 
                    "store3": "abc def" 
                } 
        }, 
        { 
                "id": "p205", 
                "name": "Nikon ACB", 
                "price": "452", 
                "description" : "Nikon ACB", 
                "store": { 
                    "store1": "xx xxxxx, yyy zzzz", 
                    "store2": "xx xxxxx, yyy zzzz", 
                    "store3": "xx xxxxx, yyy zzzz" 
                } 
        }, 
        { 
                "id": "p206", 
                "name": "ABC XYZ", 
                "price": "1234", 
                "description" : "ABC XYZ", 
                "store": { 
                    "store1": "abc def", 
                    "store2": "abc def", 
                    "store3": "abc def" 
                } 
        } 
    ] 
}</pre>
&nbsp;
<h2>Note: Difference between { and [ in JSON string</h2>
The <strong>{</strong> represent for a JSON <strong>object</strong> and the<strong> [</strong> represent for a JSON <strong>array.</strong>

So, when parsing the JSON string, you have to notice to call the correct method:
<ul>
	<li><strong>getJSONArray()</strong>: when the JSON node start with<strong> [</strong> - square bracket</li>
	<li><strong>getJSONObject()</strong>: when the JSON node start with <strong>{</strong> - curly bracket</li>
</ul>
<h2>C - Demo Parse JSON in Android</h2>
<h3>1. Service Handler</h3>
First, create a new Android project.

Create a class to handle calling web service - <strong>ServiceHandler</strong>:
<pre class="lang:default decode:true ">public class ServiceHandler {

    static String response; 
    public static final int GET = 1;
    public static final int POST = 2;

    /*** 
     * Make a service call and return response string 
     */ 
    public String makeServiceCall(String url, int method){ 
        return this.makeServiceCall(url, method, null);
    } 

    /*** 
     * Make a service call and return response string 
     */ 
    public String makeServiceCall(String url, int method, List&lt;NameValuePair&gt; parans){ 
        try { 

            DefaultHttpClient httpClient = new DefaultHttpClient();
            HttpEntity httpEntity = null; 
            HttpResponse httpResponse = null; 

            if(method == POST){ 
                HttpPost httpPost = new HttpPost(url); 
                if(parans != null){ 
                    httpPost.setEntity(new UrlEncodedFormEntity(parans));
                } 
                httpResponse = httpClient.execute(httpPost); 
            } 
            else{ 
                if(parans!=null){ 
                    String paramString = URLEncodedUtils.format(parans, "utf-8"); 
                    url += ("?" + paramString); 
                } 
                HttpGet httpGet = new HttpGet(url); 
                httpResponse = httpClient.execute(httpGet); 
            } 

            httpEntity = httpResponse.getEntity(); 
            response = EntityUtils.toString(httpEntity); 

        } catch (Exception e) { 
            System.out.println("EXCEPTION: makeServiceCall --- " + e.getMessage()); 
        } 

        return response; 
    } 

}</pre>
&nbsp;

The method  <strong>makeServiceCall()</strong> will handle webservice call and return  the respone string. It has 3 parameters:
<ul>
	<li>url: the URL to call web service</li>
	<li>method: GET or POST</li>
	<li>params: all parameters you want to submit to web service (optional)</li>
</ul>
<h3>2. ListView</h3>
In the <strong>Main Activity</strong> layout, add a ListView to display data in JSON string:
<pre class="lang:default decode:true ">&lt;RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:tools="http://schemas.android.com/tools"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent"  
    tools:context=".MainActivity" &gt;  

    &lt;ListView  
        android:id="@+id/lv_products"  
        android:layout_width="match_parent"  
        android:layout_height="wrap_content"  
        android:layout_alignParentLeft="true"  
        android:layout_alignParentTop="true" &gt;  
    &lt;/ListView&gt;  

&lt;/RelativeLayout&gt;</pre>
&nbsp;

As you know , we need to create a custom layout, entity class and adapter for the ListView:

ListView item layout:
<pre class="lang:default decode:true ">&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    android:layout_width="fill_parent"  
    android:layout_height="wrap_content"  
    android:paddingLeft="10dp"  
    android:paddingRight="10dp"  
    android:paddingTop="5dp"
    android:paddingBottom="5dp"  
    android:orientation="vertical" &gt;  

    &lt;TextView  
        android:id="@+id/tv_name"  
        android:layout_width="wrap_content"  
        android:layout_height="wrap_content"  
        android:text="Product Name"  
        android:textAppearance="?android:attr/textAppearanceMedium" /&gt;  

    &lt;TextView  
        android:id="@+id/tv_description"  
        android:layout_width="wrap_content"  
        android:layout_height="wrap_content"  
        android:text="Description"  
        android:textAppearance="?android:attr/textAppearanceSmall" /&gt;  

    &lt;TextView  
        android:id="@+id/tv_price"  
        android:layout_width="wrap_content"  
        android:layout_height="wrap_content"  
        android:text="Price"
        android:textAppearance="?android:attr/textAppearanceSmall" /&gt;  

&lt;/LinearLayout&gt;</pre>
&nbsp;

Product entity class
<pre class="lang:default decode:true ">public class Product {

    String id; 
    String name; 
    float price; 
    String description; 
    String[] stores; 

    public Product(String id, String name, float price, String description) {
        super(); 
        this.id = id; 
        this.name = name; 
        this.price = price; 
        this.description = description; 
    } 

    public Product(String id, String name, float price, String description,
            String[] stores) { 
        super(); 
        this.id = id; 
        this.name = name; 
        this.price = price; 
        this.description = description; 
        this.stores = stores; 
    } 

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

    public float getPrice() {
        return price; 
    } 

    public void setPrice(float price) {
        this.price = price; 
    } 

    public String getDescription() { 
        return description; 
    } 

    public void setDescription(String description) {
        this.description = description; 
    } 

    public String[] getStores() { 
        return stores; 
    } 

    public void setStores(String[] stores) {
        this.stores = stores; 
    } 

}</pre>
&nbsp;

ListView adapter class:
<pre class="lang:default decode:true ">public class ListViewProductAdapter extends ArrayAdapter&lt;Product&gt; {

    Context context; 
    int layoutResource; 
    List&lt;Product&gt; data; 

    public ListViewProductAdapter(Context context, int resource, List&lt;Product&gt; objects) {
        super(context, resource, objects); 
        this.context = context; 
        this.layoutResource = resource; 
        this.data = objects; 
    } 

    @Override 
    public View getView(int position, View convertView, ViewGroup parent) {

        View view = convertView; 
        ProductHolder holder = null; 

        if(view == null){ 
            LayoutInflater layoutInflater = ((Activity)context).getLayoutInflater(); 
            view = layoutInflater.inflate(layoutResource, parent, false);
            holder = new ProductHolder(); 
            holder.tvName = (TextView)view.findViewById(R.id.tv_name); 
            holder.tvDescription = (TextView)view.findViewById(R.id.tv_description); 
            holder.tvPrice = (TextView)view.findViewById(R.id.tv_price); 
            view.setTag(holder); 
        } 
        else{ 
            holder = (ProductHolder)view.getTag(); 
        } 

        if (position % 2 == 1) {
            view.setBackgroundColor(Color.WHITE); 

        } else { 
            view.setBackgroundColor(Color.parseColor("#DCE6CA"));   
        } 

        Product product = data.get(position); 
        holder.tvName.setText(product.getName()); 
        holder.tvDescription.setText(product.getDescription()); 
        holder.tvPrice.setText("Price: " + String.valueOf(product.getPrice())); 

        return view; 
    } 

    static class ProductHolder{
        TextView tvName; 
        TextView tvPrice; 
        TextView tvDescription; 
    } 

}</pre>
&nbsp;
<h3>3. Create Async task to get and parse JSON string</h3>
In <strong>MainActivity</strong> class, create some variables and constants:
<pre class="lang:default decode:true "> private ProgressDialog progressDialog; 
    private static String url = "http://icetea09.com/blog-files/demo_json"; 

     // JSON Node names 
    private static final String TAG_PRODUCTS = "products"; 
    private static final String TAG_ID = "id"; 
    private static final String TAG_NAME = "name"; 
    private static final String TAG_PRICE = "price"; 
    private static final String TAG_DESCRIPTION = "description"; 
    private static final String TAG_STORE = "store"; 
    private static final String TAG_STORE1 = "store1"; 
    private static final String TAG_STORE2 = "store2"; 
    private static final String TAG_STORE3 = "store3"; 

    // contacts JSONArray 
    JSONArray products = null; 

    // Hashmap for ListView 
    ArrayList&lt;Product&gt; productList; 

    ListView lvProducts;</pre>
&nbsp;

Create an inner class of MainActivity named <strong>GetProducts</strong>.

This class extends <strong>AsyncTask</strong>, takes responsibility for getting the JSON string from server and parsing it into <strong>Product</strong> entity.

Finally, show all the data recieved to the ListView.
<pre class="lang:default decode:true ">private class GetProducts extends AsyncTask&lt;Void, Void, Void&gt;{ 

    @Override 
    protected void onPreExecute() {
        super.onPreExecute(); 

        // Showing progress dialog 
        progressDialog = new ProgressDialog(MainActivity.this); 
        progressDialog.setMessage("Please wait..."); 
        progressDialog.setCancelable(false); 
        progressDialog.show(); 
    } 

    @Override 
    protected Void doInBackground(Void... params) {     
        // Creating service handler class instance 
        ServiceHandler sh = new ServiceHandler(); 

        // Making a request to url and getting response 
        String jsonStr = sh.makeServiceCall(url, ServiceHandler.GET); 

        Log.d("Response: ", "&gt; " + jsonStr); 

        if (jsonStr != null) {
            try { 
                JSONObject jsonObj = new JSONObject(jsonStr); 

                // Getting JSON Array node 
                products = jsonObj.getJSONArray(TAG_PRODUCTS); 

                // looping through All Contacts 
                for (int i = 0; i &lt; products.length(); i++) {
                    JSONObject p = products.getJSONObject(i); 

                    String id = p.getString(TAG_ID); 
                    String name = p.getString(TAG_NAME); 
                    String description = p.getString(TAG_DESCRIPTION); 
                    float price = Float.valueOf(p.getString(TAG_PRICE));

                    // Phone node is JSON Object 
                    JSONObject store = p.getJSONObject(TAG_STORE); 
                    String store1 = store.getString(TAG_STORE1); 
                    String store2 = store.getString(TAG_STORE2); 
                    String store3 = store.getString(TAG_STORE3); 

                    // tmp hashmap for single contact 
                    Product product = new Product(id, name, price, description);
                    productList.add(product); 
                } 
            } catch (JSONException e) { 
                e.printStackTrace(); 
            } 
        } else { 
            Log.e("ServiceHandler", "Couldn't get any data from the url"); 
        } 

        return null; 
    } 

    @Override 
    protected void onPostExecute(Void result) {
        super.onPostExecute(result); 

        // Dismiss the progress dialog 
        if (progressDialog.isShowing()) 
            progressDialog.dismiss(); 

        ListViewProductAdapter adapter = new ListViewProductAdapter(MainActivity.this, R.layout.lv_item_products, productList);  
        lvProducts.setAdapter(adapter); 
    } 
}</pre>
&nbsp;

And the result:

<a href="http://icetea09.com/wp-content/uploads/2014/04/json-parser.png"><img class="alignnone size-full wp-image-1244 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/04/json-parser.png" alt="Parse JSON in Android" width="416" height="603" /></a>

&nbsp;
<h2>D - Download source code Parse JSON in Android</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fNXdpeGpWSjVMc0E/edit?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fNXdpeGpWSjVMc0E/edit?usp=sharing</a>
