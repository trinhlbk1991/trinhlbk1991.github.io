---
layout: post
title: Use Existing SQLite Database in Android App
date: 2014-01-22 10:40
author: trinh_le
comments: true

tags: [Android]
---

In my previous post about <a title="[Android] SQLite" href="http://icetea09.com/blog/2014/03/03/android-sqlite/">SQLite </a>, I only post the way to create database when application started.

In reality, we do not only need a database to store data but also need one to read information from.

So, in this post, I will show you how to use existing <a title="[Android] SQLite" href="http://icetea09.com/blog/2014/03/03/android-sqlite/">SQLite </a>database in Android app.

The basic idea for this case is instead of creating a new database, we copy the exist one to the application's data folder.

Very simple, right?

Now, we'll go straight to the demo for easier understanding.

First, create a Test database:

<img class="aligncenter" src="https://lh4.googleusercontent.com/-44dGfXhd2lY/Uq7R9Lywa1I/AAAAAAAAFbo/FvGNTgk57nw/w618-h177-no/tb+structure.PNG" alt="" />

Enter some dummy data:

<img class="aligncenter" src="https://lh6.googleusercontent.com/-YA10YcqTg8A/Uq7R9Hk_NzI/AAAAAAAAFbk/QenXNZflPzQ/w633-h236-no/init+data.PNG" alt="" />

The very first thing you need to do when you want to use <a title="[Android] SQLite" href="http://icetea09.com/blog/2014/03/03/android-sqlite/">SQLite </a>is create a sub class of SQLiteOpenHelper.

Create some constants for database name, table name, and the database path:
{% highlight java %}
public class DatabaseHelper extends SQLiteOpenHelper {

    public static String DB_PATH = "/data/data/ice.tea09.sqlitedemo/databases/";

    public static String DB_NAME = "Test.sqlite"; public static final int DB_VERSION = 1;

    public static final String TB_USER = "Users";

}
{% endhighlight %}
&nbsp;

Note that ice.tea09.splitedemo is your project namespace.

Implement constructor, and some methods of super class:
{% highlight java %}
private SQLiteDatabase myDB;
private Context context;

public DatabaseHelper(Context context) {
    super(context, DB_NAME, null, DB_VERSION);
    this.context = context;
}

@Override
public void onCreate(SQLiteDatabase db) {
    // TODO Auto-generated method stub

}

@Override
public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    // TODO Auto-generated method stub

}

@Override
public synchronized void close(){
    if(myDB!=null){
        myDB.close();
    }
    super.close();
}
{% endhighlight %}
&nbsp;

Method checkDatabase() allow you to check if the database exists on the phone or not:

&nbsp;
{% highlight java %}
/***
* Check if the database is exist on device or not
* @return
*/
private boolean checkDataBase() {
    SQLiteDatabase tempDB = null;
    try {
        String myPath = DB_PATH + DB_NAME;
        tempDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READWRITE);
    } catch (SQLiteException e) {
        Log.e("tle99 - check", e.getMessage());
    }
    if (tempDB != null)
        tempDB.close();
    return tempDB != null ? true : false;
}
{% endhighlight %}
Method copyDatabase() used to copy SQLite file in assets folder to data folder of application on the phone:
{% highlight java %}
/***
 * Copy database from source code assets to device
 * @throws IOException
 */
public void copyDataBase() throws IOException{
    try {
        InputStream myInput = context.getAssets().open(DB_NAME);
        String outputFileName = DB_PATH + DB_NAME;
        OutputStream myOutput = new FileOutputStream(outputFileName);

        byte[] buffer = new byte[1024];
        int length;

        while((length = myInput.read(buffer))>0){
            myOutput.write(buffer, 0, length);
        }

        myOutput.flush();
        myOutput.close();
        myInput.close();
    } catch (Exception e) {
        Log.e("tle99 - copyDatabase", e.getMessage());
    }

}
{% endhighlight %}
openDatabase() method:
{% highlight java %}
/***
 * Open database
 * @throws SQLException
 */
public void openDataBase() throws SQLException{
    String myPath = DB_PATH + DB_NAME;
    myDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READWRITE);
}
{% endhighlight %}
&nbsp;

Finally, createDatabase() method - which will be called every time we launch app. It will check if the database does not exist on the phone, It'll copy the database to data folder of application:
{% highlight java %}
/***
 * Check if the database doesn't exist on device, create new one
 * @throws IOException
 */
public void createDataBase() throws IOException {
    boolean dbExist = checkDataBase();        

    if (dbExist) {

    } else {
        this.getReadableDatabase();
        try {
            copyDataBase();
        } catch (IOException e) {
            Log.e("tle99 - create", e.getMessage());
        }
    }
}
{% endhighlight %}
&nbsp;

Finally, method that help you retrieve data from database:
{% highlight java %}
public List<String> getAllUsers(){
    List<String> listUsers = new ArrayList<String>();
    SQLiteDatabase db = this.getWritableDatabase();
    Cursor c;

    try {
        c = db.rawQuery("SELECT * FROM " + TB_USER , null);
        if(c == null) return null;

        String name;
        c.moveToFirst();
        do {            
            name = c.getString(1);            
            listUsers.add(name);
        } while (c.moveToNext()); 
        c.close();
    } catch (Exception e) {
        Log.e("tle99", e.getMessage());
    }

    db.close();        

    return listUsers;
}
{% endhighlight %}
&nbsp;

The way we using DatabaseHelper in MainActivity:
{% highlight java %}
public class MainActivity extends Activity {

    DatabaseHelper dbHeplper;
    ListView lvUsers;
    ListAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dbHeplper = new DatabaseHelper(getApplicationContext());
        try {
            dbHeplper.createDataBase();
        } catch (IOException e) {
            e.printStackTrace();
        }

        lvUsers = (ListView)findViewById(id.lvUsers);
         List<String> listUsers = dbHeplper.getAllUsers();

        if(listUsers != null){
            adapter = new ArrayAdapter<String>(getApplicationContext(),
                    android.R.layout.simple_list_item_1, android.R.id.text1,
                    listUsers);
            lvUsers.setAdapter(adapter);
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

}
{% endhighlight %}
&nbsp;

Demo result:

<img class="aligncenter" src="https://lh3.googleusercontent.com/-QvuRlyTfXv8/Uq7SYqDZ3BI/AAAAAAAAFbw/ZFlmUYC1VmI/w480-h688-no/demo+result.PNG" alt="" />
<h2>Source code:</h2>

<br/>
<a href="https://drive.google.com/file/d/0BzvV1wN-WHWwWG5LQm01ZnNJTzQ/edit?usp=sharing">https://drive.google.com/file/d/0BzvV1wN-WHWwWG5LQm01ZnNJTzQ/edit?usp=sharing</a>

