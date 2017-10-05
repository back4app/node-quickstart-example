# Using Back4App Parse-Server SDK with NodeJS

In this tutorial we'll learn how use Back4App Parse-Server SDK in NodeJS [Parse-Server JavaScript Guide](http://docs.parseplatform.org/js/guide/).

## Gains in using this approach

1. record time
2. low technical knowledge
3. Parse-Server SDK API sugar

## Prerequisites

> **To complete this tutorial the following is required in your machine:**
> * NodeJS v7.10.1 or later [NodeJS](https://nodejs.org/)
> * NPM
{: .blockquote-warn}

## Hands-on

### Step 1 - Initializing our App

First we'll create a new folder called node-sdk-b4a, enter inside this folder and create our package.json and finally install Parse package.

$ npm init -y
$ npm install --sa
### Step 1 - Initializing our App

First we'll create a new folder called node-sdk-b4a, enter inside this folder and create our package.json and finally install Parse package.

$ npm init -y
$ npm install --save parse

### Step 2 - Creating an entry point for our application.

$ touch index.js

### Step 3 - Create a new Application in Back4App (See instructions here)

At this point you can already store your app_id, javascript_id and url which we will use soon...

To see this information go to [Back4App Dashboard](https://dashboard.back4app.com/apps) and click in features inside your app's card, and then click in Server inside Core Settings card. All the data needed to start the development of your application is there.

### Step 4 - Writing some code.

Ok, now that we know that we have the requirements installed in our machine and Back4App App created, lets start our application.

<!-- This part refer to code -->
#### First, import the parse package inside your app:

<sub>`index.js`</sub>
~~~node
const Parse = require('parse/node');
~~~

#### Configure the Parse-Server informing your App Id and Javascript Key (see Step 3).
<sub>`index.js`</sub>
~~~node
const APP_ID = 'PUTS_YOUR_APP_ID_HERE';
const JAVASCRIPT_KEY = "PUTS_YOUR_JAVASCRIPT_KEY_HERE";
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
~~~

#### Inform the Back4App Parse-Server URL.
~~~node
Parse.serverURL = 'https://parseapi.back4app.com/'
~~~

#### Create an Object [Parse-Server Objects](http://docs.parseplatform.org/js/guide/#objects)
Storing data on Parse is built around Parse.Object. Each Parse.Object contains key-value pairs of JSON-compatible data. This data is schemaless, which means that you don’t need to specify ahead of time what keys exist on each Parse.Object. You simply set whatever key-value pairs you want, and our backend will store it.

Based on this we will extend Parse.Object to instantiate our object to be recorded. Let's create here a simple crud of events.

~~~node
const MyEvents = Parse.Object.extend("MyEvents");
const myEvents = new MyEvents();
~~~

And now we have available all the methods and properties available in Parse.Object to do what our application needs without further ado.

Let's start by recording a simple JavaScript object literal.

~~~node
const RockEvent = {
  title: 'Rock'n Rio',
  description: 'Rock in Rio is a recurring music festival originating in Rio de Janeiro.'
};


~~~



![Adding Maven repository](/docs/assets/imgs/androidQS_addmaven.png){:class="img-fluid my-3 rounded shadowed"}

To install the SDK, you need to add the following lines **inside** `dependencies{}` block. Remember to update the version of Parse SDK for Android to the latest one. You can find it at [Parse Community GitHub repository](https://github.com/parse-community/Parse-SDK-Android/releases/latest).

<sub>[`build.gradle`](https://github.com/back4app/android-quickstart-example/blob/master/QuickstartExampleApp/app/build.gradle#L31)</sub>
~~~ java
compile 'com.parse:parse-android:1.16.2' //update version to the latest one
~~~

Sync your `build.gradle` and we are ready to go.

![Synchronizing build.gradle file](/docs/assets/imgs/androidQS_syncgradle.png){:class="img-fluid my-3 rounded shadowed"}

> **Troubleshooting:**
>
> If you got an error message related to `support` library (as in the image below):
> <div markdown="block">
>   ![Error with support repository](/docs/assets/imgs/androidQS_repoerror.png){:class="img-fluid my-3 rounded shadowed"}
> </div>
> You can solve it by adding the repositories `maven {url "https://maven.google.com"}` and `jcenter()`.
> At the end your `repositories{}` section should appear as follows:
>
>
> <sub>[`build.gradle`](https://github.com/back4app/android-quickstart-example/blob/master/QuickstartExampleApp/app/build.gradle#L34-L40)</sub>
>~~~java
  repositories {
      mavenCentral()
      jcenter()
      maven {
          url "https://maven.google.com"
      }
  }
> ~~~
>
>
> Click on *Try Again* to sync your `build.gradle` and we are ready to go.
> <div markdown="block">
>   ![Synchronizing build.gradle file again](/docs/assets/imgs/androidQS_gradletryagain.png){:class="img-fluid my-3 rounded shadowed"}
> </div>
{: .blockquote-warn}

> To learn more about adding support libraries, see the [Android Studio's Support Library Setup page](https://developer.android.com/topic/libraries/support-library/setup.html).
{: .blockquote-tip}



### Step 2 - Configuring App Permissions and Libs {#Quickstart-libs}


#### Granting Permissions
Back4app is a [Backend as a Service (BaaS)](https://blog.back4app.com/2016/01/11/what-is-a-backend-as-a-service) built over an Parse-Server open source framework.

It provides you with cloud-based application development platform. **You must grant permission to work online for your Android project**.

To do this, add the following code snippet to your `AndroidManifest.xml` file:


<sub>`AndroidManifest.xml`</sub>
~~~xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.INTERNET"/>
~~~

You should have coding similar to following:

![AndroidManifest.xml file](/docs/assets/imgs/androidQS_manifest.png){:class="img-fluid my-3 rounded shadowed"}

#### Adding Libs
To call all Parse provided functions you need to import libs to your code.
Choose the activity that will implement the parse function and import the following libs:

<sub>`.java`</sub>
~~~java
import com.parse.Parse;
import com.parse.ParseObject;
import com.parse.ParseUser;
~~~


In this example, we choose to import inside `MainActivity`. At the end the coding should appear similar to the following example:

![MainActivity file](/docs/assets/imgs/androidQS_importlibs.png){:class="img-fluid my-3 rounded shadowed"}

### Step 3 - Connecting your Parse App {#Quickstart-connectparse}

If you already have a parse app go to [Initialize your Parse app](#Quickstart-initparse).
{: .blockquote-note}


{% include fragments/parse-app.md %}



### Next Steps {#Quickstart-nextsteps}

At this point, you have a good basic understanding of how to get started with Android apps and explore [Parse-Server core features](https://www.back4app.com/product/parse-server) and [Back4App add-ons](https://www.back4app.com/product/addons).

If you are not sure what you want to do with your app, see the next tutorial in this series to explore Back4App functionalities for Android apps. It covers basic user registration, push notifications, live queries and other features.

If you want to explore more options, take a look at our [Documentation main page]({{site.baseurl}}/docs) to find other tutorials. One of the most popular options is the [Command Line Interface (CLI)]({{site.baseurl}}/docs) that allows you to create new Parse apps, deploy Cloud Code to an app, view all releases, and perform additional actions.

Feel free to contact us through our [website chat](http://back4app.com/) if you have any questions.
