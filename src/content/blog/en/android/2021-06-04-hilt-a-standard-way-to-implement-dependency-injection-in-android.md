---
title: "Hilt — A Standard Way to Implement Dependency Injection in Android"
date: 2021-06-04
categories: ["android"]
tags: ["Hilt","Dagger","Dependency Injection"]
summary: "Discover Hilt, a simplified dependency injection library built on top of Dagger for Android development."
toc: true
comments: true
---

![Photo by [Sigmund](https://unsplash.com/@sigmund?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/10126/0*Fn3ZIjAak0Vjuv4q)

## Why using Hilt?

When it comes to [Dependencies Injection](https://en.wikipedia.org/wiki/Dependency_injection) in Android development, we don’t have many choices:

* Build the DI from scratch manually. Personally, this is not my f̶i̶r̶s̶t̶ choice🤷‍♂️. But if you want to know how to build it, check it out [here](https://developer.android.com/training/dependency-injection/manual).

* Use a 3rd party library like [Dagger](https://dagger.dev/) or [Koin](https://insert-koin.io/)…

Despite Dagger's power of auto-generating code for DI, the learning curve is still a big problem for new learners.

Understand that pain point; Hilt was built on top of Dagger to simplify the configuration (which is quite much and complex) and let the developers focus on declare dependencies definition and usages only.

## How to use Hilt in your Android project?

### Setup

Add this Gradle dependency into the project’s root build.gradle

 ```gradle
 buildscript {
    ext.hilt_version = "2.35"

    dependencies {
        classpath "com.google.dagger:hilt-android-gradle-plugin:$hilt_version"
    }
}
```

Then, include those plugins and dependencies into the app’s build.gradle

 ```gradle
plugins {
    id "org.jetbrains.kotlin.kapt"
    id "dagger.hilt.android.plugin"
}

dependencies {
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-android-compiler:$hilt_version"
}
```

Lastly, enable Java 8:

 ```gradle
 android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

Sync the project, and you’re ready to get your hands dirty with Hilt! 👻

<img src="https://media.giphy.com/media/349qKnoIBHK1i/giphy.gif">

### Hilt Application

Hilt Application is mandatory — achieved by adding the@HiltAndroidApp annotation into your Application class.

    @HiltAndroidApp
    class HiltSampleApp : Application() {
        ...
    }

@HiltAndroidApp — this god annotation will trigger the essential code generation.

“But, what will be generated?” you wonder… 🤔

* Pre-define Hilt Component classes (like SingletonComponent , ActivityComponent , FragmentComponent ,…) that will be automatically integrated into the various lifecycles of an Android application.

* A singleton component attaches to the application lifecycle and hosts all the singleton scoped dependencies. This component also provides dependencies to all other sub-components.

```
public final class DaggerHiltSampleApp_HiltComponents_SingletonC extends HiltSampleApp_HiltComponents.SingletonC {
  private final ApplicationContextModule applicationContextModule;

  private DaggerHiltSampleApp_HiltComponents_SingletonC(
      ApplicationContextModule applicationContextModuleParam) {
    this.applicationContextModule = applicationContextModuleParam;
  }
  ......
}
```

* Finally, a custom Application extends from your Application class. This will be the container for all application-level dependencies.

```
public abstract class Hilt_HiltSampleApp extends Application implements GeneratedComponentManagerHolder {
  private final ApplicationComponentManager componentManager = new ApplicationComponentManager(new ComponentSupplier() {
    @Override
    public Object get() {
      return DaggerHiltSampleApp_HiltComponents_SingletonC.builder()
          .applicationContextModule(new ApplicationContextModule(Hilt_HiltSampleApp.this))
          .build();
    }
  });

  @Override
  public final ApplicationComponentManager componentManager() {
    return componentManager;
  }

  @Override
  public final Object generatedComponent() {
    return this.componentManager().generatedComponent();
  }

  @CallSuper
  @Override
  public void onCreate() {
    // This is a known unsafe cast, but is safe in the only correct use case:
    // HiltSampleApp extends Hilt_HiltSampleApp
    ((HiltSampleApp_GeneratedInjector) generatedComponent()).injectHiltSampleApp(UnsafeCasts.<HiltSampleApp>unsafeCast(this));
    super.onCreate();
  }
}
```

Within your Application class, you can access the dependencies after super.onCreate(); got called! 🎉

### Hilt Components

As I mentioned above, Hilt automatically generates some pre-defined Component classes. Those out-of-the-box components should cover most use cases when developing your Android app. We don’t need to create a Component manually anymore.

**Pre-defined components**

Checking out the auto-generated code (in HiltSampleApp_HiltComponents), you’ll see that for each Android class, Hilt’ll generate a corresponding Component :

| Hilt component            | Injector for                              |
|---------------------------|-------------------------------------------|
| SingletonComponent        | Application                               |
| ServiceComponent          | Service                                   |
| ActivityComponent         | Activity                                  |
| ViewModelComponent        | ViewModel                                 |
| FragmentComponent         | Fragment                                  |
| ViewComponent             | View                                      |
| ViewWithFragmentComponent | View annotated with @WithFragmentBindings |

**Component lifecycle**

Understanding the lifecycle of Hilt Component is important because it allows you to know when to access the injected fields.

Generally, the Component lifecycle bonds with the Android class instance’s lifecycle.

| Generated component       | Created at             | Destroyed at            |
|---------------------------|------------------------|-------------------------|
| SingletonComponent        | Application#onCreate() | Application#onDestroy() |
| ActivityRetainedComponent | Activity#onCreate()    | Activity#onDestroy()    |
| ViewModelComponent        | ViewModel created      | ViewModel destroyed     |
| ActivityComponent         | Activity#onCreate()    | Activity#onDestroy()    |
| FragmentComponent         | Fragment#onAttach()    | Fragment#onDestroy()    |
| ViewComponent             | View#super()           | View destroyed          |
| ViewWithFragmentComponent | View#super()           | View destroyed          |
| ServiceComponent          | Service#onCreate()     | Service#onDestroy()     |

**Component hierarchy**

The diagram below shows the hierarchy of Hilt Components .

Basically, the binding in a Component can have dependencies on binding within the same Component or its ancestors.

![Photo on [https://developer.android.com/](https://developer.android.com/)](https://cdn-images-1.medium.com/max/2000/1*YyZptY8hCbWOtRHLHBBD9g.png)

### Declare dependencies in Hilt Modules

Similar to Dagger Module , Hilt Module is where you declare all the needed dependencies for your application.

There’s a slight difference with Hilt that you have to specify which Component that the Module will be installed in using the @InstallIn annotation.

For example, I have the ApiModule that provides all the dependencies related to API in my application (AppApi for specific). By declaring @InstallIn(SingletonComponent::class) , all the dependencies declared inside ApiModule are available globally within the application.

```
@Module
@InstallIn(SingletonComponent::class)
abstract class ApiModule {
    @Binds
    abstract fun appApi(impl: AppApiImpl): AppApi
}
```

I also have the UseCaseModule which provides all the use cases for my application. This time, I want all the use case dependencies should be available to all the Activities . So I make the UseCaseModule to be installed in the ActivityComponent instead.

```
@Module
@InstallIn(ActivityComponent::class)
abstract class UseCaseModule {
    @Binds
    abstract fun getUserProfileUseCase(impl: GetUserProfileUseCaseImpl): GetUserProfileUseCase
}

interface GetUserProfileUseCase {
    fun execute(): UserProfile?
}

class GetUserProfileUseCaseImpl @Inject constructor(
    private val appApi: AppApi
) : GetUserProfileUseCase {
    override fun execute(): UserProfile? {
        return appApi.getUserProfile()
    }
}
```

If you noticed, the GetUserProfileUseCaseImpl depends on AppApi (which is located in the SingletonComponent). Thanks to the component hierarchy, Hilt can provide those dependencies easily.

There are also 2 ways to declare dependencies in a Module like Dagger. You can use either @Binds or @Provides .

### Inject dependencies into Android classes

Now, you have done setting up theComponent and Module . It’s time to get those dependencies injected!

And it’ll be easier than ever with 2 simple steps:

* Put @AndroidEntryPoint annotation on the top of the Android class

* @Inject the properties like using Dagger

```
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    @Inject
    lateinit var getUserProfileUseCase: GetUserProfileUseCase

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val userProfile = getUserProfileUseCase.execute()

        userProfile?.let {
            findViewById<TextView>(R.id.tv_user_name).text = "Hello ${it.name}"
        }
    }

}
```

Hilt currently supports the following Android classes, which can cover most of the cases:

* Application (by using @HiltAndroidApp)

* ViewModel (by using @HiltViewModel)

* Activity

* Fragment

* View

* Service

* BroadcastReceiver

### Inject dependencies into non-Android classes

Even though Hilt supports most of the Android classes, at some point, you’ll need to inject dependencies into non-supported Android classes.

For instance, Hilt doesn’t support inject dependencies into Worker directly. To do so, you have to create a custom @EntryPoint .

In that custom Entry Point , you specify the component and dependencies that can be accessed:

```
@EntryPoint
@InstallIn(SingletonComponent::class)
interface WorkerEntryPoint {
    fun appApi(): AppApi
}
```

Then, access the needed dependencies via the EntryPointAccessors :

```
class FetchUserProfileWorker(context: Context, workerParams: WorkerParameters) :
    Worker(context, workerParams) {

    override fun doWork(): Result {
        val entryPoint =
            EntryPointAccessors.fromApplication(applicationContext, WorkerEntryPoint::class.java)
        val appApi = entryPoint.appApi()
        return Result.success()
    }
}
```

## Compare Hilt and Dagger

Like I mentioned from the start of this post, Hilt’s mission is to provide a standard way to apply Dagger into your application easier.

Let’s revise to see which steps from Dagger got trimmed in Hilt:

* Component class

* Application scoped Component instancing in Application class

* Implementing HasAndroidInjector if needed

* Injection trigger (AndroidInjection.inject(this) or Component.inject(this)

* Activity/Service/FragmentBindingModule declaration

In addition to that, Hilt also provides :

* Pre-defined Scope to use with pre-defined Component

* Pre-defined bindings for Android classes like Application , Activity

* Pre-defined Qualifier like @ApplicationContext and @ActivityContext

More than that, you can use both Dagger and Hilt in the same codebase. So the migration can happen gradually.

Thanks for reading and happy coding! 💻