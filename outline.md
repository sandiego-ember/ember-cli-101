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


### 4. Best practices
0. Code
    0. camelCase naming
    0. use modules, avoid globals
    0. reusable code → mixins, extend, add-ons
0. Files
    0. kebab-case-naming.js
    0. children in subdirectory → `routes/invoices/edit.js` & `routes/invoices/new.js`

### 5. Setup
0. Install Node.js.  Files and instructions can be found [here](https://nodejs.org/download/).
0. Set up NPM for non-sudo installation
    0. NPM is the node package manager.  It will automatically be installed when you install node.
    0. NPM installs packages *locally* (within the directory it is invoked in) for per-project modules, or *globally* for packages you want accessible everyewher.
    0. However, by default NPM installs global packages in a root-restricted location, requiring SUDO to install.  This creates a **huge** headache.  As an alternative, _before_ you install any packages, follow (this guide)[https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md] to configure your npm to install in your home directory without requiring sudo.
0. Now let's install Ember-CLI: `npm i -g ember-cli`
0. And create a new project named 'workshop': `ember new workshop`

### 6. Project Organization: High level

Now that you have an Ember-CLI generated project, let's step inside and start exploring:

    $ cd workshop
    $ ls
    Brocfile.js             bower.json              node_modules            testem.json
    README.md               bower_components        package.json            tests
    app                     config                  public                  vendor

##### 1. Package.json and node_modules
The first things to notice is the file package.json and the directory node_modules.  These are from npm, and if you're new to NPM, take a look at what is in the package.json file.  This file contains information about packaging up your application as a module itself, but more importantly for our purposes it contains information about what npm modules are required to run and develop our app.  As we're building a client-side application, we're unlikely to require any npm modules to run it, but all of the various ember/brocolli/etc tools that we end up needing will be specified in this package.json and installed into the node_modules directory.
##### 2. bower.json and bower_components
The next thing to look at is the file bower.json and the bower_components directory.  Bower has become the defacto standard in package management for front end applications, and our Ember-CLI application will use it to manage our dependencies.  If you open up that file you'll see that our application comes out of the box with not only Ember itself but jQuery, Ember Data (a powerful data persistence library), and qunit.

##### 3. The 'tests' directory
TODO:  Someone with more experience in ember testing land should write this

##### 4. The 'app' directory
The app directory is where we're going to put all of our application code.  It is carefully structured with an appropriate place for each type of module:

    $ ls app
    app.js          controllers     index.html      router.js       styles          views
    components      helpers         models          routes          templates

Some of these may sound familiar to you, while others may be brand new.  Don't worry yet if you don't know what all of these different pieces are.  We'll get to them one by one.

### 7. Ready to code!
0. `ember serve`
0. http://localhost:4200

### 8. Setup ember-data with our API endpoint? Or setup fixtures?

### 9. Blog post model
##### 1. Make a blog post model
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

#### 2. TODO:  Write a test? Show that our model works in some other way?

### 10. Initial Blog Route

If we want to actually see our model in our website, we need to actually render something to HTML.  Ember's view layer places routes and their associated URLs front and center in the architecture.  The way to show something is to create a route and associated template.  Let's start once again from a generator:

    $ ember generate route blog-posts --type=resource
    installing
      create app/routes/blog-posts.js
      create app/templates/blog-posts.hbs
    installing
      create tests/unit/routes/blog-posts-test.js

This creates a few files, and also adds some code to `app/router.js`:

    import Ember from 'ember';
    import config from './config/environment';

    var Router = Ember.Router.extend({
      location: config.locationType
    });

    Router.map(function() {
      this.resource('blog-posts', function() {});
    });

    export default Router;

We can see that the route to 'blog-posts' is being set up... we'll come back to that empty function, as it will become important for us soon.  Now looking at app/routes/blog-posts.js we see:

    import Ember from 'ember';

    export default Ember.Route.extend({                                                                                 });

This is where we'll set up any data we need to render the template.  And speaking of the template, let's look at what app/templates/blog-posts.hbs contains:

    {{outlet}}

Just this funky thing called {{outlet}}.  The syntax should look familiar to most javascript developers - Ember.js uses handlebars for templating, and the 'outlet' variable is a special variable that Ember uses to say "insert any subtemplates here".  If you've done anything with ruby on rails, think 'yield' and you'll be awfully close.  Let's update the template to give ourselves a header:

    <h2>My Blog</h2>
    {{outlet}}

and take a look at our new route at http://localhost:4200/blog-posts

Our 'My Blog' header should appear nicely beneath our application header.

### 11 Diversion: API and serializers

Now we're just about ready to start diving in and actually creating blog posts and looking at them - just one thing missing:  A backend to store that data!  Ember is a client side framework and so when we have data that we want to persist, we need a back end API.  Luckily, for this workshop we've set one up for you at http://sandiego-ember-cli-101.heroku.com supporting the following endpoints

<table>
<tr><th>Verb</th><th>path</th><th>Description</th></tr>
<tr><td>GET</td><td>/blog-posts</td><td>List of blog posts</td></tr>
<tr><td>POST</td><td>/blog-posts</td><td>Create a blog post</td></tr>
<tr><td>GET</td><td>/blog-posts/:id</td><td>Retrieve a post</td></tr>
<tr><td>PUT</td><td>/blog-posts/:id</td><td>Update a post</td></tr>
<tr><td>DELETE</td><td>/blog-posts/:id</td><td>Delete a post</td></tr>

</table>

This particular API was built with Ruby on Rails and thus uses the rails standard snake_case for the JSON that it sends.  But Ember expects things to be camelCase, so how can we connect these two nicely?  Luckily, Ember Data already has us covered with the concept of an adapter, which allows us to specify how to adapt the format from any API.  We can set up an adapter at the level of an individual model, but since we'll be using the same API for all of our models, let's set one up for the entire application:

    $ ember g adapter application
    version: 0.2.0
      installing
        create app/adapters/application.js
      installing
        create tests/unit/adapters/application-test.js

Let's open up that adapter and see what we can see:

	import DS from 'ember-data';

	export default DS.RESTAdapter.extend({
	});
	
Not much going on, we're using an Ember Data builtin adapter called the RESTAdapter.  Building a custom adapter isn't too hard, but luckily for us we don't need to... Ember Data already has an adapter custom built for Rails apis.  We just need to update this file as follows:

	import DS from 'ember-data';

	export default DS.ActiveModelAdapter.extend({
	});
	
Finally, to point our ember app at the API we've set up, we simply restart our 'ember serve' using the proxy option to point Ember to the api we want to access:

    $ ember serve --proxy http://sandiego-ember-cli-101.heroku.com
	version: 0.2.1
	Proxying to http://sandiego-ember-cli-101.heroku.com
	Livereload server on port 35729
	Serving on http://localhost:4200/

###    Additional Blog post route(s)

0. Add new route with template.  Cover binding, highlight nesting
0. Add show route with template.
0. Add index page.
0. Make blog posts show up on the homepage?

### 13. Blog comment
0. Make blog comment model and relate to post
0. Make comments show up on blog post detail page

### 14. Submitting a comment
0. Add form to submit a comment
