---
layout: nodejs
area: "NodeJS"
title: "Back4App Parse-Server NodeJS SDK"
description: "Learn how to create a CRUD app with Back4App Parse-Server SDK."
---

## Using Parse-Server SDK with NodeJS

In this tutorial we are going learn how use Back4App Parse-Server SDK in NodeJS to create a basic CRUD application.

For more information see: [Parse-Server JavaScript Guide](http://docs.parseplatform.org/js/guide/).

### Prerequisites

> **To complete this tutorial, it is recommended that the following be installed on your machine:**
> * [NodeJS](https://nodejs.org/) v7.10.1 or later
> * [NPM](https://www.npmjs.com) v4.2.0 (this is already installed with NodeJS)
{: .blockquote-warn}

You can check it by typing:

~~~shell
$ node -v # recomended version: 7.10.1
$ npm -v # recomended version: 4.2.0
~~~

### Hands-on
#### Step 1 - Initializing our App
First we'll create a new folder called node-sdk-b4a and enter inside this folder:

~~~shell
$ mkdir node-sdk-b4a && cd node-sdk-b4a/
~~~

Now create our package.json:

~~~shell
$ npm init -y
~~~

And finally install [Parse NPM Package](https://www.npmjs.com/package/parse/) package:

~~~shell
$ npm install parse --save
~~~

Now create an entry point for our application.

~~~shell
$ touch index.js
~~~

#### Step 2 - Create a new Application in Back4App

[See here how to create an app](https://www.npmjs.com/package/parse/)

> At this point you can already store your app_id, javascript_id and url which we will use soon...
{: .blockquote-note}

> To see this information go to [Back4App Dashboard](https://dashboard.back4app.com/apps) and click in features inside your app's card, and then click in Server inside Core Settings card. All the data needed to start the development of your application is there.
{: .blockquote-tip}

#### Step 4 - Writing some code.

Ok, now that we have the requirements installed in our machine and Back4App application created, lets start code our application.

<!-- This part refer to code -->
First, import the parse package inside your app:

<sub>`index.js`</sub>
~~~javascript
const Parse = require('parse/node');
~~~

Configure the Parse-Server informing your App Id and Javascript Key (see Step 3).

<sub>`index.js`</sub>
~~~javascript
const APP_ID = 'PUTS_YOUR_APP_ID_HERE';
const JAVASCRIPT_KEY = "PUTS_YOUR_JAVASCRIPT_KEY_HERE";
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
~~~

Inform the Back4App Parse-Server URL.

<sub>`index.js`</sub>
~~~javascript
Parse.serverURL = 'https://parseapi.back4app.com/'
~~~

#### Creating an Object

See more here: [Parse-Server Objects](http://docs.parseplatform.org/js/guide/#objects)

> Storing data on Parse is built around Parse.Object. Each Parse.Object contains key-value pairs of JSON-compatible data. This data is schemaless, which means that you don’t need to specify ahead of time what keys exist on each Parse.Object. You simply set whatever key-value pairs you want, and our backend will store it.
{: .blockquote-note}

We are going to create a simple crud of events, for that, we'll extend Parse.Object to instantiate our Object.

~~~javascript
const MyEvents = Parse.Object.extend("MyEvents");
const myEvents = new MyEvents();
~~~

And now we have available all the methods and properties available in Parse.Object to do what our application needs without further ado.

First create the functions create, read, update and destroy(delete).
~~~javascript
function create() {}
function read(id) {}
function update(id) {}
function destroy(id) {}
~~~

### Create

Let's start by recording a simple JavaScript object literal, puts this sequence of code inside create function.

Our object to be saved:
~~~javascript
const rockEvent = {
  title: 'Rock\'n Rio',
  description: 'Rock\ in Rio is a recurring music festival originating in Rio de Janeiro.'
};
~~~

A call save method of Parse.Object method.
~~~javascript
event.save(rockEvent)
~~~

Using promise, get the response and transform it in a JSON object (Don't do it if you need to use Parse.Object methods and properties)
~~~javascript
.then(obj => obj.toJSON())
~~~

And here you can see the data saved in the object.

In the sequence, we'r calling the read function to retrieve the object saved on sever.
~~~javascript
.then(event => {
  console.log('Object saved:\n', event);
  read(event.objectId);
})
~~~

If an error occurs, log this.
~~~javascript
.catch(console.error);
~~~

### Read

Here, we get a specific object through the id, using get method:
~~~javascript
eventQuery.get(id)
~~~

Convert it to a JSON
~~~javascript
.then(obj => obj.toJSON())
~~~

And then you can use your saved data.
~~~javascript
.then(event => {
  console.info('Object retrieved', event.title);
  update(event.objectId);
})
.catch(console.error);
~~~

### Update

Since we want an exact result, we will use the first method, it will find the first item with the specified id and return us.
~~~javascript
eventQuery.first(id)
~~~

In this case we will not use .then to convert to JSON since we will need the parse api. This helps us to maintain the data consistency, allows the search to end after the object is found and make sure we are not recording n times the same value using set("property", "value").
~~~javascript
.then(eventToUpdate => {
  if(eventToUpdate !== undefined) {
    console.log('Updating event:', eventToUpdate.toJSON());
    // Here we set the new values that need to be updated
    eventToUpdate.set('title', 'New Title Edited');
    eventToUpdate.set('description', 'New description');
    // Save our retrieved object
    eventToUpdate.save()
    .then(eventUpdated => {
      console.log('Updated Event', eventUpdated);
      destroy(eventUpdated.id)
    })
    .catch(console.error);
  }
})
.catch(console.error);
~~~


### Destroy

Again we find a single object through the id:
~~~javascript
  eventQuery.first(id)
}
~~~

And execute the destroy method to exclude it:
~~~javascript
.then(eventToDelete => {
  if(eventToDelete !== undefined) {
    console.log('Event to Delete', eventToDelete.id);
    eventToDelete.destroy()
    .then(eventDeleted => {
      console.log('Deleted Event', eventDeleted.id);
    })
    .catch(console.error)
  }
})
.catch(console.error);
~~~
