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
0. Node.js
0. NPM, not sudo
0. `npm i -g ember-cli`
0. `ember new project`

### 6. Project Organization: High level
0. /app
0. /tests
0. bower.json
0. package.json

### 7. Ready to code!
0. `ember serve`
0. http://localhost:4200

### 8. Setup ember-data with our API endpoint? Or setup fixtures?

### 9. Blog post model
0. Make a blog post model (using generator)
0. Add logical fields to blog post model
0. Write a test? Show that our model works in some other way?

### 10. Blog post route(s)
0. Make a blog post route/template and test it out
0. Make blog posts show up on the homepage?

### 11. Blog comment
0. Make blog comment model and relate to post
0. Make comments show up on blog post detail page

### 12. Submitting a comment
0. Add form to submit a comment
