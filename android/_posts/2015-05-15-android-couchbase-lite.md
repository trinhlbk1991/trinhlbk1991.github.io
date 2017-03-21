---
layout: post
title: Couchbase Lite
date: 2015-05-15 22:39
author: trinh_le
comments: true

tags: [Android, Couchbase]
image: https://c2.staticflickr.com/2/1672/24165316453_c57900dcc0_h.jpg
---

<h2>A - Introduction</h2>
<a href="http://www.couchbase.com/nosql-databases/couchbase-mobile" target="_blank">Couchbase Lite</a> is a non-relational database, data is stored in documents instead of table rows.
<br/>
A document is a JSON object that contains a number of key-value pairs. Entities, and relationships between entities, are managed within the document itself.
<br/>
If you're familiar with relational database, you'll find that Couchbase Lite works differently and has its own database terminologies.

You can download Couchbase Lite library for Android at <a href="http://www.couchbase.com/nosql-databases/downloads#Couchbase_Mobile" target="_blank">http://www.couchbase.com/nosql-databases/downloads#Couchbase_Mobile</a>

Or add below line to graddle build file in Android Studio:
<pre class="lang:default decode:true">dependencies {
    compile 'com.couchbase.lite:couchbase-lite-android:1.0.3-4'
}</pre>
Add the following lines to the top-level <strong>allprojects/repositories</strong> section:
<pre class="lang:default mark:4-7 decode:true">allprojects {
    repositories {
        jcenter()
        mavenCentral()
        maven {
            url "http://files.couchbase.com/maven2/"
        }
    }
}</pre>
<!--more-->
<h2>B - Manager</h2>
<strong>Manager</strong> is the top-level object used to manage a collection of <strong>Database</strong> instances. You must create a <strong>Manager</strong> object in order to work with Couchbase Lite in your application.

To create a Manager object, we just need to call the constructor:
<pre class="lang:default mark:6-11 decode:true">@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    try {
        mManager = new Manager(new AndroidContext(getApplicationContext()), Manager.DEFAULT_OPTIONS);
    } catch (IOException ex) {
        Log.e("MainActivity", "Cannot create Manager instance", ex);
        return;
    }
}</pre>
By default, the <strong>Manager</strong> will open a <strong>Database</strong> with read and write permission. If you want to modify the permission, you can pass a <strong>ManagerOptions</strong> object to the constructor:
<pre class="lang:default decode:true">ManagerOptions managerOptions = new ManagerOptions();
managerOptions.setReadOnly(true);
mManager = new Manager(new AndroidContext(getApplicationContext()), managerOptions);</pre>
<h2> C - Databse</h2>
Database is a container for <em><strong>documents</strong></em>, a scope for <em><strong>queries</strong></em> and the source and target for <em><strong>replications</strong></em>.

Remember that <span style="color: #ff0000;"><strong>Database is not a table</strong></span>! Couchbase Lite doesn't have any term that equal to table in relational database.

A database has following elements:
<ul>
	<li>Name: only accept l<em>owercase</em> ASCII letters, digits, and the special characters <code>_$()+-/</code></li>
	<li>Documents</li>
	<li>Views</li>
	<li>Filter functions</li>
	<li>Replications</li>
</ul>
We will talk about each elements in more details later.
<h3>1. Create a database</h3>
You can create an empty database by just open it:
<pre class="lang:default decode:true">try {
    mDatabase = mManager.getDatabase("icetea09-database");
} catch (CouchbaseLiteException e) {
    e.printStackTrace();
}</pre>
<h3> 2. Delete a database</h3>
To delete your database and all its attachments permanently, you have to call delete method.

After deleted database, you should assign null value to the Database reference.
<pre class="lang:default mark:4 decode:true ">@Override
protected void onDestroy() {
    try {
        mDatabase.delete();
    } catch (CouchbaseLiteException e) {
        Log.e("MainActivity", "Cannot delete database", e);
        return;
    }
    super.onDestroy();
}</pre>
<h2> D - Document</h2>
In <em>document database</em>, <strong>document</strong> is the primary entity stored in database - not <strong>row</strong> or <strong>record</strong>.

In Couchbase Lite, document has following elements:
<ul>
	<li>ID: unique in entire database and cannot be changed</li>
	<li>Current revision ID: will change every time document updated</li>
	<li>History of past revision IDs</li>
	<li>Body: JSON object that contains stored data</li>
	<li>Attachments: binary blobs used to store large media files or non-textual data</li>
</ul>
To demonstrate for the CRUD operation in Couchbase Lite, I'll create a simple form allow user to update their contact information:

<img class="aligncenter" src="https://farm9.staticflickr.com/8750/17153385651_57b229fe5b_b.jpg" alt="Couchbase Lite" />
<h3>1. Create document</h3>
The following code will show you how to create a document with assigned UUID. If you didn't assign any UUID to the document, the ID will be generated randomly.
<pre class="lang:default decode:true">private void saveContactInfo(String firstName, String lastName, String phoneNumber) {
    //Create new document with random UUID
    //Document document = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);
    
    Document document = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);
    
    Map&lt;String, Object&gt; properties = new HashMap();
    properties.put(FIELD_FIRST_NAME, firstName);
    properties.put(FIELD_LAST_NAME, lastName);
    properties.put(FIELD_PHONE_NUMBER, phoneNumber);
    try {
        document.putProperties(properties);
    } catch (CouchbaseLiteException e) {
        Log.e(TAG, "Cannot save document", e);
    }
    
    try {
        document.putProperties(properties);
    } catch (CouchbaseLiteException e) {
        Log.e(TAG, "Cannot save document", e);
    }
}</pre>
<h3> 2. Retrieve document</h3>
In order to retrieve a document, you have to know its UUID:
<pre class="lang:default mark:3-6 decode:true">private ContactInfo getContactInfo() {
    try{
        Document doc = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);
        String firstName = doc.getProperty(FIELD_FIRST_NAME).toString();
        String lastName = doc.getProperty(FIELD_LAST_NAME).toString();
        String phoneNumber = doc.getProperty(FIELD_PHONE_NUMBER).toString();
        return new ContactInfo(firstName, lastName, phoneNumber);
    }
    catch (Exception ex){
        Log.e(TAG, "Cannot get contact info", ex);
    }
    return null;
}</pre>
<h3> 3. Update document</h3>
Please refer to the "Create document" section, cause Update document is <strong>almost</strong> the same code and you must have the document UUID to be able to update its content.
<pre class="lang:default decode:true">private boolean updateContactInfo(String firstName, String lastName, String phoneNumber) {
    Document document = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);

    Map&lt;String, Object&gt; properties = new HashMap();
    properties.putAll(document.getProperties());
    properties.put(FIELD_FIRST_NAME, firstName);
    properties.put(FIELD_LAST_NAME, lastName);
    properties.put(FIELD_PHONE_NUMBER, phoneNumber);
    try {
        document.putProperties(properties);
        return true;
    } catch (CouchbaseLiteException e) {
        Log.e(TAG, "Cannot save document", e);
        return false;
    }

}</pre>
The only different is
<pre class="lang:default decode:true">properties.putAll(document.getProperties());</pre>
This line allow you to update the document with the same <strong>_rev</strong>. Or else, your updating will be rejected. Please find more details on <span style="text-decoration: underline;"><strong>5. Revision</strong></span>.
<h3>4. Delete document</h3>
<pre class="lang:default decode:true">private void deleteContactInfo() {
    Document document = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);
    try {
        document.delete();
    } catch (CouchbaseLiteException e) {
        Log.e(TAG, "Cannot delete document", e);
    }
}</pre>
To download the source code for this demo, please refer Download section at the bottom of this post.
<h3>5. Revision</h3>
Every <strong>Document</strong> has a property call <em><strong>_rev</strong></em>. It is the revision ID and will be generated automatically every time you update document value.

Every time you want to update document value, you have to pass the correct current <em><strong>_rev</strong></em>. Or else, the updating will be rejected.

That was demonstrated in the updating code:
<pre class="lang:default decode:true ">properties.putAll(document.getProperties());</pre>
By putAll old properties values, you got the current <em><strong>_rev</strong> </em>of the document.
<h2>E - Attachment</h2>
As you know, <strong>Attachment</strong> is a part of <strong>Document</strong> but its not a part of document body (the JSON object).

The reason is to allow storing large binary data files in document and not affecting the JSON parsing performance. Cause attachment will be loaded on demand not when loading JSON body.

A document can have many attachments identified by different names. Each attachment has been tagged by its MIME type that helps the application interpret its content.

To demonstrate for creating, updating and retrieving attachments, we add one more ImageView into the screen to display user profile picture.
<h3>1. Create/Update attachment</h3>
To create an Attachment, first create an <strong>UnsavedRevision</strong>, <strong>set Attachment</strong> content and finally <strong>save</strong> it. Update will be the same:
<pre class="lang:default decode:true">private void saveAvatar() {
    Document doc = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    Bitmap bitmap = ((BitmapDrawable) mImgAvatar.getDrawable()).getBitmap();
    bitmap.compress(Bitmap.CompressFormat.PNG, 0 /*ignored for PNG*/, bos);
    byte[] bitmapdata = bos.toByteArray();
    ByteArrayInputStream bs = new ByteArrayInputStream(bitmapdata);

    try {
        UnsavedRevision newRev = doc.getCurrentRevision().createRevision();
        newRev.setAttachment("avatar.jpg", "image/jpeg", bs);
        newRev.save();
    } catch (CouchbaseLiteException e) {
        Log.e(TAG, "Cannot save attachment", e);
    }
}</pre>
<h3> 2. Retrieve attachment</h3>
Once you already had an attachment, you can access it via its name:
<pre class="lang:default decode:true">private Bitmap getAvatar() {
    Document doc = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);
    Revision rev = doc.getCurrentRevision();
    Attachment att = rev.getAttachment("avatar.jpg");
    if (att != null) {
        try {
            InputStream is = att.getContent();
            BufferedInputStream bif = new BufferedInputStream(is);
            return BitmapFactory.decodeStream(bif);
        } catch (CouchbaseLiteException e) {
            Log.e(TAG, "Cannot load attachment", e);
        }
        return null;
    }
    return null;
}</pre>
<h3> 3. Delete attachment</h3>
To delete an attachment, just call <strong>removeAttachment</strong>:
<pre class="lang:default decode:true ">private void deleteAvatar(){
    Document doc = mDatabase.getDocument(CONTACT_INFO_DOCUMENT_ID);
    try{
        UnsavedRevision newRev = doc.getCurrentRevision().createRevision();
        newRev.removeAttachment(AVATAR_JPG);
        newRev.save();
    }
    catch (CouchbaseLiteException e){
        Log.e(TAG, "Cannot delete attachment", e);
    }
}</pre>
<h2> F - View</h2>
A <strong>View</strong> is a persistent index of documents in a database, generated using map/reduce, which you then query to find data.
<h3>1 - Create and initialize Views</h3>
To create a <strong>View</strong> object, we need to call the <strong>getView()</strong> method of <strong>Database</strong> object. In case not existing, the database will create new one with the input name.

And before query on the View, you have to register the <em><strong>mapping function</strong></em> for it:
<pre class="lang:default decode:true ">View mPhoneView = mDatabase.getView(VIEW_PHONE);
    mPhoneView.setMap(new Mapper() {
        @Override
        public void map(Map&lt;String, Object&gt; document, Emitter emitter) {
            List&lt;String&gt; phones = (List) document.get(FirstDemoActivity.FIELD_PHONE_NUMBER);
            for (String phone : phones) {
                emitter.emit(phone, document.get(FirstDemoActivity.FIELD_FIRST_NAME) + " " + document.get(FirstDemoActivity.FIELD_LAST_NAME));
            }
        }
    }, "1");
}</pre>
In the setMap() method, you can see that we have 2 parameter:
<ul>
	<li>Mapper object contain the definition of mapping function</li>
	<li>String describe the mapping funtion version. Every time you change the behavior of mapping function, you must change the version string. Otherwise, the databse won't realise any changes you made.</li>
</ul>
<h3>2 - Reduce functions</h3>
Reduce funtion recieves the indexed key/value pairs of mapping function and processse, aggregates them to one single object.

Reduce funtion is optional and not commonly used. It usually used to count, calulate the sum or average of the result.
<pre class="lang:default decode:true ">mPhoneView.setMapReduce(new Mapper() {
        @Override
        public void map(Map&lt;String, Object&gt; document, Emitter emitter) {
            List&lt;String&gt; phones = (List) document.get(FirstDemoActivity.FIELD_PHONE_NUMBER);
            for (String phone : phones) {
                emitter.emit(phone, document.get(FirstDemoActivity.FIELD_FIRST_NAME) + " " + document.get(FirstDemoActivity.FIELD_LAST_NAME));
            }
        }
    }, new Reducer() {
        @Override
        public Object reduce(List&lt;Object&gt; keys, List&lt;Object&gt; values, boolean rereduce) {
            return values.size();
        }
    }, "1");</pre>
<h2>G - Query</h2>
Now you have <strong>View</strong> already, and to retrieve result from <strong>View</strong> you must know about <strong>Query</strong>.
<h3>1 - Create a Query</h3>
To create a Query object, you can call getQuery() method of a View. By default, that query will return all rows in view in increasing order by key.

But you can change this by some common properties like:
<ul>
	<li><code>startKey</code>: the key to start at. The default value, <code>null</code>, means to start from the beginning.</li>
	<li><code>endKey</code>: the last key to return. The default value, <code>null</code>, means to continue to the end.</li>
	<li><code>descending</code>: If set to <code>true</code>, the keys will be returned in reverse order. (This also reverses the meanings of the<code>startKey</code> and <code>endKey</code> properties, since the query will now start at the highest keys and end at lower ones!)</li>
	<li><code>limit</code>: If nonzero, this is the maximum number of rows that will be returned.</li>
	<li><code>skip</code>: If nonzero, this many rows will be skipped (starting from the <code>startKey</code> if any.)</li>
</ul>
<pre class="lang:default decode:true ">mQuery = mDatabase.getView(VIEW_PHONE).createQuery();
mQuery.setDescending(true);
mQuery.setLimit(20);</pre>
<h3>2 - Run Query</h3>
After created a Query object and customized its properties, you can run it.

The result is a <code>QueryEnumerator</code>, which provides a list of <code>QueryRow</code> objects, each one describing one row from the view's index.
<pre class="lang:default decode:true">try{
    QueryEnumerator result = mQuery.run();
    for (Iterator&lt;QueryRow&gt; it = result; it.hasNext(); ) {
        QueryRow row = it.next();
        Log.w("MYAPP", "Widget named %s costs $%f", row.getKey(), ((Double) row.getValue()).doubleValue());
    }
}
catch (CouchbaseLiteException e){
    e.printStackTrace();
}</pre>
That's it!

That's all I want to share with you in this post about Couchbase Lite.

I hope that this post can give you the general view about Couchbase Lite and how to use it to store data in your application.

You can find more details about source code in the following link:

<a href="https://github.com/trinhlbk1991/DemoCouchbaseLite" target="_blank">https://github.com/trinhlbk1991/DemoCouchbaseLite</a>
