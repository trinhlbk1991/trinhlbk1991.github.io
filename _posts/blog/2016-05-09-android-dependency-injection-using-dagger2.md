---
layout: post
title: Android Dependency Injection using Dagger2
date: 2016-05-09 14:57
author: Trinh Le
avatar: trinhle.png
comments: true
categories: [blog]
tags: [Android, Java, Dagger2, Design Pattern]
image: /images/posts/espresso.png
---

<h2>1 - What is Dependency Injection?</h2>
Dependency Injection is a design pattern which help us to reduce the coupling between modules (classes). Hence, that makes our modules reusable, interchangeable and easy to test.

For example, in our Android app (more specifically, in <b>LoginActivity</b>), we must hit the authentication endpoint via <b>AuthenticationApi</b> to verify if user information is correct.
<h3>1.1 - Not using DI</h3>

This is the <b>AuthenticationApi</b> class, which will contact the server and verify input credentials:
{% highlight java %}
public interface IAuthenticationApi {
    
    Future<Authentication> authentication(String username, String password);

}

public class AuthenticationApi implements IAuthenticationApi{
    
    @Override
    public Future<Authentication> authentication(String username, String password) {
        // Do a lot of stuff here like hitting server with provided auth info
        return Observable.just(true);
    }

}
{% endhighlight %}

Then, inside <b>LoginActivity</b>, we instantiate new <b>AuthenticationApi</b> in <b>onCreate()</b> method.

{% highlight java %}
public class LoginActivity extends Activity implements OnClickListener{

    private AuthenticationApi mAuthenticationApi;

    @Override
    public void onCreate() {
        super.onCreate();
        //Init view and do other stuffs
        mAuthenticationApi = new AuthenticationApi();
    }

    public void onClick(View view) {
        mAuthenticationApi.authentication(mEtUsername.getText(), mPassword.gettext());
    }

}
{% endhighlight %}

This cause a strong couple between <b>LoginActivity</b> and <b>AuthenticationApi</b> which is not really good.
Like:
<ul>
    <li>What if we want to add a Logger in <b>IAuthenticationApi</b>  when running debug but not release version?</li>
    <li>What if we want <b>IAuthenticationApi</b> return mock data when running test?</li>
    <li>What if in demo version, we want <b>IAuthenticationApi</b> retrieves data from local database instead of server?</li>
</ul>

This is where <b>Dependency Injection</b> jump into the picture!

<h3>1.2 - Using DI</h3>

In <b>Dependency Injection</b> pattern, we usually have a <b>Factory</b> class which provides all the dependencies for the module/application.

{% highlight java %}
public class ApiFactory {

    public IAuthenticationApi getAuthenticationApi() {
        return new AuthenticationApi();
    }

}
{% endhighlight %}

Then, inside Application class, we create a new instance of <b>ApiFactory</b> and expose public method to refer to. By this way, we can access the <b>ApiFactory</b> throughough entire application:

{% highlight java %}
public class MyApplication extends Application {
    
    private ApiFactory mApiFactory;

    public void setApiFactory(ApiFactory apiFactory) {
        mApiFactory = apiFactory;
    }


    public ApiFactory getApiFactory() {
        return mApiFactory;
    }

}
{% endhighlight %}

Inside <b>LoginActivity</b>, we can easily refer to <b>ApiFactory</b> to get the <b>IAuthenticationApi</b> object:

{% highlight java %}
public class LoginActivity extends Activity implements OnClickListener{

    private IAuthenticationApi mAuthenticationApi;

    @Override
    public void onCreate() {
        super.onCreate();
        //Init view and do other stuffs
        mAuthenticationApi = ((MyApplication) getApplication()).getApiFactory().getAuthenticationApi();
    }

    @Override
    public void onClick(View view) {
        mAuthenticationApi.authentication(mEtUsername.getText(), mPassword.gettext());
    }

}
{% endhighlight %}

As you can see, by using DI, now the <b>LoginActivity</b> does not depend on the <b>AuthenticationApi</b> anymore! Basically, <b>LoginActivity</b> doesn't know the concrete implementation of <b>IAuthenticationApi</b>, the type of <b>IAuthenticationApi</b> was decided by the <b>ApiFactory</b>.

By having multiple <b>ApiFactory</b> based on build type, you can easily decide the concrete implementation of <b>IAuthenticationApi</b> in each case.

<h3>1.3 - Conclusion</h3>
After 2 examples above, DI is quite simple, right?!
But if DI is simple, why do we need a framework?

Basically, the technique of DI is simple. But if your project is quite big, you have so many modules depend on each others, the dependencies will become more complicated. And it also produce a lot of boilerplate code which is not so beautiful!

<h2>2 - Dagger2 Introduction</h2>

<h3>2.1 - What is Dagger2?</h3>
Dagger2 is a fully static, compile-time dependency injection framework for both Java and Android. 
It is an adaptation of an earlier version created by Square and now maintained by Google.

<h3>2.2 - Why using Dagger2?</h3>

Traceability
<ul>
    <li>Easy to navigate around the entire project using <b>Find Usages…</b> and <b>Open Declaration</b></li>
    <li>Trace through the code that clear and well structured</li>
</ul>

Clarify API
<ul>
    <li>Simpler @Module declarations</li>
    <li>Injections will fail at runtime if not correctly configured, which helps you find mistakes faster</li>
</ul>
Performance
<ul>
    <li>No performance hit because injections are not performed using relfection like other dependency injection frameworks</li>
</ul>

<h2>3 - How to use Dagger2?</h2>

<h3>3.1 - Set Up</h3>

Add following plugin and dependencies into app scope <b>build.gradle</b> file:

{% highlight java %}
apply plugin: 'com.neenbedankt.android-apt'
 
buildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath 'com.neenbedankt.gradle.plugins:android-apt:1.4'
  }
}
 
android {
  ...
}
 
dependencies {
  apt 'com.google.dagger:dagger-compiler:2.0'
  compile 'com.google.dagger:dagger:2.0'
  provided 'javax.annotation:jsr250-api:1.0' 
  
  ...
}
{% endhighlight %}

<h3>3.2 - Define Module class</h3>

Module classes is where you define all the dependencies provider for your application.
You can have many Module classes in your project.

For example, below is the Android Module class which provides all the main Android objects so you can easily inject later:

{% highlight java %}
@Module
public class AndroidModule {

    @Provides
    @Singleton
    Context provideAppContext() {
        return DemoDagger2Application.getInstance().getApplicationContext();
    }

    @Provides
    SharedPreferences provideDefaultSharedPreferences(final Context context) {
        return PreferenceManager.getDefaultSharedPreferences(context);
    }

    @Provides
    AccountManager provideAccountManager(final Context context) {
        return AccountManager.get(context);
    }

    @Provides
    NotificationManager provideNotificationManager(final Context context) {
        return (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
    }

}
{% endhighlight %}

Or another example below - ApiModule, which provides all Api related object for the application:

{% highlight java %}
@Module
public class ApiModule {

    @Provides
    @Singleton
    AuthenticationApi provideAuthenticationApi() {
        return new AuthenticationApi();
    }

}
{% endhighlight %}

When you declare a <b>@Singleton</b> annotation, Dagger2 will manage all the concurrency and make sure return the same object everytime for you. You don't need to care about that anymore! Cool huh?

<h3>3.3 - Declare Components</h3>

Component interfaces is where you declare the association between Module and the Injection Target. In other words, the Component interfaces told Dagger2 that dependencies in specific Module will be used in listed classes.

{% highlight java %}
@Singleton
@Component(modules = {AndroidModule.class, ApiModule.class})
public interface MyComponent {
    void inject(LoginActivity activity);

     public final static class Initializer { 
        public static MyComponent init(boolean mockMode) { 
            return DaggerMyComponent.builder()
                .androidModule(new AndroidModule())
                .apiModule(new ApiModule())
                .build(); 
        } 
    } 
}
{% endhighlight %}

By the way, in case you didn’t notice, the DaggerMyComponent was auto generated by Dagger2 after you build the project. And all the method like <b>androidModule()</b> was also auto generated based on your Module class name.

<h3>3.4 - Instantiate the Component in Application class</h3>

Next, inside your application class, instantiate the Component you just declare above:

{% highlight java %}
public class MyApplication extends Application {
    
    private static MyApplication mInstance;
    private MyComponent mComponent;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
        mComponent = mComponent = MyComponent.Initializer.init(true);   
    }

    public static MyApplication getInstance() {
        return mInstance;
    }

    public MyComponent getComponent() {
        return mComponent;
    }

}
{% endhighlight %}

<h3>3.5 - Injection</h3>

Now you can inject the dependency that you need inside any classes you declared in the Component by simply using the annotation @Inject. And before using any Injected instance, remember to call the inject() method of Component:

{% highlight java %}
DemoDagger2Application.getInstance().getComponent().inject(this);
{% endhighlight %}

Sample code:
{% highlight java %}
public class LoginActivity extends Activity implements OnClickListener{

    @Inject
    protected AuthenticationApi mAuthenticationApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        MyApplication.getInstance().getComponent().inject(this);

    }

    @Override
    public void onClick(View view) {
        mAuthenticationApi.authentication(mEtUsername.getText(), mPassword.gettext());
    }

}
{% endhighlight %}

<h2>4 - Instrumentation Testing with Dagger, Mockito, and Espresso</h2>
In instrumentation test, we usually mock the server response to make sure the test suite can cover every cases from succeed to fail.

In this part of the post, I'll show you how to write instrumentation tests with Dagger, Mockito and Espresso.

Beside the official <b>ApiModule</b> which will be applied for release build, we also need a <b>DebugApiModule</b> for the debug build. This module will decide to return the real or mock object base on the mock mode:

{% highlight java %}
@Module
public class DebugApiModule {

    private boolean mIsMockMode;

    public DebugApiModule(boolean isMockMode) {
        mIsMockMode = isMockMode;
    }

    @Provides
    @Singleton
    AuthenticationApi provideAuthenticationApi() {
        if(mIsMockMode) {
            return Mockito.mock(AuthenticationApi.class);
        } else {
            return new AuthenticationApi();
        }
    }

}
{% endhighlight %}

Under the <b>debug</b> code base directory, we create another <b>MyComponent</b> class:

{% highlight java %}
@Singleton
@Component(modules = {AndroidModule.class, DebugApiModule.class})
public interface MyComponent {
     void inject(LoginActivity activity);

     public final static class Initializer { 
        public static MyComponent init(boolean mockMode) { 
            return DaggerMyComponent.builder()
                .androidModule(new AndroidModule())
                .debugApiModule(new DebugApiModule(mockMode))
                .build(); 
        } 
    }
}
{% endhighlight %}

You can notice that, instead of using <b>ApiModule</b> we will you <b>DebugApiModule</b> this time.

Then, we modify the Application class to expose a method to set the mock mode:

{% highlight java %}
public class MyApplication extends Application {
    
    private static MyApplication mInstance;
    private MyComponent mComponent;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
        mComponent = MyComponent.Initializer.init(true);
    }

    public static MyApplication getInstance() {
        return mInstance;
    }

    public MyComponent getComponent() {
        return mComponent;
    }

    public void setMockMode(boolean useMock) { 
        mComponent = MyComponent.Initializer.init(false);
    }

}
{% endhighlight %}

Now, in test class (below is the code of <b>BaseActivityTest</b> which will be extended later), we can easily switching between mock and real mode:

{% highlight java %}
public class BaseActivityTest { 
    
    @Inject
    AuthenticationApi mMockAuthenticationApi;

    @Override 
    protected void setUp() throws Exception { 
        super.setUp(); 
        MyApplication app = (MyApplication) getInstrumentation().getTargetContext().getApplicationContext(); 
        app.setMockMode(true); 
        app.getComponent().inject(this);
    } 

    @Override 
    protected void tearDown() throws Exception { 
        App.getInstance().setMockMode(false); 
    }

}
{% endhighlight %}

<h2>5 - Sample Code</h2>

So, that's all for Dagger2 in this post. 

You can find the full sample source code on my Github page.

In later posts, I'll cover some advance topics of Dagger2.

Hope you enjoy it! :D
