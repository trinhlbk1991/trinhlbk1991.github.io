---
title: "Apply MVP Pattern for Android"
date: 2014-11-10
categories: ["android"]
tags: ["MVP","Design Pattern"]
toc: true
comments: true
---

<h2>A - What is MVP?</h2>
MVP pattern stands for Model - View - Presenter.
<br/>
MVP is a derivative from famous MVC guy. It allows separate the presentation layer from the business logic.
<p style="padding-left: 30px;">-   <strong>Model</strong>: handle persisting and retrieving data, along with any business logic that the data must adhere to</p>
<p style="padding-left: 30px;">-   <strong>View</strong>: gather user input and update the display</p>
<p style="padding-left: 30px;">-   <strong>Presenter</strong>: the "middle-man" handles the communication between Model and View</p>

Separating user interface from logic in Android is not easy, but the MVP pattern makes a little easier to prevent our activities turn into very coupled classes consisting on hundreds or even thousands of lines.

That will make our Android application more testable, extendable and maintainable.

<!--more-->
<h2>B - Demo apply MVP Pattern for Android</h2>
In this part, we will create a small and simple demo about applying MVP pattern for Android application.

This demo app allows user to add new product and load all the products.

Firstly, we need to create the layout:

<strong>activity_main.xml</strong>

<pre>
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
    android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;EditText
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:ems=&quot;10&quot;
        android:id=&quot;@+id/et_product&quot;
        android:hint=&quot;Product Name&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot; /&gt;

    &lt;Button
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;Add&quot;
        android:id=&quot;@+id/btn_add&quot;
        android:layout_below=&quot;@+id/et_product&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot; /&gt;

    &lt;Button
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;Load&quot;
        android:id=&quot;@+id/btn_load&quot;
        android:layout_below=&quot;@+id/btn_add&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/tv_products&quot;
        android:layout_below=&quot;@+id/btn_load&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot; /&gt;

&lt;/RelativeLayout&gt;
</pre>

Then, create an Interface for the View:

<strong>IProductsView.java</strong>

<pre>
public interface IProductsView {
    public void showProducts(String products);
    public void clearInputFields();
}
</pre>

Lat the MainActivity implements the view interface above:

<strong>MainActivity.java</strong>

<pre>
public class MainActivity extends ActionBarActivity implements IProductsView, View.OnClickListener {
    EditText mEtProduct;
    TextView mtvProducts;
    Button mBtnAdd;
    Button mBtnLoad;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mEtProduct = (EditText)findViewById(R.id.et_product);
        mtvProducts = (TextView)findViewById(R.id.tv_products);
        mBtnAdd = (Button)findViewById(R.id.btn_add);
        mBtnLoad = (Button)findViewById(R.id.btn_load);
        mBtnAdd.setOnClickListener(this);
        mBtnLoad.setOnClickListener(this);
    }

    @Override
    public void showProducts(String products) {
        mtvProducts.setText(products);
    }

    @Override
    public void clearInputFields() {
        mEtProduct.setText(&quot;&quot;);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btn_add: break;
            case R.id.btn_load: break;
        }
    }
}
</pre>

Next, we move to Model part, create Product class:

<strong>Product.java</strong>

<pre>
public class Product {
    private String mName;

    public Product(String name){
        mName = name;
    }

    public String getmName() {
        return mName;
    }
}
</pre>

Now, we must create the Presenter class that contains the Model, View instances and some method to handle business logic:

<strong>ProductsPresenter.java</strong>

<pre>
public class ProductsPresenter {
    IProductsView mView;
    List&lt;Product&gt; products;

    public ProductsPresenter(IProductsView view){
        mView = view;
        products = new ArrayList&lt;Product&gt;();
        products.add(new Product(&quot;Nikon D3200&quot;));
    }

    public void addProduct(String product){
        products.add(new Product(product));
        mView.clearInputFields();
    }

    public void loadProducts(){
        String result = &quot;&quot;;
        for(Product product : products){
            result += product.getmName() + &quot;\n&quot;;
        }
        mView.showProducts(result);
    }
}
</pre>

Now, get back to MainActivity and add the Presenter into it:

<strong>MainActivity.java</strong>

<pre>
ProductsPresenter mProductsPresenter;
...

@Override
protected void onCreate(Bundle savedInstanceState) {
    ...
    mProductsPresenter = new ProductsPresenter(this);
}

@Override
public void onClick(View v) {
    switch (v.getId()){
        case R.id.btn_add: mProductsPresenter.addProduct(mEtProduct.getText().toString()); break;
        case R.id.btn_load: mProductsPresenter.loadProducts(); break;
    }
}
</pre>

Finally, run the demo and enjoy the result!

<img class="size-full wp-image-1932 aligncenter" src="http://icetea09.com/wp-content/uploads/2014/11/android-mvp-demo.jpg" alt="android-mvp-demo" width="300" height="464" />
<h2>C - Source code of Demo apply MVP Pattern for Android</h2>
<a href="https://drive.google.com/file/d/0Bw3dwdSezn6fd3JlNE8zeXlERE0/view?usp=sharing" target="_blank">https://drive.google.com/file/d/0Bw3dwdSezn6fd3JlNE8zeXlERE0/view?usp=sharing</a>

<a href="http://www.mediafire.com/download/o8kcmnkicaxp6v5/DemoAndroidMVP.zip" target="_blank">http://www.mediafire.com/download/o8kcmnkicaxp6v5/DemoAndroidMVP.zip</a>