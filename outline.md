# Outline

### 1. Loosely guided by @abuiles book Ember-CLI 101
 You can get $10 off for San Diego Ember group: https://leanpub.com/ember-cli-101/c/san-diego-101

### 2. Goal: reduce the glue
There are all sorts of details that go into creating a web application that are repeated over and over again.  Attempting to reduce the work associated with this has given rise to a variety of scaffolding tools and guidelines on best choices.  These scaffolding tools are all trying to do the same thing:  reduce the amount of work necessary to "get started" by providing a set of "best practice" choices that serve right out of the box.  These choices include things like:

0. Application directory structure
0. Generators for common components
0. Modularity choices (AMD/node modules/etc) TODO:  How to explain this better?
0. Build system
0. Asset compilation & minification
0. Testing framework and setup

### 3. Ember-CLI
Ember-CLI provides choices for all of the aforementioned areas.  We'll dive into some of these choices in more detail later but at a high level Ember-CLI builds in:

0. A directory structure which we'll explore more later
0. Generators for all common components
0. ES6 modules transpiled to AMD
0. Broccoli build tool for builds. (Lightning fast and extensible with plugin architecture
0. Asset minification also via Brocolli.
0. Qunit for testing

#### Modules
Modules allow you to divide logical portions of code into smaller, functional pieces and include them as needed. As your application grows, smaller pieces of functional code become easier to manage, support, maintain and test. TODO: more stuff

### 4. Best practices
0. Code
    0. camelCase naming
    0. use modules, avoid globals
    0. reusable code → mixins, extend, add-ons
0. Files
    0. kebab-case-naming.js
    0. children in subdirectory → `routes/invoices/edit.js` & `routes/invoices/new.js`

### 5. Setup
0. Install Git. This can be a bit different depending on your OS but a good resource is [git-scm](http://git-scm.com/downloads).
0. Install Node.js.  Files and instructions can be found [here](https://nodejs.org/download/).
0. Setup NPM for non-sudo installation
    0. NPM is the node package manager.  It will automatically be installed when you install node.
    0. NPM installs packages *locally* (within the directory it is invoked in) for per-project modules, or *globally* for packages you want accessible everywhere.
    0. However, by default NPM installs global packages in a root-restricted location, requiring SUDO to install.  This creates a **huge** headache.  As an alternative, _before_ you install any packages, follow (this guide)[https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md] to configure your npm to install in your home directory without requiring sudo.
0. Install Bower: `npm i -g bower`
0. Install Ember-CLI: `npm i -g ember-cli`
0. And create a new project named 'workshop': `ember new workshop`

### 6. Project Organization: High level

Now that you have an Ember-CLI generated project, let's step inside and start exploring:

    $ cd workshop
    $ ls
    Brocfile.js             bower.json              node_modules            testem.json
    README.md               bower_components        package.json            tests
    app                     config                  public                  vendor

##### package.json and node_modules
The first things to notice is the file `package.json` and the directory `node_modules`. These are from npm, and if you're new to NPM, take a look at what is in the `package.json` file.  This file contains information about packaging up your application as a module itself, but more importantly for our purposes it contains information about what npm modules are required to run and develop our app. When using ember-cli you won't often come in here and edit this ourselves directly however you'll see that the packages needed for broccoli and ember-cli are specified here. If you were to install any ember-cli-addons yourself, you would see them show up in here as well. The packages specified in `package.json` will be installed under `node_modules/`.

##### bower.json and bower_components
The next thing to look at is the file `bower.json` and the `bower_components` directory. This coupling is similar to that of the prior. Bower has become the defacto standard in package management for front end applications and our Ember-CLI application will use it to manage our dependencies. If you open up that file you'll see that our application comes out of the box with not only Ember itself but jQuery, Ember Data (a powerful data persistence library), and qunit (testing framework).

##### tests
Ember-CLI comes out-of-the box with a testing framework and ember-cli provides some context and helpers, making it easier to test our applications. You can test models, routes, controllers and components. Possibly the most useful types of tests you can write, however, are unit and acceptance tests.

Unit tests allow us to hone in on a specific functionality and does not require the entire ember application be running. This makes it easy to setup and quickly test functional pieces of our application. Acceptance tests, also called integration tests, are used to test workflows of your app. They emulate user interactions throughout your application and using helpers you can assert the expected functionality.

#### public and vendor
You may be wondering where images, fonts and other assets go. The answer is the `public` directory. These will be served at the root of your application.

Similarly, you may have dependencies that are not in bower - stylesheets or javascripts. These can be stored in the `vendor` directory. Loading vendor files is not something we will cover in this workshop.

##### The 'app' directory
The app directory is where we're going to put all of our application code.  It is carefully structured with an appropriate place for each type of module:

    $ ls app
    app.js          controllers     index.html      router.js       styles          views
    components      helpers         models          routes          templates

Some of these may sound familiar to you, while others may be brand new.  Don't worry yet if you don't know what all of these different pieces are.  We'll get to them one by one.

### 7. Ready to code!
0. `ember serve`
0. http://localhost:4200

### 8 Diversion: Accessing our API with ember-data

Ember is a client side framework and so when we have data that we want to persist, we need a backend API.  We want an API to serve up our blog posts and allow users to view and submit comments.

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

    $ ember g adapter application
    version: 0.2.0
      installing
        create app/adapters/application.js
      installing
        create tests/unit/adapters/application-test.js

Let's open up that adapter and see what is there:

    import DS from 'ember-data';

    export default DS.RESTAdapter.extend({
    });

We're using an Ember Data builtin adapter called the RESTAdapter. Building a custom adapter isn't too hard, but we don't need to because Ember Data already has an adapter custom built for Rails APIs.

Let's update our file to use the Ember adapter for Rails APIs:

    import DS from 'ember-data';

    export default DS.ActiveModelAdapter.extend({
    });

Finally, to point our Ember app at the API we've set up, let's restart 'ember serve' using the proxy option to point Ember to the api we want to access:

    $ ember serve --proxy https://sandiego-ember-cli-101.herokuapp.com
    version: 0.2.1
    Proxying to https://sandiego-ember-cli-101.herokuapp.com
    Livereload server on port 35729
    Serving on http://localhost:4200/

### 9. Blog post model

#### Make a blog post model
For our test application, we're going to create a blog.  Let's start off by using a generator to create a model for the blogPost.  We'll give it a couple of basic fields and take a look at what happens.

    $ ember generate model blogPost title:string body:string
    installing
        create app/models/blog-post.js
    installing
        create tests/unit/models/blog-post-test.js

OK, Ember-CLI has just created for us both a model file in app/models and a test in tests/unit/models/.  Let's take a look at the model and see what it contains:

    import DS from 'ember-data';

    export default DS.Model.extend({
      title: DS.attr('string'),
      body: DS.attr('string')
     });

What is that funky syntax?  `import DS from 'ember-data'` and `export default DSModel.extend()`?  Welcome to ES6 modules.  The Ecmascript 6 standard specifies this as the standard way to define modules, and thanks to the magic of transpilers we can already use them today even though no browsers actually support ES6.  If you're familiar with node or AMD modules, it should be pretty easy to figure out what's going on here, there's just slightly different syntax.  We're importing a module from 'ember-data' and calling it DS.  Then we're extending the DS.Model class and returning that as the module this class defines.

Looking a little more into the body of the code, we see that our model is specifying exactly what fields it intends to have, in this case a title and a string.  If we later decide we want another field (perhaps a published date) we need only extend this model that the generator created for us.

    import DS from 'ember-data';

    export default DS.Model.extend({
      title: DS.attr('string'),
      body: DS.attr('string'),
      publishedDate: DS.attr('date')
    });

#### Test our blog post model
Testing can seem daunting if you put it off for too long so lets get right to it and write a test for that model we just created. Ember-CLI has us covered. Our model generation above also generated a test module for our blog post model:

    $ ls tests/unit/models
    blog-post-test.js

Pretty cool, huh? Let's open up `tests/unit/models/blog-post-test.js` and see what Ember-CLI generated for us:

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

That looks like a lot! First is the import statement. This is how, using ES6 module syntax, we can import the parts of the `ember-qunit` package we need for our test.

The first section you see, `moduleForModel`, is where any necessary loading for the model testing will be done. Each test is contained to itself, so if a certain model has a dependency on another model through a relationship, for example, we would need to define it here. This is not the case for our application so ours can stay empty.

The following section you see, `test` is how we define a single test. One test can have many assertions but should test only one thing. The generator created a default test for us that asserts the model exists.

Since we have about as much as we can test in here already for our small model, let's make sure the tests pass by running `ember test`.

**ProTip™** If you ever need to know what generators are available, just type `ember help generate` and enjoy a deliciously long list of generating goodness.

### 10. Adding blog posts to our homepage

#### Create the route

If we want to see blog posts on our website, we need to render them into our HTML.  Ember's view layer places routes and their associated URLs front and center.  The way to show something is to create a route and associated template.

Let's start once again from a generator, this time for our index page route:

    $ ember generate route index
    installing
      create app/routes/index.js
      create app/templates/index.hbs
    installing
      create tests/unit/routes/index-test.js

This creates a few files for our index route and template file.

Looking at `app/routes/index.js` we see:

    import Ember from 'ember';

    export default Ember.Route.extend({
    });


#### Update the template

Let's take a look at the template file that was generated for us in `app/templates/index.hbs`:

    {{outlet}}

Just this funky thing called `{{outlet}}`.  Ember.js uses handlebars for templating, and the `outlet` variable is a special variable that Ember uses to say "insert any subtemplates here".  If you've done anything with ruby on rails, think `yield` and you'll be awfully close.  Our `index` template is the end of the line for our homepage so let's remove the `{{outlet}}` and add a sample post:

    <article>
      <h2>My Blog Post</h2>
      <p>This is a test post.</p>
    </article>

If you already have `http://localhost:4200/` opened in your browser, you'll see it auto-refresh to reveal our new page.  If not, go visit `http://localhost:4200/` now.

Our 'My Blog' header should appear nicely beneath our application header.

**ProTip™** Ember-CLI uses live-reloading to persist changes to the browser without the need of reloading. Neat!

#### Putting our posts on the page

So far we have only put some HTML on our page. Let's use our API to show our actual blog posts.

First let's add a `model` to our route. One of the jobs of routes is to provide a model to their template. Our model should be a list of blog posts retrieved from our API.

We could manually provide list of blog posts as our model:

    import Ember from 'ember';

    export default Ember.Route.extend({
      model: function() {
        return [{
          title: "First post",
          body: "This is the post body."
        }];
      }
    });

Instead let's use the data store to retrieve all of our blog posts:

    import Ember from 'ember';

    export default Ember.Route.extend({
      model: function() {
        return this.store.find('blog-post');
      }
    });

Now we should update our template to loop over each of our blog posts and render it:

    {{#each model as |post|}}
    <article>
      <h2>{{post.title}}</h2>
      {{post.body}}
    </article>
    {{/each}}

The handlebars each helper allows us to enumerate over a list of items.  This should print out all of our blog posts to the page.  Let's check out our homepage in our browser again and make sure it worked.

TODO: explain what it looks like when it worked and add a screenshot

#### Acceptance testing

With some user interaction added to our application we can now create an acceptance test.

Let's test that the blog posts from our API show up on the homepage.

TODO: Add acceptance test for our blog post models showing up

### 11. Additional Blog post route(s)

0. Add show route with template.
0. Paginate homepage?
0. Make archive page for previous blog posts?

### 12. Blog comment

0. Make blog comment model and relate to post
0. Make comments show up on blog post detail page

### 13. Submitting a comment

0. Add form to submit a comment
