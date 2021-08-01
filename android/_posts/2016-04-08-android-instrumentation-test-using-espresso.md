---
layout: post
title: Android Instrumentation Test Using Espresso
date: 2016-04-08 10:54
author: Trinh Le
avatar: trinhle.png
comments: true

tags: [Espresso]
image: assets/images/android/espresso.jpg
---

<h2>1. Introduction</h2>
<h3>1.1. What is instrumentation test?</h3>
To me, instrumentation test is simply integration test. Instrumentation test run on Android device or emulator and can access to <a target="_blank" href="http://developer.android.com/reference/android/app/Instrumentation.html">Instrumentation</a> information like Context, Activity,... of the app under test.

<h3>1.2. What is Espresso?</h3>
Espresso is an Android testing framework using instrumentation-based test API and and works with the <a target="_blank" href="http://developer.android.com/reference/android/support/test/runner/AndroidJUnitRunner.html">AndroidJUnitRunner</a> test runner.
Espresso is used to simulate user interactions within the test app and it runs really really fast!!!

<h2>2. Set up Espresso</h2>
<h3>2.1. Added Espresso into build.gradle dependencies</h3>
Add the following lines of code into `dependencies` part in your app’s `build.gradle` file:

{% highlight gradle %}
androidTestCompile 'com.android.support.test.espresso:espresso-core:2.2.2'
androidTestCompile 'com.android.support.test:runner:0.5'
{% endhighlight %}

<h3>2.2. Update the instrumentation runner</h3>
Inside `defaultConfig` section, update the `testInstrumentationRunner` like below:

{% highlight gradle %}
defaultConfig {
      testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
}
{% endhighlight %}

<h3>2.3. Disable animation on test device/emulator</h3>
To help the test run stably, you should disable all the animation on target device/emulator.
Go to <b>Settings</b> → <b>Developer Options</b>, then disable all following animations:

<ul>
    <li>Window animation scale</li>
    <li>Transition animation scale</li>
    <li>Animator duration scale</li>
</ul>

<h2>3. Espresso basics</h2>
<h3>3.1. Finding a View using View Matcher</h3>
<a target="_blank" href="http://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html">ViewMatcher</a> is a collection of conditions which you can use to identify a specific View in the view hierarchy.

Some common <b>ViewMatcher</b>:
<ul>
    <li><b>withText(String text)</b>: Returns a matcher that matches TextView based on its text property value.</li>
    <li><b>withId(int id)</b>: Returns a matcher that matches TextView based on its id property value.</li>    
</ul>

You can easily locate a View in view hierarchy by using `onView()` with one or many <b>ViewMatcher</b>:
{% highlight java %}
onView(withId(R.id.tv_hello))
//Find the View which has id as tv_hello
{% endhighlight %}
Or
{% highlight java %}
onView(allOf(withId(R.id.tv_hello), withText(“Goodbye”))
//Find the View which has id as tv_hello AND have text as Goodbye
{% endhighlight %}

<b>BIG NOTE:</b>

You must make sure that there’s <b>ONLY</b> one View in the hierarchy can match your input <b>ViewMatcher</b>. If there’s more than one, you’ll receive an error:
<pre>
Java.lang.RuntimeException:
com.google.android.apps.common.testing.ui.espresso.AmbiguousViewMatcherException:
This matcher matches multiple views in the hierarchy: (withId: is <111111111>)
</pre>

<h3>3.2. Perform an action using View Action</h3>
After found the wanted View, you may want to perform some user interaction on it (like click, double click, press back, or type text,...). In order to do that, you will need the help of <a target="_blank" href="http://developer.android.com/reference/android/support/test/espresso/ViewAction.html">ViewAction</a>.

Some common ViewAction:
<ul>
    <li><b>click()</b>: Click on a specific View</li>
    <li><b>typeText(String text)</b>: Type a specific text into an EditText</li>
    <li><b>scrollTo()</b>: Scroll to a specific View to make sure it is visible before performing any other actions (like click())</li>
</ul>

Example:
{% highlight java %}
onView(withId(R.id.btn_hello)).perform(scrollTo(), click());
//If the btn_hello is not visible on screen, scroll to it, then perform a click!
{% endhighlight %}

<h3>3.3. Assert the View / UI by View Assertion</h3>
<a target="_blank" href="http://developer.android.com/reference/android/support/test/espresso/ViewAssertion.html">ViewAssertions</a> takes responsibility for asserting the View in instrumentation test.
You can pass as many <b>ViewAssertions</b> as you want to check if the UI displays properly.

Some common ViewAssertions:
<ul>
    <li><b>matches(Matcher)</b>: matches one or many conditions (Matcher)</li>
    <li><b>doesNotExist()</b>: check if a View is not exist in the view hierarchy</li>
</ul>

Example:
{% highlight java %}
onView(withId(R.id.btn_hello)).check(matches(isDisplayed()));
//Check if the button btn_hello is displayed on the screen.
{% endhighlight %}

<h2>4. Example</h2>
In this part, I’ll show you a very simple sample app with some basic instrumentation test using Espresso.

The demo app contains a simple Login form with validation. We’ll write test to make sure it meets all the requirements below:
<ul>
    <li>User should be able to login if both username and password provided.</li>
    <li>User should see error message when username or password missing.</li>
</ul>

The complete test class for `MainActivity`:
{% highlight java %}
@RunWith(AndroidJUnit4.class)
public class MainActivityTest {

    @Rule
    ActivityTestRule<MainActivity> activityRule = new ActivityTestRule<>(MainActivity.class);

    @Test
    public void userShouldBeAbleToLoginIfUsernameAndPasswordProvided() {
        //Type the username
        onView(withId(R.id.et_username)).perform(typeText("trinh.le"));
        //Type the password
        onView(withId(R.id.et_password)).perform(typeText("dummypassword"));
        //Click on Login button, we can use withId(R.id.btn_login) instead of withText("Login")
        onView(withText("Login")).perform(click());
        //Check if the TextView message display the proper text
        onView(allOf(withId(R.id.tv_message), withText("Login successfully!"))).check(matches(isDisplayed()));
    }

    @Test
    public void userShouldSeeErrorMessageIfUsernameMissing() {
        //Type the password
        onView(withId(R.id.et_password)).perform(typeText("dummypassowrd"));
        //Click on Login button, we can use withId(R.id.btn_login) instead of withText("Login")
        onView(withText("Login")).perform(click());
        //Check if the TextView message display the proper text
        onView(allOf(withId(R.id.tv_message), withText("You must enter both username and password!"))).check(matches(isDisplayed()));
    }

    @Test
    public void userShouldSeeErrorMessageIfPasswordMissing() {
        //Type the username
        onView(withId(R.id.et_username)).perform(typeText("trinh.le"));
        //Click on Login button, we can use withId(R.id.btn_login) instead of withText("Login")
        onView(withText("Login")).perform(click());
        //Check if the TextView message display the proper text
        onView(allOf(withId(R.id.tv_message), withText("You must enter both username and password!"))).check(matches(isDisplayed()));
    }

}
{% endhighlight %}

If you notice, we have this line of code:

{% highlight java %}
@Rule
ActivityTestRule<MainActivity> activityRule = new ActivityTestRule<>(MainActivity.class);
{% endhighlight %}

So, This rule provides functional testing of a single activity. The activity under test will be launched before each test and terminated after the test complete.

The full source code of this demo can be found on Github - <a target="_blank" href="https://github.com/trinhlbk1991/DemoAndroidEspresso">DemoAndroidEspresso</a>.

<h2>5. Cheat sheets</h2>
For easier to remember, you can refer to the Espresso cheat sheet below. Goodluck!
<img class="aligncenter" src="https://google.github.io/android-testing-support-library/assets/espresso-cheat-sheet-2.1.0.png">
