# Outline

This workshop is loosely guided by [Adolfo Builes'][] book Ember-CLI 101.  You can [get $10 off for San Diego Ember group][ember-cli 101 book].

### 2. Goal: reduce the glue
There are all sorts of details that go into creating a web application that are repeated over and over again.  Attempting to reduce the work associated with this has given rise to a variety of scaffolding tools and guidelines on best choices.  These scaffolding tools are all trying to do the same thing:  reduce the amount of work necessary to "get started" by providing a set of "best practice" choices that serve right out of the box.  These choices include things like:

0. Application directory structure
0. Generators for common components
0. Modularity choices (AMD/node modules/etc) **TODO:  How to explain this better?**
0. Build system
0. Asset compilation & minification
0. Testing framework and setup

### 3. Ember-CLI
Ember-CLI provides choices for all of the aforementioned areas.  We'll dive into some of these choices in more detail later but at a high level Ember-CLI builds in:

0. A directory structure which we'll explore more later
0. Generators for all common components
0. ES6 modules transpiled to AMD
0. Broccoli build tool for builds. (Lightning fast and extensible with plugin architecture
0. Asset minification also via Broccoli.
0. QUnit for testing

#### Modules
Modules allow you to divide logical portions of code into smaller, functional pieces and include them as needed. As your application grows, smaller pieces of functional code become easier to manage, support, maintain and test. **TODO: more stuff**

### 4. Best practices
0. Code
    0. `camelCase` naming
    0. use modules, avoid globals
    0. reusable code → mixins, extend, add-ons
0. Files
    0. `kebab-case-naming.js`
    0. children in subdirectory → `routes/invoices/edit.js` & `routes/invoices/new.js`

### 5. Setup
0. [Install Git][git-scm]
0. [Install Node.js][node-install]
0. Setup NPM for non-sudo installation
    0. NPM is the node package manager.  It will automatically be installed when you install node.
    0. NPM installs packages *locally* (within the directory it is invoked in) for per-project modules, or *globally* for packages you want accessible everywhere.
    0. However, by default NPM installs global packages in a root-restricted location, requiring SUDO to install.  This creates a **huge** headache.  As an alternative, _before_ you install any packages, follow [this guide][npm-g-without-sudo] to configure your NPM to install in your home directory without requiring sudo.
0. Install Bower: `npm i -g bower`
0. Install Ember-CLI: `npm i -g ember-cli`
0. And create a new project named 'workshop': `ember new workshop`

### 6. Project Organization: High level

Now that you have an Ember-CLI generated project, let's step inside and start exploring:

```console
$ cd workshop
$ ls -A
app               .bowerrc     dist           .git        node_modules  README.md    tmp
bower_components  Brocfile.js  .editorconfig  .gitignore  package.json  testem.json  .travis.yml
bower.json        config       .ember-cli     .jshintrc   public        tests        vendor
```

##### package.json and node_modules
The first things to notice is the file `package.json` and the directory `node_modules`. These are from NPM, and if you're new to NPM, take a look at what is in the `package.json` file.  This file contains information about packaging up your application as a module itself, but more importantly for our purposes it contains information about what NPM modules are required to run and develop our app. When using Ember-CLI you won't often come in here and edit this ourselves directly however you'll see that the packages needed for broccoli and Ember-CLI are specified here. If you were to install any Ember-CLI addons yourself, you would see them show up in here as well. The packages specified in `package.json` will be installed under `node_modules/`.

##### bower.json and bower_components
The next thing to look at is the file `bower.json` and the `bower_components` directory. This coupling is similar to that of the prior. Bower has become the de facto standard in package management for front end applications and our Ember-CLI application will use it to manage our dependencies. If you open up that file you'll see that our application comes out of the box with not only Ember itself but jQuery, Ember Data (a powerful data persistence library), and QUnit (testing framework).

##### tests
Ember-CLI comes out-of-the box with a testing framework and Ember-CLI provides some context and helpers, making it easier to test our applications. You can test models, routes, controllers and components. Possibly the most useful types of tests you can write, however, are unit and acceptance tests.

Unit tests allow us to hone in on a specific functionality and does not require the entire ember application be running. This makes it easy to setup and quickly test functional pieces of our application. Acceptance tests, also called integration tests, are used to test the flow of your app. They emulate user interactions throughout your application and using helpers you can assert the expected functionality.

#### public and vendor
You may be wondering where images, fonts and other assets go. The answer is the `public` directory. These will be served at the root of your application.

Similarly, you may have JavaScript or CSS dependencies that are not in bower. These can be stored in the `vendor` directory. Loading vendor files is not something we will cover in this workshop.

##### The 'app' directory
The app directory is where we're going to put all of our application code.  It is carefully structured with an appropriate place for each type of module:

```console
$ ls app
app.js          controllers     index.html      router.js       styles          views
components      helpers         models          routes          templates
```

Some of these may sound familiar to you, while others may be brand new.  Don't worry yet if you don't know what all of these different pieces are.  We'll get to them one by one.

### 7. Ready to code!
0. `ember serve`
0. http://localhost:4200

### 8. Install Bootstrap

Let's use Bootstrap to make our website look nice.  This step isn't strictly necessary but it'll make our website look snazzier.

```console
$ ember install:bower bootstrap
```

Now we need to include the Bootstrap CSS into our build process.  Let's add the following to our `Brocfile.js` below `var app = new EmberApp();` and above `module.exports = app.toTree();`:

```js
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
```

Our `Brocfile.js` should look something like this now:

```js
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
module.exports = app.toTree();
```

If you already have `http://localhost:4200/` opened in your browser, you'll see it auto-refresh to reveal our new page.  If not, go visit `http://localhost:4200/` now.

The font of our header should have changed.

**ProTip™** Ember-CLI uses live-reloading to persist changes to the browser without the need of reloading. Neat!

Now let's add a big header introducing our blog.  Let's update our `application.hbs` file to add a jumbotron header and wrap our page content in a Bootstrap `container`:

```handlebars
<div class="jumbotron">
  <div class="container">
    <h1>Bernice's Blog</h1>
  </div>
</div>

<div class="container">
  {{outlet}}
</div>
```

Our site should have refreshed in our web browser now, revealing a big header for our blog.

### 8 Diversion: Accessing our API with ember-data

Ember is a client side framework and so when we have data that we want to persist, we need a back-end API.  We want an API to serve up our blog posts and allow users to view and submit comments.

We could use fixtures or a mock API, but some friendly back-end developers have already made a working API for us so let's use that.

Our API is setup at https://sandiego-ember-cli-101.herokuapp.com supporting the following endpoints

<table>
    <thead>
        <tr>
            <th>Verb</th><th>path</th><th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET</td><td>/blog-posts</td><td>List of blog posts</td>
        </tr>
        <tr>
            <td>GET</td><td>/blog-posts/:id</td><td>Retrieve a post</td>
        </tr>
        <tr>
            <td>PUT</td><td>/blog-posts/:id</td><td>Update a post</td>
        </tr>
        <tr>
            <td>DELETE</td><td>/blog-posts/:id</td><td>Delete a post</td>
        </tr>
    </tbody>
</table>

Our API uses snake_case in the JSON it sends, common for Ruby on Rails APIs. Ember expects everything to be camelCase, so how can we connect these two nicely? Fortunately, we can use an Ember Data adapter to consumer our API and adapter it to the style we use in Ember.

We can set up an adapter at the level of an individual model, but since we'll be using the same API for all of our models, let's set one up for the entire application:

```console
$ ember g adapter application
version: 0.2.2
  installing
    create app/adapters/application.js
  installing
    create tests/unit/adapters/application-test.js
```

Let's open up that adapter and see what is there:

```js
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
});
```

We're using an Ember Data built-in adapter called the RESTAdapter. Building a custom adapter isn't too hard, but we don't need to because Ember Data already has an adapter custom built for Rails APIs.

Let's update our file to use the Ember adapter for Rails APIs:

```js
import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
});
```

Finally, to point our Ember app at the API we've set up, let's restart 'ember serve' using the proxy option to point Ember to the API we want to access:

```console
$ ember serve --proxy https://sandiego-ember-cli-101.herokuapp.com
version: 0.2.2
Proxying to https://sandiego-ember-cli-101.herokuapp.com
Livereload server on port 35729
Serving on http://localhost:4200/
```

### 9. Blog post model

#### Make a blog post model
For our test application, we're going to create a blog.  Let's start off by using a generator to create a model for the blogPost.  We'll give it a couple of basic fields and take a look at what happens.

```console
$ ember generate model blogPost title:string body:string
installing
    create app/models/blog-post.js
installing
    create tests/unit/models/blog-post-test.js
```

OK, Ember-CLI has just created for us both a model file in app/models and a test in tests/unit/models/.  Let's take a look at the model and see what it contains:

```js
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string')
 });
 ```

What is that funky syntax?  `import DS from 'ember-data'` and `export default DSModel.extend()`?  Welcome to ES6 modules.  The ECMAScript 6 standard specifies this as the standard way to define modules, and thanks to the magic of transpilers we can already use them today even though no browsers actually support ES6.  If you're familiar with node or AMD modules, it should be pretty easy to figure out what's going on here, there's just slightly different syntax.  We're importing a module from 'ember-data' and calling it DS.  Then we're extending the DS.Model class and returning that as the module this class defines.

Looking a little more into the body of the code, we see that our model is specifying exactly what fields it intends to have, in this case a title and a string.  If we later decide we want another field (perhaps a published date) we need only extend this model that the generator created for us.

```js
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  publishedDate: DS.attr('date')
});
```

#### Test our blog post model
Testing can seem daunting if you put it off for too long so lets get right to it and write a test for that model we just created. Ember-CLI has us covered. Our model generation above also generated a test module for our blog post model:

```console
$ ls tests/unit/models
blog-post-test.js
```

Pretty cool, huh? Let's open up `tests/unit/models/blog-post-test.js` and see what Ember-CLI generated for us:

```js
import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('blog-post', {
  // Specify the other units that are required for this test.

});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
```

That looks like a lot! First is the import statement. This is how, using ES6 module syntax, we can import the parts of the `ember-qunit` package we need for our test.

The first section you see, `moduleForModel`, is where any necessary loading for the model testing will be done. Each test is contained to itself, so if a certain model has a dependency on another model through a relationship, for example, we would need to define it here. This is not the case for our application so ours can stay empty.

The following section you see, `test` is how we define a single test. One test can have many assertions but should test only one thing. The generator created a default test for us that asserts the model exists.

Since we have about as much as we can test in here already for our small model, let's make sure the tests pass by running `ember test`.

**ProTip™** If you ever need to know what generators are available, just type `ember help generate` and enjoy a deliciously long list of generating goodness.

### 10. Adding blog posts to our homepage

#### Create the route

If we want to see blog posts on our website, we need to render them into our HTML.  Ember's view layer places routes and their associated URLs front and center.  The way to show something is to create a route and associated template.

Let's start once again from a generator, this time for our index page route:

```console
$ ember generate route index
installing
  create app/routes/index.js
  create app/templates/index.hbs
installing
  create tests/unit/routes/index-test.js
```

This creates a few files for our index route and template file.

Looking at `app/routes/index.js` we see:

```js
import Ember from 'ember';

export default Ember.Route.extend({
});
```


#### Update the template

Let's take a look at the template file that was generated for us in `app/templates/index.hbs`:

```handlebars
{{outlet}}
```

Just this funky thing called `{{outlet}}`.  Ember.js uses handlebars for templating, and the `outlet` variable is a special variable that Ember uses to say "insert any subtemplates here".  If you've done anything with ruby on rails, think `yield` and you'll be awfully close.  Our `index` template is the end of the line for our homepage so let's remove the `{{outlet}}` and add a sample post:

```html
<article>
  <header class="page-header">
    <h2>My Blog Post</h2>
  </header>
  <p>This is a test post.</p>
</article>
```

Go look at the website in your browser again. Our 'My Blog Post' header should appear nicely beneath our big site header.

#### Putting our posts on the page

So far we have only put some HTML on our page. Let's use the API to show our actual blog posts.

First let's add a `model` to our route. One of the jobs of routes is to provide a model to their template. Our model should be a list of blog posts retrieved from our API.

We could manually provide list of blog posts as our model:

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [{
      title: "First post",
      body: "This is the post body."
    }];
  }
});
```

Instead let's use the data store to retrieve all of our blog posts:

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('blog-post');
  }
});
```

Now we should update our index template to loop over each of our blog posts and render it:

```handlebars
{{#each model as |post|}}
  <article>
    <header class="page-header">
      <h2>{{post.title}}</h2>
    </header>
    <p>{{post.body}}</p>
  </article>
{{/each}}
```

The handlebars each helper allows us to enumerate over a list of items.  This should print out all of our blog posts to the page.  Let's check out our homepage in our browser again and make sure it worked.

![display all blog posts](https://s3.amazonaws.com/f.cl.ly/items/0e0w0u2b2o3d0r47301y/Screen%20Shot%202015-03-31%20at%201.45.32%20PM.png)

### 11. Additional Blog post route(s)

What if we want to share a link to one of our blog posts?  To do that, we would need a page for each blog post.  Let's make those!

#### Create the route

Let's start by using a generator to make the new files we'll need:

```console
$ ember generate route blogPost --type=resource --path=/post/:blog_post_id
version: 0.2.2
installing
  create app/routes/blog-post.js
    create app/templates/blog-post.hbs
    installing
      create tests/unit/routes/blog-post-test.js
```

This creates a few files, and also adds some stuff to your  `app/router.js`:

```js
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('blogPost', {
    path: '/post/:blog_post_id'
  }, function() {});
});
```

Here it has defined a resource for us with a dynamic segment in the route, `:blog_post_id`. This dynamic segment will be extracted from the URL and passed into the `model` hook on the `post` route. We can then use this parameter to look up that exact `blog-post` in the store. So let's open up `routes/blog-post.js` that was generated for us and do just that.

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('blog-post', params.blog_post_id);
  }
});
```


#### Update the template

In order to make sure this is working, let's add some markup to `app/blog-post.hbs` that will display a post:

```handlebars
<article>
  <header class="page-header">
    <h1>{{model.title}}</h1>
  </header>
  <p>{{model.body}}</p>
</article>
```

Since we happen to know there is a blog post with `id: 1` on our API server, we can manually visit `http://localhost:4200/post/1` in our browser to test with an example blog post.

#### The magic of Ember-Data

Ember-Data's REST Adapter comes with some freebies to save us time and unnecessary code. The adapter that we are using, `ActiveModelAdapter` is an extension of the REST Adapter, so we get to take advantage of this automagic if our application follows the URL conventions expected of the REST Adapter.

Based on our route's dynamic URL segments the REST Adapter will make the proper calls to the application's API for the model hook.

<table>
  <thead>
    <tr>
      <td>Action</td>
      <td>HTTP Verb</td>
      <td>URL</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Find</td>
      <td>GET</td>
      <td>/post/:blog_post_id</td>
    </tr>
    <tr>
      <td>Find All</td>
      <td>GET</td>
      <td>/post</td>
    </tr>
    <tr>
      <td>Update</td>
      <td>PUT</td>
      <td>/post/:blog_post_id</td>
    </tr>
    <tr>
      <td>Create</td>
      <td>POST</td>
      <td>/post</td>
    </tr>
    <tr>
      <td>Delete</td>
      <td>DELETE</td>
      <td>/post/:blog_post_id</td>
    </tr>
  </tbody>
</table>

The store action determines the model name based on the defined dynamic segment. In our example `:blog_post_id` contains the proper snake-case name for our model with the suffix `_id` appended.

To confirm that this works, **delete the `routes/blog-post.js` file** and verify that our blog post page (http://localhost:4200/post/1) still works properly after reload.

#### Handlebars link-to helper

Now that we have unique URLs for each blog post, we can link to these URLs from our index route.

To add these links open up the `app/templates/index.hbs` file and add a `{{link-to}}` helper around our blog title:

```handlebars
{{#each model as |post|}}
  <article>
    <h2>{{#link-to 'blogPost' post}}{{post.title}}{{/link-to}}</h2>
    {{post.body}}
  </article>
{{/each}}
```

Now take a look at `http://localhost:4200` and a link should appear. **Click it!** And now you're at the page for our blog post.

#### Acceptance testing

With some user interaction added to our application we can now create an acceptance test. The user flow for this test will be:

0. Visit `/`
0. Click the first blog link
0. Verify that the URL now matches `/post/:blog_post_id`

First we will have to generate our acceptance test.

```console
$ ember generate acceptance-test blog-post-show
installing
  create tests/acceptance/blog-post-show-test.js
```

Open the created file `tests/acceptance/blog-post-show-test.js` and see what is there:

```js
import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'workshop/tests/helpers/start-app';

var application;

module('Acceptance: BlogPostShow', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /blog-post-show', function(assert) {
  visit('/blog-post-show');

  andThen(function() {
    assert.equal(currentPath(), 'blog-post-show');
  });
});
```

Let's first rename this test to something more applicable and remove the stuff inside.

```js
test('visit blog post from index', function(assert) {

});
```

There are a few helpers here that we will use **a lot** when writing acceptance tests.

* `visit(route)`: Visits the given route
* `click(selector or element)`: Clicks the element and triggers any actions triggered by that element's click event
* `andThen(callback)`: Waits for any preceding promises to continue

Since `visit` and `click` are both asynchronous helpers we need to wrap subsequent logic in `andThen` to make sure actions complete before continuing onto the next step.

Now we will code out the steps listed above to test that we can link to a blog post from index.

```js
test('visit blog post from index', function(assert) {
  visit('/');
  var blogSelector = 'article:first-of-type a';

  andThen(function() {
    click(blogSelector);
  });

  andThen(function() {
    assert.equal(currentURL(), '/post/1');
  });
});
```

Verify the tests are passing by visiting `http://localhost:4200/tests` in the browser.

### 12. Blog comment

0. Make blog comment model and relate to post
0. Make comments show up on blog post detail page

### 13. Submitting a comment

0. Add form to submit a comment

### More?

0. Paginate homepage?
0. Make archive page for previous blog posts?

[ember-cli 101 book]: https://leanpub.com/ember-cli-101/c/san-diego-101
[git-scm]: http://git-scm.com/downloads
[npm-g-without-sudo]: https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md
[node-install]: https://nodejs.org/download/
[adolfo builes]: http://blog.abuiles.com/
